import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Alert,
  Dimensions,
  YellowBox,
  FlatList
} from 'react-native';

import _ from 'lodash'
import {
ListItem, Icon, Badge, Button
} from 'react-native-elements';
import Modal from 'react-native-modal';
import firebase from 'react-native-firebase'
import firebaseSDK from '../../../config/firebaseSDK';
import { thisTypeAnnotation } from '@babel/types';



const msgs = [
  {
    name: 'Brynn',
    photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    email: 'brynn@mail.usf.edu',
    lastMessage: "Hey what's up?"
  },
  {
    name: 'Mario',
    photo: 'http://www.newdesignfile.com/postpic/2015/02/mario-128x128-icon_245367.png',
    email: 'MarioMario@mail.usf.edu',
    lastMessage: 'Epic'
  },
  {
    name: 'Jeff',
    photo: 'https://findicons.com/files/icons/1606/128x128_icons_6/128/apple.png',
    email: 'Jeff@mail.usf.edu',
    lastMessage: 'Trying to study today?'
  }
  ]

  const styles = StyleSheet.create({
    container: {
      padding: 8,
      backgroundColor: "#ffffff",
    },
    imagestyle: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2

    },
    textstyle:{
      paddingBottom: 8
    },
    titlestyle:{
    textAlign: 'center',
    paddingBottom: 4,
    fontSize: 20
    },
    modalStyle:{
      backgroundColor: 'white',
      alignItems: 'center',
      alignSelf: 'center',
   //   padding: 22,
      justifyContent: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
      
    },
    innerContainer: {
      alignItems: 'center',
    },
  }
  ); 
export default class Chats extends React.Component {

  constructor(props) {
    super(props);
    
    this.state = { 
    isFetching: false,
    addFriendVisible: false,
    search: '',
    friendText: "Enter Friend's Username",
    firstName: '',
    lastName: '',
    matches: [], //ids in array
    users: [], // actual user profiles
    ids: [], // ids in users
    requests: [], // request ids in array
    requestsUsers: [],
    rids: [],
    idRequesting: '',
    requesting: false,
    loaded: false,
    otherName: '',
    otherEmail: '',
    otherID: '',
    };

   // console.log(this.state.firstName)
  };

  componentDidMount() {
 
    this.onRefresh()

    this.createNewLists()

    

  }
  
  keyExtractor = (item, index) => index.toString()


// fetches matches and requests arrays

  fetch = () =>{
  firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).onSnapshot((doc) =>{
       if(doc.exists)
       {
        this.setState({matches: _.toArray(doc.data().matches)})
        this.setState({requests: _.toArray(doc.data().requests)})
      
       }
      
      }).bind(this)

     this.createNewLists()

      this.setState({isFetching: false})   
  };

//  consider using .where(matches arraycontains firebaseapi.shared.uid) dont need to make lists but is really redundant
createNewLists = () => {

  if(this.getLength(this.state.matches) > 0)
  {

  this.state.matches.forEach( val => {
    
    if(!this.state.ids.includes(val))
    { 
    
    firebase.firestore().collection('users').doc(val).onSnapshot((doc)=>{

    if(doc.exists)
    {
     temp = {name: doc.data().firstName + ' ' + doc.data().lastName, email: val, id: val, photo: doc.data().profPic}
     this.state.users.push(temp)
     this.state.ids.push(val)
    }
         
   })

    }
   });

  }

  if(this.getLength(this.state.requests) > 0)
  {
   this.state.requests.forEach( val => {
     
    if(!this.state.rids.includes(val)){
     
    
     firebase.firestore().collection('users').doc(val).onSnapshot((doc)=>{

     if(doc.exists)
     {
       //Todo switch to doc.data() no need for temp
      temp = {name: doc.data().firstName + ' ' + doc.data().lastName, email: val, id: val, photo: doc.data().profPic}
      this.state.requestsUsers.push(temp)
      this.state.rids.push(val)
      
    }
          
    })
  }
    });
}
}

  onRefresh = () => {
    this.setState({isFetching: true}, () => this.fetch())

    this.createNewLists()
  }

  sendRequest = () => {

    // gets user with netid

    firebase.firestore().collection('users').where("netId", "==", this.state.search)
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
        //    if(doc.exists)
              this.setState({idRequesting: doc.id})
             
              firebase.firestore().collection('users').doc(doc.id).set({
                requests: firebase.firestore.FieldValue.arrayUnion(firebaseSDK.shared.uid)
              }, { merge: true })


      });

      this.state.friendText = "Friend Request Sent";
     
      this.setAddFriendVisible(false)
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
     
  });
  }

  acceptRequest = ( item ) => {

    firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).set({
      matches: firebase.firestore.FieldValue.arrayUnion(item.id)
    }, { merge: true })

    firebase.firestore().collection('users').doc(item.id).set({
      matches: firebase.firestore.FieldValue.arrayUnion(firebaseSDK.shared.uid)
    }, { merge: true })

    this.state.users.push(item)
    this.state.userids.push(item.id)

    this.removeRequest(item)
  }

  removeRequest = ( item ) => {

    firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).set({
      requests: firebase.firestore.FieldValue.arrayRemove(item.id)
    }, { merge: true })

    temp = this.state.requests.filter((value, index, arr) => {
      return value != item
    })

    tempU = this.state.requestsUsers.filter((value, index, arr) => {
      return value != item
    })

    this.setState({requests: temp})

    this.setState({requestsUsers : tempU})

   // this.onRefresh()
    
  }

  setAddFriendVisible(t) {

    this.setState({addFriendVisible: t});

    if(!t)
    {
      this.setState({search: ''})
      this.state.friendText = "Enter Friend's Username"
      this.state.requesting = false
    }
  }

  updateSearch = search => {
    this.setState({ search: search });
  };
   addFriend = (props) => {
    if(this.getLength(this.state.requestsUsers) > 0)
    return (
      <ListItem
      title={"Add Friend"}
      
      leftElement={
        <Icon name='plus-circle' color={'#36485f'} size={50} type ='material-community'/>
    
      }

      rightElement={
        <Badge value= {this.state.requestsUsers.length}/>
      }
      onPress={()=>{
        this.setAddFriendVisible(true)
      }}

      bottomDivider
      chevron
      ></ListItem>
    );

    return (
      <ListItem
      title={"Add Friend"}
      
      leftElement={
        <Icon name='plus-circle' color={'#36485f'} size={50} type ='material-community'/>
    
      }
      onPress={()=>{
        this.setAddFriendVisible(true)
      }}

      bottomDivider
      chevron
      ></ListItem>
    );
  }



  pressButton = () =>{
    this.props.navigation.navigate('ChatForm', {
         name: this.state.otherName,
         email: this.state.otherEmail,
         id: this.state.otherID,
       });
  }


  getLength = (arr) =>{
    return Object.keys(arr).length;
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.email}
      onPress={() =>{(this.state.otherName=item.name)&&(this.state.otherID=item.id)&&(this.state.otherEmail=item.email)&&(this.pressButton())}}//this.pressButton(item, this.props)}
      leftElement={
        <Image
        style={styles.imagestyle}
        resizeMode="cover"
        source={{uri: item.photo}}
        />
      }

      rightElement={
        <Icon name='book' color={'#36485f'} size={24} type ='material-community'/>
      }
  
      bottomDivider
      chevron
      
    />
  )

  renderRequests = ({ item }) => (
    <ListItem
      title={item.name}
     // subtitle={item.email}
      leftElement={
        <Image
        style={styles.imagestyle}
        resizeMode="cover"
        source={{uri: item.photo}}
        />
      }
      
      rightElement={
        <View style={{width: 72, height: 35, flexDirection: 'row', padding: 2}}>
          <Icon name='minus-circle' color={'#36485f'} size={35} type ='material-community'onPress={()=> this.removeRequest(item)}/>
          <Icon name='plus-circle' color={'#36485f'} size={35} type ='material-community' onPress={()=> this.acceptRequest(item)}/>

          </View>
        
      }
      bottomDivider
    />
  )

  render(){

    if(!this.state.loaded){
      
      setTimeout(() => { this.onRefresh() }, 100);
      setTimeout(() => { this.onRefresh() }, 250);
      setTimeout(() => { this.onRefresh() }, 500);
      setTimeout(() => { this.onRefresh() }, 2000);
      this.state.loaded=true;
    }
    return(
      <View>
        <Text style={styles.titlestyle}>
        Chats
        </Text>
          <FlatList
          title = "Chats"
          keyExtractor = {this.keyExtractor}
          data={this.state.users}
          refreshing = {this.state.isFetching}
          renderItem={this.renderItem}
          onRefresh={()=>this.onRefresh()}
          ListHeaderComponent={this.addFriend}
          extraData={this.state}
          />
        <Modal
          isVisible={this.state.addFriendVisible}
          onBackdropPress={()=> this.setAddFriendVisible(false)}
          animationIn="slideInLeft"
          animationOut="slideOutRight"
          animationInTiming={400}
          animationOutTiming={400}
          > 

              <View style={styles.modalStyle}>
              <Text style= {styles.textstyle}>{this.state.friendText}</Text>

              <View style={{flexDirection: 'row'}}>
              <TextInput 
              style={{borderColor: '#36485f', borderWidth: 1, maxWidth: 1000}}
              placeholder="Username"
              onChangeText={text => this.updateSearch(text)}
              value={this.state.search}
              multiline={false}
              onSubmitEditing={()=>this.setState({requesting: true},() => this.sendRequest())}
              />
                <Button onPress={()=>this.setState({requesting: true},()=>this.sendRequest())}
                 loading={this.state.requesting}> style={{width: 40, height: 40}}</Button>
           
           </View>
              <FlatList
          title = "Requests"
          keyExtractor = {this.keyExtractor}
          data={this.state.requestsUsers}
          style={{flexGrow: 0, width: 300}}

         // refreshing = {this.state.isFetching}
          renderItem={this.renderRequests}
          //onRefresh={this.onRefresh}
          //ListHeaderComponent={this.addFriend}
          ListEmptyComponent={
          <Text>No Pending Friend Requests
          </Text>}
          />

           
              </View>
        </Modal>
      </View>
    )
  }
}


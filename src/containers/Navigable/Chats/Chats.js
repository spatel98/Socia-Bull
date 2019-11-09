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
import { thisTypeAnnotation, throwStatement } from '@babel/types';

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "#36485f",
    },
    imagestyle: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      backgroundColor: '#36485f',
    },
    textstyle:{
      paddingBottom: 8,
      backgroundColor: 'white',
    },
    titlestyle:{
    textAlign: 'center',
    backgroundColor: '#36485f',
    paddingBottom: 4,
    fontSize: 20,
    color: 'white',
    },
    modalStyle:{
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: 'white',
   //   padding: 22,
      justifyContent: "center",
      borderRadius: 4,
      borderColor: "rgba(0, 0, 0, 0.1)"
      
    },
    innerContainer: {
      alignItems: 'center',
      backgroundColor: '#36485f',
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
    messages: [],
    };

   // console.log(this.state.firstName)
  };

  componentDidMount() {
 
    this.onRefresh()

  //  this.createNewLists()

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
       this.createNewLists()
      })

     

      
  };


createNewLists = () => {


  if(this.getLength(this.state.matches) > 0)
  {

  this.state.matches.forEach( val => {
    firebase.firestore().collection('users').doc(val).onSnapshot((doc)=>{

    if(doc.exists)
    {
      if(!(this.state.ids.includes(val))){
      
     temp = doc.data()
     temp.id = doc.id
     
     this.state.users.push(temp)
     this.state.ids.push(val)
     }
   }
         
   })
   });

  }

  if(this.getLength(this.state.requests) > 0)
  {
   this.state.requests.forEach( val => {


    
     firebase.firestore().collection('users').doc(val).onSnapshot((doc)=>{

     if(doc.exists)
     {
       if(!(this.state.rids.includes(val))){
       
      temp = doc.data()
      temp.id = doc.id;
     //  {name: doc.data().firstName + ' ' + doc.data().lastName, email: val, id: val, photo: doc.data().profPic}
      this.state.requestsUsers.push(temp)
      this.state.rids.push(val)
      }
    }
          
    })
    });
}

  this.setState({isFetching: false})   
}

  onRefresh = () => {
    this.setState({isFetching: true}, () => this.fetch())
  }

  sendRequest = () => {

    // gets user with email

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

    firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).collection('chats').doc(item.id).set({
      messages: this.state.messages
    }, { merge: true })

    firebase.firestore().collection('users').doc(item.id).collection('chats').doc(firebaseSDK.shared.uid).set({
      messages: this.state.messages
    }, { merge: true })

    console.log('this.state.users: ', this.state.users)
    console.log('this.state.ids: ', this.state.ids)
    this.state.users.push(item)
    this.state.ids.push(item.id)

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
      // style = {[{backgroundColor: (this.state.selectedItem[index]) ? 'green' : 'white'}]}
      containerStyle = {{backgroundColor: '#59cbbd'}}
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
         id: this.state.otherID,
       });
  }


  getLength = (arr) =>{
    return Object.keys(arr).length;
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.firstName}
      subtitle={item.email}
      onPress={() =>{(this.state.otherName=item.firstname)&&(this.state.otherID=item.id)&&(this.state.otherEmail=item.email)&&(this.pressButton())}}//this.pressButton(item, this.props)}
      leftElement={
        <Image
        style={styles.imagestyle}
        resizeMode="cover"
        source={item.photo == null ? require('../../../assets/images/click_to_add.png') : {uri: item.profPic}}
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
        source={item.photo == null ? require('../../../assets/images/click_to_add.png') : {uri: item.photo}}
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

    return(
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
       
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
        </ImageBackground>
      </View>
    )
  }
}


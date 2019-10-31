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
      padding: 22,
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
    requesting: false
    };

   // console.log(this.state.firstName)
  };

  componentDidMount() {
   () => this.fetch();
 }
  
  keyExtractor = (item, index) => index.toString()

  fetch = () =>{
  firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).onSnapshot((doc) =>{
       if(doc.exists)
       {
        this.setState({matches: _.toArray(doc.data().matches)})
        this.setState({requests: _.toArray(doc.data().requests)})
      
       }
      
      }).bind(this)

      this.state.matches.forEach( val => {
       firebase.firestore().collection('users').doc(val).onSnapshot((doc)=>{

       if(doc.exists)
       {
         if(!(this.state.ids.includes(val))){
         
        temp = {name: doc.data().firstName + ' ' + doc.data().lastName, email: val, id: val}
        this.state.users.push(temp)
        this.state.ids.push(val)
        }
      }
            
      })
      });

      this.state.requests.forEach( val => {
        firebase.firestore().collection('users').doc(val).onSnapshot((doc)=>{
 
        if(doc.exists)
        {
          if(!(this.state.rids.includes(val))){
          
         temp = {name: doc.data().firstName + ' ' + doc.data().lastName, email: val, id: val}
         this.state.requestsUsers.push(temp)
         this.state.rids.push(val)
         }
       }
             
       }).bind(this);
       });

      this.setState({isFetching: false})   
  };

  onRefresh = () => {
    this.setState({isFetching: true}, () => this.fetch())
  }

  sendRequest = () => {

    if(!this.state.search.includes("@mail.usf.edu"))
    {
      this.state.friendText = "Please enter a valid USF Email"
      return;
    }


    temp =''

    // gets user with email

    firebase.firestore().collection('users').where("email", "==", this.state.search)
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
        //    if(doc.exists)
              this.setState({idRequesting: doc.id})
              temp = doc.id
      });

      this.state.friendText = "Friend Request Sent";
     
      this.setAddFriendVisible(false)
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
     
  });

  // set command that is supposed to update array
 
  firebase.firestore().collection('users').doc(this.state.idRequesting).set({
    requests: firebase.firestore.FieldValue.arrayUnion(this.state.idRequesting),
    tests: 'epic'
  })

  }
  setAddFriendVisible(t) {

    this.setState({addFriendVisible: t});

    if(!t)
    {
      this.setState({search: ''})
      this.state.friendText = "Enter Friend's Username"
    }
  }

  updateSearch = search => {
    this.setState({ search: search });
  };

   addFriend = (props) => {

    if(this.state.requestsUsers.length > 0)
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

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      subtitle={item.email}
     // leftElement={
      //  <Image
       // style={styles.imagestyle}
        //resizeMode="cover"
        //source={{uri: item.photo}}
        ///>
      //}

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
      subtitle={item.email}
     // leftElement={
      //  <Image
       // style={styles.imagestyle}
        //resizeMode="cover"
        //source={{uri: item.photo}}
        ///>
      //}
      rightElement={
        <View>
          <Icon name='minus-circle' color={'#36485f'} size={50} type ='material-community'/>
          <Icon name='plus-circle' color={'#36485f'} size={50} type ='material-community'/>

          </View>
        
      }
  
      bottomDivider
      chevron
      
    />
  )


  render(){
    return(
      <View>
        <Text style={styles.titlestyle}>
         {this.state.idRequesting},
         {this.state.requestsUsers},
         {this.state.requests}
        </Text>
          <FlatList
          title = "Chats"
          keyExtractor = {this.keyExtractor}
          data={this.state.users}
          refreshing = {this.state.isFetching}
          renderItem={this.renderItem}
          onRefresh={()=>this.onRefresh()}
          ListHeaderComponent={this.addFriend}
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
              <TextInput 
              style={{borderColor: '#36485f', borderWidth: 1, maxWidth: 1000}}
              placeholder="Username"
              onChangeText={text => this.updateSearch(text)}
              value={this.state.search}
              multiline={false}
              onSubmitEditing={()=>this.setState({requesting: true},() => this.sendRequest())}
              />
                <Button onPress={()=>this.setState({requesting: true},()=>this.sendRequest())}
                 loading={this.state.requesting}></Button>
           
              
              <FlatList
          title = "Requests"
          keyExtractor = {this.keyExtractor}
          data={this.state.requestsUsers}
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


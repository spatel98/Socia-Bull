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
ListItem, Icon
} from 'react-native-elements';
import Modal from 'react-native-modal';
import { Button } from 'react-native-paper';
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
    matches: [],
    users: [],
    ids: []
    };

    console.log(this.state.firstName)
  };

  componentDidMount() {
    this.fetch();
 }
  
  keyExtractor = (item, index) => index.toString()

  fetch = () =>{
  firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).onSnapshot((doc)=>{
       if(doc.exists)
       {
        this.setState({matches: _.toArray(doc.data().matches)})
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

      this.setState({isFetching: false})

      

      
  };

  onRefresh = () => {
    this.setState({isFetching: true}, () => this.fetch())
  }

  sendRequest = () => {
    this.state.friendText = "Friend Request Sent";
  }


  setAddFriendVisible(t) {

    this.setState({addFriendVisible: t});

    if(!t)
    {
      this.setState({search: ''})
    }
    else
    {
      this.state.friendText = "Enter Friend's Username"
    }
  }

  updateSearch = search => {
    this.setState({ search: search });
  };

   addFriend = (props) => {
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


  render(){
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
          onRefresh={this.onRefresh}
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
              onSubmitEditing={() => this.sendRequest()}
              rightElement={
                <Button onPress={this.sendRequest()}>

                </Button>

              }
              />
              </View>
        </Modal>
      </View>
    )
  }
}


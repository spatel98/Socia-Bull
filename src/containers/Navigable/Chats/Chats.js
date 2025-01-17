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

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import _ from 'lodash'
import {
ListItem, Badge, Button, ButtonGroup, Overlay
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
    college: '',
    messages: [],
    selectedIndex: 0,
    dates: false,
    studybuddies : false,
    friends: false,
    menPref: false,
    womenPref: false,
    otherPref: false

    };

    this.updateIndex = this.updateIndex.bind(this)
   // console.log(this.state.firstName)
  };

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  componentDidMount() {
    this.onRefresh()
  }
  
  keyExtractor = (item, index) => index.toString()

// fetches matches and requests arrays

  fetch = () =>{
  firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).onSnapshot((doc) =>{
       if(doc.exists)
       {
        const data = doc.data()
        this.setState({matches: _.toArray(doc.data().matches)})
        this.setState({requests: _.toArray(doc.data().requests)})
        this.setState(
        { 
          studybuddies: doc.data().studybuddies == null ? false : doc.data().studybuddies,
          college: data.college,
          dates: doc.data().dates == null ? false : doc.data().dates,
          friends: doc.data().friends == null ? false : doc.data().friends,
          menPref: data.menPref == null ? false : data.menPref,
          womenPref: data.womenPref == null ? false : data.womenPref,
          otherPref: data.otherPref == null ? false : data.otherPref
        })
      
       }
       this.createNewLists()
      })

     

      
  };


createNewLists = () => {

  this.setState({users: [], ids: []})


  if(this.getLength(this.state.matches) > 0)
  {
    tempC = 0

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
        console.log('insnap')
        tempC += 1

        if(tempC == this.state.matches.length)
        {
          this.setState({isFetching: false, selectedIndex: 0})
        }
   })

   console.log('outsnap')
   });

  }else
  {
    this.setState({isFetching: false})
  }

  console.log('outpfloopp')

  if(this.getLength(this.state.requests) > 0)
  {
  
   this.state.requests.forEach( val => {


    
     firebase.firestore().collection('users').doc(val).onSnapshot((doc)=>{

     if(doc.exists)
     {
       if(!(this.state.rids.includes(val))){
       
      temp = doc.data()
      temp.id = doc.id;
      this.state.requestsUsers.push(temp)
      this.state.rids.push(val)
      }
    }
   
    })
    });
}

  
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
    //console.log("Name: ", this.state.otherName,' lol', this.state.otherID)
    this.props.navigation.navigate('ChatForm', {
         name: this.state.otherName,
         id: this.state.otherID,
       });
  }


  getLength = (arr) =>{
    return Object.keys(arr).length;
  }

  isValidGenderForPref = (datePref, menPref, womenPref, otherPref, gender) =>{
    if(datePref == null || !datePref)
    {
        return false
    }

    if(menPref != null)
    {
      if(menPref && gender == 'male')
      {
        return true
      }    
    }

    if(womenPref != null)
    {
      if(womenPref && gender == 'female')
      {
        return true
      }
    }

    if(otherPref != null)
    {
      if(otherPref && gender == 'other')
      {
        return true
      }
    }

    return false
  }

  renderItem = ({ item }) => (
    <ListItem
      title={item.firstName}
      subtitle={item.email}
      onPress={() =>{(this.state.otherName=item.firstName)&&(this.state.otherID=item.id)&&(this.state.otherEmail=item.email)&&(this.pressButton())}}
      leftElement={
        <Image
        style={styles.imagestyle}
        resizeMode="cover"
        source={item.profPic == null ? require('../../../assets/images/click_to_add.png') : {uri: item.profPic}}
        />
      }

      rightElement={
        <View style = {{width: 72, height: 35, flexDirection: 'row', padding: 2}}>
        {(item.friends == null ? false : item.friends) && (this.state.friends) && <Icon name='emoticon' color={'#36485f'} size={24} type ='material'/>}
        {(item.dates == null ? false : item.dates) && this.isValidGenderForPref(this.state.dates,this.state.menPref,this.state.womenPref,this.state.otherPref, item.gender) &&<Icon name='heart' color={'#36485f'} size={24} type ='material'/>}
        {(item.studybuddies == null ? false : item.studybuddies)&& this.state.studybuddies  && (this.state.college == item.college) && <Icon name='book' color={'#36485f'} size={24} type ='material-community'/>}
        </View>
        
      }
  
      bottomDivider
      chevron
      
    />
  )

  renderRequests = ({ item }) => (
    <ListItem
      title={item.firstName}
      subtitle={item.email}
      leftElement={
        <Image
        style={styles.imagestyle}
        resizeMode="cover"
        source={item.profPic == null ? require('../../../assets/images/click_to_add.png') : {uri: item.profPic}}
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

  filterData(){

    if(this.state.selectedIndex == 0)
    {
      return this.state.users
      /*
      return this.state.users.filter((value, index, arr) => {
        return (value.friends == true && this.state.friends) || (value.dates == true && this.state.dates) || (value.studybuddies == true && this.state.studybuddies)
      })*/
    }

    if(this.state.selectedIndex == 1)
    {
      return this.state.users.filter((value, index, arr) => {
        return value.friends == true && this.state.friends
      })
    }

    if(this.state.selectedIndex == 2)
    {
      return this.state.users.filter((value, index, arr) => {
        return value.dates == true && this.isValidGenderForPref(this.state.dates,this.state.menPref,this.state.womenPref,this.state.otherPref, value.gender)
      })
    }

    if(this.state.selectedIndex == 3)
    {
      return this.state.users.filter((value, index, arr) => {
        return value.studybuddies == true && this.state.studybuddies && this.state.college == value.college
      })
    }


  }

  render(){

    const buttons = ['All', 'Friends', 'Dates', 'Study']

    const {selectedIndex} = this.state

    return(
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
       
        <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex = {selectedIndex}
        buttons={buttons}
        containerStyle={{height: 25}}
        selectedButtonStyle = {{backgroundColor : '#59cbbd'}}
        />


          <FlatList
          title = "Chats"
          keyExtractor = {this.keyExtractor}
          data={this.filterData()}
          refreshing = {this.state.isFetching}
          renderItem={this.renderItem}
          onRefresh={()=>this.onRefresh()}
          ListHeaderComponent={this.addFriend}
          extraData={this.state.selectedIndex}
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

              <View style={{flexDirection: 'row', padding: 5}}>
              <TextInput 
              style={{borderColor: '#36485f', borderWidth: 1, maxWidth: 1000}}
              placeholder="Username"
              onChangeText={text => this.updateSearch(text)}
              value={this.state.search}
              multiline={false}
              onSubmitEditing={()=>this.setState({requesting: true},() => this.sendRequest())}
              />
                <Button onPress={()=>this.setState({requesting: true},()=>this.sendRequest())}
                 loading={this.state.requesting}
                 title={"Submit"} 
                 buttonStyle={{width: 90, height: 60, paddingLeft: 10}}
                 containerStyle={{padding: 10}}>
                 </Button>
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
          <View style={styles.modalStyle}>
          <Text>
            No Pending Friend Requests
          </Text>
          </View>
          }
          />
              </View>
        </Modal>
        </ImageBackground>
      </View>
    )
  }
}


import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';
import firebaseSDK from '../../../config/firebaseSDK';
import usernameImg from '../../../assets/images/username.png';
import passwordImg from '../../../assets/images/password.png';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  Button,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  CheckBox,
} from 'react-native';
import Home from './Home';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const config = {
  apiKey: "AIzaSyDENbbwxSuy-wbYEZ5OzMO2RvVjpPPGu_k",
  authDomain: "socia-bull.firebaseio.com",
  storageBucket: "soica-bull.appspot.com",
}
firebase.initializeApp(config)
export default class DeleteAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: false,
      friends: false,
      studybuddies: false,
    }
  }
  signOutUser = async () => {
    try {
        await firebase.auth().signOut();
        navigate('Login');
        console.log("User signed out")
    } catch (e) {
        console.log(e);
    }
}
  setNoSearch = () =>{
    firebase.firestore().collection('users').where("matches", "array-contains", firebaseSDK.shared.uid)
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
        //    if(doc.exists)
            
              firebase.firestore().collection('users').doc(doc.id).set({
                matches: firebase.firestore.FieldValue.arrayRemove(firebaseSDK.shared.uid)
              }, { merge: true })


      });
    })

    firebase.firestore().collection('users').where("requests", "array-contains", firebaseSDK.shared.uid)
    .get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
        //    if(doc.exists)
            
              firebase.firestore().collection('users').doc(doc.id).set({
                requests: firebase.firestore.FieldValue.arrayRemove(firebaseSDK.shared.uid)
              }, { merge: true })


      });
    })
  }


  deleteAccount(){
    firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
      dates: false,
      studybuddies: false,
      friends: false,
    }, { merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
    var user = firebase.auth().currentUser;
    this.setNoSearch();
    user.delete().then(function() {
    }).catch(function(error) {
        Alert("Account deletion failed! You must sign in again to delete the account!")
        this.signOutUser();
    // An error happened.
    });}

  render() {
    // { () => this.onInitialize() }
    return (
      <View>
        <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
      <View style={styles.container}>
          <Text style={styles.textBox}>ARE YOU SURE YOU WANT TO DELETE YOUR ACCOUNT? (THIS CANNOT BE UNDONE)</Text>
          <View style={styles.container2}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.deleteAccount()}> 
                <Text>YES</Text>  
              </TouchableOpacity>     
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Settings')}>
                <Text>NO</Text>  
              </TouchableOpacity> 
          </View>
      </View>
      </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    height: DEVICE_HEIGHT,
  },
  signupText: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  textBox: {
    width: DEVICE_WIDTH*0.9,
    marginTop: 10,
    color: '#fff',
    textAlign: 'center',
  },
  container2: {
      flexDirection: 'row'
  },
  buttonContainer: {
    marginTop: 15,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    marginEnd: 10,
    width: 50,
    borderRadius: 30,
    backgroundColor: "#59cbbd",
  },
})


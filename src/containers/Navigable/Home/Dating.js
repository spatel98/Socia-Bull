import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase';
import firebaseSDK from '../../../config/firebaseSDK';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
    CheckBox,
  } from 'react-native';
export default class Dating extends Component {
  constructor(props){
    super(props);
    this.state={
        men: false,
        women: false,
        other: false,
      }
  }
  CheckboxMen(){
    this.setState({men:!this.state.men})

    firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
      menPref: this.state.men,
    }, { merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
  CheckboxWomen(){
    this.setState({women:!this.state.women})
    firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
      womenPref: this.state.women,
    }, { merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
  CheckboxOther(){
    this.setState({other:!this.state.other})
    firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
      otherPref: this.state.other,
    }, { merge: true })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  }
  render(){
    return(
      <View> 
          <Text style={styles.lookingFor}>Dating Preferences</Text>
          <View style={styles.container}>
          <Text style={styles.textBox}>Men</Text> 
          <CheckBox style={styles.boxes1} value={this.state.men}
          onChange={()=>this.CheckboxMen()}/>
          <Text style={styles.textBox2}>Women</Text> 
          <CheckBox style={styles.boxes2} value={this.state.women}
          onChange={()=>this.CheckboxWomen()}/>
          <Text style={styles.textBox3}>Other</Text> 
          <CheckBox style={styles.boxes3} value={this.state.other}
          onChange={()=>this.CheckboxOther()}/>
          </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#36485f',
    flexDirection: 'row',
  },
  textBox: {
    marginTop: 5,
    color: '#fff',
  },
  textBox2: {
    marginTop: 5,
    marginLeft: 20,
    color: '#fff',
  },
  textBox3: {
    marginTop: 5,
    marginLeft: 20,
    color: '#fff',
  },
  boxes: {
    color: '#fff',
  },
  boxes2: {
    color: '#fff',
  },
  boxes3: {
    color: '#fff',
  },
  lookingFor:{
    fontSize:20,
    color:"#FFFFFF",
    fontWeight:'300',
    alignSelf: 'center',
    marginBottom: 10,
  },
})


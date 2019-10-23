import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OptionsMenu from "react-native-options-menu";
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
        major: "undeclared",
      }
  }
  render(){
    return(
      <View style={styles.container}> 
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#36485f',
  },
  textBox: {
    marginTop: 10,
    color: '#fff',
    alignSelf: 'center',
  },
  boxes: {
    marginTop: 10,
    color: '#fff',
    alignSelf: 'center',
  },
  lookingFor:{
    fontSize:20,
    color:"#FFFFFF",
    fontWeight:'300',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf:'center',
    position: 'absolute',
    zIndex: 108,
  },
  avatar2: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf:'center',
    position: 'absolute',
    marginTop:80,
    zIndex: 107,
  },
})


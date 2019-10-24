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
    Picker,
  } from 'react-native';
export default class Dating extends Component {
  constructor(props){
    super(props);
    this.state={
        college: "undeclared",
      }
  }
  render(){
    return(
      <View style={styles.container}> 
          <Picker
		      style={styles.picker}
		      selectedValue={this.state.college}
		      onValueChange={(itemValue,itemIndex) => this.setState({college:itemValue})}>
		      <Picker.Item label="Select Department" value=""/>
		      <Picker.Item label="College of Arts" value="College of Arts" />
		      <Picker.Item label="College of Arts and Sciences" value="College of Arts and Sciences"/>
          <Picker.Item label="College of Behavioral and Community Sciences" value="College of Behavioral and Community Sciences"/>
          <Picker.Item label="College of Business" value="College of Business"/>
		      <Picker.Item label="College of Education" value="College of Education"/>
		      <Picker.Item label="College of Engineering" value="College of Engineering"/>
          <Picker.Item label="College of Global Sustainability" value="College of Global Sustainability"/>
          <Picker.Item label="College of Marine Science" value="College of Marine Science" />
		      <Picker.Item label="College of Medicine" value="College of Medicine"/>
          <Picker.Item label="College of Nursing" value="College of Nursing"/>
          <Picker.Item label="College of Pharmacy" value="College of Pharmacy"/>
          <Picker.Item label="College of Public Health" value="College of Public Health"/>
		    </Picker>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#36485f',
  },
  picker: {
    width: 250,
    color: '#fff',
    padding: 0,
    height: 60,
    //marginRight: 36,
    marginBottom: 10,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
    alignSelf: 'center',
    alignItems: 'center',
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


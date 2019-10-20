import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
  }
  CheckboxWomen(){
    this.setState({women:!this.state.women})
  }
  CheckboxOther(){
    this.setState({other:!this.state.other})
  }
  render(){
    return(
      <View> 
          <Text style={styles.lookingFor}>Dating</Text>
          <Text style={styles.lookingFor}>I Want</Text>
          <Text style={styles.textBox}>Men</Text> 
          <CheckBox style={styles.boxes} value={this.state.men}
          onChange={()=>this.CheckboxMen()}/>
          <Text style={styles.textBox}>Women</Text> 
          <CheckBox style={styles.boxes} value={this.state.women}
          onChange={()=>this.CheckboxWomen()}/>
          <Text style={styles.textBox}>Other</Text> 
          <CheckBox style={styles.boxes} value={this.state.other}
          onChange={()=>this.CheckboxOther()}/>
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#36485f',
    height: 800,
  },
  textBox: {
    marginTop: 10,
    alignItems:'center',
    color: '#fff',
  },
  SelectImgButton: {
    backgroundColor:'grey',
    margin:10,
    padding:10,
  },
  Image: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
  },
  SelectImage: {
    color:"#fff"
  },
  header:{
    backgroundColor: "#59cbbd",
    height:150,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf:'center',
    position: 'absolute',
    zIndex: 106,
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
    zIndex: 105,
  },
  lookingFor:{
    fontSize:20,
    color:"#FFFFFF",
    fontWeight:'300',
  },
  name:{
    fontSize:22,
    color:"#FFFFFF",
    fontWeight:'600',
  },
  body:{
    marginTop:50,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding:30,
  },
  name:{
    fontSize:28,
    color: "white",
    fontWeight: "600"
  },
  info:{
    fontSize:16,
    color: "#59cbbd",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "white",
    marginTop:10,
    textAlign: 'center',
    marginBottom:50,
  },
  buttonContainer: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
    backgroundColor: "#59cbbd",
  },
})


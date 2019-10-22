import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
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
  import logo from "../../../assets/images/logo.png";
  import Dating from "./Dating";
  const options={
    title: 'Upload an Image',
    takePhotoButtonTitle: 'Take a photo',
    chooseFromLibraryButtonTitle: 'Choose a photo',
  }
export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      avatarSource: null,
      pic:null,
      dates: false,
      friends: false,
      studybuddies: false,
    }
  }
  state = {
    photo: logo,
  }
  handleChoosePhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }
  
      else {
        let source = { uri: response.uri };
  
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
  
        this.setState({
          avatarSource: source,
          pic:response.data
        });
      }
    });
  }
  CheckboxDates(){
    this.setState({dates:!this.state.dates})
  }
  CheckboxFriends(){
    this.setState({friends:!this.state.friends})
  }
  CheckboxStudyBuddies(){
    this.setState({studybuddies:!this.state.studybuddies})
  }
  ImplementDates(){
    if(dates){
      return <Dating/>
    }
  }
  render(){
    const { photo } = this.state
    return(
      <View style={styles.container}>
      <View style={styles.header}></View>
      <TouchableOpacity style = {styles.avatar2}
              onPress={this.handleChoosePhoto}>
              <Image style={styles.avatar} source={this.state.avatarSource}/>
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>FIRST LAST, AGE</Text>
          <Text style={styles.info}>sawanp@mail.usf.edu</Text>
          <Text style={styles.info}>(###)###-####</Text>
          <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
          <Text style={styles.lookingFor}>Looking For</Text>
          <Text style={styles.textBox}>Dates</Text> 
          <CheckBox style={styles.boxes} value={this.state.dates}
          onChange={()=>this.CheckboxDates()}/>
          <Text style={styles.textBox}>Friends</Text> 
          <CheckBox style={styles.boxes} value={this.state.friends}
          onChange={()=>this.CheckboxDates()}/>
          <Text style={styles.textBox}>Study Buddies</Text> 
          <CheckBox style={styles.boxes} value={this.state.studybuddies}
          onChange={()=>this.CheckboxStudyBuddies()}/>
        </View>
    </View>
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


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
  } from 'react-native';
  import logo from "../../../assets/images/logo.png"
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
      pic:null
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
          <Text style={styles.name}>NAME</Text>
          <Text style={styles.info}>email@fuck.com</Text>
          <Text style={styles.info}>(###)###-####</Text>
          <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>
          
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 1</Text>  
          </TouchableOpacity>              
          <TouchableOpacity style={styles.buttonContainer}>
            <Text>Opcion 2</Text> 
          </TouchableOpacity>
        </View>
    </View>
  </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#36485f',
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
    textAlign: 'center'
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


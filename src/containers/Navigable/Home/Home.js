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
export default class Home extends Component<Props> {
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
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Image style={styles.Image}
            source={this.state.avatarSource}/>
            <TouchableOpacity style = {styles.SelectImgButton}
              onPress={this.handleChoosePhoto}>
              <Text style={styles.SelectImage}>Select Image</Text>
            </TouchableOpacity>
            <Text style={styles.Name}>FIRST NAME</Text>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    top: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  Name: {
    top: 25,
    fontSize: 16,
    justifyContent: 'center'
  },
})


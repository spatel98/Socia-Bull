import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import firebase from 'react-native-firebase';
import defaultPic from '../../../assets/images/logo.png'
import firebaseSDK from '../../../config/firebaseSDK';

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
import logo from "../../../assets/images/click_to_add.png";
import wallpaper from "../../../assets/images/background-3.jpg"
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const options = {
  title: 'Upload an Image',
  takePhotoButtonTitle: 'Take a photo',
  chooseFromLibraryButtonTitle: 'Choose a photo',
}

const config = {
  apiKey: "AIzaSyDENbbwxSuy-wbYEZ5OzMO2RvVjpPPGu_k",
  authDomain: "socia-bull.firebaseio.com",
  storageBucket: "soica-bull.appspot.com",
}
firebase.initializeApp(config)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      bdate: '',
      email: '',
      gender: '',
      netId: '',
      avatarSource: null,
      pic: null,
      profPic: '',
    }
  }
  state = {
    pic: logo,
  }

  componentDidMount() {
    console.log('componentDidMount current uid: ', firebaseSDK.shared.uid)
    firebase
      .firestore().collection("users").doc(firebaseSDK.shared.uid)
      .onSnapshot((doc) => {
        console.log('doc data:', doc.data())
        const data = doc.data()
        this.setState({
          firstName: data.firstName,
          lastName: data.lastName,
          dates: data.dates,
          friends: data.friends,
          studybuddies: data.studybuddies,
          bdate: data.date,
          email: data.email,
          gender: data.gender,
          netId: data.netId,
          profPic: data.profPic,
        })
      })
  }

  handleChoosePhoto = () => {
    ImagePicker.showImagePicker(options, (response) => {
      
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('Image Picker Error: ', response.error);
      }

      else {
        let source = { uri: response.uri };

        this.uploadImage(response, firebaseSDK.shared.uid)
          .then((snapshot) => {
            console.log('Uploaded a blob or file!');
          })
          .catch((error) => {
            console.log('Error uploading a blob or file!');
          });

        this.setState({
          avatarSource: source,
          pic: response.data
        });
        console.log('avatarsource: ', this.state.avatarSource)
      }
    });
  }

  uploadImage = async (response, imageName) => {
    const image= { //TO-DO: For IOS, use response.uri
      image: response.uri.toString(),
      path: response.path
    }
    
    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = firebase.storage().ref().child('images/' + imageName).put(image.path, metadata)

    console.log('uploadTask:', uploadTask)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
       (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, (error) => {
        console.log("error: ", error)
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      }, () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);

          firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
            profPic: downloadURL,
          }, { merge: true })
            .then(function () {
              console.log('current uid: ', firebaseSDK.shared.uid);
              console.log("Document successfully written!");
              console.log('current uid: ', firebaseSDK.shared.uid);
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        });
      });
      return 'hi'
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
  render() {
    const { photo } = this.state
    // { () => this.onInitialize() }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
        <View style={styles.header}><ImageBackground source={require('../../../assets/images/background-8.jpg')} style={{width: '100%',height:'100%' }}></ImageBackground></View>

        <ImageBackground source={require('../../../assets/images/click_to_add.png')} borderRadius={63} style={styles.avatar3}>
          <TouchableOpacity style={styles.avatar2}
            onPress={this.handleChoosePhoto}>
            <Image style={styles.avatar} source={this.state.avatarSource} />
          </TouchableOpacity>
        </ImageBackground>
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.firstName}</Text>
            <Text style={styles.info}>{this.state.email}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('Settings')}>
                <Text>Settings</Text>  
              </TouchableOpacity>     
              <TouchableOpacity style={styles.buttonContainer} onPress={() => this.signOutUser()}>
                <Text>Logout</Text>  
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
    backgroundColor: '#36485f',
    height: DEVICE_HEIGHT,
  },
  textBox: {
    marginTop: 10,
    alignItems: 'center',
    color: '#fff',
  },
  SelectImgButton: {
    backgroundColor: 'grey',
    margin: 10,
    padding: 10,
  },
  Image: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
  },
  SelectImage: {
    color: "#fff"
  },
  header: {
    backgroundColor: "#59cbbd",
    height: 150,
  },
  boxes: {
    marginTop: 10,
    alignItems: 'center',
    color: '#fff',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 106,
  },
  avatar2: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 105,
  },
  avatar3: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
    zIndex: 104,
  },
  lookingFor: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: '300',
  },
  body: {
    marginTop: 50,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 20,
    color: "white",
    fontWeight: "600"
  },
  info: {
    fontSize: 16,
    color: "#59cbbd",
    marginTop: 10,
    marginBottom: 50,
  },
  buttonContainer: {
    marginTop: 15,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#59cbbd",
  },
})


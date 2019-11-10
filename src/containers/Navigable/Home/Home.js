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
import {Avatar} from "react-native-elements"
import logo from "../../../assets/images/click_to_add.png";
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
var today = new Date();
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
      bdate: '1995-11-11',
      email: '',
      gender: '',
      netId: '',
      avatarSource: null,
      imageSource: null,
      pic: null,
      profPic: '',
      age: '',
      newPicked: false,
    }
  }
  state = {
    pic: logo,
  }
  componentDidMount() {
    //console.log('componentDidMount current uid: ', firebaseSDK.shared.uid)
    firebase
      .firestore().collection("users").doc(firebaseSDK.shared.uid)
      .onSnapshot((doc) => {
        //console.log('doc data:', doc.data())
        const data = doc.data()
        if(data!=undefined){
          this.setState({
            firstName: data.firstName,
            lastName: data.lastName,
            dates: data.dates,
            friends: data.friends,
            studybuddies: data.studybuddies,
            bdate: new Date(data.date),
            email: data.email,
            gender: data.gender,
            netId: data.netId,
            profPic: data.profPic,
            imageSource: data.profPic,
          })
          this.setState({age: today.getFullYear()-this.state.bdate.getFullYear()})
          if(today.getMonth()<(this.state.bdate.getMonth()) || (today.getMonth()===(this.state.bdate.getMonth())&&today.getDate()<=this.state.bdate.getDate())){
            this.setState({age: this.state.age-1})
          }
          this.setState({firstName: this.state.firstName.charAt(0).toUpperCase()+this.state.firstName.slice(1)})
          this.setState({lastName: this.state.lastName.charAt(0).toUpperCase()+this.state.lastName.slice(1)})
        }
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
          pic: response.data,
          newPicked: true,
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
         // console.log('File available at', downloadURL);

          firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
            profPic: downloadURL,
          }, { merge: true })
            .then(function () {
              //console.log('current uid: ', firebaseSDK.shared.uid);
              console.log("Document successfully written!");
              //console.log('current uid: ', firebaseSDK.shared.uid);
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
      this.setState({
          firstName: '',
          lastName: '',
          bdate: '',
          email: '',
          gender: '',
          netId: '',
          avatarSource: null,
          imageSource: null,
          pic: null,
          profPic: '',
          age: '',
          newPicked: false,
        })
        await firebase.auth().signOut();
        navigate('Login');
        console.log("User signed out")
    } catch (e) {
        console.log(e);
    }
}
  render() {
    const { photo } = this.state
    if(this.state.firstName==''){
      //console.log('componentDidMount current uid: ', firebaseSDK.shared.uid)
      firebase
        .firestore().collection("users").doc(firebaseSDK.shared.uid)
        .onSnapshot((doc) => {
          //console.log('doc data:', doc.data())
          const data = doc.data()
          if(data!=undefined){
            this.setState({
              firstName: data.firstName,
              lastName: data.lastName,
              dates: data.dates,
              friends: data.friends,
              studybuddies: data.studybuddies,
              bdate: new Date(data.date),
              email: data.email,
              gender: data.gender,
              netId: data.netId,
              profPic: data.profPic,
              imageSource: data.profPic,
            })
            this.setState({age: today.getFullYear()-this.state.bdate.getFullYear()})
            if(today.getMonth()<(this.state.bdate.getMonth()) || (today.getMonth()===(this.state.bdate.getMonth())&&today.getDate()<=this.state.bdate.getDate())){
              this.setState({age: this.state.age-1})
            }
            this.setState({firstName: this.state.firstName.charAt(0).toUpperCase()+this.state.firstName.slice(1)})
            this.setState({lastName: this.state.lastName.charAt(0).toUpperCase()+this.state.lastName.slice(1)})
          }
        })
    }
    // { () => this.onInitialize() }
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
        <View style={styles.header}><ImageBackground source={require('../../../assets/images/background-8.jpg')} style={{width: '100%',height:'100%' }}></ImageBackground></View>
        {(this.state.imageSource==null && !this.state.newPicked)&&(
          <Avatar style={styles.avatar3} rounded size={100} onPress={this.handleChoosePhoto} onEditPress={this.handleChoosePhoto} showEditButton={true} source={require('../../../assets/images/click_to_add.png')}></Avatar>
        )}
        {(this.state.imageSource!=null && !this.state.newPicked)&&(
        <Avatar style={styles.avatar3} rounded size={100} onPress={this.handleChoosePhoto} onEditPress={this.handleChoosePhoto} showEditButton={true} source={{uri: this.state.imageSource}}></Avatar>)}
        {(this.state.newPicked)&&(
        <Avatar style={styles.avatar3} rounded size={100} onPress={this.handleChoosePhoto} onEditPress={this.handleChoosePhoto} showEditButton={true} editButton={{underlayColor: '#fff'}} source={this.state.avatarSource}></Avatar>)}
        {/* {(this.state.imageSource==null && !this.state.newPicked)&&(
        <ImageBackground source={require('../../../assets/images/click_to_add.png')} borderRadius={63} style={styles.avatar3}>
          <TouchableOpacity style={styles.avatar2}
            onPress={this.handleChoosePhoto}>
          </TouchableOpacity>
        </ImageBackground>)}
        {(this.state.imageSource!=null && !this.state.newPicked)&&(
        <ImageBackground source={{uri: this.state.imageSource}} borderRadius={63} style={styles.avatar3}>
          <TouchableOpacity style={styles.avatar2}
            onPress={this.handleChoosePhoto}>
          </TouchableOpacity>
        </ImageBackground>)} */}
        {/* {(this.state.newPicked)&&(
        <ImageBackground source={this.state.avatarSource} borderRadius={63} style={styles.avatar3}>
          <TouchableOpacity style={styles.avatar2}
            onPress={this.handleChoosePhoto}>
          </TouchableOpacity>
        </ImageBackground>)} */}
        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.name}>{this.state.firstName} {this.state.lastName}, {this.state.age}</Text>
            <Text style={styles.info}>{this.state.email}</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => (this.props.navigation.navigate('Settings'))}>
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
    width: 10,
    height: 10,
    borderRadius: 63,
    borderWidth: 0,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 106,
  },
  avatar2: {
    width: 125,
    height: 125,
    borderRadius: 63,
    borderWidth: 0,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 105,
  },
  avatar3: {
    width: 130,
    height: 130,
    //borderRadius: 63,
    //borderWidth: 0,
    //borderColor: "white",
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 80,
    //zIndex: 104,
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


import React from 'react';
import ReactNativeSettingsPage, { 
	SectionRow, 
	NavigateRow,
	CheckRow
} from 'react-native-settings-page';
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
  import Dimensions from 'Dimensions';
import OptionsMenu from "react-native-options-menu";
import firebase from 'react-native-firebase';
import firebaseSDK from '../../../config/firebaseSDK';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const config = {
    apiKey: "AIzaSyDENbbwxSuy-wbYEZ5OzMO2RvVjpPPGu_k",
    authDomain: "socia-bull.firebaseio.com",
    storageBucket: "soica-bull.appspot.com",
  }
  firebase.initializeApp(config)
export default class Settings extends React.Component {

  static navigationOptions = () => ({
    title: 'Settings',
  });

	// TODO: implement your navigationOptions
	state = {
        dates: false,
        friends: false,
        studybuddies: false,
        college: "",
        major: "",
        men: false,
        women: false,
        other: false,
        loaded: false,
    }
    componentDidMount() {
        console.log('componentDidMount current uid: ', firebaseSDK.shared.uid)
        firebase
          .firestore().collection("users").doc(firebaseSDK.shared.uid)
          .onSnapshot((doc) => {
    
            console.log('doc data:', doc.data())
            const data = doc.data()
            this.setState({
              dates: data.dates,
              friends: data.friends,
              studybuddies: data.studybuddies,
              men: data.menPref,
              women: data.womenPref,
              other: data.otherPref,
              college: data.college,
              major: data.major,
            })
          })
      }
      _navigateToScreen = () => {
        const { navigation } = this.props.navigation.navigate('DeleteAccount');
      }
    CheckboxDates() {
        this.setState({ dates: !this.state.dates })
    
        firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
          dates: !this.state.dates,
        }, { merge: true })
          .then(function () {
            // console.log('current uid: ', firebaseSDK.shared.uid);
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
    
      CheckboxFriends() {
        this.setState({ friends: !this.state.friends })
    
        firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
          friends: !this.state.friends,
        }, { merge: true })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
    
      }
      CheckboxStudyBuddies() {
        this.setState({ studybuddies: !this.state.studybuddies })
    
        firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
          studybuddies: !this.state.studybuddies,
        }, { merge: true })
          .then(function () {
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      }
      CheckboxMen(){
        this.setState({men:!this.state.men})
    
        firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
          menPref: !this.state.men,
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
          womenPref: !this.state.women,
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
          otherPref: !this.state.other,
        }, { merge: true })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }
      onChangeCollege = (itemValue) =>{
        this.setState({college: itemValue})
        firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
          college: itemValue,
        }, { merge: true })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }
      onChangeMajor = (text) => {
        this.setState({major: text});
        firebase.firestore().collection("users").doc(firebaseSDK.shared.uid).set({
          major: text,
        }, { merge: true })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }
	render() {
		return (
			<ReactNativeSettingsPage>
				<SectionRow text='Preferences'>
					<CheckRow 
                        text='Search for Study Buddies'
                        iconName='book'
						_color='#000'
                        _value={this.state.studybuddies}
						_onValueChange={() => { this.CheckboxStudyBuddies() }} />
                    <CheckRow 
						text='Search for Friends'
						iconName='handshake-o'
						_color='#000'
						_value={this.state.friends}
						_onValueChange={() => { this.CheckboxFriends() }} />
                    <CheckRow 
						text='Search for Dates'
						iconName='heart'
						_color='#000'
						_value={this.state.dates}
						_onValueChange={() => { this.CheckboxDates() }} />
                    </SectionRow>
                    {(this.state.studybuddies) && <SectionRow text='Studying'>
                        <Picker
                        style={styles.picker}
                        selectedValue={this.state.college}
                        onValueChange={(itemValue, itemIndex) => (this.onChangeCollege(itemValue))}>
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
                      <TextInput
                        placeholder="Major"
                        placeholderTextColor='black'
                        autoCapitalize="none"
                        style={styles.textInput}
                        underlineColorAndroid={'transparent'}
                        defaultValue={this.state.major}
                        onChangeText={(text)=>this.onChangeMajor(text)}
                        maxLength={100}/></SectionRow>}
                    {(this.state.dates) && <SectionRow text="Dating">
                        <CheckRow 
                            text='Search for Men'
                            iconName='male'
						    _color='#000'
                            _value={this.state.men}
						    _onValueChange={() => { this.CheckboxMen() }} />
                        <CheckRow 
						    text='Search for Women'
						    iconName='female'
						    _color='#000'
						    _value={this.state.women}
						    _onValueChange={() => { this.CheckboxWomen() }} />
                        <CheckRow 
						    text='Search for Other'
						    iconName='transgender-alt'
						    _color='#000'
						    _value={this.state.other}
						    _onValueChange={() => { this.CheckboxOther() }} />
                        </SectionRow>}
               <SectionRow text="Account">
                 <NavigateRow text="Delete Account" 
                 iconName={'trash'}
                 onPressCallback={() => { this._navigateToScreen()}}/>
               </SectionRow>
			</ReactNativeSettingsPage>
		)
	}
}
const styles = StyleSheet.create({
    container: {
      backgroundColor:'#36485f',
    },
    textInput: {
      alignSelf: 'center',
      alignItems: 'center',
      marginBottom: 30,
      color: 'black',
      width: DEVICE_WIDTH-DEVICE_WIDTH*0.135,
      borderBottomColor: 'black',
      borderBottomWidth: 1
    },
    picker: {
      width: DEVICE_WIDTH-DEVICE_WIDTH*0.1,
      color: 'black',
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
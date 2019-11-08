import React from 'react';
import { StyleSheet, Text, TextInput, View, Picker, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import firebase from 'react-native-firebase';
const date = new Date().getDate();
const month = new Date().getMonth()+1;
const year = new Date().getFullYear()-18;
const max = year+"-"+month+"-"+date;
export default class SignUpForm extends React.Component {
  state = { firstName: '', lastName: '', email: '', date: '', gender: '', password: '', showLoading: false, errorMessage: null }
  handleSignUp = () => {
    const {
      firstName,
      lastName,
      email,
      date,
      gender,
      password
    } = this.state
    this.setState({showLoading: true})

    var domain = email.replace(/.*@/, "").toLowerCase()
    //console.log("user domain: " + domain)

    if(firstName == '' && lastName == '' && email == '' && date == '' && gender=='' && password==''){
      this.setState({ showLoading: false, errorMessage: "All fields empty"})
      return 0
    }

    if(gender==''){
      this.setState({ showLoading: false, errorMessage: "Please pick a gender"})
      return 0
    }

    if(domain !== 'mail.usf.edu') {
      this.setState({ showLoading: false, errorMessage: "Please use your USF Email." })
      return 0
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((cred) => {
        // Add user to collection
        console.log('cred user uid: ', cred.user.uid)
        firebase.firestore().collection("users").doc(cred.user.uid).set({
          firstName,
          lastName,
          email,
          date,
          gender,
          netId: email.substring(0, email.indexOf("@")),
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        })
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function(){
          console.log("email verification sent to user");
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
    
          console.log(errorCode, errorMessage);
        })
        //this.doSendEmailVerification();
        this.props.navigation.navigate('Login')
      })
      .catch(error => this.setState({ showLoading: false, errorMessage: error.message }))
	}
  render() {
    const { showLoading } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="First Name"
          placeholderTextColor='#fff'
          autoCapitalize="none"
          maxLength={30}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor='#fff'
          autoCapitalize="none"
          maxLength={30}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        
        <DatePicker
          style={styles.datePicker}
          date={this.state.date}
          mode="date"
          placeholder="Birthdate"
          format="YYYY-MM-DD"
          minDate="1900-01-01"
          maxDate={max}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0,
            marginBottom: 30,
          },
          dateInput: {
            marginLeft: 20,
            borderWidth: 0,
          },
          dateText:{
            color: '#fff',
            justifyContent: 'flex-start'
          }
          }}
          onDateChange={date => this.setState({ date })}
        />

        <Picker
		      style={styles.genderPicker}
		      selectedValue={this.state.gender}
		      onValueChange={(itemValue,itemIndex) => this.setState({gender:itemValue})}>
		      <Picker.Item label="Gender" value=""/>
		      <Picker.Item label="Male" value="male" />
		      <Picker.Item label="Female" value="female"/>
          <Picker.Item label="Other" value="other"/>
		    </Picker>
        
        <TextInput
          placeholder="Email"
          placeholderTextColor='#fff'
          autoCapitalize="none"
          maxLength={100}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          placeholderTextColor='#fff'
          autoCapitalize="none"
          maxLength={30}
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button
          title="Sign Up"
          type="solid"
          loading={showLoading}
          buttonStyle={styles.button}
          onPress={this.handleSignUp}
          >
        </Button>
        <Text style={styles.signupText} onPress={() => this.props.navigation.navigate('Login')}>Already have an account? Login</Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  genderPicker: {
    width: '106%',
    color: '#fff',
    padding: 0,
    //height: 60,
    //marginRight: 36,
    marginBottom: 10,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  datePicker: {
    alignSelf: 'stretch',
    width: 270,
    padding: 0,
    marginRight: 36,
    marginBottom: 25,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  text: {
    alignSelf: 'stretch',
    height: 40,
    color: '#fff',
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
    marginBottom: 30
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
})
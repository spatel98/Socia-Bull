import React from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'

import { Button } from 'react-native-elements';

export default class SignUpForm extends React.Component {
	state = { firstName: '', lastName: '', phoneNumber: '', email: '', password: '', showLoading: false, errorMessage: null }
	
	handleSignUp = () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password
    } = this.state
    this.setState({showLoading: true})

    var domain = email.replace(/.*@/, "").toLowerCase()
    console.log("user domain: " + domain)
    if(domain !== 'mail.usf.edu') {
      this.setState({ showLoading: false, errorMessage: "Please use your USF Email." })
      return 0
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        // Add user to collection
        console.log('user after sign up:', user)
        firebase.firestore().collection("users").doc(user.uid).set({
          firstName,
          lastName,
          phoneNumber,
          email,
          netId: email.substring(0, email.indexOf("@")),
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
        this.props.navigation.navigate('NavigationBar')
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
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={firstName => this.setState({ firstName })}
          value={this.state.firstName}
        />
        <TextInput
          placeholder="Last Name"
          placeholderTextColor='#fff'
          autoCapitalize="none"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={lastName => this.setState({ lastName })}
          value={this.state.lastName}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor='#fff'
          autoCapitalize="none"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={phoneNumber => this.setState({ phoneNumber })}
          value={this.state.phoneNumber}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor='#fff'
          autoCapitalize="none"
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
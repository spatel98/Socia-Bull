import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import firebase from 'react-native-firebase'
import { Button } from 'react-native-elements';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import UserInput from './UserInput';
import usernameImg from '../../assets/images/username.png';
import passwordImg from '../../assets/images/password.png';
export default class Form extends React.Component {
    constructor() {
      super();
      this.state = {
        showPass: true,
        press: false,
        email: "",
        password: "",
        errorMessage: null,
        showLoading: false,
        sentEmail: false,
        otherError: false,
      };
    }
    finalizeLogin = () => {
      if(!this.state.otherError){
        var user = firebase.auth().currentUser;
        if(this.state.otherError==false){
        if (firebase.auth().currentUser.emailVerified) {
          this.props.navigation.navigate('NavigationBar')
          setTimeout(() => { this.setState({ showLoading: false }) }, 2000);
        }
        else {
          if (this.state.sentEmail) {
            this.setState({ errorMessage: 'A second verification email has already been sent! If you do not see it, please check your spam folder. If you have already clicked the link, please wait a minute before attempting again.' });
            this.setState({ showLoading: false })
          }
          else {
            user.sendEmailVerification().then(function () {
              console.log("email verification sent to user");
            })
            this.setState({ errorMessage: "Email not verified. A new verification email has been sent!" });
            this.setState({ showLoading: false })
            this.setState({ sentEmail: true })
          }
        }
      }
      }
    }
    showPass = () => {
      this.state.press === false
        ? this.setState({showPass: false, press: true})
        : this.setState({showPass: true, press: false});
    }

    handleLogin = () => {
      const { email, password } = this.state

      this.setState({showLoading: true})
      this.setState({otherError: false})
      if(email == '' && password==''){
        this.setState({ showLoading: false, errorMessage: "All fields empty"})
        return 0
      }
      if(email==''){
        this.setState({ showLoading: false, errorMessage: "Please enter email"})
        return 0
      }
      if(password==''){
        this.setState({ showLoading: false, errorMessage: "Please enter password"})
        return 0
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .catch(error => this.setState({ otherError: true, showLoading: false, errorMessage: error.message}))
        .then(()=>{this.finalizeLogin()})
        // .then(() => this.props.navigation.navigate('ChatForm', {
        //   name: this.state.name,
        //   email: this.state.email
        // }))
    }

    handleTextChange1 = (email) => {
      this.state.email = email;
    }
    
    handleTextChange2 = (password) => {
      this.state.password = password;
    }

    render() {
      const { showLoading } = this.state
      return (
        <View style={styles.formContainer}>
          {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
          <UserInput
            source={usernameImg}
            placeholder="Email"
            autoCapitalize={'none'}
            returnKeyType={'done'}
            autoCorrect={false}
            onChangeText={this.handleTextChange1}
          />
          <UserInput
            source={passwordImg}
            secureTextEntry={this.state.showPass}
            placeholder="Password"
            returnKeyType={'done'}
            autoCapitalize={'none'}
            autoCorrect={false}
            showPass={this.showPass}
            onChangeText={this.handleTextChange2}
          />

          <Button
            title="Login"
            type="solid"
            loading={showLoading}
            buttonStyle={styles.button}
            onPress={this.handleLogin}
            >
          </Button>
          
          <Text style={styles.signupText} onPress={() => this.props.navigation.navigate('SignUp')}>Create Account</Text>
          <Text style={styles.signupText} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
        </View>
      );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	formContainer: {
    flex: 0.1,
    alignSelf: 'stretch',
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 30,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
    marginBottom: 40
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
  signupText: {
    color: 'white',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 20
  },
});
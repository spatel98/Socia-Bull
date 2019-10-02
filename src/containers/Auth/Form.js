import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebase from 'react-native-firebase'
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
//import ButtonSubmit from './ButtonSubmit';
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
        errorMessage: null
      };
    }
  
    showPass = () => {
      this.state.press === false
        ? this.setState({showPass: false, press: true})
        : this.setState({showPass: true, press: false});
    }

    handleLogin = () => {
      const { email, password } = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Home'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }

    handleTextChange1 = (email) => {
      this.state.email = email;
    }
    
    handleTextChange2 = (password) => {
      this.state.password = password;
    }

    render() {
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
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.btntext}>Login</Text>
          </TouchableOpacity>
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
    flex: 1,
    //alignItems: 'center',
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
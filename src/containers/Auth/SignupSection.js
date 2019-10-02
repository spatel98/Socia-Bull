import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class SignupSection extends React.Component {
    render() {
      return (
        <View style={styles.signupContainer}>
          <Text style={styles.signupText} onPress={() => this.props.navigation.navigate('SignUp')}>Create Account</Text>
          <Text style={styles.signupText} onPress={() => this.props.navigation.navigate('ForgotPassword')}>Forgot Password?</Text>
        </View>
      );
    }
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  signupContainer: {
    flex: 2,
    top: 10,
    width: DEVICE_WIDTH,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  signupText: {
    color: 'white',
    backgroundColor: 'transparent',
  },
});
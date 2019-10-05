import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  StyleSheet,
  View,
} from 'react-native';

import Logo from './Logo'
import Form from './Form'

export default class LoginScreen extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Logo />
          <Form navigation={this.props.navigation}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
})
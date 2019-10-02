import React, {Component} from 'react';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  StyleSheet,
  View,
} from 'react-native';

//import Wallpaper from './Wallpaper'
import Logo from './Logo'
import Form from './Form'
//import SignupSection from './SignupSection'

export default class LoginScreen extends React.Component {
  render(){
    return(
      <View style={styles.container}>
        <Logo />
        <Form navigation={this.props.navigation}/>
      </View>
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

/*
<KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <Wallpaper>
          <Logo />
          <Form navigation={this.props.navigation}/>
          <SignupSection navigation={this.props.navigation}/>
        </Wallpaper>
      </KeyboardAwareScrollView>
*/


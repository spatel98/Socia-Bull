import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';

import Logo from './Logo'
import Form from './Form'
import Dimensions from 'Dimensions';
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
export default class LoginScreen extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container2}>
        <ImageBackground source={require('../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
        <View style={styles.container}>
          <Logo />
          <Form navigation={this.props.navigation}/>
        </View>
        </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 60,
    paddingRight: 60,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 0,
  },
})
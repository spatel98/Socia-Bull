import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
export default class Home extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <Text>Home</Text>
      </KeyboardAwareScrollView>
    );
  }
}


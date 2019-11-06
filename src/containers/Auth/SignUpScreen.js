import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, ImageBackground } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SignUpForm from './SignUpForm'

export default class SignUp extends React.Component {
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container2}>
        <ImageBackground source={require('../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
        <View style={styles.container}>
          <SignUpForm navigation={this.props.navigation}></SignUpForm>
        </View>
        </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    )
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
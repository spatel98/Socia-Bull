import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import SignUpForm from './SignUpForm'

export default class SignUp extends React.Component {
  render() {
    return (
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <SignUpForm navigation={this.props.navigation}></SignUpForm>
        </View>
      </KeyboardAwareScrollView>
    )
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
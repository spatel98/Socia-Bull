import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'

import SignUpForm from './SignUpForm'

export default class SignUp extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SignUpForm navigation={this.props.navigation}></SignUpForm>
      </View>
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
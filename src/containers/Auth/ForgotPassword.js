import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import firebase from 'react-native-firebase'

import { Button } from 'react-native-elements';

export default class SignUpForm extends React.Component {
	state = { email: '', showLoading: false, errorMessage: null }
	
	handleForgotPassword = () => {

    this.setState({showLoading: true})

    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('NavigationBar'))
      .catch(error => this.setState({ errorMessage: error.message }))
	}
	
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Forgot Password</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          placeholderTextColor='#fff'
          autoCapitalize="none"
          style={styles.textInput}
          underlineColorAndroid={'transparent'}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <Button
          title="Verify"
          type="solid"
          loading={this.state.showLoading}
          buttonStyle={styles.button}
          onPress={this.handleForgotPassword}
        >
        </Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: '#fff',
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
    marginBottom: 30
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
})
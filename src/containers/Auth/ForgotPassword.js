import React from 'react'
import { StyleSheet, Text, TextInput, View, ImageBackground } from 'react-native'
import firebase from 'react-native-firebase'

import { Button } from 'react-native-elements';

export default class SignUpForm extends React.Component {
	state = { email: '', showLoading: false, errorMessage: null }
  
  static navigationOptions = ({ navigation }) => ({
    headerTintColor: '#fff',
    headerStyle: {
      backgroundColor: '#005e48'
      //backgroundColor: '#59cbbd'
    },
    // headerTitleStyle: {
    //   color: '#fff'
    // }
  });

	handleForgotPassword = () => {

    this.setState({showLoading: true})

    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(() => {
        alert("Please check your email!!!")
        this.props.navigation.navigate('Login')})
      .catch(error => this.setState({ errorMessage: error.message }))
	}
	
  render() {
    return (

      <View>
        <ImageBackground source={require('../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
 
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
      </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff00',
    paddingLeft: 60,
    paddingRight: 60,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
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
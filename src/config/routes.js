import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../containers/Home/Home'
import LoginScreen from '../containers/Auth/LoginScreen'
import SignUpScreen from '../containers/Auth/SignUpScreen'
import ForgotPassword from '../containers/Auth/ForgotPassword'
import Loading from '../containers/Auth/Loading'


const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
      animation: 'fade',
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null,
      },
    },
    ForgotPassword: {
      screen: ForgotPassword,
      navigationOptions: {
        header: null,
      },
    },
    Loading: {
      screen: Loading,
      navigationOptions: {
        header: null,
      },
    }
  },
  {
    initialRouteName: 'Loading',
  }
)

export default createAppContainer(AppNavigator)

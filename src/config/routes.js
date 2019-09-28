import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Home from '../containers/Home/Home'
import LoginScreen from '../containers/Auth/LoginScreen'


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
    }
  },
  {
    initialRouteName: 'Login',
  }
)

export default createAppContainer(AppNavigator)

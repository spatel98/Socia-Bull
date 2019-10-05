import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import NavigationBar from '../containers/Navigable/Navigation'
import Chats from '../containers/Navigable/Chats/Chats'
import Search from '../containers/Navigable/Search/Search'
import Home from '../containers/Navigable/Home/Home'
import LoginScreen from '../containers/Auth/LoginScreen'


const AppNavigator = createStackNavigator(
  {
    NavigationBar:{
      screen: NavigationBar,
      navigationOptions:{
        header: null,
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        header: null,
      },
    },
    Search: {
      screen: Search,
      navigationOptions: {
        header: null,
      },
    },
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

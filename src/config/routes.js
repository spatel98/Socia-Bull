import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import NavigationBar from '../containers/Navigable/Navigation'
import Chats from '../containers/Navigable/Chats/Chats'
import ChatForm from '../containers/Navigable/Chats/ChatForm'
import Search from '../containers/Navigable/Search/Search'
import Home from '../containers/Navigable/Home/Home'
import LoginScreen from '../containers/Auth/LoginScreen'
import SignUpScreen from '../containers/Auth/SignUpScreen'
import ForgotPassword from '../containers/Auth/ForgotPassword'
import Loading from '../containers/Auth/Loading'
import Settings from '../containers/Navigable/Home/Settings'


const AppNavigator = createStackNavigator(
  {
    NavigationBar:{
      screen: NavigationBar,
      navigationOptions:{
        header: null,
      },
    },
    Settings: {
      screen: Settings,
      navigationOptions:{
        
      },
      // navigationOption: () => ({
      //   title: 'A',
      //   headerMode: screen,
      //   headerTitleStyle :{color: '#000',textAlign: 'center',alignSelf:'center'},
      //   headerBackTitle: null,
      // }),
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        header: null,
      },
    },
    ChatForm: {
      screen: ChatForm,
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

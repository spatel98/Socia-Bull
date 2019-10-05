import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
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
import Home from './Home/Home'
import Search from './Search/Search'
import Chats from './Chats/Chats'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
class HomeScreen extends Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <Home/>
      </KeyboardAwareScrollView>
    );
  }
}
class ChatsScreen extends Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <Chats/>
      </KeyboardAwareScrollView>
    );
  }
}
class SearchScreen extends Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <Search/>
      </KeyboardAwareScrollView>
    );
  }
}
export default createMaterialBottomTabNavigator({
  Home:{screen:HomeScreen,
    navigationOptions:{
      tabBarLabel:'Home',
      tabBarIcon:({tintColor})=>(
        <Icon name='home' color={tintColor} size={24}/>
      )
    }},
  Search:{screen:SearchScreen,
    navigationOptions:{
      tabBarLabel:'Search',
      tabBarIcon:({tintColor})=>(
        <Icon name='heart' color={tintColor} size={24}/>
      )
    }},
  Chats:{screen:ChatsScreen,
    navigationOptions:{
      tabBarLabel:'Chats',
      tabBarIcon:({tintColor})=>(
        <Icon name='chat' color={tintColor} size={24}/>
      )
    }},
},
{
  initialRouteName: 'Home',
  order: ['Home','Search','Chats'],
  activeTintColor: 'white',
  barStyle: {backgroundColor: 'grey'},
})
import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NavigationChats from './NavChats'

export default class Chats extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <NavigationChats />
      </KeyboardAwareScrollView>
    );
  }
}


import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NavigationHome from './NavHome'

export default class Home extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <NavigationHome />
      </KeyboardAwareScrollView>
    );
  }
}


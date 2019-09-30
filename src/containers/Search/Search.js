import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import NavigationSearch from './NavSearch'

export default class Search extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
          <NavigationSearch />
      </KeyboardAwareScrollView>
    );
  }
}


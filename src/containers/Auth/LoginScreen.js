import React, {Component} from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Wallpaper from './Wallpaper'
import Logo from './Logo'
import Form from './Form'
import SignupSection from './SignupSection'
import ButtonSubmit from './ButtonSubmit'

export default class LoginScreen extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <Wallpaper>
          <Logo />
          <Form />
          <ButtonSubmit navigation={this.props.navigation} />
          <SignupSection />
        </Wallpaper>
      </KeyboardAwareScrollView>
    );
  }
}


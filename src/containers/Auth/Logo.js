import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

import logoImg from '../../assets/images/logo.png';

export default class Logo extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Image source={logoImg} style={styles.image} />
          <Text style={styles.text}>STUDENT DISCOUNTS</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
    	flex: 3,
    	alignItems: 'center',
    	justifyContent: 'center',
    },
    image: {
    	width: 80,
    	height: 80,
    },
    text: {
    	color: 'white',
    	fontWeight: 'bold',
    	backgroundColor: 'transparent',
    	marginTop: 20,
    },
});
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import navBar from '../../assets/images/navigation-bar-search.png';
const DEVICE_WIDTH = Dimensions.get('window').width;

export default class NavSearch extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Image source={navBar} style={styles.image} />
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
    	flex: 0,
    	alignItems: 'center',
    	justifyContent: 'center',
    },
    image: {
    	width: DEVICE_WIDTH,
    	height: (DEVICE_WIDTH/300)*30,
    },
    text: {
    	color: 'white',
    	fontWeight: 'bold',
    	backgroundColor: 'transparent',
    	marginTop: 20,
    },
});
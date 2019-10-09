import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import logoImg from '../../assets/images/logo.png';

export default class Logo extends React.Component {
    render() {
      return (
        <View style={styles.container}>
          <Image source={logoImg} style={styles.image} />
          <Text style={styles.text}>SOCI-A-BULL</Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    container: {
    	flex: 1.5,
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
    },
});
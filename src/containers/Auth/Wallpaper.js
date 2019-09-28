import React, {Component} from 'react';
import {
  StyleSheet,
  ImageBackground,
} from 'react-native';

import wallpaper from '../../assets/images/wallpaper.png';

export default class Wallpaper extends React.Component {
    render() {
      return (
        <ImageBackground style={styles.picture} source={wallpaper}>
          {this.props.children}
        </ImageBackground>
      );
    }
}

const styles = StyleSheet.create({
    picture: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
    },
});
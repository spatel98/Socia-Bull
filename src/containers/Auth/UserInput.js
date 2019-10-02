import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
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

import eyeImg from '../../assets/images/eye_black.png';

export default UserInput = (props) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={props.autoCorrect}
        autoCapitalize={props.autoCapitalize}
        returnKeyType={props.returnKeyType}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        onChangeText={props.onChangeText}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.btnEye}
        onPress={props.showPass}>
        {(props.placeholder === 'Password') && <Image source={eyeImg} style={styles.iconEye} />}
      </TouchableOpacity>
    </View>
  );
}

UserInput.propTypes = {
source: PropTypes.number.isRequired,
placeholder: PropTypes.string.isRequired,
secureTextEntry: PropTypes.bool,
autoCorrect: PropTypes.bool,
autoCapitalize: PropTypes.string,
returnKeyType: PropTypes.string,
};

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
    inlineImg: {
      position: 'absolute',
      zIndex: 99,
      width: 22,
      height: 22,
      left: 35,
      top: 9,
    },
    inputWrapper: {
      flex: 1,
      alignSelf: 'stretch',
    },
    input: {
      alignSelf: 'stretch',
      height: 40,
      marginBottom: 20,
      color: '#fff',
      borderBottomColor: '#f8f8f8',
      borderBottomWidth: 1
    },
    btnEye: {
      position: 'absolute',
      zIndex: 99,
      width: 22,
      height: 22,
      right: 10,
      top: 8,
    },
    iconEye: {
      width: 25,
      height: 25,
      tintColor: 'rgba(255,255,255,0.2)',
    },
});

/*

*/
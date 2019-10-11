import React, {Component} from 'react';
import Dimensions from 'Dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableOpacity,
    TextInput,
  } from 'react-native';
  import ButtonUploadPic from "./ButtonUploadPic";
  import ButtonTakePic from "./ButtonTakePic";
export default class Home extends React.Component {
  render(){
    return(
      <KeyboardAwareScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Image style={styles.Image}
            source={require('../../../assets/images/logo.png')}/>
            <Text style={styles.Name}>FIRST NAME</Text>
          <ButtonUploadPic style={styles.ButtonUploadPic}/>
          <ButtonTakePic style={styles.ButtonTakePic}/>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    top: 50,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  Image: {
    width: 200,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
  },
  Name: {
    top: 150,
    fontSize: 16,
    justifyContent: 'center'
  },
})


import React, {Component} from 'react';
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

import Swiper from 'react-native-deck-swiper'
import { element } from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    alignContent: "center",
    alignItems: 'center',
    padding: 5
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white",
    alignContent: "center",
    alignItems: 'center',
    padding: 25
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "transparent"
  },
  smalltext: {
    textAlign: "center",
    fontSize: 15,
    backgroundColor: "transparent"
  },
  imagestyle: {
    width: 220,
    height: 220,
    alignContent: "center"
  }
});

const people = [
  {
    name: 'Brynn',
    photo: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    username: 'brynn@mail.usf.edu',
    classes: ["Calculus I", "Biology I", "Intro to Architecture"],
  },
  {
    name: 'Mario',
    photo: 'http://www.newdesignfile.com/postpic/2015/02/mario-128x128-icon_245367.png',
    username: 'MarioMario@mail.usf.edu',
    classes: ["Calculus II", "Chemistry I", "Intro to Architecture"],
  },
  {
    name: 'Jeff',
    photo: 'https://findicons.com/files/icons/1606/128x128_icons_6/128/apple.png',
    username: 'Jeff@mail.usf.edu',
    classes: ["Calculus III", "Biology II", "Intro to Humanities"],
  }
  ]

export default class Search extends React.Component {
  
  renderClassNames(card) {
    return card['classes'].map((item, index) => <Text key={index} style={styles.smalltext}>{item}</Text>);
}



  render(){
    return(
      <View style={styles.container}>
      <Swiper
          cards={people}
          verticalSwipe={false}
          infinite={true}
          renderCard={(card) => {
              return (
                  <View style={styles.card}>
                    <Image
                      style={styles.imagestyle}
                      resizeMode="cover"
                      source={{uri: card['photo']}}
                    />
                      <Text style={styles.text}>{card['name']}</Text>
                      <Text style={{fontSize: 18}}>Classes in Common</Text>
                      {this.renderClassNames(card)}
                  </View>
              )
          }}
          
          onSwiped={(cardIndex) => {console.log(cardIndex)}}
          onSwipedAll={() => {console.log('onSwipedAll')}}
          cardIndex={0}
          backgroundColor={'#4FD0E9'}
          stackSize= {3}>
         
      </Swiper>
  </View>
    );
  }
}


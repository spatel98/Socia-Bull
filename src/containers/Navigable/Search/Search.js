import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firebaseSDK from '../../../config/firebaseSDK';
import firebase from 'react-native-firebase';
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
    alignContent: "center",
    alignItems: 'center',
    padding: 5
  },
  card: {

    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "#36485f",// card color background
    alignContent: "center",
    alignItems: 'center',
    padding: 25,
    width: 'auto',
    height: 575
  },
  text: {
    textAlign: "center",
    fontSize: 25,
    backgroundColor: "transparent",
    color: 'white'
  },
  smalltext: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "transparent",
    color: 'white'
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
    level: 'Sophomore',
    classes: ["Calculus I", "Biology I", "Intro to Architecture", "Intro to Film"],
  },
  {
    name: 'Mario',
    photo: 'http://www.newdesignfile.com/postpic/2015/02/mario-128x128-icon_245367.png',
    username: 'MarioMario@mail.usf.edu',
    level: 'Freshman',
    classes: ["Calculus II", "Chemistry I", "Intro to Architecture"],
  },
  {
    name: 'Jeff',
    photo: 'https://findicons.com/files/icons/1606/128x128_icons_6/128/apple.png',
    username: 'Jeff@mail.usf.edu',
    level: 'Senior',
    classes: ["Calculus III", "Biology II", "Intro to Humanities"],
  },
  {
    name: 'Mike',
    photo: 'https://globalhealth.washington.edu/sites/default/files/styles/faculty/public/faculty/Jeffrey%20Lane-web.jpg',
    username: 'Mike@mail.usf.edu',
    level: 'Senior',
    classes: ["Calculus I", "Intro to Architecture", "Intro to Humanities", "Foundations of Engineering"],
  }
]

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      college: '',
    }
  }

  componentDidMount() {
    console.log('componentDidMount current uid: ', firebaseSDK.shared.uid)
    firebase
      .firestore().collection("users").doc(firebaseSDK.shared.uid)
      .onSnapshot((doc) => {
        console.log('doc data:', doc.data())
        const data = doc.data()
        if(data!=undefined){
          this.setState({
            firstName: data.college,
          })
        }
        console.log('current uid: ', firebaseSDK.shared.uid)
      })

    var query= firebase.firestore().collection("users").where("college", "==", this.state.college)
    console.log("query: ", query)
  }
  
  renderClassNames(card) {
    return card['classes'].map((item, index) => <Text key={index} style={styles.smalltext}>{item}</Text>);
  }

  render() {
    return (
      <View style={styles.container}>
        <Swiper
          cards={people}
          verticalSwipe={false}
          infinite={true}
          cardVerticalMargin={60}
          renderCard={(card) => {
            return (
              <View style={styles.card}>
                <Image
                  style={styles.imagestyle}
                  resizeMode="cover"
                  source={{ uri: card['photo'] }}
                />
                <Text style={styles.text}>{card['name']}</Text>
                <Text style={{ fontSize: 22, padding: 5, color: 'white' }}>{card['level']}</Text>
                <Text style={{ fontSize: 21, padding: 5, color: 'white' }}>Classes in Common</Text>
                {this.renderClassNames(card)}
              </View>
            )
          }}

          onSwiped={(cardIndex) => { console.log(cardIndex) }}
          onSwipedAll={() => { console.log('onSwipedAll') }}
          cardIndex={0}
          backgroundColor={'#59cbbd'}
          showSecondCard={true}
          stackSize={3}>

        </Swiper>
      </View>
    );
  }
}


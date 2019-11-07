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
  ActivityIndicator
} from 'react-native';

import _ from 'lodash'

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
      swipedOn: [],
      cards:[],
      userID: '',
      cardIndex: 0,
      ids:[],
      ignore:[],
      addedIds: [],
      studybuddies: false,
      womenPref: false,
      loading: true,
      noCards: false,
      dates: false,
      friends: false,
      
    }
  }

  //Call these functions in component.update after setting doUpdate true in component unmount

  componentDidMount() {
    console.log('componentDidMount current uid: ', firebaseSDK.shared.uid)
    firebase
      .firestore().collection("users").doc(firebaseSDK.shared.uid)
      .onSnapshot((doc) => {
        console.log('doc data:', doc.data())
        const data = doc.data()
        this.setState({
          college: data.college,
          swipedOn: _.toArray(data.swipedOn),
          matches: _.toArray(data.matches),
          ignore: _.toArray(data.ignore),
          studybuddies: data.studybuddies,
          dates: data.dates,
          friends: data.friends,
          userID: doc.id,
          addedIds: [],
          
        })
        console.log('current uid: ', firebaseSDK.shared.uid)
      })
        
  //  if(this.state.studybuddies)
   /* {
    firebase.firestore().collection('users').where("college", "==", this.state.college)
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

          if(doc.exists)
          {
            tester = (doc.data.swipedOn != null ? !doc.data.swipedOn.includes(this.state.userID) : true)
            if(doc.id != firebaseSDK.shared.uid && !this.state.matches.includes(doc.id) && !this.state.ignore.includes(doc.id) && tester && !this.state.addedIds.includes(doc.id))
            {
            temp = doc.data()
            temp.id = doc.id
            this.state.cards.push(temp)
            this.state.addedIds.push(temp.id)
            this.setState({cards: this.state.cards})
            }
          }
        });
  
    })
  }
*/


 // if(this.state.dates)
  //{
    firebase.firestore().collection('users')
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

          if(doc.exists)
          {
            tester = (doc.data.swipedOn != null ? !doc.data.swipedOn.includes(this.state.userID) : true)
            if(doc.id != firebaseSDK.shared.uid && !this.state.matches.includes(doc.id) && !this.state.ignore.includes(doc.id) && tester && !this.state.addedIds.includes(doc.id))
            {
            temp = doc.data()
            temp.id = doc.id
            this.state.cards.push(temp)
            this.state.addedIds.push(temp.id)
            this.setState({cards: this.state.cards})
            }
          }
        });
  
    })
  //}
/*
  if(this.state.friends)
  {
    firebase.firestore().collection('users').where("friends", "==", true)
      .get().then(querySnapshot => {
        querySnapshot.forEach(doc => {

          if(doc.exists)
          {
            tester = (doc.data.swipedOn != null ? !doc.data.swipedOn.includes(this.state.userID) : true)
            if(doc.id != firebaseSDK.shared.uid && !this.state.matches.includes(doc.id) && !this.state.ignore.includes(doc.id) && tester && !this.state.addedIds.includes(doc.id))
            {
            temp = doc.data()
            temp.id = doc.id
            this.state.cards.push(temp)
            this.state.addedIds.push(temp.id)
            this.setState({cards: this.state.cards})
            }
          }
        });
  
    })
  }*/

    this.setState({loading: false})
  }
  /*
  renderClassNames(card) {
    return card['classes'].map((item, index) => <Text key={index} style={styles.smalltext}>{item}</Text>);
  }
  */
 getLength = (arr) =>{
  return Object.keys(arr).length;
}

  onSwipeLeft = (cardIndex) =>{

    tempc = this.state.cards[cardIndex]

    if(tempc == null)
      return

    if(tempc.id == null)
      return

    temp = tempc.id

    this.state.ignore.push(temp)

    firebase.firestore().collection('users').doc(this.state.userID).set({
      ignore: firebase.firestore.FieldValue.arrayUnion(temp)
    }, { merge: true })
  }

  onSwipeRight = (cardIndex) =>{

    card = this.state.cards[cardIndex]

    if(card == null)
      return

    console.log(card.id)
    
    if(card.id == null)
      return
   
      // if this person swiped on me and i swiped on them afterwards
    if(this.state.swipedOn.includes(card.id))
    {
      firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).set({
        matches: firebase.firestore.FieldValue.arrayUnion(card.id),
        swipedOn: firebase.firestore.FieldValue.arrayRemove(card.id)
      }, { merge: true })

      firebase.firestore().collection('users').doc(card.id).set({
        matches: firebase.firestore.FieldValue.arrayUnion(this.state.userID)
      }, { merge: true })
    }
    else
    {
      // else add my id to their swiped values using userID since it is the same as firebaseSDK.shared.uid but it fixed a bug
      firebase.firestore().collection('users').doc(card.id).set({
        swipedOn: firebase.firestore.FieldValue.arrayUnion(this.state.userID)
      }, { merge: true })
    }
    
  }

  render() {

   if(this.state.loading)
   return(
   <View style={styles.container}>
     <ActivityIndicator size="large" animating={this.state.loading}/>
   </View>)

   if(this.state.cards.length <= 0 || this.state.noCards)
   return(
    <View style={styles.container}>
    <Text>Please come back later for more matches</Text>
    <Text>{this.state.cards.length}</Text>
  </View>)
   

      return (
      <View style={styles.container}>
        
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          verticalSwipe={false}
          infinite={false}
          cardVerticalMargin={60}
          showSecondCard={false}
          renderCard={(card) => {

            if(card == null)
              return ( 
              <View style={styles.card}>
                <Text>
                  Please come back for more
                </Text>
              </View>)
            
          return (
              <View style={styles.card}>
                <Image
                  style={styles.imagestyle}
                  resizeMode="cover"
                  source={card.profPic == null ? {uri: 'https://gix.uw.edu/wp-content/uploads/2019/01/photo-placeholder.jpeg' } : {uri: card.profPic}}
                />

                <Text style={styles.text}>{card['firstName']}</Text>
                <Text style={styles.text}>{card.college}</Text>
                <Text style={{ fontSize: 22, padding: 5, color: 'white' }}>{card.id}</Text>
               
                <Text style={{ fontSize: 21, padding: 5, color: 'white' }}>Seeking</Text>
                <Text style={{ fontSize: 20, padding: 5, color: 'white' }}>{card.dates && this.state.dates ? 'Dates ': ''}{card.friends && this.state.friends ? 'Friends ': ''}{card.studybuddies && this.state.studybuddies ? 'Study Buddy': ''}</Text>
                
           

              </View>
            )
          }}

          onSwiped={(cardIndex) => { console.log(cardIndex) }}
          onSwipedLeft={(cardIndex) => this.onSwipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => this.onSwipeRight(cardIndex)}
          onSwipedAll={() => { this.setState({noCards: true}) }}
          backgroundColor={'#59cbbd'}
          showSecondCard={true}
          stackSize={3}>

        </Swiper>
      </View>
    );
  }
}


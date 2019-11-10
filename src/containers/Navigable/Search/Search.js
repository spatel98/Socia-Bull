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
import { Overlay } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    alignItems: 'center',
    borderColor: '#ffffff00'
  },
  roundSquare: {
    width: 240,
    height: 160,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 4,
    borderColor: 'gray',
    borderWidth: 2
  },

  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  deadCenter:{
    backgroundColor: 'blue',
    position: 'absolute', 
    top: 0, left: 0, 
    right: 0, bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  card: {

    borderRadius: 32,
    borderWidth: 3,
    borderColor: "#E8E8E8",
    backgroundColor: "white",// card color background
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
    color: 'black'
  },
  smalltext: {
    textAlign: "center",
    fontSize: 17,
    backgroundColor: "transparent",
    color: 'black'
  },
  imagestyle: {
    width: 220,
    height: 220,
    alignContent: "center",
    borderRadius: 220 / 2
  }
});

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
      menPref: false,
      womenPref: false,
      otherPref: false,
      loading: true,
      noCards: false,
      dates: false,
      friends: false,
      doneSetup: true,
      messages: []
      
    }
  }
  //Call these functions in component.update after setting doUpdate true in component unmount
  componentDidMount() {
    console.log('componentDidMount current uid: ', firebaseSDK.shared.uid)
    this.unsubscribe = firebase
      .firestore().collection("users").doc(firebaseSDK.shared.uid)
      .onSnapshot((doc) => {
        console.log('doc data:', doc.data())
        const data = doc.data()
        if(data!=undefined){
        this.setState({
          college: data.college,
          gender: data.gender,
          swipedOn: _.toArray(data.swipedOn),
          matches: _.toArray(data.matches),
          ignore: _.toArray(data.ignore),
          studybuddies: data.studybuddies == null ? false : data.studybuddies,
          dates: data.dates == null ? false : data.dates,
          friends: data.friends == null ? false : data.friends,
          userID: doc.id,
          addedIds: [],
          menPref: data.menPref == null ? false : data.menPref,
          womenPref: data.womenPref == null ? false : data.womenPref,
          otherPref: data.otherPref == null ? false : data.otherPref
          
        })
      //  console.log('current uid:  after state set', firebaseSDK.shared.uid)
        console.log('study', this.state.studybuddies)
       //Have to call this here to ensure that state has been set from firebase
        this.getMatches()
        this.setState({loading: false})
        }
        console.log('current uid: ', firebaseSDK.shared.uid)
      })
  }

  componentWillUnmount() {
    console.log("component will unmount called")
    this.unsubscribe();
    this.unsubscribe1();
    this.unsubscribef();
    this.unsubscribem();
    this.unsubscribeo();
    this.unsubscribe3();

    
    this.setState({
      addedIds: [],
      noCards: false
    })
  }

  getMatches = () =>
  {

    this.unsubscribe1 = firebase.firestore().collection('users').where("college", "==", this.state.college)
      .onSnapshot(querySnapshot => {

        if(!this.state.studybuddies)
        {
          return
        }
      
        querySnapshot.forEach(doc => {

          if(doc.exists)
          {
            tester = (doc.data().swipedOn != null ? !doc.data().swipedOn.includes(this.state.userID) : true)
            if(doc.id != firebaseSDK.shared.uid && !this.state.matches.includes(doc.id) && !this.state.ignore.includes(doc.id) && tester && !this.state.addedIds.includes(doc.id))
            {
             // console.log("studybuddy")
            temp = doc.data()
            temp.id = doc.id
            this.state.cards.push(temp)
            this.state.addedIds.push(temp.id)
            this.setState({cards: this.state.cards})
            }
          }
        });
    })

    genderarray = [];

    count = 0

    this.unsubscribef = firebase.firestore().collection('users').where('gender', '==', 'female')
      .onSnapshot(querySnapshot => {

        if(!this.state.dates || !this.state.womenPref)
        {
          return
        }
    
        querySnapshot.forEach(doc => {

          if(doc.exists)
          {

            if(this.isValidGenderForDoc(doc, this.state.gender))
            {
              tester = (doc.data().swipedOn != null ? !doc.data().swipedOn.includes(this.state.userID) : true)
              
              if(doc.id != firebaseSDK.shared.uid && !this.state.matches.includes(doc.id) && !this.state.ignore.includes(doc.id) && tester && !this.state.addedIds.includes(doc.id))
              {
              temp = doc.data()
              temp.id = doc.id
              this.state.cards.push(temp)
              this.state.addedIds.push(temp.id)
              this.setState({cards: this.state.cards})
              }
            }
          }
        });
  
      })

      this.unsubscribem = firebase.firestore().collection('users').where('gender', '==', 'male')
      .onSnapshot(querySnapshot => {

        if(!this.state.dates || !this.state.menPref)
        {
          return
        }
    
        querySnapshot.forEach(doc => {

          if(doc.exists)
          {

            if(this.isValidGenderForDoc(doc, this.state.gender))
            {
              tester = (doc.data().swipedOn != null ? !doc.data().swipedOn.includes(this.state.userID) : true)
              
              if(doc.id != firebaseSDK.shared.uid && !this.state.matches.includes(doc.id) && !this.state.ignore.includes(doc.id) && tester && !this.state.addedIds.includes(doc.id))
              {
              temp = doc.data()
              temp.id = doc.id
              this.state.cards.push(temp)
              this.state.addedIds.push(temp.id)
              this.setState({cards: this.state.cards})
              }
            }
          }
        });
  
      })

      this.unsubscribeo = firebase.firestore().collection('users').where('gender', '==', 'other')
      .onSnapshot(querySnapshot => {

        if(!this.state.dates || !this.state.otherPref)
        {
          return
        }
    
        querySnapshot.forEach(doc => {

          if(doc.exists)
          {

            if(this.isValidGenderForDoc(doc, this.state.gender))
            {
              tester = (doc.data().swipedOn != null ? !doc.data().swipedOn.includes(this.state.userID) : true)
              
              if(doc.id != firebaseSDK.shared.uid && !this.state.matches.includes(doc.id) && !this.state.ignore.includes(doc.id) && tester && !this.state.addedIds.includes(doc.id))
              {
              temp = doc.data()
              temp.id = doc.id
              this.state.cards.push(temp)
              this.state.addedIds.push(temp.id)
              this.setState({cards: this.state.cards})
              }
            }
          }
        });
  
      })

    
    this.unsubscribe3 = firebase.firestore().collection('users').where("friends", "==", true)
    .onSnapshot(querySnapshot => {

      if(!this.state.friends)
      {
        return
      }

        querySnapshot.forEach(doc => {
          

          if(doc.exists)
          {
            tester = (doc.data().swipedOn != null ? !doc.data().swipedOn.includes(this.state.userID) : true)
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

  if(!this.state.studybuddies && !this.state.friends && !this.state.dates)
  {
    this.setState({loading: false, doneSetup: false})

    return
  }
  else
  {
    this.setState({doneSetup: true})
  }

  this.setState({loading: false})
    
  }

  isValidGenderForPref = (datePref, menPref, womenPref, otherPref, gender) =>
  {
    if(datePref == null || !datePref)
    {
        return false
    }

    if(menPref != null)
    {
      if(menPref && gender == 'male')
      {
        return true
      }    
    }

    if(womenPref != null)
    {
      if(womenPref && gender == 'female')
      {
        return true
      }
    }

    if(otherPref != null)
    {
      if(otherPref && gender == 'other')
      {
        return true
      }
    }

    return false
  }

  isValidGenderForDoc = (doc, gender)=>{

  if(doc.data().dates == null || !doc.data().dates)
  {
    return false
  }
    return this.isValidGenderForPref(doc.data().dates, doc.data().menPref,doc.data().womenPref, doc.data().otherPref, gender)
  }

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

      firebase.firestore().collection('users').doc(firebaseSDK.shared.uid).collection('chats').doc(card.id).set({
        messages: []
      }, { merge: true })
  
      firebase.firestore().collection('users').doc(card.id).collection('chats').doc(firebaseSDK.shared.uid).set({
        messages: []
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
   {
   return(
   <View style={styles.container}>
     <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}></ImageBackground>
     <ActivityIndicator size="large" animating={this.state.loading}/>
   </View>)

   }

   if((this.state.doneSetup != null && !this.state.doneSetup) || this.state.cards.length <= 0 || this.state.noCards){
   return(
    <View style={styles.container}>
    <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' }}>
    <View style={styles.centerContainer}>
      <View style={styles.roundSquare}>
      <Text>{this.state.doneSetup == true ? 'Please come back later for more matches' : "You haven't set any search settings. Go to the profile page to configure your search settings"}</Text>
    </View>
    </View>
    </ImageBackground>
    
  </View>)
  }
 
  
      return (
      <View style={styles.container}>
         <ImageBackground source={require('../../../assets/images/background-5.png')} style={{width: '100%',height:'100%' , borderWidth: 0}}></ImageBackground>
        <Swiper
          ref={swiper => {
            this.swiper = swiper
          }}
          cards={this.state.cards}
          cardIndex={this.state.cardIndex}
          verticalSwipe={false}
          infinite={false}
          cardVerticalMargin={60}
          showSecondCard={true}
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
                <View style={styles.imagestyle}>
                <Image
                  style={styles.imagestyle}
                  resizeMode="cover"
                  source={card.profPic == null ? require('../../../assets/images/click_to_add.png') : {uri: card.profPic}}
                />
                </View>
                <Text style={styles.text}>{card['firstName']}</Text>
                <Text style={styles.text}>{card.college}</Text>
                <Text style={{ fontSize: 22, padding: 5, color: 'black' }}>{card.major}</Text>
               
                <Text style={{ fontSize: 21, padding: 5, color: 'black' }}>Seeking</Text>
                <Text style={{ fontSize: 20, padding: 5, color: 'black' }}>{card.dates && this.isValidGenderForPref(this.state.dates,this.state.menPref,this.state.womenPref,this.state.otherPref, card.gender) ? 'Dates ': ''}{card.friends && this.state.friends ? 'Friends ': ''}{card.studybuddies && this.state.studybuddies ? 'Study Buddy': ''}</Text>
                
           

              </View>
            )
          }}

          onSwiped={(cardIndex) => { console.log(cardIndex) }}
          onSwipedLeft={(cardIndex) => this.onSwipeLeft(cardIndex)}
          onSwipedRight={(cardIndex) => this.onSwipeRight(cardIndex)}
          onSwipedAll={() => { this.setState({noCards: true}) }}
          backgroundColor={'#ffffff00'}
          showSecondCard={false}
          stackSize={3}>

        </Swiper>
      </View>
    );
  }
}


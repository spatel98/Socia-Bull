import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0
import firebaseSDK from '../../../config/firebaseSDK';
import firebase from 'react-native-firebase';
import _ from 'lodash'
export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
      avatar: '',
      friendAvatar: '',
      newMessages: [],
      messages: [],

      friendName: this.props.navigation.getParam('name','none'),
      friendId: this.props.navigation.getParam('id','none'),
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });
  
  get user() {
    firebase
      .firestore().collection("users").doc(firebaseSDK.shared.uid)
      .onSnapshot(function (doc) {
          this.state.firstName= doc.data().firstName;
          this.state.email= doc.data().email;
          this.state.avatar= doc.data().profPic;
      }.bind(this))

    firebase
      .firestore().collection("users").doc(this.state.friendId)
      .onSnapshot(function (doc) {
          this.state.friendAvatar= doc.data().profPic;
      }.bind(this))

    return {
      firstName: this.state.firstName,
      email: this.state.email,
      avatar: this.state.avatar,
      _avatar: this.state.friendAvatar,
      id: firebaseSDK.shared.uid,
      _id: this.state.friendId,
    };
  }

  onSend(messages = []) {
    console.log('messages: ', messages)
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))

    //console.log('newMessages1: ', this.state.newMessages)
    this.state.newMessages = this.state.messages
    //console.log('newMessages2: ', this.state.newMessages)
    this.state.newMessages.push(messages[0])
    //console.log('newMessages3: ', this.state.newMessages)
    this.setState({
      messages: this.state.newMessages
    })
    console.log('messages: ', this.state.messages)
    firebase.firestore()
      .collection('users')
      .doc(firebaseSDK.shared.uid)
      .collection('chats')
      .doc(this.state.friendId)
      .set({
        messages: this.state.messages
      }, { merge: true })

    firebase.firestore()
      .collection('users')
      .doc(this.state.friendId)
      .collection('chats')
      .doc(firebaseSDK.shared.uid)
      .set({
        messages: this.state.messages
      }, { merge: true })
      // .then(function (docRef) {
      //   console.log("Document written with ID: ", docRef.id);
      // })
      // .catch(function (error) {
      //   console.error("Error adding document: ", error);
      // });
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        //onSend={firebaseSDK.shared.send}
        onSend={messages => this.onSend(messages)}
        user={this.user}
        inverted = {false}
      />
    );
  }

  componentDidMount() {
    console.log('friendName: ', this.state.friendName)
    console.log('otherId: ', this.state.friendId)

    firebase.firestore()
      .collection('users')
      .doc(firebaseSDK.shared.uid)
      .collection('chats')
      .doc(this.state.friendId)
      //.orderBy('createdAt', 'desc')
      .onSnapshot(function(doc) {
        //console.log("data: ", doc.data().messages)
        if(doc.exists)
        {
          this.setState({messages: _.toArray(doc.data().messages)})
          //this.state.messages = _.toArray(doc.data().messages)
        }
      
      }.bind(this));        
    
    // this.setState((previousState) => {
    //   return {
    //     messages: GiftedChat.append(previousState.messages, messages)
    //   }
    // })
    //this.onSend(this.state.messages)
  }

  componentWillUnmount() {
    //firebaseSDK.shared.off();
  }


















  // componentDidMount() {
  //   console.log('friendName: ', this.state.friendName)
  //   console.log('otherId: ', this.state.friendId)
  //   firebaseSDK.shared.on(message =>
  //     this.setState(previousState => ({
  //       messages: GiftedChat.append(previousState.messages, message),
  //     }))
  //   );
  // }
  // componentWillUnmount() {
  //   firebaseSDK.shared.off();
  // }
}

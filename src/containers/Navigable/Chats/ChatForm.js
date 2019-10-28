import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'; // 0.3.0

import firebaseSDK from '../../../config/firebaseSDK';
import firebase from 'react-native-firebase';
export default class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      email: '',
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: (navigation.state.params || {}).name || 'Chat!',
  });

  state = {
    messages: [],
  };

  get user() {
    console.log(firebaseSDK.shared.uid)
    firebase
      .firestore().collection("users").doc(firebaseSDK.shared.uid)
      .onSnapshot(function (doc) {
          this.state.firstName= doc.data().firstName;
          this.state.email= doc.data().email;
          console.log('current firstName: ', this.state.firstName)
          console.log('current email: ', this.state.email)
      }.bind(this))
    return {
      firstName: this.state.firstName,
      email: this.state.email,
      id: firebaseSDK.shared.uid,
      _id: firebaseSDK.shared.uid,
    };
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={firebaseSDK.shared.send}
        user={this.user}
      />
    );
  }

  componentDidMount() {
    firebaseSDK.shared.on(message =>
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    );
  }
  componentWillUnmount() {
    firebaseSDK.shared.off();
  }
}

import firebase from 'react-native-firebase'; // 4.8.1
import 'firebase/firestore';

class firebaseSDK {
	constructor() {
		this.init();
		this.observeAuth();
	}

	init = () =>
		firebase.initializeApp({
			apiKey: 'AIzaSyDENbbwxSuy-wbYEZ5OzMO2RvVjpPPGu_k',
			authDomain: 'socia-bull.firebaseapp.com',
			databaseURL: 'https://socia-bull.firebaseio.com',
			projectId: 'socia-bull',
			storageBucket: 'socia-bull.appspot.com',
			messagingSenderId: '320775191860'
		});

	// var db = firebase.firestore();
	
	observeAuth = () =>
		firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

	onAuthStateChanged = user => {
		if (!user) {
			try {
				firebase.auth().signInAnonymously();
			} catch ({ message }) {
				alert(message);
			}
		}
	};

	get uid() {
		return (firebase.auth().currentUser || {}).uid;
	}
	
	get ref() {
		return firebase.database().ref('messages');
	}

	parse = snapshot => {
		const { timestamp: numberStamp, text, user } = snapshot.val();
		const { key: _id } = snapshot;
		const timestamp = new Date(numberStamp);
		const message = {
			_id,
			timestamp,
			text,
			user,
		};
		return message;
	};

	on = callback =>
		this.ref
			.limitToLast(20)
			.on('child_added', snapshot => callback(this.parse(snapshot)));

	get timestamp() {
		return firebase.database.ServerValue.TIMESTAMP;
	}
	// send the message to the Backend
	send = messages => {
		for (let i = 0; i < messages.length; i++) {
			const { text, user } = messages[i];
			const message = {
				text,
				user,
				timestamp: this.timestamp,
			};
			this.append(message);
		}
	};

	append = message => this.ref.push(message);

	// close the connection to the Backend
	off() {
		this.ref.off();
	}
}

firebaseSDK.shared = new firebaseSDK();
export default firebaseSDK;

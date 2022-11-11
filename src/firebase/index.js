import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAPTVrY28EF49NgmiAvHgu25FH27rZnZUI',
  authDomain: 'chatkitty-example-4b41a.firebaseapp.com',
  projectId: 'chatkitty-example-4b41a',
  storageBucket: 'chatkitty-example-4b41a.appspot.com',
  messagingSenderId: '619332636307',
  appId: '1:619332636307:web:71e918e4f17891f2b8c766',
  measurementId: 'G-BNB3KJK68V',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

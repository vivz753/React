import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: `${process.env.REACT_APP_apiKey}`,
  authDomain: "todoist-tutorial-fb4d4.firebaseapp.com",
  databaseURL: "https://todoist-tutorial-fb4d4.firebaseio.com",
  projectId: "todoist-tutorial-fb4d4",
  storageBucket: "todoist-tutorial-fb4d4.appspot.com",
  messagingSenderId: "276056291270",
  appId: "1:276056291270:web:5301db9f1d88141d14e4c7"
});

export { firebaseConfig as firebase };
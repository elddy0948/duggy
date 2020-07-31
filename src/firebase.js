import * as firebase from "firebase/app"; // Firebase SDK
import "firebase/auth"; // Add the firebase products that you want to use
import "firebase/firestore";
import "firebase/app";
import "firebase/database";

const app = firebase.initializeApp(
  { // firebaseConfig
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "duggy-music.firebaseapp.com",
  databaseURL: "https://duggy-music.firebaseio.com",
  projectId: "duggy-music",
  storageBucket: "duggy-music.appspot.com",
  messagingSenderId: "654777837974",
  appId: "1:654777837974:web:a88ba9565973f0ae08d5b7",
  measurementId: "G-Y0ZEBD2LY6",
  }
);

// firebase.analytics(); ??

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

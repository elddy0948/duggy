import * as firebase from "firebase/app"; // Firebase SDK
import "firebase/auth"; // Add the firebase products that you want to use
import "firebase/firestore";
import "firebase/app";
import "firebase/database";
import "firebase/storage";

const url = 'https://duggy-music.firebaseio.com/';

const app = firebase.initializeApp({
  // firebaseConfig
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "duggy-music.firebaseapp.com",
  databaseURL: "https://duggy-music.firebaseio.com",
  projectId: "duggy-music",
  storageBucket: "duggy-music.appspot.com",
  messagingSenderId: "654777837974",
  appId: "1:654777837974:web:a88ba9565973f0ae08d5b7",
  measurementId: "G-Y0ZEBD2LY6",
});

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export var storage = firebase.storage();
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

// google login
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const signUpWithFirebase = (userID, userPW) => auth.createUserWithEmailAndPassword(userID, userPW);
export const signInWithFirebase = (email, password) => auth.signInWithEmailAndPassword(email, password);
  
export default firebase;

export const imagePath = "gs://duggy-music.appspot.com/Store/2.png";

import firebase from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyCDl8njloFIfuqaXkLpSObxH9B9LNSnN_4",
    authDomain: "duggy-music.firebaseapp.com",
    databaseURL: "https://duggy-music.firebaseio.com",
    projectId: "duggy-music",
    storageBucket: "duggy-music.appspot.com",
    messagingSenderId: "654777837974",
    appId: "1:654777837974:web:a88ba9565973f0ae08d5b7",
    measurementId: "G-Y0ZEBD2LY6"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export { storage, firebase as default };
  
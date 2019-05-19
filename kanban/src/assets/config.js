import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC4Av5YMt_21wALrHVKRBcsrvFYznsvimM",
    authDomain: "paupaukanban.firebaseapp.com",
    databaseURL: "https://paupaukanban.firebaseio.com",
    projectId: "paupaukanban",
    storageBucket: "paupaukanban.appspot.com",
    messagingSenderId: "83727027916",
    appId: "1:83727027916:web:b7a48dde1b168b3e"
  };


firebase.initializeApp(config);
const database = firebase.database();
export default database
  
const config = {
  apiKey: "AIzaSyCIb_YBvzXFVgkhLiIJ8jRrRXRPMtVYQcY",
  authDomain: "mytodokamvan.firebaseapp.com",
  databaseURL: "https://mytodokamvan.firebaseio.com",
  projectId: "mytodokamvan",
  storageBucket: "mytodokamvan.appspot.com",
  messagingSenderId: "441220222875",
  };
  
  const firebase = require('firebase');
  
  firebase.initializeApp(config);
  
  const db = firebase.firestore();
  
  export default db;
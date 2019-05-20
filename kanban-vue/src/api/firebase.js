import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDYWIP-Fox2G5AM8tKyKZbBZe8ePScXUFE",
  authDomain: "kanban-cococold27.firebaseapp.com",
  databaseURL: "https://kanban-cococold27.firebaseio.com",
  projectId: "kanban-cococold27",
  storageBucket: "kanban-cococold27.appspot.com",
  messagingSenderId: "1060344180910"
};
firebase.initializeApp(config);

const db = firebase.firestore();
export default db;
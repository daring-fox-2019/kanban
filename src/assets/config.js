import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAgoMVQEy4pvHGkAGSdNfurHmkVoGTR13I",
  authDomain: "kanban-d422d.firebaseapp.com",
  databaseURL: "https://kanban-d422d.firebaseio.com",
  projectId: "kanban-d422d",
  storageBucket: "kanban-d422d.appspot.com",
  messagingSenderId: "68018795079",
  appId: "1:68018795079:web:1f11403310df741c"
};

firebase.initializeApp(config);
// Get a reference to the database service
const database = firebase.database();

export default database;

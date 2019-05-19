
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
require('firebase/firestore');
// Initialize Firebase
var config = {
  apiKey: "AIzaSyAxjDl_TVxWm685Hcfi6vq9z2Ge8bHR7Lk",
  authDomain: "kanban-mri.firebaseapp.com",
  databaseURL: "https://kanban-mri.firebaseio.com",
  projectId: "kanban-mri",
  storageBucket: "kanban-mri.appspot.com",
  messagingSenderId: "1074195186226"
};

firebase.initializeApp(config);

const database = firebase.database()

module.exports=database

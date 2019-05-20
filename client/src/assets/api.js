const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyARAlzvI7kNUYfe5xy8nPuLXg99AnTZn3s',
  authDomain: 'kanban-e46d9.firebaseapp.com',
  projectId: 'kanban-e46d9'
});

var db = firebase.firestore();

export default db
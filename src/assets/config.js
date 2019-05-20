import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAcsYwmS-9UyGodXpVzbNqhTs_OaVozbZY",
    authDomain: "kanban-firebase-2c877.firebaseapp.com",
    databaseURL: "https://kanban-firebase-2c877.firebaseio.com",
    projectId: "kanban-firebase-2c877",
    storageBucket: "kanban-firebase-2c877.appspot.com",
    messagingSenderId: "43748707483"
};

firebase.initializeApp(config)
const database = firebase.database()

export default database
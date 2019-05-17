import firebase from 'firebase';
// Required for side-effects
import 'firebase/firestore';

// Initialize Firebase
const config = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DB_URI,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MSG_SENDER_ID,
};

firebase.initializeApp(config);
const db = firebase.firestore();

export default db;

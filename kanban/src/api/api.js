import * as firebase from 'firebase';
import 'firebase/firestore';

console.log();

const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTID,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGAINGSENDERID,
};
firebase.initializeApp(config);
const db = firebase.firestore();

export default db;

import Vue from 'vue'
// import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import {
  firestorePlugin
} from 'vuefire'

Vue.use(firestorePlugin)

firebase.initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID
});

export default firebase.firestore();

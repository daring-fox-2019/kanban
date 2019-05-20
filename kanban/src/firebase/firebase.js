import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: 'AIzaSyAFnoSZwGYkcu5rKhtxd9-3KCbvvFLr3tY',
    authDomain: 'kanban-1aa09.firebaseapp.com',
    projectId: 'kanban-1aa09'
  }
  
  firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
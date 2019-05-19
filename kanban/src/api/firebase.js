const firebase = require('firebase')
// Required for side-effects
require('firebase/firestore')

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyD7jnJRGav_5Xr7fwrr7SzIN69sW6XTFZI',
  authDomain: 'kanban-f000f.firebaseapp.com',
  projectId: 'kanban-f000f'
})
const db = firebase.firestore()

export default db

import firebase from 'firebase'
console.log(process.env.VUE_APP_API_KEY)
const config = {

    // apiKey: process.env.VUE_APP_API_KEY,
    // authDomain: process.env.VUE_APP_AUTH_DOMAIN,    
    // projectId: process.env.VUE_APP_PROJECT_ID
}
firebase.initializeApp(config)
export default firebase.firestore()
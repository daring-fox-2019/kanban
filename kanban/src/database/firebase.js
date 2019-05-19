import Firebase from "firebase";

let config = {
  apiKey: process.env.VUE_APP_apiKey,
  authDomain: process.env.VUE_APP_authDomain,
  databaseURL: process.env.VUE_APP_DATABASE_URL,
  projectId: process.env.VUE_APP_projectId,
  storageBucket: process.env.VUE_APP_storageBucket
};

if (!Firebase.apps.length) {
  Firebase.initializeApp(config)
}
let db = Firebase.database()

export default db

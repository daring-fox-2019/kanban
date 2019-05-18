// // Initialize Firebase
// const config = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.messagingSenderId,
// };

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: 'kanban-f6789',
  storageBucket: 'kanban-f6789.appspot.com',
  messagingSenderId: '81834605453',
};

const firebase = require('firebase');

firebase.initializeApp(config);

const db = firebase.firestore();


export default db;

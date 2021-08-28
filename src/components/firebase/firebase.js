import firebase from "firebase";
// import firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";
import firebaseConfig from './firebaseConfig';

// const firebaseApp= firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  }

// const auth=firebase.auth();

// const provider = new firebase.auth.GoogleAuthProvider();

// const db= firebaseApp.firestore();

// export {auth};
// export default db;
export const auth = firebase.auth() 
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
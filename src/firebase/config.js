import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyD8CFzskErYmw0BRMBCCJ1d0VZxKognwEI",
  authDomain: "the-dojo-7624f.firebaseapp.com",
  projectId: "the-dojo-7624f",
  storageBucket: "the-dojo-7624f.appspot.com",
  messagingSenderId: "543957802192",
  appId: "1:543957802192:web:bd9b7cb2acedf0250bd2d5"
};

// init firebase

firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// Timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }
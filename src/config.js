// src/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKFQWwXQ0frRXDPIuxEBrC8acViX9B_-4",
  authDomain: "p2p-call-sample-1ddf7.firebaseapp.com",
  databaseURL: "https://p2p-call-sample-1ddf7-default-rtdb.firebaseio.com",
  projectId: "p2p-call-sample-1ddf7",
  storageBucket: "p2p-call-sample-1ddf7.appspot.com",
  messagingSenderId: "426213562679",
  appId: "1:426213562679:web:ad1ea0ebf71471116b22b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export { database, ref, onValue,auth,provider };

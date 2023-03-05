// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  createUserWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
  } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB75oHqqpC4xbFTPQJkGxN25t_E20R4uEY",
  authDomain: "react-auth-ann.firebaseapp.com",
  projectId: "react-auth-ann",
  storageBucket: "react-auth-ann.appspot.com",
  messagingSenderId: "255079308826",
  appId: "1:255079308826:web:f1c362ab6e64a6527b3ba3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
 const auth = getAuth(app);
export {
  auth,
  createUserWithEmailAndPassword, 
  updateProfile, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
}
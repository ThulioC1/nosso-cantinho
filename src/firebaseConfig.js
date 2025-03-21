// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "nosso-cantinho-fc205.firebaseapp.com",
  projectId: "nosso-cantinho-fc205",
  storageBucket: "nosso-cantinho-fc205.firebasestorage.app",
  messagingSenderId: "730415041153",
  appId: "1:730415041153:web:87dbe957af65529c559b80",
  measurementId: "G-KC766RW5C3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


AIzaSyAb5OGmQNzFNvLLokVeDYE-gTcyu5LoSaE
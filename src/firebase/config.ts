import firebase from "firebase/app";

import "firebase/auth";
import "firebase/functions";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDpRsqamOYIOdRkz56UjilFm7mvsS3H6PA",
  authDomain: "ecommercestudy-e7e2e.firebaseapp.com",
  projectId: "ecommercestudy-e7e2e",
  storageBucket: "ecommercestudy-e7e2e.appspot.com",
  messagingSenderId: "740643185749",
  appId: "1:740643185749:web:8991ad850a44274548a0dc",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const functions = firebase.functions();
export const db = firebase.firestore();
export const storageRef = firebase.storage().ref();

export { firebase };

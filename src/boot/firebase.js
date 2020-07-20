import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQgJSMmf-Nz7kFIGh6idJ_m6h0H815Zaw",
  authDomain: "awesome-todo-54e1a.firebaseapp.com",
  databaseURL: "https://awesome-todo-54e1a.firebaseio.com",
  projectId: "awesome-todo-54e1a",
  storageBucket: "awesome-todo-54e1a.appspot.com",
  messagingSenderId: "410171484080",
  appId: "1:410171484080:web:315b56adbbec41692b5875"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebaseApp.auth();
const firebaseDb = firebaseApp.firestore();

export { firebaseAuth, firebaseDb };

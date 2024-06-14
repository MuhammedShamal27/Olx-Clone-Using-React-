// import { initializeApp } from "firebase/app";
import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firebase'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBINKGgCtPyyjvNsSi0rueXbXP2WuFiccM",
  authDomain: "olx-clone-98c1d.firebaseapp.com",
  projectId: "olx-clone-98c1d",
  storageBucket: "olx-clone-98c1d.appspot.com",
  messagingSenderId: "357341115906",
  appId: "1:357341115906:web:b26d425d93e1495539d91b"
};


// const app = initializeApp(firebaseConfig);
export default firebase.initializeApp(firebaseConfig)
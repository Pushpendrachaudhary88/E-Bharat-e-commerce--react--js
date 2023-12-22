// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBZRhb_xMUTMfw9ZOAGgOoZkLVOU-BV9Gc",
  authDomain: "e-bharatapp.firebaseapp.com",
  projectId: "e-bharatapp",
  storageBucket: "e-bharatapp.appspot.com",
  messagingSenderId: "233252978972",
  appId: "1:233252978972:web:62180db3721d2acddebad9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);

export {fireDb,auth} ;
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {getAuth} from "@firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyAcCNjUJHOnqeLFwePxQrXd6jWUcjtQD98",
  authDomain: "job-portal-40cb6.firebaseapp.com",
  projectId: "job-portal-40cb6",
  storageBucket: "job-portal-40cb6.appspot.com",
  messagingSenderId: "581415184751",
  appId: "1:581415184751:web:4e75aecebc5e3a2b49a09a",
  measurementId: "G-PS6RFYRD5Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);
export { db, app, auth };
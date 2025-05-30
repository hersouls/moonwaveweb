// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCecDbnbZ-M0bZV4hev69ASs6Uo07YKTfc",
  authDomain: "moonwave-travel.firebaseapp.com",
  projectId: "moonwave-travel",
  storageBucket: "moonwave-travel.appspot.com", // ← 이 부분이 정답!
  messagingSenderId: "774888120320",
  appId: "1:774888120320:web:78375de5045b3f95e778e5",
  measurementId: "G-KMWMGH5NMY"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

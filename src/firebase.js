// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence
} from "firebase/auth";

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyCecDbnbZ-M0bZV4hev69ASs6Uo07YKTfc",
  authDomain: "moonwave-travel.firebaseapp.com",
  projectId: "moonwave-travel",
  storageBucket: "moonwave-travel.appspot.com",
  messagingSenderId: "774888120320",
  appId: "1:774888120320:web:78375de5045b3f95e778e5",
  measurementId: "G-KMWMGH5NMY"
};

// 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore
export const db = getFirestore(app);

// 인증
export const auth = getAuth(app);
auth.useDeviceLanguage(); // 사용자 브라우저 언어 설정 적용

// 인증 영속성 설정 (세션 유지)
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.warn("로그인 세션 유지 설정 실패:", error.message);
});

// Google 로그인용 provider
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase コンソールの設定
const firebaseConfig = {
  apiKey: 'AIzaSyBn9z-PzTSPSjSxpMcokkRP47rrvAWsZ1k',
  authDomain: 'shopping-list-3b469.firebaseapp.com',
  projectId: 'shopping-list-3b469',
  storageBucket: 'shopping-list-3b469.firebasestorage.app',
  messagingSenderId: '62281621021',
  appId: '1:62281621021:web:24b538804fc1ba291970f4',
};

// 初期化
const app = initializeApp(firebaseConfig);

// Firestore の参照を export
export const db = getFirestore(app);

//認証
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();// Googleログイン用

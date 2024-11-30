// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVJUs-tuOouaQYboT8TI6a-DgXmHG2tFQ",
  authDomain: "todolopputyo.firebaseapp.com",
  projectId: "todolopputyo",
  storageBucket: "todolopputyo.firebasestorage.app",
  messagingSenderId: "953186621953",
  appId: "1:953186621953:web:e49ec9d8dbe2a460e93e00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
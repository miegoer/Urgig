// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseAPI = process.env.FIREBASE_PUBLIC_API_KEY

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: firebaseAPI,
  authDomain: "urgig-c170c.firebaseapp.com",
  projectId: "urgig-c170c",
  storageBucket: "urgig-c170c.appspot.com",
  messagingSenderId: "925073233467",
  appId: "1:925073233467:web:a47fe691a8f13d3273ee1e",
  measurementId: "G-0YHKXNPVCQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export { storage }
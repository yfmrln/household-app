// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQtvKXleY8MligFTlPcDtx6lWcIex_jUs",
  authDomain: "householdtypescript-dea63.firebaseapp.com",
  projectId: "householdtypescript-dea63",
  storageBucket: "householdtypescript-dea63.firebasestorage.app",
  messagingSenderId: "618636702332",
  appId: "1:618636702332:web:41351662ff20a7fca5cff9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
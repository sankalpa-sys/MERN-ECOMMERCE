// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_LRCasUWP3jULdMGmigoCQ0qU8jEYG2s",
  authDomain: "mern-eommerce.firebaseapp.com",
  projectId: "mern-eommerce",
  storageBucket: "mern-eommerce.appspot.com",
  messagingSenderId: "589834847220",
  appId: "1:589834847220:web:a4a103edb00404f91c6fa1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
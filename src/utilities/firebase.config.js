// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnvy9efZ6YbjuszzP3HZi5yPwpz_QceYE",
  authDomain: "mazzak-agro-26ace.firebaseapp.com",
  projectId: "mazzak-agro-26ace",
  storageBucket: "mazzak-agro-26ace.appspot.com",
  messagingSenderId: "869339995347",
  appId: "1:869339995347:web:e358d43015c4b949368826",
  measurementId: "G-WXG08R7ZZW",
};

// const analytics = getAnalytics(app);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7rDFEvgEnvcSUmJSVtIel0bnyl9gi1cg",
  authDomain: "greenenv-66cd5.firebaseapp.com",
  projectId: "greenenv-66cd5",
  storageBucket: "greenenv-66cd5.appspot.com",
  messagingSenderId: "701971530859",
  appId: "1:701971530859:web:1ae627143b516c39981d2e",
  measurementId: "G-1X0HQSP4WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
export default app;
// const analytics = getAnalytics(app);
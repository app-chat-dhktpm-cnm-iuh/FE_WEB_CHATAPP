import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlwjtMgUSUSh2-xnFsDIxsP3dp1fmR8Q0",
  authDomain: "smilechatapp-cnm.firebaseapp.com",
  projectId: "smilechatapp-cnm",
  storageBucket: "smilechatapp-cnm.appspot.com",
  messagingSenderId: "1019012961658",
  appId: "1:1019012961658:web:1c5faf99ebf8c090b172c3",
  measurementId: "G-XD6FYN240B",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

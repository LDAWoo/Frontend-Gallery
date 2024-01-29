import { initializeApp } from "firebase/app";

import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCc3bDeumsUbnk2YmcMq6sosjurCbzerN8",
  authDomain: "gardeneden-d79b5.firebaseapp.com",
  projectId: "gardeneden-d79b5",
  storageBucket: "gardeneden-d79b5.appspot.com",
  messagingSenderId: "559854991137",
  appId: "1:559854991137:web:0ec6d25223d4cee5d2b060",
  measurementId: "G-FFE4XQSMBF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

const ggProvider = new GoogleAuthProvider();
export { app, auth, ggProvider, database };

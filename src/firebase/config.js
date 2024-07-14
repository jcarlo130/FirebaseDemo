import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAygIV1zm3ZnSza9CZEGm-4r-nWHrPXD_Q",
  authDomain: "st-project-c5afc.firebaseapp.com",
  projectId: "st-project-c5afc",
  storageBucket: "st-project-c5afc.appspot.com",
  messagingSenderId: "804014225022",
  appId: "1:804014225022:web:01992a991de3c4843d0a2f",
  measurementId: "G-N7ET9T9GMN",
};

initializeApp(firebaseConfig);

export const auth = getAuth();

const db = getFirestore();

export { db };

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAk6hXS3kY5eP0GCfQzIpvgSp1NrFbr04s",
  authDomain: "hyb-mobile.firebaseapp.com",
  projectId: "hyb-mobile",
  databaseURL: "https://hyb-mobile-default-rtdb.firebaseio.com",
  storageBucket: "hyb-mobile.appspot.com",
  messagingSenderId: "596536214421",
  appId: "1:596536214421:web:1e45c074b9a0801928ac9c"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
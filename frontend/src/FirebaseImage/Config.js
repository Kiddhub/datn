// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from 'firebase/storage'
import { omit } from "lodash";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkca_f7P4sivsIm444cHTVQXwYgDOVpHk",
  authDomain: "image-project-d6c1d.firebaseapp.com",
  projectId: "image-project-d6c1d",
  storageBucket: "image-project-d6c1d.appspot.com",
  messagingSenderId: "403247713862",
  appId: "1:403247713862:web:334e069240e9e81e25c447",
  measurementId: "G-8W8GZPNL4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app)
import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBisM6nS22inxZ_KXBhJVRH5sZ7e7o78jQ",
    authDomain: "freshbook-f6590.firebaseapp.com",
    projectId: "freshbook-f6590",
    storageBucket: "freshbook-f6590.appspot.com",
    messagingSenderId: "1077882110846",
    appId: "1:1077882110846:web:b6b93c92e2c280c904292f",
    measurementId: "G-J4262H9115"
  };


export const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);
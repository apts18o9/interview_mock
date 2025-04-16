// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

//this for client side sdk
const firebaseConfig = {
    apiKey: "AIzaSyAymcJReeMEfmKP74cWyuxSfkrr4DCdXkg",
    authDomain: "interviewprep-8c7a9.firebaseapp.com",
    projectId: "interviewprep-8c7a9",
    storageBucket: "interviewprep-8c7a9.firebasestorage.app",
    messagingSenderId: "804684274052",
    appId: "1:804684274052:web:43c570cfcea782e591a5d1",
    measurementId: "G-YF1XB63302"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);


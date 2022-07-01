// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1TDGJRbzaQ_oBdFcH1SN_j1gvvMQAgmA",
    authDomain: "fir-login-form-auth.firebaseapp.com",
    projectId: "fir-login-form-auth",
    storageBucket: "fir-login-form-auth.appspot.com",
    messagingSenderId: "892438349525",
    appId: "1:892438349525:web:9de1cf9616a44efada845c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
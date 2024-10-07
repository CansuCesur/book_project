// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCShOauPVqQfpCGkw-M7t1n8ytJdkz5d3U",
    authDomain: "book-project-3e558.firebaseapp.com",
    projectId: "book-project-3e558",
    storageBucket: "book-project-3e558.appspot.com",
    messagingSenderId: "506193425940",
    appId: "1:506193425940:web:298d2ee6baf76a098b9901",
    measurementId: "G-NRN6JKTKV0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

if (process.env.FIREBASE_FUNCTIONS_EMULATOR) {
    const functions = firebase.functions();
    functions.useFunctionsEmulator("http://0.0.0.0:5001");
    
}

module.exports = firebase;



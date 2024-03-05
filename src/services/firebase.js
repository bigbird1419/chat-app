import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyASKY5L0eujD2BspAOH8qctIzh9gZyXl30",
    authDomain: "chat-app-2f351.firebaseapp.com",
    projectId: "chat-app-2f351",
    storageBucket: "chat-app-2f351.appspot.com",
    messagingSenderId: "214733320514",
    appId: "1:214733320514:web:97b14480249fa8960758db"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

export { app, auth, db }
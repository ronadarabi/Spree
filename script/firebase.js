// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-storage.js";

// Your web app's Firebase configuration (TODO)
const firebaseConfig = {
    // Your config details
    apiKey: "AIzaSyClZddPE6luDM3bkB6qPLA0k9dKX8nDvqc",
    authDomain: "spree-b6853.firebaseapp.com",
    projectId: "spree-b6853",
    storageBucket: "spree-b6853.firebasestorage.app",
    messagingSenderId: "852785935696",
    appId: "1:852785935696:web:063b734e97eb7affbda855"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const storage = getStorage(app);

export { app }
export { db }
export { storage }
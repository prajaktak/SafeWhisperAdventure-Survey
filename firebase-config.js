// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCagSmRYlP2PK2_1QBDshT1k5y8DbmqzKw",
  authDomain: "safewhisper-survey.firebaseapp.com",
  databaseURL: "https://safewhisper-survey-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "safewhisper-survey",
  storageBucket: "safewhisper-survey.firebasestorage.app",
  messagingSenderId: "879101439982",
  appId: "1:879101439982:web:a0600bd6d198ebc4f868ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export for use in other files
export { database, ref, push, set };

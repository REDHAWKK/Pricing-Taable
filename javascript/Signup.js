import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkhouztH4Qa0RGZdxIr8C3RsUgFYqUs7E",
  authDomain: "wine-with-us-database.firebaseapp.com",
  projectId: "wine-with-us-database",
  storageBucket: "wine-with-us-database.firebasestorage.app",
  messagingSenderId: "254154647200",
  appId: "1:254154647200:web:87689653adc9af9f5dcbc5",
  measurementId: "G-YEBJD2TYYR"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


function signUpUser(email, password, additionalData) {
    createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            // Save additional data to Firestore
            await setDoc(doc(db, "users", user.uid), additionalData);

            console.log("User signed up and data stored successfully!");
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
        });
}
document.getElementById("signup-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get user input
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Call the signUpUser function
  signUpUser(email, password, { firstName, lastName , phoneNumber });
});

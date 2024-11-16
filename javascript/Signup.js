import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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

      // Save the user's UID in localStorage
      localStorage.setItem("userId", user.uid);

      console.log("User signed up and data stored successfully!");

      // Redirect to shop.html
      window.location.href = "shop.html";
    })
    .catch((error) => {
      console.error("Error signing up:", error.message);
      alert("Signup failed: " + error.message); // Show an error message to the user
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
  signUpUser(email, password, { firstName, lastName, phoneNumber });
});

// Restrict access to pages if not logged in
onAuthStateChanged(auth, (user) => {
  const restrictedPages = ["shop.html", "profile.html"]; // Add your restricted pages here
  const currentPage = window.location.pathname.split("/").pop();

  if (!user && restrictedPages.includes(currentPage)) {
    // Redirect to signup or login page
    window.location.href = "signup.html";
  }
});

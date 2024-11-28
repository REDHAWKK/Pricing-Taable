// Ensure the DOM is fully loaded
window.onload = function () {
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
loginModal.show(); // Display the modal on page load
};
document.addEventListener("DOMContentLoaded", function () {
    const seenModal = localStorage.getItem("loginModalShown");
    if (!seenModal) {
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      loginModal.show();
      localStorage.setItem("loginModalShown", "true");
    }
  });
  
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
 // Initialize Firebase
 const firebaseConfig = {
  apiKey: "AIzaSyDkhouztH4Qa0RGZdxIr8C3RsUgFYqUs7E",
  authDomain: "wine-with-us-database.firebaseapp.com",
  projectId: "wine-with-us-database",
  storageBucket: "wine-with-us-database.appspot.com",
  messagingSenderId: "254154647200",
  appId: "1:254154647200:web:87689653adc9af9f5dcbc5",
  measurementId: "G-YEBJD2TYYR"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Handle Google Login
document.getElementById("googleSignInButton").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Display success or redirect
    alert(`Welcome back, ${user.displayName}!`);
    window.location.href = "Shop.html";
    console.log("User Details:", user);
  } catch (error) {
    // Handle Errors
    alert(`Error: ${error.message}`);
    console.error("Error Details:", error);
  }
});
// Import necessary Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Selecting the form
const signupForm = document.getElementById("signupForm");

//  event listener to handle form submission
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get input values
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const phoneNumber = document.getElementById("phoneNumber").value;

  // Create user with email and password
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Add user data to Firestore
      return addDoc(collection(db, "users"), {
        uid: user.uid,
        email: email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        createdAt: new Date()
      });
    })
    .then(() => {
      console.log("User added to Firestore");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});




const elementsHidden = document.querySelectorAll('.hidden');
function scrollHandler() {
  elementsHidden.forEach(element => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top <= windowHeight - 100) {
    element.classList.add('show');
}
});
}
window.onload =
scrollHandler();
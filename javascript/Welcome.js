/* welcome text */
const text = "Welcome To Wine With Us";
let index = 0;

function typeText() {
  if (index < text.length) {
    document.getElementById('intro').innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  }
}

/* SCHOOL PRIDE CONFETTI CODE */
function startConfetti() {
  var end = Date.now() + 6 * 1000; // Run the confetti for 6 seconds
  var colors = ['#453db8', '#e6cec6', '#dfb8ab', '#fff'];
  
  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 }, // Left side of the screen
      colors: colors
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 }, // Right side of the screen
      colors: colors
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}


//CODE FOR LOGIN
// Ensure the DOM is fully loaded
function signIn() {
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
      listenForCartChanges(user.uid);
  
      // Optional: Fetch the cart initially
      const cart = await fetchCartFromFirestore(user.uid);
      console.log("Initial Cart Data:", cart); // For debugging or UI initialization
    } catch (error) {
      console.error("Login Error:", error);
    }
  });
  
  // Function to save cart
  async function saveCartToFirestore(userId, cartItems) {
    try {
      await setDoc(doc(db, "carts", userId), { cart: cartItems });
      console.log("Cart saved successfully!");
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }
  
  // Function to fetch cart (used initially)
  async function fetchCartFromFirestore(userId) {
    try {
      const docSnap = await getDoc(doc(db, "carts", userId));
      if (docSnap.exists()) {
        return docSnap.data().cart;
      } else {
        console.log("No cart found for this user.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }
  
  window.onload = function() {
    typeText();
    startConfetti();
    signIn();
  };
  
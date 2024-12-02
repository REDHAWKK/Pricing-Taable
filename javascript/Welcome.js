// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkhouztH4Qa0RGZdxIr8C3RsUgFYqUs7E",
  authDomain: "wine-with-us-database.firebaseapp.com",
  projectId: "wine-with-us-database",
  storageBucket: "wine-with-us-database.appspot.com",
  messagingSenderId: "254154647200",
  appId: "1:254154647200:web:87689653adc9af9f5dcbc5",
  measurementId: "G-YEBJD2TYYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Welcome text animation
const text = "Welcome To Wine With Us";
let index = 0;

function typeText() {
  if (index < text.length) {
    document.getElementById("intro").innerHTML += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  }
}

// Confetti animation
function startConfetti() {
  const end = Date.now() + 6 * 1000; // Run confetti for 6 seconds
  const colors = ["#453db8", "#e6cec6", "#dfb8ab", "#fff"];
  
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
  })();
}

// Show login modal for unauthenticated users
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
    if (!user) {
      // User not logged in; show modal
      loginModal.show();
    } else {
      // User logged in; hide modal if visible
      loginModal.hide();
      console.log(`Welcome back, ${user.displayName}`);
    }
  });
});

// Google login button
document.getElementById("googleSignInButton").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userId = user.uid;

    // Fetch and merge carts
    const firestoreCart = await fetchCartFromFirestore(userId);
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const mergedCart = mergeCarts(localCart, firestoreCart);

    // Save merged cart to Firestore and update local storage
    await saveCartToFirestore(userId, mergedCart);
    localStorage.setItem("cart", JSON.stringify(mergedCart));

    // Greet user and refresh the page
    swal(`Welcome back, ${user.displayName}!`).then(() => {
      location.reload(); // Refresh the page after login
    });
  } catch (error) {
    console.error("Login Error:", error);
    swal("An error occurred during login. Please try again.");
  }
});

// Function to fetch cart from Firestore
async function fetchCartFromFirestore(userId) {
  try {
    const docSnap = await getDoc(doc(db, "carts", userId));
    if (docSnap.exists()) {
      return docSnap.data().cart || [];
    } else {
      console.log("No cart found for this user.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching cart from Firestore:", error);
    return [];
  }
}

// Function to save cart to Firestore
async function saveCartToFirestore(userId, cartItems) {
  try {
    await setDoc(doc(db, "carts", userId), { cart: cartItems });
    console.log("Cart saved successfully!");
  } catch (error) {
    console.error("Error saving cart to Firestore:", error);
  }
}

// Function to merge local cart and Firestore cart
function mergeCarts(localCart, firestoreCart) {
  const mergedCart = [...firestoreCart];
  localCart.forEach(localItem => {
    const index = mergedCart.findIndex(item => item.id === localItem.id);
    if (index === -1) {
      mergedCart.push(localItem);
    } else {
      mergedCart[index].quantity += localItem.quantity;
    }
  });
  return mergedCart;
}

// Logout button
document.getElementById("logoutButton").addEventListener("click", async () => {
  try {
    const userId = auth.currentUser?.uid;

    // Save cart before logging out
    if (userId) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      await saveCartToFirestore(userId, localCart);
    }

    // Log out user
    await auth.signOut();

    // Clear local storage and refresh page
    localStorage.removeItem("cart");
    swal("You have successfully logged out!").then(() => {
      window.location.href = "index.html"; // Redirect after logout
    });
  } catch (error) {
    console.error("Logout Error:", error);
    swal("An error occurred during logout. Please try again.");
  }
});

// Initialize animations on page load
window.onload = function () {
  if (typeof typeText === "function") typeText();
  if (typeof startConfetti === "function") startConfetti();
};

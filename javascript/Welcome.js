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
// Show login modal only for unauthenticated users
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // User is not logged in; show the modal
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      loginModal.show();
    } else {
      // User is logged in; hide the modal if necessary
      console.log(`User is already logged in: ${user.displayName}`);
    }
  });
});
    
// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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
const db = getFirestore(app);

// Handle Google Login
document.getElementById("googleSignInButton").addEventListener("click", async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const userId = user.uid;

    // Fetch user's cart from Firestore
    const firestoreCart = await fetchCartFromFirestore(userId);

    // Sync Firestore cart with local cart
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    const mergedCart = mergeCarts(localCart, firestoreCart);

    // Save merged cart back to Firestore and update local storage
    await saveCartToFirestore(userId, mergedCart);
    localStorage.setItem("cart", JSON.stringify(mergedCart));

    // Update UI with the restored cart
    alert(`Welcome back, ${user.displayName}!`);
    updateCartDisplay(mergedCart);
  } catch (error) {
    console.error("Login Error:", error);
    alert("An error occurred during login. Please try again.");
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
    console.error("Error fetching cart:", error);
    return [];
  }
}

// Function to save cart to Firestore
async function saveCartToFirestore(userId, cartItems) {
  try {
    await setDoc(doc(db, "carts", userId), { cart: cartItems });
    console.log("Cart saved successfully!");
  } catch (error) {
    console.error("Error saving cart:", error);
  }
}

// Function to merge local cart and Firestore cart
function mergeCarts(localCart, firestoreCart) {
  if (!Array.isArray(firestoreCart)) firestoreCart = [];
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

// Logout function
document.getElementById("logoutButton").addEventListener("click", async () => {
  try {
    const userId = auth.currentUser?.uid;
    if (userId) {
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];
      await saveCartToFirestore(userId, localCart);
    }

    // Sign out the user
    await auth.signOut();

    // Clear local cart and UI
    localStorage.removeItem("cart");
    clearCartUI();

    alert("Successfully logged out!");
    window.location.href = "index.html"; // Redirect to welcome/login page
  } catch (error) {
    console.error("Logout Error:", error);
    alert("An error occurred during logout. Please try again.");
  }
});

// Function to clear cart UI
function clearCartUI() {
  const listCartHTML = document.querySelector('.listCart');
  const iconCartSpan = document.querySelector('.icon-cart span');

  listCartHTML.innerHTML = ""; // Clear cart items
  iconCartSpan.textContent = "0"; // Reset cart count
}

// Show login modal only for unauthenticated users
document.addEventListener("DOMContentLoaded", () => {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
      loginModal.show();
    }
  });
});

// Utility to update cart display (implement as needed)
function updateCartDisplay(cart) {
  console.log("Cart Updated:", cart);
  // Update the cart UI here (e.g., populate HTML elements)
}

// Welcome animation and confetti
window.onload = function () {
  if (typeof typeText === "function") typeText();
  if (typeof startConfetti === "function") startConfetti();
};

import { initializeApp } from "/firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "/firebase/auth";
import { getFirestore, doc, setDoc, collection, getDocs } from "/firebase/firestore";

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

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Services
const auth = getAuth(app);
const db = getFirestore(app);

// Google Auth Provider
const provider = new GoogleAuthProvider();

document.getElementById('googleSignInButton').addEventListener('click', function(event) {
    event.preventDefault();  // Prevent the page refresh
    console.log("Google Sign-In Button Clicked");
        loginWithGoogle();  // Call the Google login function
});

function loginWithGoogle() {
    console.log("Button clicked");  // For debugging
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            console.log("User logged in:", user.displayName);
            saveUserData(user);
            window.location.href = "Shop.html";  // Redirect to your shop page after login
        })
        .catch((error) => {
            console.error("Error during login:", error.message);
        });
}
s// Function to save user data
async function saveUserData(user) {
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
    }, { merge: true });
}

// Function to check authentication state
auth.onAuthStateChanged(async (user) => {
    if (user) {
        console.log("User logged in:", user.displayName);

        // Optional: Load user-specific data (e.g., cart)
        loadCart(user.uid);
    } else {
        console.log("No user logged in.");
        window.location.href = "index.html"; // Redirect to login page if necessary
    }
});

// Function to save cart items
export async function saveCartItem(userId, cartItem) {
    const cartRef = doc(db, "users", userId, "cart", cartItem.id);
    await setDoc(cartRef, cartItem);
}

// Function to load cart items
export async function loadCart(userId) {
    const cartRef = collection(db, "users", userId, "cart");
    const cartSnapshot = await getDocs(cartRef);
    const cart = cartSnapshot.docs.map(doc => doc.data());
    console.log("Cart items:", cart);
}

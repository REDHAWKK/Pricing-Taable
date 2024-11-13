
// References to the signup form elements
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const phoneNumberInput = document.getElementById("phoneNumber");
const signupButton = document.getElementById("signupButton");

signupButton.addEventListener("click", (e) => {
  e.preventDefault(); // Preventing default form submission
  
  const email = emailInput.value;
  const password = passwordInput.value;
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const phoneNumber = phoneNumberInput.value;

  // Firebase Authentication - Creating user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User signed up:", user);

      // Store user data (firstName, lastName, phoneNumber) in Firestore
      addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        createdAt: new Date(),
      }).then(() => {
        console.log("User added to Firestore");
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error signing up:", errorCode, errorMessage);
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
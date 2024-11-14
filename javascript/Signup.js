
const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission

  const email = emailInput.value;
  const password = passwordInput.value;
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const phoneNumber = phoneNumberInput.value;

  // Firebase Authentication - Create user
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Store user data in Firestore
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
      console.error("Error signing up:", error.code, error.message);
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
const hiddenElements = document.querySelectorAll('.fade-in');
const image = document.querySelector('.rotating-img');
const text = "Hi, My name is Oriarebun Princeton"; // Text for the typewriter effect
let index = 0; // Index for tracking the character position

function rotateFunction() {
  // Show the image with a fade-in effect
  image.style.opacity = '1';

  // Stagger the fade-in effect for each hidden element
  hiddenElements.forEach((element, idx) => {
    setTimeout(() => {
      element.classList.add('show');
    }, idx * 500); // Stagger by 500ms for each element
  });

  // Apply random transform and rotation to the image
  image.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0.8) rotate(${Math.random() * 360}deg)`;

  // Reset the image's transform back after a delay
  setTimeout(() => {
    image.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
  }, 1000);
}

function typeText() {
  if (index < text.length) {
    document.getElementById('hi').innerHTML += text.charAt(index); // Add one character at a time
    index++;
    setTimeout(typeText, 100); // Delay between each character
  }
}

window.onload = function() {
  rotateFunction(); // Start the rotation effect
  typeText();       // Start the typewriter effect
};

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
window.addEventListener('scroll', scrollHandler)
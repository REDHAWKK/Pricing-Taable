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

window.onload = function() {
  typeText();
  startConfetti();
};

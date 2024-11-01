const hiddenElements = document.querySelectorAll('.fade-in');
const image = document.querySelector('.rotating-img');
window.onload = function() {
    hiddenElements.forEach(element => {
        element.classList.add('show');
    });
  
    // Initially set random transformations
    image.style.opacity = '1';
    image.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0.8) rotate(${Math.random() * 360}deg)`;
  
    // Return image to original position after a delay
    setTimeout(() => {
      image.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
    }, 1000);
  };

// Automatically trigger slide-in animation on page load
window.onload = function () {
    const pictures = document.querySelectorAll('.slide-in');
    const triggerPoint = window.innerHeight / 1.2;
  
    pictures.forEach(picture => {
      const pictureTop = picture.getBoundingClientRect().top;
  
      if (pictureTop < triggerPoint) {
        picture.classList.add('show');
      }
    });
  };
  

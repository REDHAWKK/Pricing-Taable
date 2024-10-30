const hiddenElements = document.querySelectorAll('.hidden');
function scrollHandler() {
  hiddenElements.forEach(element => {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top <= windowHeight - 100) {
    element.classList.add('show');
}
});
}
window.addEventListener('scroll', scrollHandler)
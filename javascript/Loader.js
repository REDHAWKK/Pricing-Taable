document.addEventListener("DOMContentLoaded", () => {
const loader = document.getElementById("loader");
const content = document.getElementById("content");
 
 setTimeout(() =>{
 loader.style.display = "none";
 content.style.display = "block"
 }, 2000);
});
// main.js - custom site JavaScript

// Example: remove 'no-js' class and add 'js' class to <html> for CSS styling
document.documentElement.classList.remove('no-js');
document.documentElement.classList.add('js');

// Example: simple console log to confirm script loaded
console.log('Custom main.js loaded.');

// Add your custom JS code below

// Example: Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

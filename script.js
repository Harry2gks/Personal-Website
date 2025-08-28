 
// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
if (navToggleButton && navMenu) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });
}

// Scroll-based navbar visibility and shadow
let lastScrollY = window.scrollY;
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;
  
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down - hide navbar
    header.classList.add('nav-hidden');
  } else {
    // Scrolling up - show navbar
    header.classList.remove('nav-hidden');
  }
  
  // Handle shadow based on scroll position
  if (currentScrollY === 0) {
    // At the very top - remove shadow
    header.classList.remove('nav-shadow');
  } else {
    // Scrolled down - add shadow
    header.classList.add('nav-shadow');
  }
  
  lastScrollY = currentScrollY;
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navMenu?.classList.remove('open');
    navToggleButton?.setAttribute('aria-expanded', 'false');
  });
});

// Current year in footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
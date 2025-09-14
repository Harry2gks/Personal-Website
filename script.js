// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('#nav-menu');
if (navToggleButton && navMenu) {
  navToggleButton.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggleButton.classList.toggle('open', isOpen);
    navToggleButton.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && 
        !navMenu.contains(e.target) && 
        !navToggleButton.contains(e.target)) {
      navMenu.classList.remove('open');
      navToggleButton.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    }
  });

  // Close menu when scrolling
  window.addEventListener('scroll', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggleButton.classList.remove('open');
      navToggleButton.setAttribute('aria-expanded', 'false');
    }
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

// Copy email to clipboard functionality
const copyEmailButton = document.querySelector('.copy-email');
if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const email = copyEmailButton.getAttribute('data-email');
    try {
      await navigator.clipboard.writeText(email);
      const originalTitle = copyEmailButton.getAttribute('title');
      copyEmailButton.setAttribute('title', 'Copied!');
      
      // Reset tooltip text after 2 seconds
      setTimeout(() => {
        copyEmailButton.setAttribute('title', originalTitle);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy email: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      
      const originalTitle = copyEmailButton.getAttribute('title');
      copyEmailButton.setAttribute('title', 'Copied!');
      setTimeout(() => {
        copyEmailButton.setAttribute('title', originalTitle);
      }, 2000);
    }
  });
}

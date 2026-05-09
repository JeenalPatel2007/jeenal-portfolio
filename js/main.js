// Navbar scroll blur effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile hamburger menu
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');

navbarToggle.addEventListener('click', () => {
  navbarToggle.classList.toggle('active');
  navbarMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.navbar-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navbarToggle.classList.remove('active');
    navbarMenu.classList.remove('active');
  });
});

// Timeline line drawing on scroll
// ===== TIMELINE SCROLL-DRIVEN FILL =====
const timeline = document.querySelector('.timeline');
const timelineLine = document.getElementById('timelineLine');

if (timeline && timelineLine) {
    // define function FIRST
    function updateTimelineLine() {
        const rect = timeline.getBoundingClientRect();
        const windowH = window.innerHeight;
        const start = windowH - rect.top;
        const total = rect.height + windowH ; 
        const progress = Math.max(0, Math.min(1, start / total));
        timelineLine.style.transform = `scaleY(${progress})`;
    }

    // then use it
    updateTimelineLine();
    window.addEventListener('scroll', updateTimelineLine, { passive: true });
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
  updateTimelineLine();
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .project-card, .cert-card, .academic-card').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});



async function loadHTML(id, file) {
  const element = document.getElementById(id);
  const response = await fetch(file);
  const html = await response.text();
  element.innerHTML = html;
}
// 1. Navigation Link Handler
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // If it's a hash link and we are on the main page, smooth scroll
        if (href.startsWith('#') && window.location.pathname.endsWith('index.html')) {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
        // Otherwise, allow the default link behavior (e.g., navigating to blog.html)
    });
});

// 2. Scroll event for nav shadow and scroll-to-top button visibility
const scrollToTopBtn = document.querySelector('.scroll-to-top');
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
        nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'block';
    } else {
        nav.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
        if (scrollToTopBtn) scrollToTopBtn.style.display = 'none';
    }
});

// 3. Click listener for scroll-to-top button
if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// 4. Particles.js Initialization (if the element exists)
const particlesElement = document.getElementById('particles-js');
if (particlesElement) {
    particlesJS('particles-js', {
        "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle", "stroke": { "width": 0, "color": "#000000" }, "polygon": { "nb_sides": 5 } }, "opacity": { "value": 0.5, "random": false, "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true, "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false } }, "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.4, "width": 1 }, "move": { "enable": true, "speed": 6, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false, "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 } } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true }, "modes": { "grab": { "distance": 400, "line_linked": { "opacity": 1 } }, "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 }, "repulse": { "distance": 200, "duration": 0.4 }, "push": { "particles_nb": 4 }, "remove": { "particles_nb": 2 } } }, "retina_detect": true
    });
}


// --- Page-Specific Functions (for index.html) ---

// 1. ScrollReveal Initialization
// Check if ScrollReveal is loaded and if we are on the main page (by checking for a main-page-only element)
if (typeof ScrollReveal !== 'undefined' && document.getElementById('about')) {
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
    });

    sr.reveal(`#about, #portfolio, #contact`);
    sr.reveal(`.portfolio-item`, { interval: 200 });
    sr.reveal(`.skill`, { interval: 100 });
    sr.reveal(`.about-text, .contact-form`, { origin: 'left' });
}

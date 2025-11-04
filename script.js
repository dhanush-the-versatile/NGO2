// ===================================
// SCRIPT.JS - FUNCTIONALITY
// ==================================== */

// Navigation Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
    observer.observe(el);
});

// Form Submission Handler
function handleSubmit(event) {
    event.preventDefault();

    // Get form data
    const formData = new FormData(event.target);
    const name = event.target[0].value;
    const email = event.target[1].value;

    // Simple validation
    if (!name || !email) {
        alert('Please fill in all required fields');
        return;
    }

    // Simulate form submission
    console.log('Form submitted:', {
        name: name,
        email: email,
        message: event.target[event.target.length - 2].value
    });

    // Show success message
    alert('Thank you for reaching out! We will get back to you soon.');

    // Reset form
    event.target.reset();
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animations when stats section is visible
const statsSection = document.querySelector('.impact-stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statCards = document.querySelectorAll('.stat-number');
                statCards.forEach(card => {
                    const targetValue = parseInt(card.textContent.replace(/\D/g, ''));
                    if (!card.dataset.animated) {
                        animateCounter(card, targetValue);
                        card.dataset.animated = 'true';
                    }
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add scroll animation class to elements
function addScrollAnimation() {
    const elementsToAnimate = document.querySelectorAll(
        '.pillar-card, .program-card, .approach-item, .timeline-item, .stat-card, .involvement-card'
    );

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in-on-scroll');
    });
}

// Call function on page load
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimation();

    // Add staggered animation to elements
    const animatedElements = document.querySelectorAll('.fade-in-on-scroll');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = (index * 0.1) + 's';
    });
});

// Mobile menu close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Dynamic year in footer (for copyright)
document.querySelectorAll('.footer-bottom').forEach(footer => {
    const text = footer.textContent;
    const currentYear = new Date().getFullYear();
    if (!text.includes(currentYear.toString())) {
        footer.innerHTML = footer.innerHTML.replace(
            /20\d{2}/,
            currentYear.toString()
        );
    }
});

// Parallax effect on scroll (optional)
function parallaxScroll() {
    const parallaxElements = document.querySelectorAll('.hero');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        element.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
    });
}

window.addEventListener('scroll', parallaxScroll);

console.log('✓ CoHeart Website Scripts Loaded Successfully');

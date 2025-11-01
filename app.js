// Smooth scrolling and navigation
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page-section');
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active navigation on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    // Add scrolled class to navbar
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const fadeElements = document.querySelectorAll('.fade-in-up');
fadeElements.forEach(el => observer.observe(el));

// Program details data
const programDetails = {
    education: {
        title: 'Girl Child in Education',
        tagline: 'Nurturing Dreams, Building Futures',
        description: 'We believe every girl child deserves access to quality education and the opportunity to reach her full potential.',
        focus: [
            'Bridge learning support for girls who have fallen behind',
            'STEM scholarships and mentorship programs',
            'Early marriage prevention through education advocacy',
            'Leadership development and life skills training',
            'School infrastructure improvements in rural areas',
            'Parent engagement and community awareness programs'
        ]
    },
    skilling: {
        title: 'Youth Skilling & Employment',
        tagline: 'Skills for Tomorrow\'s Leaders',
        description: 'Empowering young women with market-aligned skills and entrepreneurship opportunities for sustainable livelihoods.',
        focus: [
            'Market-aligned vocational training in high-demand sectors',
            'Career guidance and placement support',
            'Entrepreneurship development and startup mentoring',
            'Digital literacy and technology skills training',
            'Soft skills development and interview preparation',
            'Industry partnerships for internships and employment'
        ]
    },
    wellness: {
        title: 'Women\'s Well-being',
        tagline: 'Holistic Health, Mental Strength',
        description: 'Comprehensive wellness programs addressing physical health, mental well-being, and overall quality of life for women.',
        focus: [
            'Health and nutrition camps in underserved communities',
            'Mental health counseling and support groups',
            'HerEcho Clubs for peer support and empowerment',
            'Financial literacy and economic independence programs',
            'Legal rights awareness and support services',
            'Reproductive health education and services'
        ]
    },
    eldercare: {
        title: 'Community Care for Seniors',
        tagline: 'Honoring Our Elders',
        description: 'Creating dignified, compassionate care systems for senior citizens through community-based support programs.',
        focus: [
            'Community care centers with recreational activities',
            'Companionship programs connecting youth and seniors',
            'Intergenerational bonding and skill-sharing initiatives',
            'Healthcare screening and support services',
            'Dignified aging advocacy and policy initiatives',
            'Home visits and emergency support systems'
        ]
    }
};

// Program cards click handlers
const programCards = document.querySelectorAll('.program-card');
const programSidebar = document.getElementById('programSidebar');
const sidebarContent = document.getElementById('sidebarContent');
const sidebarClose = document.getElementById('sidebarClose');

programCards.forEach(card => {
    card.addEventListener('click', () => {
        const program = card.getAttribute('data-program');
        const details = programDetails[program];
        
        // Populate sidebar content
        let focusHTML = '<ul>';
        details.focus.forEach(item => {
            focusHTML += `<li>${item}</li>`;
        });
        focusHTML += '</ul>';
        
        sidebarContent.innerHTML = `
            <h2>${details.title}</h2>
            <p class="program-tagline">${details.tagline}</p>
            <p style="margin: 30px 0; line-height: 1.8; color: var(--charcoal);">${details.description}</p>
            <h3>Our Focus Areas</h3>
            ${focusHTML}
        `;
        
        programSidebar.classList.add('active');
    });
});

sidebarClose.addEventListener('click', () => {
    programSidebar.classList.remove('active');
});

// Close sidebar when clicking outside
programSidebar.addEventListener('click', (e) => {
    if (e.target === programSidebar) {
        programSidebar.classList.remove('active');
    }
});

// Donation amount selection
const amountButtons = document.querySelectorAll('.amount-btn');
const donationAmountInput = document.getElementById('donationAmount');

amountButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        amountButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const amount = btn.getAttribute('data-amount');
        if (amount === 'custom') {
            donationAmountInput.value = '';
            donationAmountInput.focus();
        } else {
            donationAmountInput.value = amount;
        }
    });
});

// Modal functionality
const modal = document.getElementById('successModal');
const modalClose = document.getElementById('modalClose');
const modalMessage = document.getElementById('modalMessage');

function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add('active');
    
    // Auto close after 3 seconds
    setTimeout(() => {
        modal.classList.remove('active');
    }, 3000);
}

modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

// Form submissions
const donationForm = document.getElementById('donationForm');
const contactForm = document.getElementById('contactForm');
const newsletterForm = document.getElementById('newsletterForm');

donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showModal('Thank you for your generous donation! You will be redirected to the payment gateway.');
    donationForm.reset();
    amountButtons.forEach(b => b.classList.remove('active'));
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showModal('Thank you for reaching out! We will get back to you within 24 hours.');
    contactForm.reset();
});

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    showModal('Thank you for subscribing! You will receive our monthly updates.');
    newsletterForm.reset();
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const hero = document.querySelector('.hero-section');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

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
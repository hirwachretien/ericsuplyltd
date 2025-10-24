// Mobile Menu Toggle
function toggleMenu() {
    const navMenu = document.getElementById('navMenu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Close mobile menu when a link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const navMenu = document.getElementById('navMenu');
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });

    // Set active nav link based on current page
    const currentPage = window.location.pathname;
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (currentPage.includes(href) || (currentPage.endsWith('/') && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Smooth scroll for anchor links
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

// Add scroll animation for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.card, .service-card, .sector-card, .value-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Active navigation link update on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    let scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            const navLinks = document.querySelectorAll('.nav-menu a');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
        }
    });
});

// Form validation (if you add a contact form in the future)
function validateForm(formData) {
    const { name, email, message } = formData;

    if (!name || name.trim() === '') {
        alert('Please enter your name');
        return false;
    }

    if (!email || email.trim() === '') {
        alert('Please enter your email');
        return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!message || message.trim() === '') {
        alert('Please enter your message');
        return false;
    }

    return true;
}

// Animate numbers on page load
function animateNumbers() {
    const numbers = document.querySelectorAll('[data-number]');

    numbers.forEach(number => {
        const finalNumber = parseInt(number.getAttribute('data-number'));
        let currentNumber = 0;
        const increment = finalNumber / 50;
        const interval = setInterval(() => {
            if (currentNumber >= finalNumber) {
                clearInterval(interval);
                number.textContent = finalNumber;
            } else {
                currentNumber += increment;
                number.textContent = Math.floor(currentNumber);
            }
        }, 30);
    });
}

// Check if page is loaded and run animations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateNumbers);
} else {
    animateNumbers();
}

// Scroll to top button functionality
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.className = 'scroll-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #003D82 0%, #00BFFF 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 24px;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 61, 130, 0.3);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.1)';
        button.style.boxShadow = '0 6px 16px rgba(0, 61, 130, 0.4)';
    });

    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
        button.style.boxShadow = '0 4px 12px rgba(0, 61, 130, 0.3)';
    });
}

// Initialize scroll to top button when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createScrollToTopButton);
} else {
    createScrollToTopButton();
}
// Mobile dropdown toggle
document.querySelectorAll('.nav-menu li.dropdown > a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (window.innerWidth < 900) { // mobile breakpoint
            e.preventDefault(); // prevent navigation
            const dropdownMenu = this.nextElementSibling;
            if (dropdownMenu) {
                dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
            }
        }
    });
});

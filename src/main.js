// Main entry point for the DonRock Global Services application
import './style.css'

// Application initialization
console.log('DonRock Global Services application loaded')

// ============================================
// FAQ Accordion Functionality
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const answer = faqItem.querySelector('.faq-answer');
            const icon = question.querySelector('.faq-icon');

            // Close other open FAQs
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.closest('.faq-item');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherIcon = otherQuestion.querySelector('.faq-icon');
                    otherAnswer.classList.add('hidden');
                    otherIcon.classList.remove('rotate-180');
                }
            });

            // Toggle current FAQ
            answer.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
        });
    });
});

// ============================================
// Newsletter Form Handler
// ============================================
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;

        // Here you would typically send this to your backend
        console.log('Newsletter subscription:', email);

        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// ============================================
// Back to Top Button
// ============================================
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'invisible');
            backToTopBtn.classList.add('opacity-100', 'visible');
        } else {
            backToTopBtn.classList.add('opacity-0', 'invisible');
            backToTopBtn.classList.remove('opacity-100', 'visible');
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// Image Lightbox Functionality
// ============================================
const portfolioImages = document.querySelectorAll('#portfolio img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const closeLightbox = document.getElementById('closeLightbox');

if (portfolioImages.length > 0 && lightbox && lightboxImage) {
    portfolioImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImage.src = img.src;
            lightboxImage.alt = img.alt;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close lightbox
    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = ''; // Restore scrolling
        });
    }

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            lightbox.classList.add('hidden');
            lightbox.classList.remove('flex');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// Animated Statistics Counter
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

// Intersection Observer for statistics animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statElement = entry.target;
            const text = statElement.textContent;
            const number = parseInt(text.replace(/\D/g, ''));

            if (number && !statElement.dataset.animated) {
                statElement.dataset.animated = 'true';
                statElement.textContent = '0' + (text.includes('+') ? '+' : '');
                animateCounter(statElement, number);
            }
        }
    });
}, observerOptions);

// Observe all statistic elements
document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('#about .text-4xl.font-bold');
    stats.forEach(stat => {
        observerOptions.threshold = 0.5;
        statsObserver.observe(stat);
    });
});

// ============================================
// Enhanced Contact Form Validation
// ============================================
const contactForm = document.querySelector('#contact form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            product: document.getElementById('product').value,
            quantity: document.getElementById('quantity').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Here you would typically send this to your backend
        console.log('Contact form submission:', formData);

        // Show success message
        alert('Thank you for your inquiry! We will get back to you soon.');
        contactForm.reset();
    });
}

// ============================================
// Header Scroll Effect
// ============================================
const header = document.getElementById('mainHeader');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }
    });
}

// ============================================
// Product Quote Calculator
// ============================================
const quoteCalculator = document.getElementById('quoteCalculator');
const quoteResult = document.getElementById('quoteResult');

if (quoteCalculator) {
    // Sample pricing (in Naira per ton) - Update with actual prices
    const pricing = {
        granite: 15000,
        crushed: 12000,
        'road-base': 18000,
        concrete: 14000,
        fine: 13000,
        coarse: 16000
    };

    quoteCalculator.addEventListener('submit', (e) => {
        e.preventDefault();

        const product = document.getElementById('calcProduct').value;
        const quantity = parseFloat(document.getElementById('calcQuantity').value);
        const location = document.getElementById('calcLocation').value;

        if (!product || !quantity) {
            alert('Please fill in all required fields');
            return;
        }

        const pricePerTon = pricing[product] || 15000;
        const subtotal = pricePerTon * quantity;
        const deliveryFee = location ? 5000 : 0; // Sample delivery fee
        const total = subtotal + deliveryFee;

        // Display results
        document.getElementById('resultProduct').textContent = document.getElementById('calcProduct').selectedOptions[0].text;
        document.getElementById('resultQuantity').textContent = quantity + ' tons';
        document.getElementById('resultTotal').textContent = '₦' + total.toLocaleString('en-NG');

        quoteResult.classList.remove('hidden');
        quoteResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
}

// ============================================
// Active Navigation Link Highlighting
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;

        if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('text-blue-600', 'bg-blue-50');
        link.classList.add('text-gray-700');

        if (link.getAttribute('data-section') === currentSection) {
            link.classList.remove('text-gray-700');
            link.classList.add('text-blue-600', 'bg-blue-50');
        }
    });
}

// Update active link on scroll (throttled for performance)
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(updateActiveNavLink, 100);
});
window.addEventListener('load', updateActiveNavLink);

// ============================================
// Smooth Scroll Enhancement
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active nav link after scroll
            setTimeout(updateActiveNavLink, 500);

            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});

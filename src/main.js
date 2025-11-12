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
// Enhanced Contact Form Validation & Submission
// ============================================
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const submitBtnLoader = document.getElementById('submitBtnLoader');
const formSuccess = document.getElementById('formSuccess');
const formError = document.getElementById('formError');

if (contactForm) {
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Hide previous messages
        formSuccess.classList.add('hidden');
        formError.classList.add('hidden');

        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField({ target: input })) {
                isValid = false;
            }
        });

        if (!isValid) {
            formError.classList.remove('hidden');
            formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        // Get form values
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            product: document.getElementById('product').value,
            quantity: document.getElementById('quantity').value,
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        // Show loading state
        submitBtn.disabled = true;
        submitBtnText.classList.add('hidden');
        submitBtnLoader.classList.remove('hidden');

        try {
            // Option 1: Send via Email (using mailto as fallback)
            // Option 2: Send to your backend API
            // Option 3: Use a service like Formspree, EmailJS, etc.

            // For now, simulate API call
            await submitForm(formData);

            // Show success message
            formSuccess.classList.remove('hidden');
            formError.classList.add('hidden');
            contactForm.reset();

            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Reset button state after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtnText.classList.remove('hidden');
                submitBtnLoader.classList.add('hidden');
                formSuccess.classList.add('hidden');
            }, 5000);

        } catch (error) {
            console.error('Form submission error:', error);
            formError.classList.remove('hidden');
            formSuccess.classList.add('hidden');
            formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Reset button state
            submitBtn.disabled = false;
            submitBtnText.classList.remove('hidden');
            submitBtnLoader.classList.add('hidden');
        }
    });
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Remove previous error styling
    field.classList.remove('border-red-500', 'border-green-500');
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation (Nigerian format)
    if (field.type === 'tel' && value) {
        const phoneRegex = /^(\+234|0)?[789]\d{9}$/;
        const cleanedPhone = value.replace(/\s|-/g, '');
        if (!phoneRegex.test(cleanedPhone) && value.length > 0) {
            isValid = false;
            errorMessage = 'Please enter a valid Nigerian phone number';
        }
    }

    // Message length validation
    if (field.id === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }

    // Show error or success
    if (!isValid) {
        field.classList.add('border-red-500');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error text-red-600 text-sm mt-1';
        errorDiv.textContent = errorMessage;
        field.parentElement.appendChild(errorDiv);
    } else if (value) {
        field.classList.add('border-green-500');
    }

    return isValid;
}

// Clear field error on input
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('border-red-500');
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Submit form function (can be customized for your backend)
async function submitForm(formData) {
    // ============================================
    // OPTION 1: EmailJS (Recommended - Easiest)
    // ============================================
    // Step 1: Sign up at https://www.emailjs.com/ (free tier: 200 emails/month)
    // Step 2: Create an email service (Gmail, Outlook, etc.)
    // Step 3: Create an email template
    // Step 4: Get your Public Key, Service ID, and Template ID
    // Step 5: Uncomment the EmailJS script in index.html
    // Step 6: Uncomment and configure the code below:

    /*
    // Initialize EmailJS (only needed once)
    if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS script not loaded. Uncomment the script tag in index.html');
    }
    
    emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your Public Key from EmailJS dashboard
    
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        product: formData.product || 'Not specified',
        quantity: formData.quantity || 'Not specified',
        subject: formData.subject,
        message: formData.message
    });
    */

    // ============================================
    // OPTION 2: Backend API (Custom Backend)
    // ============================================
    // If you have your own backend server, uncomment and configure:

    /*
    const response = await fetch('https://yourdomain.com/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit form');
    }
    
    return response.json();
    */

    // ============================================
    // OPTION 3: Formspree (No Backend Needed)
    // ============================================
    // Step 1: Sign up at https://formspree.io/ (free tier: 50 submissions/month)
    // Step 2: Get your form endpoint
    // Step 3: Uncomment and configure:

    /*
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit form');
    }
    
    return response.json();
    */

    // ============================================
    // CURRENT: Simulation (for testing)
    // ============================================
    // This is currently active for testing purposes
    // Replace with one of the options above for production

    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log form data (for development)
    console.log('Contact form submission:', formData);
    console.log('To enable email sending, configure EmailJS, Backend API, or Formspree in submitForm() function');

    // Simulate success
    return Promise.resolve({ success: true });
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

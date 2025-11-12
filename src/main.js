// Main entry point for the DonRock Global Services application
import './style.css'

// Application initialization
console.log('DonRock Global Services application loaded')

// ============================================
// Hero Section Animations & Effects
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Animate statistics counter
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + (element.dataset.count.includes('+') ? '+' : '');
                element.classList.add('count-animate');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + (element.dataset.count.includes('+') ? '+' : '');
            }
        }, 16);
    };

    // Intersection Observer for hero stats (using data-count attribute)
    const heroStatsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.dataset.count);
                if (target) {
                    animateCounter(entry.target, target);
                }
            }
        });
    }, { threshold: 0.5 });

    // Observe all hero stat counters with data-count attribute
    document.querySelectorAll('[data-count]').forEach(stat => {
        heroStatsObserver.observe(stat);
    });

    // Parallax effect for hero background
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = hero.querySelector('.relative.z-10');
            if (heroContent && scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroContent.style.opacity = Math.max(0.5, 1 - (scrolled / window.innerHeight) * 0.5);
            }
        });

        // Add mouse move parallax effect for floating shapes
        hero.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const { width, height } = hero.getBoundingClientRect();
            const xPos = (clientX / width - 0.5) * 30;
            const yPos = (clientY / height - 0.5) * 30;

            const floatingShapes = hero.querySelectorAll('.animate-float-slow, .animate-float-slow-delayed');
            floatingShapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.3;
                const currentTransform = shape.style.transform || '';
                if (!currentTransform.includes('translate')) {
                    shape.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
                }
            });
        });
    }

    // ============================================
    // Scroll-triggered Animations for All Sections
    // ============================================
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with fade-in-on-scroll class
    document.querySelectorAll('.fade-in-on-scroll').forEach(element => {
        scrollObserver.observe(element);
    });

    // ============================================
    // FAQ Accordion Functionality
    // ============================================
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
const newsletterSubmitBtn = document.getElementById('newsletterSubmitBtn');
const newsletterBtnText = document.getElementById('newsletterBtnText');
const newsletterBtnLoader = document.getElementById('newsletterBtnLoader');
const newsletterSuccess = document.getElementById('newsletterSuccess');
const newsletterError = document.getElementById('newsletterError');

if (newsletterForm) {
    // Email validation
    const newsletterEmail = document.getElementById('newsletterEmail');

    newsletterEmail.addEventListener('blur', function () {
        const email = this.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) {
            this.classList.add('border-red-500', 'ring-2', 'ring-red-300');
        } else {
            this.classList.remove('border-red-500', 'ring-2', 'ring-red-300');
        }
    });

    newsletterEmail.addEventListener('input', function () {
        this.classList.remove('border-red-500', 'ring-2', 'ring-red-300');
        if (newsletterSuccess) newsletterSuccess.classList.add('hidden');
        if (newsletterError) newsletterError.classList.add('hidden');
    });

    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Hide previous messages
        if (newsletterSuccess) newsletterSuccess.classList.add('hidden');
        if (newsletterError) newsletterError.classList.add('hidden');

        const email = newsletterEmail.value.trim();

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            if (newsletterError) newsletterError.classList.remove('hidden');
            newsletterEmail.classList.add('border-red-500', 'ring-2', 'ring-red-300');
            return;
        }

        // Show loading state
        if (newsletterSubmitBtn) {
            newsletterSubmitBtn.disabled = true;
            if (newsletterBtnText) newsletterBtnText.classList.add('hidden');
            if (newsletterBtnLoader) newsletterBtnLoader.classList.remove('hidden');
        }

        try {
            // Subscribe to newsletter
            await subscribeToNewsletter(email);

            // Show success message
            if (newsletterSuccess) newsletterSuccess.classList.remove('hidden');
            if (newsletterError) newsletterError.classList.add('hidden');
            newsletterForm.reset();

            // Reset button state after delay
            setTimeout(() => {
                if (newsletterSubmitBtn) {
                    newsletterSubmitBtn.disabled = false;
                    if (newsletterBtnText) newsletterBtnText.classList.remove('hidden');
                    if (newsletterBtnLoader) newsletterBtnLoader.classList.add('hidden');
                    if (newsletterSuccess) newsletterSuccess.classList.add('hidden');
                }
            }, 5000);

        } catch (error) {
            console.error('Newsletter subscription error:', error);
            if (newsletterError) newsletterError.classList.remove('hidden');
            if (newsletterSuccess) newsletterSuccess.classList.add('hidden');

            // Reset button state
            if (newsletterSubmitBtn) {
                newsletterSubmitBtn.disabled = false;
                if (newsletterBtnText) newsletterBtnText.classList.remove('hidden');
                if (newsletterBtnLoader) newsletterBtnLoader.classList.add('hidden');
            }
        }
    });
}

// Newsletter subscription function
async function subscribeToNewsletter(email) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // ============================================
    // INTEGRATE WITH YOUR NEWSLETTER SERVICE
    // ============================================
    // Option 1: Mailchimp
    // Option 2: SendGrid
    // Option 3: ConvertKit
    // Option 4: Custom API endpoint
    // Option 5: EmailJS (send subscription to your email)

    // For now, log the subscription
    console.log('Newsletter subscription:', email);

    // Example: Send to your email via EmailJS (if configured)
    // You can use the same EmailJS setup as the contact form

    // Example: Mailchimp integration
    /*
    const response = await fetch('https://your-domain.us1.list-manage.com/subscribe/post-json?u=YOUR_USER_ID&id=YOUR_LIST_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            EMAIL: email,
            FNAME: '',
            LNAME: ''
        })
    });
    
    if (!response.ok) {
        throw new Error('Failed to subscribe');
    }
    
    return response.json();
    */

    // For now, simulate success
    return Promise.resolve({ success: true });
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

            // Submit form
            const result = await submitForm(formData);

            // Show success message
            formSuccess.classList.remove('hidden');
            formError.classList.add('hidden');

            // Update success message based on method used
            const successText = formSuccess.querySelector('p');
            if (successText) {
                if (result && result.method === 'whatsapp') {
                    successText.textContent = 'WhatsApp is opening with your message. If it doesn\'t open, please contact us directly on WhatsApp: +234 8037335414';
                } else {
                    successText.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                }
            }

            contactForm.reset();

            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Reset button state after delay
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtnText.classList.remove('hidden');
                submitBtnLoader.classList.add('hidden');
                formSuccess.classList.add('hidden');
            }, 8000); // Longer delay for mailto method

        } catch (error) {
            console.error('Form submission error:', error);

            // Show error message
            formError.classList.remove('hidden');
            formSuccess.classList.add('hidden');

            // Update error message if it's a specific error
            const errorText = formError.querySelector('p');
            if (errorText) {
                if (error.message && error.message.includes('WhatsApp')) {
                    errorText.textContent = 'Failed to open WhatsApp. Please contact us directly on WhatsApp: +234 8037335414 or email: donrockglobalservicesltd@gmail.com';
                } else {
                    errorText.textContent = `Failed to send message: ${error.message || 'Please try again or contact us directly on WhatsApp: +234 8037335414'}`;
                }
            }

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

// Submit form function - Sends to WhatsApp
async function submitForm(formData) {
    // ============================================
    // WHATSAPP CONFIGURATION
    // ============================================
    // Your WhatsApp number (include country code, no + or spaces)
    // Example: 2348037335414 for +234 8037335414
    const WHATSAPP_NUMBER = '2348037335414'; // Your WhatsApp number

    // Format the message for WhatsApp
    const productNames = {
        'granite-chippings': 'Granite Chippings',
        'crushed-stones': 'Crushed Stones',
        'road-base': 'Road Base Materials',
        'concrete-aggregates': 'Concrete Aggregates',
        'fine-chippings': 'Fine Chippings',
        'coarse-aggregates': 'Coarse Aggregates',
        'mixed-graded': 'Mixed Graded Stones',
        'custom': 'Custom Grading',
        'other': 'Other'
    };

    const productName = productNames[formData.product] || formData.product || 'Not specified';

    // Create a well-formatted WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*

*Name:* ${formData.name}
*Email:* ${formData.email}
*Phone:* ${formData.phone || 'Not provided'}

*Product Interest:* ${productName}
*Quantity:* ${formData.quantity ? formData.quantity + ' tons' : 'Not specified'}

*Subject:* ${formData.subject}

*Message:*
${formData.message}

---
_Submitted from DonRock Website_`.trim();

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab/window
    window.open(whatsappUrl, '_blank');

    // Return success after a short delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, method: 'whatsapp' };
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

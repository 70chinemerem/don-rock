# Complete Code Explanation - DonRock Global Services Website

This document provides a comprehensive explanation of every code file in the DonRock Global Services website project.

---

## 📁 Project Structure Overview

The project is a modern, single-page website built with:
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - No framework dependencies
- **ES Modules** - Modern JavaScript module system

---

## 🔧 Configuration Files

### 1. `package.json`

**Purpose**: Defines project metadata, dependencies, and npm scripts.

```json
{
  "name": "don-rock",              // Project name
  "private": true,                 // Prevents accidental publishing to npm
  "version": "0.0.0",              // Project version
  "type": "module",                // Enables ES6 module syntax (import/export)
  "scripts": {
    "dev": "vite",                 // Start development server
    "build": "vite build",         // Build for production
    "preview": "vite preview"      // Preview production build
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.17",  // Tailwind CSS PostCSS plugin
    "autoprefixer": "^10.4.22",         // Adds vendor prefixes to CSS
    "vite": "^7.2.2"                    // Build tool and dev server
  }
}
```

**Key Points**:
- `"type": "module"` allows using `import/export` syntax
- All dependencies are dev dependencies (no runtime dependencies)
- Scripts use Vite for development and building

---

### 2. `vite.config.js`

**Purpose**: Configures Vite build tool.

```javascript
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    base: './',                    // Use relative paths for assets (important for deployment)
    build: {
        rollupOptions: {
            input: resolve(__dirname, 'index.html'),  // Entry point is index.html
        },
    },
});
```

**Key Points**:
- `base: './'` ensures assets work when deployed to subdirectories
- `rollupOptions.input` specifies `index.html` as the entry point
- Uses `resolve()` to create absolute paths

---

### 3. `tailwind.config.js`

**Purpose**: Configures Tailwind CSS.

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",                    // Scan HTML file
        "./src/**/*.{js,ts,jsx,tsx}",     // Scan all JS/TS files in src
    ],
    theme: {
        extend: {},                       // Custom theme extensions (empty)
    },
    plugins: [],                          // Tailwind plugins (none)
};
```

**Key Points**:
- `content` array tells Tailwind where to look for class names
- Only classes found in these files will be included in the final CSS
- Empty `extend` and `plugins` means using default Tailwind configuration

---

### 4. `postcss.config.js`

**Purpose**: Configures PostCSS (CSS processor).

```javascript
export default {
    plugins: {
        '@tailwindcss/postcss': {},  // Process Tailwind directives
        autoprefixer: {},            // Add vendor prefixes automatically
    },
};
```

**Key Points**:
- PostCSS processes CSS before it reaches the browser
- `@tailwindcss/postcss` converts Tailwind directives to CSS
- `autoprefixer` adds browser prefixes (e.g., `-webkit-`, `-moz-`)

---

## 🎨 Stylesheet Files

### 5. `src/style.css`

**Purpose**: Main stylesheet with custom animations and Tailwind imports.

#### **Line 1-2**: Tailwind Import
```css
@import "tailwindcss";
```
- Imports Tailwind CSS framework
- Makes all Tailwind utility classes available

#### **Line 3-5**: Smooth Scrolling
```css
html {
  scroll-behavior: smooth;
}
```
- Enables smooth scrolling when clicking anchor links

#### **Lines 7-34**: Hero Section Animations

**`@keyframes float-slow`** (Lines 8-20):
- Creates floating animation for background shapes
- Moves elements 30px in X and Y directions
- Changes opacity from 0.3 to 0.5
- Creates a slow, gentle floating effect

**`@keyframes float-slow-delayed`** (Lines 22-34):
- Similar to `float-slow` but moves in opposite direction
- Used for variety in hero section

#### **Lines 36-48**: Pulse Animation
```css
@keyframes pulse-slow {
  0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.2); }
}
```
- Creates a slow pulsing effect
- Scales from 1 to 1.2 and back
- Used for background elements

#### **Lines 50-72**: Slide Animations
- `slide-up`: Elements slide up from 30px below
- `slide-down`: Elements slide down from 20px above
- Both include opacity fade-in

#### **Lines 74-82**: Fade In Animation
- Simple opacity transition from 0 to 1
- Used for gradual appearance

#### **Lines 84-107**: Animation Classes
- `.animate-float-slow`: Applies 20s floating animation
- `.animate-float-slow-delayed`: Same but with 5s delay
- `.animate-pulse-slow`: 8s pulsing animation
- `.animate-slide-up`, `.animate-slide-down`: Slide animations
- `.animate-fade-in-slow`: 2s fade-in

#### **Lines 109-124**: Counter Animation
```css
@keyframes count-up {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```
- Used when statistics finish counting
- Provides visual feedback

#### **Lines 126-185**: Section Animations
- `fade-in-up`: Fade in while moving up 40px
- `fade-in-left`: Fade in while moving left 40px
- `fade-in-right`: Fade in while moving right 40px
- `scale-in`: Fade in while scaling from 0.9 to 1
- `rotate-in`: Fade in with slight rotation

#### **Lines 187-206**: Animation Class Definitions
- Classes that apply the keyframe animations
- Each has specific duration and easing

#### **Lines 208-218**: Scroll-Triggered Animations
```css
.fade-in-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-on-scroll.visible {
  opacity: 1;
  transform: translateY(0);
}
```
- Elements start hidden and move up
- When `.visible` class is added (via JavaScript), they animate in
- Used throughout the page for scroll-triggered reveals

#### **Lines 220-243**: Staggered Animation Delays
- `.stagger-1` through `.stagger-6`
- Delays from 0.1s to 0.6s
- Used to create cascading animation effects

#### **Lines 245-262**: Card Hover Effects
```css
.card-hover {
  transition: all 0.3s ease;
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}
```
- Cards lift up on hover
- Shadow increases for depth effect

#### **Lines 264-291**: Mobile Portfolio Support
```css
@media (max-width: 767px) {
  #portfolio .group>.absolute.inset-0.bg-gradient-to-t {
    opacity: 1 !important;  /* Show descriptions on mobile */
  }
}

@media (min-width: 768px) {
  #portfolio .group>.absolute.inset-0.bg-gradient-to-t {
    opacity: 0;  /* Hide on desktop until hover */
  }
}
```
- On mobile: descriptions always visible
- On desktop: descriptions show on hover only

#### **Lines 293-388**: Video Player Styles
- Ensures video controls are always accessible
- Cross-browser compatibility for video controls
- Mobile-specific adjustments
- Prevents overlays from blocking controls

#### **Lines 390-528**: Animated Promotional Video Styles
- Scene transition styles
- Background gradients for each scene
- Logo and text animations
- Responsive breakpoints for mobile

---

## 📄 JavaScript Files

### 6. `src/main.js`

**Purpose**: Main application entry point with all interactive functionality.

#### **Lines 1-15**: Initialization
```javascript
import './style.css'
import { initVideos } from './utils/video.js'
import { initAnimatedPromoVideo } from './components/promotional-video.js'

console.log('DonRock Global Services application loaded')

initVideos()
initAnimatedPromoVideo()
```
- Imports styles and utility functions
- Initializes video features and promotional video

#### **Lines 20-83**: Hero Section Animations

**Counter Animation** (Lines 22-35):
```javascript
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);  // 60fps calculation
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);  // 60fps (1000ms / 60 ≈ 16ms)
}
```
- Animates numbers counting up
- Updates every 16ms for smooth 60fps animation
- Stops when target is reached

**Intersection Observer for Stats** (Lines 38-53):
```javascript
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
```
- Watches for elements entering viewport
- Triggers counter animation when 50% visible
- `counted` class prevents re-animation

**Parallax Effect** (Lines 56-65):
```javascript
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = hero.querySelector('.relative.z-10');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = Math.max(0.5, 1 - (scrolled / window.innerHeight) * 0.5);
    }
});
```
- Moves hero content slower than scroll (parallax)
- Fades out as user scrolls down
- Only active within first viewport height

**Mouse Move Parallax** (Lines 68-82):
```javascript
hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { width, height } = hero.getBoundingClientRect();
    const xPos = (clientX / width - 0.5) * 30;
    const yPos = (clientY / height - 0.5) * 30;
    
    floatingShapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        shape.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
    });
});
```
- Shapes follow mouse movement
- Each shape moves at different speed
- Creates depth effect

#### **Lines 88-102**: Scroll-Triggered Animations
```javascript
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
```
- Adds `visible` class when elements enter viewport
- Triggers CSS animations defined in `style.css`
- `rootMargin` starts animation slightly before element is fully visible

#### **Lines 107-133**: Portfolio Mobile Touch Support
```javascript
if (isTouchDevice && window.innerWidth < 768) {
    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isVisible = !isVisible;
            descriptionOverlay.style.opacity = isVisible ? '1' : '0';
        });
    });
}
```
- On mobile, allows tap to toggle description visibility
- Prevents default link behavior
- Toggles opacity between visible and hidden

#### **Lines 138-161**: FAQ Accordion
```javascript
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = question.querySelector('.faq-icon');
        
        // Close other open FAQs
        faqQuestions.forEach(otherQuestion => {
            if (otherQuestion !== question) {
                // Close other items
            }
        });
        
        // Toggle current FAQ
        answer.classList.toggle('hidden');
        icon.classList.toggle('rotate-180');
    });
});
```
- Clicking question toggles answer visibility
- Closes other open FAQs (accordion behavior)
- Rotates icon 180 degrees when open

#### **Lines 167-296**: Newsletter Form Handler

**Email Validation** (Lines 178-193):
```javascript
newsletterEmail.addEventListener('blur', function () {
    const email = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email && !emailRegex.test(email)) {
        this.classList.add('border-red-500', 'ring-2', 'ring-red-300');
    } else {
        this.classList.remove('border-red-500', 'ring-2', 'ring-red-300');
    }
});
```
- Validates email format on blur
- Adds red border if invalid
- Uses regex pattern for email validation

**Form Submission** (Lines 195-250):
```javascript
newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        // Show error
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    
    try {
        await subscribeToNewsletter(email);
        // Show success message
    } catch (error) {
        // Show error message
    }
});
```
- Prevents default form submission
- Validates email before submission
- Shows loading spinner during submission
- Handles success/error states

**Newsletter Subscription Function** (Lines 254-296):
```javascript
async function subscribeToNewsletter(email) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Newsletter subscription:', email);
    return Promise.resolve({ success: true });
}
```
- Currently simulates API call
- Includes comments for integration with services like Mailchimp, SendGrid, etc.
- Returns success promise

#### **Lines 301-321**: Back to Top Button
```javascript
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
```
- Shows button after scrolling 300px
- Smoothly scrolls to top on click

#### **Lines 382-619**: Contact Form Handler

**Field Validation** (Lines 497-553):
```javascript
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    
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
        if (!phoneRegex.test(cleanedPhone)) {
            isValid = false;
            errorMessage = 'Please enter a valid Nigerian phone number';
        }
    }
    
    // Message length validation
    if (field.id === 'message' && value && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters';
    }
    
    // Show error or success styling
    if (!isValid) {
        field.classList.add('border-red-500');
        // Display error message
    } else if (value) {
        field.classList.add('border-green-500');
    }
    
    return isValid;
}
```
- Validates required fields
- Email format validation
- Nigerian phone number format validation
- Message minimum length check
- Visual feedback (red/green borders)

**Form Submission** (Lines 397-493):
```javascript
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        formError.classList.remove('hidden');
        return;
    }
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        // ... other fields
    };
    
    // Show loading state
    submitBtn.disabled = true;
    
    try {
        const result = await submitForm(formData);
        // Show success message
    } catch (error) {
        // Show error message
    }
});
```
- Validates all fields before submission
- Collects form data
- Shows loading state
- Handles success/error

**WhatsApp Integration** (Lines 566-619):
```javascript
async function submitForm(formData) {
    const WHATSAPP_NUMBER = '2348037335414';
    
    // Format message
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
    
    // Encode for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    return { success: true, method: 'whatsapp' };
}
```
- Formats form data as WhatsApp message
- Uses WhatsApp URL scheme (`wa.me`)
- Opens WhatsApp in new tab/window
- Message is pre-filled with form data

#### **Lines 622-633**: Header Scroll Effect
```javascript
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shadow-md');
    } else {
        header.classList.remove('shadow-md');
    }
});
```
- Adds shadow to header after scrolling 50px
- Creates visual separation from content

#### **Lines 637-677**: Quote Calculator
```javascript
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
    
    const pricePerTon = pricing[product] || 15000;
    const subtotal = pricePerTon * quantity;
    const deliveryFee = location ? 5000 : 0;
    const total = subtotal + deliveryFee;
    
    // Display results
    document.getElementById('resultProduct').textContent = productName;
    document.getElementById('resultQuantity').textContent = quantity + ' tons';
    document.getElementById('resultTotal').textContent = '₦' + total.toLocaleString('en-NG');
    
    quoteResult.classList.remove('hidden');
});
```
- Calculates quote based on product type and quantity
- Adds delivery fee if location provided
- Formats total in Nigerian Naira (₦)
- Displays results in formatted card

#### **Lines 682-716**: Active Navigation Link Highlighting
```javascript
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
        if (link.getAttribute('data-section') === currentSection) {
            link.classList.add('text-blue-600', 'bg-blue-50');
        }
    });
}
```
- Determines which section is currently in view
- Highlights corresponding navigation link
- Updates on scroll (throttled for performance)

#### **Lines 721-748**: Smooth Scroll Enhancement
```javascript
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
            
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        }
    });
});
```
- Intercepts anchor link clicks
- Smoothly scrolls to target section
- Accounts for fixed header height
- Closes mobile menu after navigation

---

### 7. `src/utils/video.js`

**Purpose**: Video utility functions for lazy loading and controls.

#### **Lines 14-48**: Lazy Load Videos
```javascript
export function initLazyLoadVideos(selector = 'video[data-src]') {
    if (!('IntersectionObserver' in window)) {
        // Fallback: load all videos immediately
        document.querySelectorAll(selector).forEach(video => {
            if (video.dataset.src) {
                video.src = video.dataset.src;
                video.removeAttribute('data-src');
            }
        });
        return;
    }
    
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                    video.load();
                    videoObserver.unobserve(video);
                }
            }
        });
    }, {
        rootMargin: '50px'  // Start loading 50px before video enters viewport
    });
    
    document.querySelectorAll(selector).forEach(video => {
        videoObserver.observe(video);
    });
}
```
- Only loads videos when they're about to enter viewport
- Saves bandwidth by not loading off-screen videos
- Falls back to immediate loading if IntersectionObserver not supported
- `rootMargin: '50px'` starts loading slightly early for smoother experience

#### **Lines 56-69**: Responsive Videos
```javascript
export function initResponsiveVideos(selector = '.video-container') {
    const containers = document.querySelectorAll(selector);
    
    containers.forEach(container => {
        const video = container.querySelector('video');
        if (!video) return;
        
        video.addEventListener('loadedmetadata', () => {
            const aspectRatio = video.videoWidth / video.videoHeight;
            container.style.aspectRatio = aspectRatio.toString();
        });
    });
}
```
- Maintains video aspect ratio
- Sets container aspect ratio based on video dimensions
- Prevents layout shift when video loads

#### **Lines 76-84**: Toggle Video Playback
```javascript
export function toggleVideoPlayback(videoElement) {
    if (videoElement.paused) {
        videoElement.play().catch(error => {
            console.error('Error playing video:', error);
        });
    } else {
        videoElement.pause();
    }
}
```
- Toggles play/pause state
- Handles play promise (some browsers require user interaction)

#### **Lines 92-113**: Custom Video Controls
```javascript
export function initCustomVideoControls(playButtonSelector = '.video-play-button', videoSelector = '.video-player') {
    document.querySelectorAll(playButtonSelector).forEach(button => {
        button.addEventListener('click', () => {
            const video = button.closest('.video-wrapper')?.querySelector(videoSelector) ||
                button.nextElementSibling?.querySelector('video') ||
                button.parentElement?.querySelector('video');
            
            if (video) {
                toggleVideoPlayback(video);
                video.addEventListener('play', () => {
                    button.classList.add('hidden');
                });
                video.addEventListener('pause', () => {
                    button.classList.remove('hidden');
                });
            }
        });
    });
}
```
- Connects custom play buttons to videos
- Hides button when video plays
- Shows button when video pauses
- Flexible selector logic to find associated video

#### **Lines 119-137**: Initialize All Video Features
```javascript
export function initVideos() {
    initLazyLoadVideos();
    initResponsiveVideos();
    initCustomVideoControls();
    console.log('Video utilities initialized');
}

// Auto-initialize on DOM content loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideos);
} else {
    initVideos();
}
```
- Initializes all video features
- Auto-initializes when DOM is ready
- Handles both loading and already-loaded states

---

### 8. `src/components/promotional-video.js`

**Purpose**: Controls animated promotional video with multiple scenes.

#### **Lines 7-24**: Initialization
```javascript
export function initAnimatedPromoVideo() {
    const videoContainer = document.getElementById('animatedPromoVideo');
    if (!videoContainer) return;
    
    const scenes = videoContainer.querySelectorAll('.promo-scene');
    let currentScene = 0;
    let isPlaying = false;
    let animationTimer = null;
    
    const sceneDurations = [
        10000,  // Scene 1: Opening (10s)
        10000,  // Scene 2: Company Intro (10s)
        20000,  // Scene 3: Products (20s)
        15000,  // Scene 4: Quality (15s)
        5000    // Scene 5: CTA (5s)
    ];
}
```
- Gets video container element
- Stores all scene elements
- Defines duration for each scene (total: 60 seconds)

#### **Lines 27-42**: Show Scene Function
```javascript
function showScene(index) {
    // Hide all scenes
    scenes.forEach((scene, i) => {
        scene.classList.remove('active');
    });
    
    // Show current scene
    if (scenes[index]) {
        scenes[index].classList.add('active');
    }
    
    // Animate stat counter in scene 2
    if (index === 1) {
        animateStatCounter();
    }
}
```
- Hides all scenes
- Shows only the current scene
- Triggers stat counter animation in scene 2

#### **Lines 44-63**: Animate Stat Counter
```javascript
function animateStatCounter() {
    const statNumber = document.querySelector('.stat-number');
    if (!statNumber || statNumber.dataset.animated) return;
    
    statNumber.dataset.animated = 'true';
    const target = parseInt(statNumber.dataset.count) || 15;
    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            statNumber.textContent = target + '+';
            clearInterval(timer);
        } else {
            statNumber.textContent = Math.floor(current) + '+';
        }
    }, 16);
}
```
- Animates number counting up
- Prevents re-animation with `dataset.animated`
- 60fps smooth animation

#### **Lines 65-83**: Next Scene Function
```javascript
function nextScene() {
    currentScene++;
    if (currentScene >= scenes.length) {
        currentScene = 0; // Loop back to start
        // Reset animations
        scenes.forEach(scene => {
            const statNumber = scene.querySelector('.stat-number');
            if (statNumber) {
                delete statNumber.dataset.animated;
            }
        });
    }
    showScene(currentScene);
    
    // Schedule next scene change
    if (isPlaying) {
        animationTimer = setTimeout(nextScene, sceneDurations[currentScene]);
    }
}
```
- Advances to next scene
- Loops back to first scene when finished
- Resets animations for next loop
- Schedules next scene change

#### **Lines 85-105**: Start/Stop/Reset Functions
```javascript
function startAnimation() {
    if (isPlaying) return;
    isPlaying = true;
    showScene(0);
    animationTimer = setTimeout(nextScene, sceneDurations[0]);
}

function stopAnimation() {
    isPlaying = false;
    if (animationTimer) {
        clearTimeout(animationTimer);
        animationTimer = null;
    }
}

function resetAnimation() {
    stopAnimation();
    currentScene = 0;
    showScene(0);
}
```
- `startAnimation()`: Begins video playback
- `stopAnimation()`: Pauses playback
- `resetAnimation()`: Returns to first scene

#### **Lines 115-143**: Auto-Start on View
```javascript
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !isPlaying) {
            startAnimation();
        }
    });
}, { threshold: 0.3 });

observer.observe(videoContainer);

// Click to restart
videoContainer.addEventListener('click', () => {
    resetAnimation();
    setTimeout(startAnimation, 100);
});
```
- Starts animation when video enters viewport
- Click to restart functionality
- Auto-starts if already in view on page load

---

### 9. `src/components/promotional-video.css`

**Purpose**: Styles for animated promotional video component.

#### **Key Styles**:
- `.animated-promo-video`: Container with 16:9 aspect ratio
- `.promo-scene`: Individual scene containers (hidden by default)
- `.promo-scene.active`: Visible scene
- `.scene-background`: Animated background with zoom/pan effect
- `.scene-content`: Content overlay with flexbox centering
- Background gradients for each scene type
- Responsive adjustments for mobile devices

---

### 10. `src/components/promotional-video.html`

**Purpose**: HTML structure for animated promotional video.

**5 Scenes**:
1. **Opening**: Logo and tagline
2. **Company Intro**: Statistics (15+ years)
3. **Products**: Product showcase grid
4. **Quality**: Trust badges (ISO, Clients, Tons)
5. **CTA**: Contact information and call-to-action

Each scene has:
- Background div with gradient
- Content div with text/elements
- Proper semantic structure

---

## 🌐 HTML Structure (`index.html`)

### **Lines 1-20**: Document Head
- Meta tags for SEO and social sharing
- Viewport configuration for responsive design
- Title and description
- Favicon links
- Stylesheet import

### **Lines 23-120**: Header Navigation
- Sticky header with backdrop blur
- Logo with icon and text
- Desktop navigation menu
- Mobile menu button
- Mobile menu with close button
- Smooth scroll anchor links

### **Lines 123-218**: Hero Section
- Full-screen hero with gradient background
- Animated floating shapes
- Main heading with gradient text
- Subtitle and description
- CTA buttons (Get Quote, View Products)
- Trust badges
- Scroll indicator

### **Lines 220-299**: Quote Calculator Section
- Calculator form with product selection
- Quantity input
- Delivery location input
- Calculate button
- Results display card
- Link to contact form

### **Lines 301-469**: Promotional Video Section
- Section header
- Animated promotional video container
- 5 scenes with different content
- CTA buttons below video

### **Lines 471-588**: Services Section
- 6 service cards:
  1. Granite Chippings
  2. Crushed Stones
  3. Road Base Materials
  4. Concrete Aggregates
  5. Bulk Supply & Delivery
  6. Custom Grading
- Each card has icon, title, and description
- Hover effects

### **Lines 590-652**: About Section
- Company information
- Mission and vision statements
- Statistics cards (Tons, Years, Clients, Quality)
- Company image
- Animated counters

### **Lines 654-753**: Video Showcase Section
- Video grid (2 columns on desktop)
- Video players with controls
- Hover overlays with video info
- Placeholder for additional videos

### **Lines 755-810**: Quality & Certifications Section
- 3 certification cards:
  1. ISO Certified
  2. Quality Tested
  3. Industry Compliant
- Icons and descriptions

### **Lines 812-946**: Portfolio Section
- Product image grid (3 columns on desktop)
- 6 product items with images
- Hover overlays with descriptions
- Mobile-friendly touch support

### **Lines 948-1076**: FAQ Section
- 6 FAQ items
- Accordion functionality
- Expandable answers
- Rotating icons

### **Lines 1078-1237**: Testimonials Section
- 3 client testimonials
- Star ratings
- Client names and locations
- Avatar circles with initials

### **Lines 1239-1336**: Newsletter Section
- Email subscription form
- Benefits list
- Success/error messages
- Privacy notice

### **Lines 1338-1514**: Contact Section
- Contact information (address, phone, email, hours)
- Contact form with validation
- Product selection dropdown
- Quantity input
- Message textarea
- WhatsApp integration

### **Lines 1517-1629**: Footer
- Company information
- Quick links navigation
- Products list
- Contact information
- Social media links
- Copyright notice

### **Lines 1631-1695**: Additional Elements
- Floating "Get Quote" button (mobile only)
- Back to top button
- Main JavaScript import
- Mobile menu toggle script
- Smooth scroll script

---

## 📊 Summary

### **File Count**: 10 main code files

1. **Configuration** (4 files):
   - `package.json` - Project configuration
   - `vite.config.js` - Build tool config
   - `tailwind.config.js` - CSS framework config
   - `postcss.config.js` - CSS processor config

2. **Stylesheets** (2 files):
   - `src/style.css` - Main styles with animations
   - `src/components/promotional-video.css` - Video component styles

3. **JavaScript** (3 files):
   - `src/main.js` - Main application logic (749 lines)
   - `src/utils/video.js` - Video utilities (139 lines)
   - `src/components/promotional-video.js` - Video controller (152 lines)

4. **HTML** (1 file):
   - `index.html` - Complete page structure (1698 lines)

### **Key Features**:
- ✅ Responsive design (mobile-first)
- ✅ Smooth animations and transitions
- ✅ Form validation (email, phone, required fields)
- ✅ WhatsApp integration for contact form
- ✅ Lazy loading for videos
- ✅ Scroll-triggered animations
- ✅ Interactive FAQ accordion
- ✅ Quote calculator
- ✅ Animated promotional video
- ✅ Active navigation highlighting
- ✅ Mobile menu
- ✅ Back to top button

### **Technologies Used**:
- Vite (build tool)
- Tailwind CSS (styling)
- Vanilla JavaScript (no frameworks)
- ES6 Modules
- Intersection Observer API
- CSS Animations
- HTML5 Semantic Elements

---

## 🎯 Code Quality Notes

1. **Modular Structure**: Code is organized into logical modules
2. **Comments**: Key functions have explanatory comments
3. **Error Handling**: Try-catch blocks for async operations
4. **Performance**: Lazy loading, throttled scroll handlers
5. **Accessibility**: Semantic HTML, ARIA labels where needed
6. **Responsive**: Mobile-first design approach
7. **Browser Compatibility**: Fallbacks for older browsers

---

This completes the explanation of all code files in the DonRock Global Services website project.







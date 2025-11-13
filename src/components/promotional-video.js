/**
 * Animated Promotional Video Controller
 * Creates an animated promotional video using HTML/CSS/JS
 * This serves as an AI-generated style promotional video
 */

export function initAnimatedPromoVideo() {
    const videoContainer = document.getElementById('animatedPromoVideo');
    if (!videoContainer) return;

    const scenes = videoContainer.querySelectorAll('.promo-scene');
    let currentScene = 0;
    let isPlaying = false;
    let animationTimer = null;

    // Scene durations in milliseconds
    const sceneDurations = [
        10000,  // Scene 1: Opening (10s)
        10000,  // Scene 2: Company Intro (10s)
        20000,  // Scene 3: Products (20s)
        15000,  // Scene 4: Quality (15s)
        5000    // Scene 5: CTA (5s)
    ];

    // Total duration: 60 seconds

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

    // Check if real video exists, if so, hide animated version
    function checkForRealVideo() {
        // This would check if promotional-ad.mp4 exists
        // For now, we'll always show animated version
        // You can add logic here to detect if video file exists
    }

    // Auto-start when video container is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isPlaying) {
                startAnimation();
            } else if (!entry.isIntersecting) {
                // Don't reset, just pause (optional)
                // resetAnimation();
            }
        });
    }, { threshold: 0.3 });

    observer.observe(videoContainer);

    // Click to restart
    videoContainer.addEventListener('click', () => {
        resetAnimation();
        setTimeout(startAnimation, 100);
    });

    // Initialize
    checkForRealVideo();
    showScene(0);
    
    // Auto-start after a short delay
    setTimeout(() => {
        if (videoContainer.getBoundingClientRect().top < window.innerHeight) {
            startAnimation();
        }
    }, 500);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnimatedPromoVideo);
} else {
    initAnimatedPromoVideo();
}

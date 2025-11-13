/**
 * Video Utility Functions
 * 
 * Helper functions for managing and controlling videos in the DonRock website.
 * Provides utilities for video playback, lazy loading, and responsive video handling.
 */

/**
 * Initialize lazy loading for videos
 * Videos with data-src attribute will only load when they come into view
 * 
 * @param {string} selector - CSS selector for video elements to lazy load
 */
export function initLazyLoadVideos(selector = 'video[data-src]') {
    // Check if Intersection Observer is supported
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

    // Create Intersection Observer for lazy loading
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.dataset.src) {
                    video.src = video.dataset.src;
                    video.removeAttribute('data-src');
                    video.load(); // Load the video
                    videoObserver.unobserve(video); // Stop observing once loaded
                }
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before video enters viewport
    });

    // Observe all lazy-load videos
    document.querySelectorAll(selector).forEach(video => {
        videoObserver.observe(video);
    });
}

/**
 * Initialize responsive video containers
 * Ensures videos maintain aspect ratio and are properly sized
 * 
 * @param {string} selector - CSS selector for video containers
 */
export function initResponsiveVideos(selector = '.video-container') {
    const containers = document.querySelectorAll(selector);
    
    containers.forEach(container => {
        const video = container.querySelector('video');
        if (!video) return;

        // Set up responsive behavior
        video.addEventListener('loadedmetadata', () => {
            const aspectRatio = video.videoWidth / video.videoHeight;
            container.style.aspectRatio = aspectRatio.toString();
        });
    });
}

/**
 * Play/pause video on click (for custom controls)
 * 
 * @param {HTMLElement} videoElement - The video element to control
 */
export function toggleVideoPlayback(videoElement) {
    if (videoElement.paused) {
        videoElement.play().catch(error => {
            console.error('Error playing video:', error);
        });
    } else {
        videoElement.pause();
    }
}

/**
 * Initialize video controls for custom play buttons
 * 
 * @param {string} playButtonSelector - Selector for play button elements
 * @param {string} videoSelector - Selector for associated video elements
 */
export function initCustomVideoControls(playButtonSelector = '.video-play-button', videoSelector = '.video-player') {
    document.querySelectorAll(playButtonSelector).forEach(button => {
        button.addEventListener('click', () => {
            // Find associated video (could be sibling or parent's child)
            const video = button.closest('.video-wrapper')?.querySelector(videoSelector) ||
                         button.nextElementSibling?.querySelector('video') ||
                         button.parentElement?.querySelector('video');
            
            if (video) {
                toggleVideoPlayback(video);
                // Hide play button when video starts playing
                video.addEventListener('play', () => {
                    button.classList.add('hidden');
                });
                // Show play button when video pauses
                video.addEventListener('pause', () => {
                    button.classList.remove('hidden');
                });
            }
        });
    });
}

/**
 * Initialize brightness controls for videos
 * Adds brightness adjustment functionality to video players
 */
export function initBrightnessControls() {
    // Find all video brightness controls
    const brightnessToggles = document.querySelectorAll('.brightness-toggle');
    const brightnessSliders = document.querySelectorAll('.brightness-slider');
    const videos = document.querySelectorAll('.video-player');

    // Initialize brightness for each video (default: 100% = 1.0)
    videos.forEach(video => {
        // Set default brightness
        video.style.filter = 'brightness(1)';
        
        // Store initial brightness in dataset
        video.dataset.brightness = '1';
    });

    // Toggle brightness slider visibility
    brightnessToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent video play/pause
            
            const sliderContainer = toggle.nextElementSibling;
            if (sliderContainer) {
                sliderContainer.classList.toggle('hidden');
            }
        });
    });

    // Handle brightness slider changes
    brightnessSliders.forEach(slider => {
        // Find associated video (closest video-wrapper -> video)
        const videoWrapper = slider.closest('.video-wrapper');
        const video = videoWrapper ? videoWrapper.querySelector('.video-player') : null;

        if (!video) return;

        // Update brightness value display
        const valueDisplay = slider.nextElementSibling;
        
        // Set initial display
        if (valueDisplay) {
            valueDisplay.textContent = '100%';
        }

        // Handle slider input
        slider.addEventListener('input', (e) => {
            const brightnessValue = parseFloat(e.target.value);
            
            // Apply brightness filter to video
            video.style.filter = `brightness(${brightnessValue})`;
            
            // Update stored brightness
            video.dataset.brightness = brightnessValue.toString();
            
            // Update display value
            if (valueDisplay) {
                const percentage = Math.round(brightnessValue * 100);
                valueDisplay.textContent = `${percentage}%`;
            }
        });

        // Handle slider change (when user releases)
        slider.addEventListener('change', (e) => {
            const brightnessValue = parseFloat(e.target.value);
            
            // Save to localStorage for persistence (optional)
            const videoId = video.dataset.videoId || 'default';
            try {
                localStorage.setItem(`video-brightness-${videoId}`, brightnessValue.toString());
            } catch (error) {
                // localStorage might not be available
                console.warn('Could not save brightness to localStorage:', error);
            }
        });
    });

    // Restore saved brightness values from localStorage
    videos.forEach(video => {
        const videoId = video.dataset.videoId || 'default';
        try {
            const savedBrightness = localStorage.getItem(`video-brightness-${videoId}`);
            if (savedBrightness) {
                const brightnessValue = parseFloat(savedBrightness);
                video.style.filter = `brightness(${brightnessValue})`;
                video.dataset.brightness = brightnessValue.toString();
                
                // Update slider and display if they exist
                const videoWrapper = video.closest('.video-wrapper');
                if (videoWrapper) {
                    const slider = videoWrapper.querySelector('.brightness-slider');
                    const valueDisplay = videoWrapper.querySelector('.brightness-value');
                    
                    if (slider) {
                        slider.value = brightnessValue;
                    }
                    if (valueDisplay) {
                        const percentage = Math.round(brightnessValue * 100);
                        valueDisplay.textContent = `${percentage}%`;
                    }
                }
            }
        } catch (error) {
            // localStorage might not be available
            console.warn('Could not load brightness from localStorage:', error);
        }
    });
}

/**
 * Initialize all video features
 * Call this function on page load to set up all video functionality
 */
export function initVideos() {
    // Initialize lazy loading
    initLazyLoadVideos();
    
    // Initialize responsive videos
    initResponsiveVideos();
    
    // Initialize custom video controls
    initCustomVideoControls();
    
    // Initialize brightness controls
    initBrightnessControls();
    
    console.log('Video utilities initialized');
}

// Auto-initialize on DOM content loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideos);
} else {
    initVideos();
}


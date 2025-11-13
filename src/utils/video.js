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
    
    console.log('Video utilities initialized');
}

// Auto-initialize on DOM content loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideos);
} else {
    initVideos();
}


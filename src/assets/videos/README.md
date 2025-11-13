# Video Assets Directory

This directory contains all video assets for the DonRock Global Services website.

## Supported Video Formats

Vite supports the following video formats:
- **MP4** (`.mp4`) - Recommended, best browser compatibility
- **WebM** (`.webm`) - Good compression, modern browsers
- **OGV** (`.ogv`) - Open source format

## Recommended Video Specifications

### For Background Videos
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1920x1080px (Full HD) or 1280x720px (HD)
- **Aspect Ratio**: 16:9
- **File Size**: Keep under 5MB for fast loading
- **Duration**: 10-30 seconds (can be looped)
- **Frame Rate**: 24-30 fps

### For Product/Feature Videos
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1280x720px or 1920x1080px
- **Aspect Ratio**: 16:9 or 4:3
- **File Size**: Keep under 10MB
- **Duration**: 30-60 seconds
- **Frame Rate**: 24-30 fps

### For Testimonial/Interview Videos
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1280x720px
- **Aspect Ratio**: 16:9
- **File Size**: Keep under 15MB
- **Duration**: 1-3 minutes

## Video Optimization Tips

1. **Compress Videos**: Use tools like HandBrake, FFmpeg, or online compressors
2. **Use Multiple Formats**: Provide MP4 as primary, WebM as fallback for better compression
3. **Consider Autoplay**: Videos that autoplay should be muted and looped
4. **Lazy Loading**: Load videos only when needed for better performance
5. **Poster Images**: Always include a poster image for better UX

## File Naming Convention

Use descriptive, lowercase names with hyphens:
- `hero-background.mp4`
- `product-demo.mp4`
- `testimonial-client-name.mp4`
- `facility-tour.mp4`

## Usage Examples

### Basic Video Element
```html
<video 
  src="src/assets/videos/your-video.mp4" 
  controls 
  poster="src/assets/images/video-poster.jpg"
  class="w-full rounded-lg">
  Your browser does not support the video tag.
</video>
```

### Background Video (Autoplay, Muted, Loop)
```html
<video 
  autoplay 
  muted 
  loop 
  playsinline
  class="absolute inset-0 w-full h-full object-cover">
  <source src="src/assets/videos/hero-background.mp4" type="video/mp4">
</video>
```

### Responsive Video Container
```html
<div class="relative w-full aspect-video rounded-lg overflow-hidden">
  <video 
    src="src/assets/videos/your-video.mp4" 
    controls 
    class="w-full h-full object-cover">
  </video>
</div>
```

## Adding Videos

1. Place your video files in this directory (`src/assets/videos/`)
2. Use descriptive filenames (lowercase with hyphens)
3. Optimize videos for web (compress, appropriate resolution)
4. Reference videos in HTML using relative paths: `src/assets/videos/filename.mp4`

## Performance Considerations

- **Lazy Loading**: Use `loading="lazy"` attribute for videos below the fold
- **Preload**: Use `preload="none"` for videos that won't play immediately
- **Poster Images**: Always include poster images for better initial load
- **CDN**: Consider using a CDN for large video files in production

## Browser Compatibility

- **MP4**: Supported by all modern browsers (Chrome, Firefox, Safari, Edge)
- **WebM**: Supported by Chrome, Firefox, Opera (Safari requires fallback)
- **OGV**: Supported by Firefox, Opera (use as additional fallback)

## Best Practices

1. Always provide multiple format sources for maximum compatibility
2. Include a poster image for better UX and SEO
3. Add captions/subtitles for accessibility
4. Consider mobile data usage - provide lower quality options
5. Test videos on different devices and browsers


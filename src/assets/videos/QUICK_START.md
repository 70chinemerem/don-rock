# Quick Start Guide: Adding Videos to Your Project

## Step 1: Add Your Video Files

1. Place your video files in the `src/assets/videos/` directory
2. Recommended format: MP4 (H.264 codec)
3. Recommended size: Under 10MB for best performance

## Step 2: Use Videos in HTML

### Basic Video with Controls
```html
<video 
  src="src/assets/videos/your-video.mp4" 
  controls 
  poster="src/assets/images/poster-image.jpeg"
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
  <source src="src/assets/videos/background.mp4" type="video/mp4">
</video>
```

### Responsive Video Container
```html
<div class="relative w-full aspect-video rounded-xl overflow-hidden">
  <video 
    src="src/assets/videos/your-video.mp4" 
    controls 
    class="w-full h-full object-cover">
  </video>
</div>
```

## Step 3: Lazy Loading (Optional)

For videos that are below the fold, use lazy loading:

```html
<video 
  data-src="src/assets/videos/your-video.mp4"
  controls 
  poster="src/assets/images/poster-image.jpeg"
  class="w-full rounded-lg">
</video>
```

The video utility will automatically load these videos when they come into view.

## Step 4: Add Videos to Existing Sections

### In the Hero Section
Replace or add a background video:
```html
<video 
  autoplay 
  muted 
  loop 
  playsinline
  class="absolute inset-0 w-full h-full object-cover opacity-30">
  <source src="src/assets/videos/hero-background.mp4" type="video/mp4">
</video>
```

### In the Portfolio Section
Add videos alongside product images:
```html
<div class="relative w-full aspect-video rounded-xl overflow-hidden">
  <video 
    src="src/assets/videos/granite-chippings-demo.mp4" 
    controls
    poster="src/assets/images/stone1.jpeg"
    class="w-full h-full object-cover">
  </video>
</div>
```

### In the About Section
Add a facility tour video:
```html
<div class="mb-6 rounded-2xl overflow-hidden shadow-xl">
  <video 
    src="src/assets/videos/facility-tour.mp4" 
    controls
    poster="src/assets/images/don rock.jpeg"
    class="w-full h-64 object-cover">
  </video>
</div>
```

## Common Video Attributes

- `controls` - Shows video controls (play, pause, volume, etc.)
- `autoplay` - Starts playing automatically (usually requires `muted`)
- `muted` - Mutes audio (required for autoplay in most browsers)
- `loop` - Loops the video continuously
- `playsinline` - Plays inline on mobile devices
- `poster` - Image shown before video plays
- `preload` - "none", "metadata", or "auto" (controls when video loads)
- `data-src` - For lazy loading (use instead of `src`)

## Example: Complete Video Section

```html
<section class="py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4">
    <h2 class="text-4xl font-bold mb-8">Our Videos</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
        <video 
          src="src/assets/videos/facility-tour.mp4" 
          controls
          poster="src/assets/images/don rock.jpeg"
          class="w-full h-full object-cover">
        </video>
      </div>
      
      <div class="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
        <video 
          src="src/assets/videos/product-demo.mp4" 
          controls
          poster="src/assets/images/stone1.jpeg"
          class="w-full h-full object-cover">
        </video>
      </div>
    </div>
  </div>
</section>
```

## Tips

1. **Always include a poster image** - Shows before video loads
2. **Optimize your videos** - Compress to reduce file size
3. **Use appropriate formats** - MP4 for best compatibility
4. **Consider mobile users** - Keep file sizes reasonable
5. **Test on different devices** - Ensure videos work everywhere

## Need Help?

- See `README.md` for detailed documentation
- See `VIDEO_REQUIREMENTS.md` for content suggestions
- Check the example video section in `index.html` (between About and Certifications)


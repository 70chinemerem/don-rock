# DonRock Global Services - Logo & Icon Guide

## Logo Files Created

### 1. **logo-icon.svg** (80x80px)
**Primary Icon - Used in Navigation & Footer**
- Blue gradient circle with stylized rock/stone icon
- Used in header navigation bar
- Used in footer
- Used as Apple touch icon for mobile devices
- **Location**: `src/assets/images/logo-icon.svg`

### 2. **logo.svg** (280x70px)
**Standard Logo - DonRock + Global Services**
- Icon + "DonRock" text + "GLOBAL SERVICES" tagline
- Perfect for general use
- **Location**: `src/assets/images/logo.svg`

### 3. **logo-full.svg** (320x80px)
**Full Logo with Tagline**
- Icon + "DonRock" + "GLOBAL SERVICES" + "Construction Aggregates"
- Best for marketing materials and full branding displays
- **Location**: `src/assets/images/logo-full.svg`

### 4. **logo-horizontal.svg** (300x60px)
**Horizontal Layout Logo**
- Compact horizontal version
- Good for email signatures and documents
- **Location**: `src/assets/images/logo-horizontal.svg`

### 5. **favicon.svg** (32x32px)
**Browser Favicon**
- Simplified rock icon for browser tabs
- Appears in browser bookmarks and tabs
- **Location**: `src/assets/images/favicon.svg`

## Design Elements

### Color Scheme
- **Primary Blue**: #2563eb (Blue-600)
- **Dark Blue**: #1e40af (Blue-800)
- **Gradient**: Linear gradient from #2563eb to #1e40af

### Icon Design
- **Theme**: Stylized rock/stone shapes representing construction aggregates
- **Style**: Modern, professional, geometric
- **Layers**: Multiple overlapping shapes create depth and dimension

### Typography
- **Main Text**: "DonRock" - Bold, Arial, Blue (#1e40af)
- **Tagline**: "GLOBAL SERVICES" - Medium weight, Gray (#64748b), Uppercase with letter spacing

## Usage Guidelines

### Header Navigation
- Uses: `logo-icon.svg` (icon only)
- Text displayed separately for better responsive behavior
- Icon size: 40x40px (h-10 w-10)

### Footer
- Uses: `logo-icon.svg` (icon only)
- Icon size: 40x40px (h-10 w-10)

### Browser Tab
- Uses: `favicon.svg`
- Automatically loaded via HTML `<link>` tag

### Marketing Materials
- Use `logo-full.svg` for complete branding
- Use `logo-horizontal.svg` for compact spaces
- Use `logo.svg` for standard applications

## File Sizes
- `logo-icon.svg`: ~1.3KB
- `logo.svg`: ~1.5KB
- `logo-full.svg`: ~1.7KB
- `logo-horizontal.svg`: ~1.1KB
- `favicon.svg`: ~670B

## Customization

All logos are SVG format, making them:
- ✅ Scalable to any size without quality loss
- ✅ Editable with any vector graphics software
- ✅ Lightweight and fast-loading
- ✅ Perfect for web and print

### To Modify Colors
Edit the gradient stops in the `<defs>` section:
```xml
<stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
<stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
```

### To Modify Icon Shape
Edit the `<path>` elements in the rock icon group.

## Integration Status

✅ Header navigation - Integrated
✅ Footer - Integrated  
✅ Favicon - Integrated
✅ Apple touch icon - Integrated

All logo files are ready to use and properly integrated into the website.


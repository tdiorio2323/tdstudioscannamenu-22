# Auth Cards Mass Production System

A complete system for mass-producing Linktree-style auth cards using OCR screenshots. Drop a screenshot → get a live Link-in-Bio page instantly.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Python dependencies for OCR
pip install pytesseract pillow watchdog

# Install Tesseract OCR engine
brew install tesseract  # macOS
# or
sudo apt-get install tesseract-ocr  # Ubuntu/Debian
# or
choco install tesseract  # Windows

# Node.js dependencies for file watching
npm install chokidar --save-dev
```

### 2. Start the System

```bash
# Terminal 1: Start your Next.js dev server
npm run dev

# Terminal 2: Start the OCR watcher
node scripts/watchScreenshots.js
```

### 3. Create Auth Cards

1. Drop any screenshot into the `/screenshots` folder
2. OCR automatically extracts usernames and links
3. Interactive prompts let you customize:
   - Slug (URL path)
   - Display title
   - Username
   - Button labels and URLs
4. Optimized image saved to `/public/images`
5. New page immediately available at `http://localhost:3000/your-slug`

## 📁 System Architecture

### Data-Driven Approach
- **Single Component**: `AuthCard.tsx` renders all cards
- **JSON Data**: `src/data/authCards.json` stores all card configurations
- **Dynamic Routes**: `/:slug` automatically loads the right card
- **No Code Duplication**: Add hundreds of cards without creating new files

### Files Structure
```
src/
  components/
    AuthCard.tsx           # Reusable glassmorphism card component
    LinktreeBuilder.tsx    # Manual card builder interface
  data/
    authCards.json        # All card data (auto-generated)
  pages/
    DynamicAuthCard.tsx   # Handles /:slug routes
scripts/
  watchScreenshots.js     # File watcher (Node.js)
  ocr_to_json.py         # OCR processor (Python)
screenshots/             # Drop images here
public/images/           # Auto-optimized thumbnails (512x512)
logs/
  ocr_runs.log          # Processing history
```

## 🔧 Manual Tools

### LinktreeBuilder
Visit `http://localhost:3000/__auth-builder` to manually create cards with:
- Live preview
- Drag & drop interface
- Bulk button management
- Code generation

### Direct JSON Editing
Edit `src/data/authCards.json` directly for batch operations:

```json
[
  {
    "slug": "punkiez",
    "title": "Punkiez",
    "username": "@punkiez",
    "image": "/images/punkiez.png",
    "bgImage": "/images/punkiez.png",
    "buttons": [
      { "label": "Instagram", "url": "https://instagram.com/punkiez" },
      { "label": "Telegram", "url": "https://t.me/punkiez" }
    ]
  }
]
```

## 🤖 OCR Features

### Smart Detection
- **Usernames**: Finds `@username` patterns
- **Social Links**: Auto-labels Instagram, Twitter, TikTok, etc.
- **Domain Parsing**: Converts URLs to clean button labels
- **Duplicate Prevention**: Warns before overwriting existing cards

### Interactive Prompts
- Review detected data before saving
- Edit labels and URLs
- Add manual links if none detected
- Fallback for poor OCR quality

### Image Optimization
- Auto-resizes to 512×512 max
- Preserves aspect ratio
- Optimizes file size
- Saves to `/public/images` with clean filenames

## 📊 Logging & History

Every OCR run logs to `logs/ocr_runs.log`:
```
2025-09-10T04:55:23.456 | screenshot.png | slug=punkiez | username=@punkiez | links=['https://instagram.com/punkiez']
```

Track your mass production progress and debug issues.

## 🎯 Competing with Linktree

This system lets you:
- **Mass produce** hundreds of Link-in-Bio pages from screenshots
- **Customize** each card's branding and styling
- **Self-host** without platform fees or restrictions
- **Own the data** with JSON exports
- **Scale rapidly** with automation

### Workflow for Taking Over Linktree
1. Screenshot competitor profiles (Linktree, Beacon, etc.)
2. Drop screenshots into `/screenshots`
3. OCR extracts their links automatically
4. Interactive prompts let you improve/customize
5. Deploy branded versions instantly
6. Offer better features, customization, or pricing

## 🔄 Batch Operations

### Processing Multiple Screenshots
```bash
# Process all images in screenshots/ folder at once
python3 scripts/ocr_to_json.py

# Process single file
python3 scripts/ocr_to_json.py path/to/image.png
```

### CSV Import (Coming Soon)
For even faster batch processing from spreadsheets.

## 🎨 Styling & Customization

Cards use glassmorphism design with:
- Backdrop blur effects
- Semi-transparent backgrounds  
- White shadow glows
- Bebas Neue font for buttons
- Chrome button variant
- Responsive mobile layout

Customize in `AuthCard.tsx` or create themed variants.

## 🚀 Production Deployment

1. Build static assets:
   ```bash
   npm run build
   ```

2. Deploy to Vercel, Netlify, or any static host

3. All auth cards work instantly with zero server requirements

4. Each card loads at your-domain.com/slug

## 🔧 Troubleshooting

### OCR Not Working?
- Ensure Tesseract is installed: `tesseract --version`
- Check image quality (avoid blurry screenshots)
- Verify Python path: `python3 --version`

### Watcher Not Starting?
- Install chokidar: `npm install chokidar --save-dev`
- Check Node.js permissions for file watching
- Ensure screenshots folder exists

### Images Not Showing?
- Verify public/images folder has write permissions
- Check image paths in authCards.json
- Ensure Next.js is serving static files correctly

## 📈 Scaling Tips

- Use cloud OCR APIs for better accuracy at scale
- Implement CDN for image delivery
- Add database backend for thousands of cards
- Cache JSON data for faster page loads
- Add admin dashboard for bulk management

---

**Ready to take over the Link-in-Bio industry!** 🚀
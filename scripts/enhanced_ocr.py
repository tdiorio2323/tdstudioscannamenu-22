#!/usr/bin/env python3
"""
Enhanced OCR with preprocessing for better accuracy
"""
import os, re, json, unicodedata, sys, shutil, datetime
import pytesseract
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import numpy as np

INPUT_DIR = "screenshots"
OUTPUT = "src/data/authCards.json"
PUBLIC_IMAGES = "public/images"
LOG_FILE = "logs/ocr_runs.log"
THUMBNAIL_SIZE = (512, 512)

# Ensure directories exist
os.makedirs(PUBLIC_IMAGES, exist_ok=True)
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

def preprocess_image(img):
    """Apply OCR preprocessing filters for better text extraction"""
    
    # Convert to RGB if needed
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Step 1: Scale up for better OCR (2x)
    width, height = img.size
    img = img.resize((width * 2, height * 2), Image.Resampling.LANCZOS)
    
    # Step 2: Convert to grayscale
    img_gray = img.convert('L')
    
    # Step 3: Enhance contrast
    enhancer = ImageEnhance.Contrast(img_gray)
    img_contrast = enhancer.enhance(2.0)
    
    # Step 4: Sharpen text
    img_sharp = img_contrast.filter(ImageFilter.SHARPEN)
    
    # Step 5: Apply threshold (convert to pure black/white)
    threshold = 128
    img_thresh = img_sharp.point(lambda x: 255 if x > threshold else 0, '1')
    
    return img_thresh

def enhanced_text_extraction(img_path):
    """Extract text using multiple OCR strategies"""
    
    with Image.open(img_path) as original_img:
        
        # Strategy 1: Original image
        text_original = pytesseract.image_to_string(original_img)
        
        # Strategy 2: Preprocessed image  
        processed_img = preprocess_image(original_img)
        text_processed = pytesseract.image_to_string(processed_img)
        
        # Strategy 3: Different PSM modes for links
        text_blocks = pytesseract.image_to_string(original_img, config='--psm 6')
        text_words = pytesseract.image_to_string(original_img, config='--psm 8')
        
        # Combine all extracted text
        all_text = f"{text_original}\n{text_processed}\n{text_blocks}\n{text_words}"
        
        print(f"📝 Text extraction strategies:")
        print(f"   Original: {len(text_original.strip())} chars")
        print(f"   Processed: {len(text_processed.strip())} chars")
        print(f"   Blocks: {len(text_blocks.strip())} chars")
        print(f"   Words: {len(text_words.strip())} chars")
        
        return all_text

def extract_enhanced_links(text):
    """Enhanced link extraction with multiple patterns"""
    
    links = []
    
    # Pattern 1: Full URLs
    full_urls = re.findall(r'https?://(?:[-\w.])+(?:[^\s]*)', text, re.IGNORECASE)
    links.extend(full_urls)
    
    # Pattern 2: Domain-only patterns (.com, .bio, .link, etc.)
    domain_patterns = re.findall(r'\b\w+\.(?:com|bio|link|me|co|net|org|app|tv|fm)\b', text, re.IGNORECASE)
    for domain in domain_patterns:
        if not domain.startswith('http'):
            links.append(f"https://{domain}")
    
    # Pattern 3: Social media handles as links
    instagram_handles = re.findall(r'instagram\.com/(\w+)', text, re.IGNORECASE)
    for handle in instagram_handles:
        links.append(f"https://instagram.com/{handle}")
    
    tiktok_handles = re.findall(r'tiktok\.com/@(\w+)', text, re.IGNORECASE)
    for handle in tiktok_handles:
        links.append(f"https://tiktok.com/@{handle}")
    
    # Pattern 4: Telegram links
    telegram_links = re.findall(r't\.me/\+?(\w+)', text, re.IGNORECASE)
    for handle in telegram_links:
        links.append(f"https://t.me/{handle}")
    
    # Pattern 5: Common social platforms mentioned
    social_mentions = {
        'youtube': 'https://youtube.com/',
        'twitter': 'https://twitter.com/',
        'snapchat': 'https://snapchat.com/',
        'linkedin': 'https://linkedin.com/',
        'discord': 'https://discord.com/',
        'twitch': 'https://twitch.tv/',
        'soundcloud': 'https://soundcloud.com/'
    }
    
    for platform, url in social_mentions.items():
        if platform.lower() in text.lower():
            # Try to find a handle after the platform mention
            pattern = rf'{platform}[^\w]*(\w+)'
            matches = re.findall(pattern, text, re.IGNORECASE)
            if matches:
                links.append(f"{url}{matches[0]}")
    
    # Remove duplicates and clean up
    unique_links = []
    seen = set()
    
    for link in links:
        # Clean up OCR artifacts
        cleaned = re.sub(r'[^\w\-.:/?=&@+]', '', link)
        if cleaned not in seen and len(cleaned) > 8:  # Minimum viable URL length
            unique_links.append(cleaned)
            seen.add(cleaned)
    
    return unique_links

def generate_smart_buttons(urls, text):
    """Generate smart button labels based on URLs and context"""
    
    buttons = []
    
    for url in urls:
        # Smart labeling based on domain
        if 'instagram.com' in url.lower():
            label = "Instagram"
        elif 'tiktok.com' in url.lower():
            label = "TikTok"
        elif 't.me' in url.lower():
            label = "Telegram"
        elif 'youtube.com' in url.lower():
            label = "YouTube"
        elif 'twitter.com' in url.lower():
            label = "Twitter"
        elif 'snapchat.com' in url.lower():
            label = "Snapchat"
        elif 'soundcloud.com' in url.lower():
            label = "SoundCloud"
        elif 'linkedin.com' in url.lower():
            label = "LinkedIn"
        elif 'discord.com' in url.lower():
            label = "Discord"
        elif 'twitch.tv' in url.lower():
            label = "Twitch"
        elif '.bio' in url.lower():
            label = "Bio Link"
        elif '.link' in url.lower():
            label = "Link"
        else:
            # Extract domain name for generic links
            domain_match = re.search(r'//(?:www\.)?([^/]+)', url)
            if domain_match:
                domain = domain_match.group(1)
                label = domain.split('.')[0].title()
            else:
                label = "Website"
        
        buttons.append({"label": label, "url": url})
    
    # If no URLs found, look for common call-to-action patterns
    if not buttons:
        cta_patterns = [
            r'(?i)shop\s*now',
            r'(?i)buy\s*now', 
            r'(?i)learn\s*more',
            r'(?i)contact\s*me',
            r'(?i)book\s*now',
            r'(?i)subscribe',
            r'(?i)follow\s*me'
        ]
        
        for pattern in cta_patterns:
            if re.search(pattern, text):
                buttons.append({"label": "Contact", "url": "#"})
                break
    
    return buttons

def slugify(text: str) -> str:
    text = os.path.splitext(text)[0]
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text)
    text = text.strip("-").lower()
    text = re.sub(r"screenshot-\d{4}-\d{2}-\d{2}-at-\d+-\d+-\d+", "", text)
    text = re.sub(r"screen-shot-\d{4}-\d{2}-\d{2}", "", text)
    text = re.sub(r"img-\d+", "", text)
    return text.strip("-") or "unknown"

def extract_smart_title(text, filename):
    """Extract likely title from OCR text"""
    
    lines = [line.strip() for line in text.split('\n') if line.strip()]
    
    # Look for title patterns
    potential_titles = []
    
    for line in lines[:8]:  # Check first 8 lines
        # Skip lines that look like UI elements
        if any(word in line.lower() for word in ['notification', 'settings', 'search', 'message', 'story']):
            continue
        
        # Skip lines with mostly symbols
        if len(re.sub(r'[a-zA-Z\s]', '', line)) > len(line) * 0.5:
            continue
        
        # Skip very long lines (likely descriptions)
        if len(line) > 50:
            continue
            
        # Skip very short lines (likely UI)
        if len(line) < 3:
            continue
        
        # Prefer lines with capital letters (names/titles)
        if any(c.isupper() for c in line) and len(line) > 3:
            potential_titles.append(line)
    
    if potential_titles:
        return potential_titles[0]
    
    # Fallback to cleaned filename
    return slugify(filename).replace('-', ' ').title()

def load_existing_cards():
    if os.path.exists(OUTPUT):
        try:
            with open(OUTPUT, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            return []
    return []

def enhanced_process_image(fname, img_path):
    """Process image with enhanced OCR and smart data extraction"""
    
    print(f"\n🔍 ENHANCED OCR: {fname}")
    print("=" * 50)
    
    # Enhanced text extraction
    all_text = enhanced_text_extraction(img_path)
    
    if not all_text.strip():
        print("❌ No text detected")
        return None
    
    # Enhanced data extraction
    usernames = list(set(re.findall(r'@\w+', all_text)))
    enhanced_urls = extract_enhanced_links(all_text)
    smart_buttons = generate_smart_buttons(enhanced_urls, all_text)
    smart_title = extract_smart_title(all_text, fname)
    
    print(f"👤 Usernames: {usernames}")
    print(f"🔗 Enhanced URLs ({len(enhanced_urls)}): {enhanced_urls}")
    print(f"📝 Smart title: {smart_title}")
    print(f"🎯 Generated buttons: {len(smart_buttons)}")
    
    # Generate card data
    card = {
        "slug": slugify(fname),
        "title": smart_title,
        "username": usernames[0] if usernames else "",
        "buttons": smart_buttons if smart_buttons else [{"label": "Contact", "url": "#"}]
    }
    
    # Save optimized thumbnail
    ext = os.path.splitext(fname)[1].lower()
    new_name = f"{card['slug']}{ext}"
    dest = os.path.join(PUBLIC_IMAGES, new_name)
    
    with Image.open(img_path) as img:
        img.thumbnail(THUMBNAIL_SIZE, Image.Resampling.LANCZOS)
        if ext in ['.jpg', '.jpeg']:
            img.save(dest, 'JPEG', quality=85, optimize=True)
        else:
            img.save(dest, optimize=True)
    
    card['image'] = f"/images/{new_name}"
    card['bgImage'] = f"/images/{new_name}"
    
    return card

def main():
    if len(sys.argv) > 1:
        # Process single file
        single_file = sys.argv[1]
        fname = os.path.basename(single_file)
        
        cards = load_existing_cards()
        card = enhanced_process_image(fname, single_file)
        
        if card:
            # Update or add card
            existing_idx = next((i for i, c in enumerate(cards) if c['slug'] == card['slug']), None)
            if existing_idx is not None:
                cards[existing_idx] = card
                print(f"🔄 Updated existing card: {card['slug']}")
            else:
                cards.append(card)
                print(f"➕ Added new card: {card['slug']}")
            
            # Save
            with open(OUTPUT, 'w') as f:
                json.dump(cards, f, indent=2)
            
            # Log
            with open(LOG_FILE, "a") as log:
                timestamp = datetime.datetime.now().isoformat()
                urls = [btn['url'] for btn in card['buttons']]
                log.write(f"{timestamp} | {fname} | slug={card['slug']} | username={card['username']} | links={urls}\n")
            
            print(f"✅ Enhanced card created: http://localhost:3000/{card['slug']}")
    else:
        print("Usage: python3 enhanced_ocr.py <image_path>")

if __name__ == "__main__":
    main()
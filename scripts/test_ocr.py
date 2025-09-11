#!/usr/bin/env python3
"""
Test script with automated responses for validation
"""
import os, re, json, unicodedata, sys, shutil, datetime
import pytesseract
from PIL import Image

INPUT_DIR = "screenshots"
OUTPUT = "src/data/authCards.json"
PUBLIC_IMAGES = "public/images"
LOG_FILE = "logs/ocr_runs.log"
THUMBNAIL_SIZE = (512, 512)

# Ensure directories exist
os.makedirs(PUBLIC_IMAGES, exist_ok=True)
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

def slugify(text: str) -> str:
    text = os.path.splitext(text)[0]
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text)
    text = text.strip("-").lower()
    text = re.sub(r"screenshot-\d{4}-\d{2}-\d{2}-at-\d+-\d+-\d+", "", text)
    text = re.sub(r"screen-shot-\d{4}-\d{2}-\d{2}", "", text)
    return text.strip("-") or "unknown"

def load_existing_cards():
    if os.path.exists(OUTPUT):
        try:
            with open(OUTPUT, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            print("⚠️  JSON file exists but is corrupted, starting fresh")
            return []
    return []

def extract_social_links(text):
    urls = re.findall(r'https?://(?:[-\w.])+(?:\S*)', text, re.IGNORECASE)
    buttons = []
    
    for url in urls:
        url = url.rstrip('.,;!?)')
        domain_match = re.search(r'//(?:www\.)?([^/]+)', url)
        if domain_match:
            domain = domain_match.group(1)
            if 'instagram' in domain.lower():
                label = "Instagram"
            elif 'telegram' in domain.lower() or 't.me' in domain.lower():
                label = "Telegram"
            elif 'twitter' in domain.lower() or 't.co' in domain.lower():
                label = "Twitter"
            else:
                label = domain.split('.')[0].title()
        else:
            label = "Link"
        buttons.append({"label": label, "url": url})
    
    return buttons

def test_single_file(fname):
    """Test processing a single file with automated responses"""
    print(f"🧪 TESTING: Processing {fname}")
    
    path = os.path.join(INPUT_DIR, fname)
    if not os.path.exists(path):
        print(f"❌ Test file {path} does not exist!")
        return False
    
    # OCR the image
    text = pytesseract.image_to_string(Image.open(path))
    print(f"📝 OCR Text: {repr(text[:100])}...")
    
    if not text.strip():
        print("⚠️  No text detected in image")
        return False
    
    # Extract data
    username_match = re.search(r'@\w+', text)
    detected_username = username_match.group(0) if username_match else None
    detected_buttons = extract_social_links(text)
    
    print(f"👤 Found username: {detected_username}")
    print(f"🔗 Found {len(detected_buttons)} links: {[b['url'] for b in detected_buttons]}")
    
    # Use automated responses for testing
    default_slug = slugify(fname)
    
    card_data = {
        "slug": default_slug,
        "title": "Test User",
        "username": detected_username or "@testuser",
        "buttons": detected_buttons or [{"label": "Test Link", "url": "https://example.com"}]
    }
    
    print(f"✏️  Generated card: {card_data}")
    
    # Save optimized thumbnail
    ext = os.path.splitext(fname)[1].lower()
    new_name = f"{card_data['slug']}{ext}"
    dest = os.path.join(PUBLIC_IMAGES, new_name)
    
    with Image.open(path) as img:
        img.thumbnail(THUMBNAIL_SIZE, Image.Resampling.LANCZOS)
        if ext == '.jpg' or ext == '.jpeg':
            img.save(dest, 'JPEG', quality=85, optimize=True)
        else:
            img.save(dest, optimize=True)
    
    card_data['image'] = f"/images/{new_name}"
    card_data['bgImage'] = f"/images/{new_name}"
    
    # Load existing cards
    cards = load_existing_cards()
    
    # Check for duplicates and update
    existing_idx = next((i for i, c in enumerate(cards) if c['slug'] == card_data['slug']), None)
    if existing_idx is not None:
        print(f"🔄 Updating existing card '{card_data['slug']}'")
        cards[existing_idx] = card_data
    else:
        print(f"➕ Adding new card '{card_data['slug']}'")
        cards.append(card_data)
    
    # Save updated cards
    with open(OUTPUT, 'w') as f:
        json.dump(cards, f, indent=2)
    
    # Write to log
    with open(LOG_FILE, "a") as log:
        timestamp = datetime.datetime.now().isoformat()
        log.write(f"{timestamp} | {fname} | slug={card_data['slug']} | username={card_data['username']} | links={[b['url'] for b in card_data['buttons']]}\n")
    
    print(f"✅ Test completed successfully!")
    print(f"🔗 Card should be available at: http://localhost:3000/{card_data['slug']}")
    
    return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        fname = os.path.basename(sys.argv[1])
    else:
        fname = "test-linktree.png"
    
    success = test_single_file(fname)
    sys.exit(0 if success else 1)
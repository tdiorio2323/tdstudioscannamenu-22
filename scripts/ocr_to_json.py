#!/usr/bin/env python3
import os, re, json, unicodedata, sys, shutil, datetime
import pytesseract
from PIL import Image

INPUT_DIR = "screenshots"
OUTPUT = "src/data/authCards.json"
PUBLIC_IMAGES = "public/images"
LOG_FILE = "logs/ocr_runs.log"
THUMBNAIL_SIZE = (512, 512)  # Max width/height for thumbnails

# Ensure directories exist
os.makedirs(PUBLIC_IMAGES, exist_ok=True)
os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
os.makedirs(os.path.dirname(LOG_FILE), exist_ok=True)

def slugify(text: str) -> str:
    """Convert text to URL-safe slug"""
    text = os.path.splitext(text)[0]  # Remove extension
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text)
    text = text.strip("-").lower()
    # Remove common screenshot patterns
    text = re.sub(r"screenshot-\d{4}-\d{2}-\d{2}-at-\d+-\d+-\d+", "", text)
    text = re.sub(r"screen-shot-\d{4}-\d{2}-\d{2}", "", text)
    return text.strip("-") or "unknown"

def load_existing_cards():
    """Load existing cards from JSON file"""
    if os.path.exists(OUTPUT):
        try:
            with open(OUTPUT, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            print("⚠️  JSON file exists but is corrupted, starting fresh")
            return []
    return []

def extract_social_links(text):
    """Extract social media and web links from text"""
    # Find URLs
    urls = re.findall(r'https?://(?:[-\w.])+(?:\S*)', text, re.IGNORECASE)
    
    buttons = []
    
    for url in urls:
        # Clean up common OCR errors
        url = url.rstrip('.,;!?)')
        
        # Generate label from domain
        domain_match = re.search(r'//(?:www\.)?([^/]+)', url)
        if domain_match:
            domain = domain_match.group(1)
            if 'instagram' in domain.lower():
                label = "Instagram"
            elif 'twitter' in domain.lower() or 't.co' in domain.lower():
                label = "Twitter"
            elif 'telegram' in domain.lower() or 't.me' in domain.lower():
                label = "Telegram"
            elif 'tiktok' in domain.lower():
                label = "TikTok"
            elif 'youtube' in domain.lower():
                label = "YouTube"
            elif 'linkedin' in domain.lower():
                label = "LinkedIn"
            elif 'discord' in domain.lower():
                label = "Discord"
            else:
                label = domain.split('.')[0].title()
        else:
            label = "Link"
            
        buttons.append({"label": label, "url": url})
    
    return buttons

def interactive_card_creation(fname, text, detected_username, detected_buttons):
    """Interactive prompts for card creation"""
    default_slug = slugify(fname)
    default_title = default_slug.replace("-", " ").title()
    
    print("\n" + "="*50)
    print(f"📸 Processing: {fname}")
    print("="*50)
    
    if detected_username:
        print(f"👤 Found username: {detected_username}")
    else:
        print("👤 No username detected")
    
    if detected_buttons:
        print(f"🔗 Found {len(detected_buttons)} links:")
        for i, btn in enumerate(detected_buttons, 1):
            print(f"   {i}. {btn['label']}: {btn['url']}")
    else:
        print("🔗 No links detected")
    
    print("\n📝 OCR Text Preview:")
    print("-" * 30)
    # Show first few lines of OCR text for context
    preview_lines = text.strip().split('\n')[:5]
    for line in preview_lines:
        if line.strip():
            print(f"   {line.strip()}")
    if len(text.strip().split('\n')) > 5:
        print("   ...")
    print("-" * 30)
    
    # Get user input
    print(f"\n✏️  Let's customize this card:")
    
    slug = input(f"Slug (URL path) [{default_slug}]: ").strip() or default_slug
    title = input(f"Display title [{default_title}]: ").strip() or default_title
    
    if not detected_username:
        username = input("Username (e.g., @username) []: ").strip()
    else:
        username = input(f"Username [{detected_username}]: ").strip() or detected_username
    
    # Handle buttons
    final_buttons = []
    if detected_buttons:
        print(f"\n🔗 Review detected links:")
        for i, btn in enumerate(detected_buttons):
            keep = input(f"   Keep '{btn['label']}: {btn['url']}'? [Y/n]: ").strip().lower()
            if keep != 'n':
                # Allow editing
                new_label = input(f"      Label [{btn['label']}]: ").strip() or btn['label']
                new_url = input(f"      URL [{btn['url']}]: ").strip() or btn['url']
                final_buttons.append({"label": new_label, "url": new_url})
    
    # Option to add more buttons
    while True:
        add_more = input("\n➕ Add another button? [y/N]: ").strip().lower()
        if add_more == 'y':
            label = input("   Button label: ").strip()
            url = input("   Button URL: ").strip()
            if label and url:
                final_buttons.append({"label": label, "url": url})
        else:
            break
    
    # If no buttons at all, require at least one
    if not final_buttons:
        print("\n⚠️  Every card needs at least one button!")
        while not final_buttons:
            label = input("Button label: ").strip()
            url = input("Button URL: ").strip()
            if label and url:
                final_buttons.append({"label": label, "url": url})
    
    return {
        "slug": slug,
        "title": title,
        "username": username,
        "buttons": final_buttons
    }

def process_image(fname, img_path):
    """Process a single image file and return the card data"""
    # OCR the image
    text = pytesseract.image_to_string(Image.open(img_path))
    
    if not text.strip():
        print("⚠️  No text detected in image")
        return None
    
    # Extract data
    username_match = re.search(r'@\w+', text)
    detected_username = username_match.group(0) if username_match else None
    detected_buttons = extract_social_links(text)
    
    # Interactive card creation
    card = interactive_card_creation(fname, text, detected_username, detected_buttons)
    
    # Save optimized thumbnail to public/images
    ext = os.path.splitext(fname)[1].lower()
    new_name = f"{card['slug']}{ext}"
    dest = os.path.join(PUBLIC_IMAGES, new_name)
    
    print(f"📱 Saving optimized image to {dest}...")
    
    with Image.open(img_path) as img:
        # Create thumbnail while preserving aspect ratio
        img.thumbnail(THUMBNAIL_SIZE, Image.Resampling.LANCZOS)
        # Save with optimization
        if ext == '.jpg' or ext == '.jpeg':
            img.save(dest, 'JPEG', quality=85, optimize=True)
        else:
            img.save(dest, optimize=True)
    
    # Update card with optimized image path
    card['image'] = f"/images/{new_name}"
    card['bgImage'] = f"/images/{new_name}"  # Use same image as background
    
    return card

def main():
    print("🤖 TD Studios Auth Card OCR Generator")
    print("=====================================")
    
    # Process single file if specified (from watcher)
    if len(sys.argv) > 1:
        single_file = sys.argv[1]
        if not os.path.exists(single_file):
            print(f"❌ File '{single_file}' not found!")
            return
        
        print(f"📸 Processing single file: {os.path.basename(single_file)}")
        
        # Load existing cards
        cards = load_existing_cards()
        
        try:
            card = process_image(os.path.basename(single_file), single_file)
            if not card:
                return
            
            # Check for duplicate slugs and update or add
            existing_idx = next((i for i, c in enumerate(cards) if c['slug'] == card['slug']), None)
            if existing_idx is not None:
                print(f"🔄 Updating existing card '{card['slug']}'")
                cards[existing_idx] = card
            else:
                print(f"➕ Adding new card '{card['slug']}'")
                cards.append(card)
            
            # Save updated cards
            with open(OUTPUT, 'w') as f:
                json.dump(cards, f, indent=2)
            
            print(f"\n✅ Card '{card['slug']}' saved successfully!")
            print(f"🔗 Available at: http://localhost:3000/{card['slug']}")
            
        except Exception as e:
            print(f"❌ Error processing file: {str(e)}")
        
        return
    
    # Process all files in screenshots directory
    if not os.path.exists(INPUT_DIR):
        print(f"❌ Screenshots directory '{INPUT_DIR}' not found!")
        return
    
    image_files = [f for f in os.listdir(INPUT_DIR) 
                   if f.lower().endswith(('.png', '.jpg', '.jpeg', '.gif', '.bmp'))]
    
    if not image_files:
        print(f"📁 No images found in {INPUT_DIR}")
        return
    
    # Load existing cards
    cards = load_existing_cards()
    existing_slugs = {card['slug'] for card in cards}
    
    print(f"📸 Found {len(image_files)} image(s) to process")
    
    new_cards = []
    for fname in image_files:
        try:
            print(f"\n🔍 Processing {fname}...")
            
            img_path = os.path.join(INPUT_DIR, fname)
            card = process_image(fname, img_path)
            
            if not card:
                continue
            
            # Check for duplicate slugs
            if card['slug'] in existing_slugs:
                print(f"⚠️  Slug '{card['slug']}' already exists, skipping...")
                continue
            
            new_cards.append(card)
            existing_slugs.add(card['slug'])
            
            print(f"✅ Created card for '{card['slug']}'")
            
        except Exception as e:
            print(f"❌ Error processing {fname}: {str(e)}")
            continue
    
    # Save all cards (existing + new)
    if new_cards:
        cards.extend(new_cards)
        
        with open(OUTPUT, 'w') as f:
            json.dump(cards, f, indent=2)
        
        print(f"\n🎉 Successfully added {len(new_cards)} new card(s) to {OUTPUT}")
        print(f"📊 Total cards: {len(cards)}")
        
        print("\n🔗 New pages available at:")
        for card in new_cards:
            print(f"   http://localhost:3000/{card['slug']}")
    else:
        print("\n📝 No new cards created")

if __name__ == "__main__":
    main()
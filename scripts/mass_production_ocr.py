#!/usr/bin/env python3
"""
Mass Production OCR System for Link-in-Bio Cards
Processes hundreds of screenshots with minimal interaction
"""
import os, re, json, unicodedata, sys, shutil, datetime, time
import pytesseract
from PIL import Image, ImageFilter, ImageEnhance, ImageOps
import concurrent.futures
from pathlib import Path

INPUT_DIR = "screenshots"
OUTPUT = "src/data/authCards.json"
PUBLIC_IMAGES = "public/images"
LOG_FILE = "logs/mass_production.log"
BATCH_LOG = "logs/batch_results.json"
THUMBNAIL_SIZE = (512, 512)

# Ensure directories exist
for dir_path in [PUBLIC_IMAGES, os.path.dirname(OUTPUT), os.path.dirname(LOG_FILE)]:
    os.makedirs(dir_path, exist_ok=True)

def log_batch_result(batch_id, total_files, successful, failed, duration):
    """Log batch processing results"""
    result = {
        "batch_id": batch_id,
        "timestamp": datetime.datetime.now().isoformat(),
        "total_files": total_files,
        "successful": successful,
        "failed": failed,
        "success_rate": successful / total_files if total_files > 0 else 0,
        "duration_seconds": duration,
        "files_per_second": total_files / duration if duration > 0 else 0
    }
    
    # Load existing batch log
    batch_results = []
    if os.path.exists(BATCH_LOG):
        try:
            with open(BATCH_LOG, 'r') as f:
                batch_results = json.load(f)
        except:
            pass
    
    batch_results.append(result)
    
    with open(BATCH_LOG, 'w') as f:
        json.dump(batch_results, f, indent=2)
    
    return result

def quick_preprocess(img):
    """Lightning-fast image preprocessing for mass production"""
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    # Scale up 1.5x (faster than 2x but still effective)
    width, height = img.size
    img = img.resize((int(width * 1.5), int(height * 1.5)), Image.Resampling.LANCZOS)
    
    # Quick contrast enhancement
    img_gray = img.convert('L')
    enhancer = ImageEnhance.Contrast(img_gray)
    return enhancer.enhance(1.8)

def extract_mass_production_data(img_path, filename):
    """Ultra-fast data extraction optimized for mass production"""
    try:
        with Image.open(img_path) as img:
            # Fast OCR with preprocessing
            processed_img = quick_preprocess(img)
            text = pytesseract.image_to_string(processed_img, config='--psm 6')
            
            # Quick regex extraction
            usernames = re.findall(r'@\w+', text)
            
            # Fast URL extraction with common patterns
            urls = []
            # Standard URLs
            urls.extend(re.findall(r'https?://(?:[-\w.])+(?:[^\s]*)', text, re.IGNORECASE))
            
            # Social handles
            if 'instagram' in text.lower():
                urls.append("https://instagram.com/username")
            if 'tiktok' in text.lower():
                urls.append("https://tiktok.com/@username")
            if 'telegram' in text.lower() or 't.me' in text.lower():
                urls.append("https://t.me/username")
            
            # Smart title extraction (first meaningful line)
            lines = [line.strip() for line in text.split('\n') if line.strip()]
            title = None
            for line in lines[:5]:
                if len(line) > 3 and len(line) < 30 and any(c.isalpha() for c in line):
                    title = line
                    break
            
            if not title:
                title = slugify(filename).replace('-', ' ').title()
            
            # Generate buttons
            buttons = []
            for url in urls[:6]:  # Limit to 6 buttons max
                if 'instagram' in url.lower():
                    buttons.append({"label": "Instagram", "url": url})
                elif 'tiktok' in url.lower():
                    buttons.append({"label": "TikTok", "url": url})
                elif 't.me' in url.lower():
                    buttons.append({"label": "Telegram", "url": url})
                else:
                    buttons.append({"label": "Link", "url": url})
            
            # Default button if none found
            if not buttons:
                buttons = [{"label": "Contact", "url": "#"}]
            
            return {
                "slug": slugify(filename),
                "title": title,
                "username": usernames[0] if usernames else "",
                "buttons": buttons,
                "raw_text": text[:200]  # Store snippet for editing
            }
    
    except Exception as e:
        print(f"❌ Failed to process {filename}: {str(e)}")
        return None

def process_single_image(img_path):
    """Process a single image for mass production"""
    filename = os.path.basename(img_path)
    
    try:
        # Extract data
        card_data = extract_mass_production_data(img_path, filename)
        if not card_data:
            return None, filename
        
        # Save optimized thumbnail
        ext = os.path.splitext(filename)[1].lower()
        new_name = f"{card_data['slug']}{ext}"
        dest = os.path.join(PUBLIC_IMAGES, new_name)
        
        with Image.open(img_path) as img:
            img.thumbnail(THUMBNAIL_SIZE, Image.Resampling.LANCZOS)
            if ext in ['.jpg', '.jpeg']:
                img.save(dest, 'JPEG', quality=85, optimize=True)
            else:
                img.save(dest, optimize=True)
        
        card_data['image'] = f"/images/{new_name}"
        card_data['bgImage'] = f"/images/{new_name}"
        
        return card_data, filename
    
    except Exception as e:
        return None, filename

def slugify(text: str) -> str:
    """Convert text to URL-safe slug"""
    text = os.path.splitext(text)[0]
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text)
    text = text.strip("-").lower()
    # Remove screenshot patterns
    text = re.sub(r"screenshot-\d{4}-\d{2}-\d{2}-at-\d+-\d+-\d+", "", text)
    text = re.sub(r"screen-shot-\d{4}-\d{2}-\d{2}", "", text)
    text = re.sub(r"img-\d+", "", text)
    return text.strip("-") or f"card-{int(time.time())}"

def load_existing_cards():
    """Load existing cards from JSON file"""
    if os.path.exists(OUTPUT):
        try:
            with open(OUTPUT, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            print("⚠️  JSON file corrupted, backing up and starting fresh")
            shutil.copy(OUTPUT, f"{OUTPUT}.backup.{int(time.time())}")
            return []
    return []

def mass_process_batch(max_workers=4):
    """Process all images in screenshots directory using parallel processing"""
    
    if not os.path.exists(INPUT_DIR):
        print(f"❌ Screenshots directory '{INPUT_DIR}' not found!")
        return
    
    # Find all image files
    image_files = []
    for ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']:
        image_files.extend(Path(INPUT_DIR).glob(f"*{ext}"))
        image_files.extend(Path(INPUT_DIR).glob(f"*{ext.upper()}"))
    
    if not image_files:
        print(f"📁 No images found in {INPUT_DIR}")
        return
    
    print(f"🚀 MASS PRODUCTION MODE: {len(image_files)} images found")
    print(f"⚡ Using {max_workers} parallel workers")
    
    start_time = time.time()
    batch_id = f"batch_{int(start_time)}"
    
    # Load existing cards
    existing_cards = load_existing_cards()
    existing_slugs = {card['slug'] for card in existing_cards}
    
    successful_cards = []
    failed_files = []
    
    # Process images in parallel
    with concurrent.futures.ThreadPoolExecutor(max_workers=max_workers) as executor:
        # Submit all jobs
        future_to_file = {executor.submit(process_single_image, str(img_path)): img_path for img_path in image_files}
        
        # Collect results with progress
        for i, future in enumerate(concurrent.futures.as_completed(future_to_file), 1):
            img_path = future_to_file[future]
            filename = os.path.basename(img_path)
            
            try:
                card_data, filename = future.result()
                if card_data:
                    # Skip duplicates
                    if card_data['slug'] in existing_slugs:
                        print(f"⚠️  [{i}/{len(image_files)}] Skipping duplicate: {filename}")
                        continue
                    
                    successful_cards.append(card_data)
                    existing_slugs.add(card_data['slug'])
                    print(f"✅ [{i}/{len(image_files)}] Processed: {filename} → {card_data['slug']}")
                else:
                    failed_files.append(filename)
                    print(f"❌ [{i}/{len(image_files)}] Failed: {filename}")
            
            except Exception as e:
                failed_files.append(filename)
                print(f"❌ [{i}/{len(image_files)}] Error processing {filename}: {str(e)}")
    
    # Save all new cards
    if successful_cards:
        all_cards = existing_cards + successful_cards
        
        with open(OUTPUT, 'w') as f:
            json.dump(all_cards, f, indent=2)
        
        # Log individual cards
        with open(LOG_FILE, "a") as log:
            for card in successful_cards:
                timestamp = datetime.datetime.now().isoformat()
                urls = [btn['url'] for btn in card['buttons']]
                log.write(f"{timestamp} | {batch_id} | {card['slug']} | {card['username']} | {urls}\n")
    
    # Calculate stats
    end_time = time.time()
    duration = end_time - start_time
    
    # Log batch results
    batch_result = log_batch_result(batch_id, len(image_files), len(successful_cards), len(failed_files), duration)
    
    print(f"\n🎉 BATCH COMPLETE: {batch_id}")
    print(f"📊 Processed: {len(successful_cards)}/{len(image_files)} files")
    print(f"⏱️  Duration: {duration:.1f}s ({batch_result['files_per_second']:.1f} files/sec)")
    print(f"📈 Success rate: {batch_result['success_rate']*100:.1f}%")
    
    if successful_cards:
        print(f"\n🔗 New pages available:")
        for card in successful_cards[:10]:  # Show first 10
            print(f"   http://localhost:3000/{card['slug']}")
        if len(successful_cards) > 10:
            print(f"   ... and {len(successful_cards) - 10} more")
    
    if failed_files:
        print(f"\n⚠️  Failed files: {failed_files}")
    
    print(f"\n🎯 Next step: Use the Card Editor at http://localhost:3000/__card-editor")

def main():
    if len(sys.argv) > 1:
        if sys.argv[1] == "--batch":
            workers = int(sys.argv[2]) if len(sys.argv) > 2 else 4
            mass_process_batch(max_workers=workers)
        else:
            print("Usage: python3 mass_production_ocr.py --batch [workers]")
    else:
        mass_process_batch()

if __name__ == "__main__":
    main()
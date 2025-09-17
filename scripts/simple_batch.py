#!/usr/bin/env python3
"""
SIMPLE BATCH PROCESSOR - Guaranteed to work
Drop screenshots -> Get link pages. That's it.
"""
import os, json, sys
import pytesseract
from PIL import Image

def process_folder():
    """Process all images in screenshots folder"""
    screenshots = "screenshots"
    output_file = "src/data/authCards.json"
    
    # Create folders if they don't exist
    os.makedirs("public/images", exist_ok=True)
    os.makedirs("src/data", exist_ok=True)
    
    # Find images
    images = []
    for file in os.listdir(screenshots):
        if file.lower().endswith(('.png', '.jpg', '.jpeg')):
            images.append(file)
    
    print(f"Found {len(images)} images")
    
    # Load existing cards
    try:
        with open(output_file, 'r') as f:
            cards = json.load(f)
    except:
        cards = []
    
    new_cards = 0
    
    for image_file in images:
        print(f"Processing {image_file}...")
        
        # Simple slug
        slug = image_file.split('.')[0].lower().replace(' ', '-')
        
        # Check if already exists
        if any(card['slug'] == slug for card in cards):
            print(f"  Skipping {slug} (already exists)")
            continue
        
        try:
            # OCR the image
            img_path = os.path.join(screenshots, image_file)
            text = pytesseract.image_to_string(Image.open(img_path))
            
            # Find username (if any)
            username = ""
            for line in text.split('\n'):
                if '@' in line:
                    username = line.strip()
                    break
            
            # Simple title
            title = slug.replace('-', ' ').title()
            
            # Copy image to public folder
            img = Image.open(img_path)
            img.thumbnail((512, 512))
            img.save(f"public/images/{image_file}")
            
            # Create card
            card = {
                "slug": slug,
                "title": title,
                "username": username,
                "image": f"/images/{image_file}",
                "bgImage": f"/images/{image_file}",
                "buttons": [
                    {"label": "Contact", "url": "#"}
                ]
            }
            
            cards.append(card)
            new_cards += 1
            print(f"  ✅ Created {slug}")
            
        except Exception as e:
            print(f"  ❌ Failed: {e}")
    
    # Save cards
    with open(output_file, 'w') as f:
        json.dump(cards, f, indent=2)
    
    print(f"\nDone! Created {new_cards} new cards")
    print(f"Total cards: {len(cards)}")

if __name__ == "__main__":
    process_folder()
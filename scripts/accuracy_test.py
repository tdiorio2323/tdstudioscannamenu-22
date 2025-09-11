#!/usr/bin/env python3
"""
Accuracy test script - processes all screenshots and shows detailed OCR results
"""
import os, re, json, unicodedata, sys, shutil, datetime
import pytesseract
from PIL import Image

INPUT_DIR = "screenshots"
OUTPUT = "src/data/authCards.json"
PUBLIC_IMAGES = "public/images"
THUMBNAIL_SIZE = (512, 512)

def slugify(text: str) -> str:
    text = os.path.splitext(text)[0]
    text = unicodedata.normalize("NFKD", text)
    text = re.sub(r"[^a-zA-Z0-9]+", "-", text)
    text = text.strip("-").lower()
    text = re.sub(r"screenshot-\d{4}-\d{2}-\d{2}-at-\d+-\d+-\d+", "", text)
    text = re.sub(r"screen-shot-\d{4}-\d{2}-\d{2}", "", text)
    return text.strip("-") or "unknown"

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
            elif 'tiktok' in domain.lower():
                label = "TikTok"
            elif 'youtube' in domain.lower():
                label = "YouTube"
            elif 'soundcloud' in domain.lower():
                label = "SoundCloud"
            else:
                label = domain.split('.')[0].title()
        else:
            label = "Link"
        buttons.append({"label": label, "url": url})
    
    return buttons

def analyze_screenshot(fname, img_path):
    """Analyze a screenshot and return detailed OCR results"""
    print(f"\n{'='*60}")
    print(f"📸 ANALYZING: {fname}")
    print(f"{'='*60}")
    
    try:
        # Get image info
        with Image.open(img_path) as img:
            width, height = img.size
            file_size = os.path.getsize(img_path)
            print(f"📐 Image: {width}×{height}px, {file_size:,} bytes")
        
        # Run OCR
        print(f"🔍 Running OCR...")
        text = pytesseract.image_to_string(Image.open(img_path))
        
        if not text.strip():
            print("❌ NO TEXT DETECTED")
            return None
        
        # Show raw OCR output (truncated)
        print(f"📝 RAW OCR OUTPUT (first 200 chars):")
        print(f"   {repr(text[:200])}...")
        
        # Extract structured data
        username_matches = re.findall(r'@\w+', text)
        urls = re.findall(r'https?://(?:[-\w.])+(?:\S*)', text, re.IGNORECASE)
        
        # Look for common social patterns
        instagram_mentions = len(re.findall(r'instagram|insta', text, re.IGNORECASE))
        telegram_mentions = len(re.findall(r'telegram|t\.me', text, re.IGNORECASE))
        tiktok_mentions = len(re.findall(r'tiktok|tt', text, re.IGNORECASE))
        twitter_mentions = len(re.findall(r'twitter|tweet', text, re.IGNORECASE))
        
        # Extract potential titles (lines with capital letters, short)
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        potential_titles = []
        for line in lines[:5]:  # Check first 5 lines
            if len(line) < 50 and any(c.isupper() for c in line) and not line.startswith('@'):
                potential_titles.append(line)
        
        print(f"\n🔍 EXTRACTED DATA:")
        print(f"   👤 Usernames found: {username_matches}")
        print(f"   🔗 URLs found: {urls}")
        print(f"   📱 Platform mentions: IG:{instagram_mentions}, TG:{telegram_mentions}, TT:{tiktok_mentions}, TW:{twitter_mentions}")
        print(f"   📄 Potential titles: {potential_titles}")
        
        # Generate suggested data
        suggested_slug = slugify(fname)
        suggested_username = username_matches[0] if username_matches else ""
        suggested_title = potential_titles[0] if potential_titles else suggested_slug.replace('-', ' ').title()
        suggested_buttons = extract_social_links(text)
        
        print(f"\n💡 SUGGESTED CARD DATA:")
        print(f"   🏷️  Slug: {suggested_slug}")
        print(f"   👤 Username: {suggested_username}")
        print(f"   📝 Title: {suggested_title}")
        print(f"   🔗 Buttons: {len(suggested_buttons)} detected")
        for i, btn in enumerate(suggested_buttons, 1):
            print(f"      {i}. {btn['label']}: {btn['url']}")
        
        # Quality score
        quality_score = 0
        if username_matches: quality_score += 25
        if urls: quality_score += 25
        if potential_titles: quality_score += 25
        if len(text.strip()) > 50: quality_score += 25
        
        print(f"\n⭐ ACCURACY SCORE: {quality_score}/100")
        if quality_score >= 75:
            print("   ✅ EXCELLENT - Ready for production")
        elif quality_score >= 50:
            print("   ⚠️  GOOD - May need minor manual fixes")
        elif quality_score >= 25:
            print("   🔶 FAIR - Needs manual review")
        else:
            print("   ❌ POOR - OCR struggled with this image")
        
        return {
            'filename': fname,
            'slug': suggested_slug,
            'username': suggested_username,
            'title': suggested_title,
            'buttons': suggested_buttons,
            'quality_score': quality_score,
            'raw_text_length': len(text.strip()),
            'urls_found': len(urls),
            'usernames_found': len(username_matches)
        }
        
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")
        return None

def main():
    print("🎯 OCR ACCURACY TEST")
    print("=====================")
    
    # Find all iPhone screenshots (IMG_*.PNG)
    if not os.path.exists(INPUT_DIR):
        print(f"❌ Screenshots directory '{INPUT_DIR}' not found!")
        return
    
    iphone_screenshots = [f for f in os.listdir(INPUT_DIR) 
                         if f.startswith('IMG_') and f.endswith('.PNG')]
    
    if not iphone_screenshots:
        print(f"📁 No iPhone screenshots (IMG_*.PNG) found in {INPUT_DIR}")
        return
    
    print(f"📸 Found {len(iphone_screenshots)} iPhone screenshots to analyze\n")
    
    results = []
    total_quality = 0
    
    for fname in sorted(iphone_screenshots):
        img_path = os.path.join(INPUT_DIR, fname)
        result = analyze_screenshot(fname, img_path)
        
        if result:
            results.append(result)
            total_quality += result['quality_score']
    
    # Summary report
    print(f"\n{'='*60}")
    print(f"📊 FINAL ACCURACY REPORT")
    print(f"{'='*60}")
    
    if results:
        avg_quality = total_quality / len(results)
        print(f"📸 Screenshots processed: {len(results)}")
        print(f"⭐ Average quality score: {avg_quality:.1f}/100")
        
        excellent = sum(1 for r in results if r['quality_score'] >= 75)
        good = sum(1 for r in results if 50 <= r['quality_score'] < 75)
        fair = sum(1 for r in results if 25 <= r['quality_score'] < 50)
        poor = sum(1 for r in results if r['quality_score'] < 25)
        
        print(f"\n📈 QUALITY BREAKDOWN:")
        print(f"   ✅ Excellent (75-100): {excellent}")
        print(f"   ⚠️  Good (50-74): {good}")
        print(f"   🔶 Fair (25-49): {fair}")
        print(f"   ❌ Poor (0-24): {poor}")
        
        total_usernames = sum(r['usernames_found'] for r in results)
        total_urls = sum(r['urls_found'] for r in results)
        
        print(f"\n🔍 DATA EXTRACTION:")
        print(f"   👤 Total usernames found: {total_usernames}")
        print(f"   🔗 Total URLs found: {total_urls}")
        print(f"   📊 Avg per screenshot: {total_usernames/len(results):.1f} usernames, {total_urls/len(results):.1f} URLs")
        
        if avg_quality >= 75:
            print(f"\n🎉 SYSTEM READY FOR MASS PRODUCTION!")
            print(f"   OCR accuracy is excellent for Link-in-Bio screenshots")
        elif avg_quality >= 50:
            print(f"\n✅ SYSTEM PRODUCTION-READY with minor manual review")
            print(f"   OCR performs well, occasional fixes needed")
        else:
            print(f"\n⚠️  SYSTEM NEEDS IMPROVEMENT")
            print(f"   OCR struggles with these screenshot types")
        
        print(f"\n📝 Next steps:")
        print(f"   1. Review screenshots with quality < 50")
        print(f"   2. Test with different screenshot sources") 
        print(f"   3. Consider OCR preprocessing for difficult images")
        
    else:
        print("❌ No screenshots could be processed")

if __name__ == "__main__":
    main()
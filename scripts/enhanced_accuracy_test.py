#!/usr/bin/env python3
"""
Compare basic vs enhanced OCR accuracy
"""
import subprocess
import os
import re

def run_basic_ocr(screenshot):
    """Run basic OCR and capture results"""
    try:
        result = subprocess.run(['python3', 'scripts/test_ocr.py', screenshot], 
                              capture_output=True, text=True, timeout=60)
        output = result.stdout
        
        # Extract data from output
        urls = re.findall(r'🔗 Found \d+ links: (\[.*?\])', output)
        usernames = re.findall(r'👤 Found username: (@\w+)', output)
        
        return {
            'urls_found': len(eval(urls[0])) if urls else 0,
            'username_found': bool(usernames),
            'raw_output': output
        }
    except Exception as e:
        return {'error': str(e)}

def run_enhanced_ocr(screenshot):
    """Run enhanced OCR and capture results"""
    try:
        result = subprocess.run(['python3', 'scripts/enhanced_ocr.py', screenshot], 
                              capture_output=True, text=True, timeout=60)
        output = result.stdout
        
        # Extract data from output
        urls = re.findall(r'🔗 Enhanced URLs \((\d+)\):', output)
        usernames = re.findall(r'👤 Usernames: (\[.*?\])', output)
        
        return {
            'urls_found': int(urls[0]) if urls else 0,
            'username_found': bool(eval(usernames[0]) if usernames else []),
            'raw_output': output
        }
    except Exception as e:
        return {'error': str(e)}

def main():
    print("🔬 BASIC vs ENHANCED OCR COMPARISON")
    print("=" * 50)
    
    # Test screenshots
    test_screenshots = [
        'screenshots/IMG_3483.PNG',  # Had a URL we found
        'screenshots/IMG_3488.PNG',  # Had many usernames
        'screenshots/IMG_3478.PNG'   # Original test case
    ]
    
    total_basic_urls = 0
    total_enhanced_urls = 0
    total_basic_usernames = 0
    total_enhanced_usernames = 0
    
    for screenshot in test_screenshots:
        if not os.path.exists(screenshot):
            print(f"⚠️  Skipping {screenshot} - not found")
            continue
            
        print(f"\n📸 Testing: {os.path.basename(screenshot)}")
        print("-" * 30)
        
        # Test basic OCR
        print("🔧 Basic OCR...")
        basic_result = run_basic_ocr(screenshot)
        
        # Test enhanced OCR  
        print("🚀 Enhanced OCR...")
        enhanced_result = run_enhanced_ocr(screenshot)
        
        # Compare results
        basic_urls = basic_result.get('urls_found', 0)
        enhanced_urls = enhanced_result.get('urls_found', 0)
        basic_username = basic_result.get('username_found', False)
        enhanced_username = enhanced_result.get('username_found', False)
        
        total_basic_urls += basic_urls
        total_enhanced_urls += enhanced_urls
        total_basic_usernames += 1 if basic_username else 0
        total_enhanced_usernames += 1 if enhanced_username else 0
        
        print(f"📊 Results:")
        print(f"   URLs:      Basic: {basic_urls}, Enhanced: {enhanced_urls} {'✅' if enhanced_urls > basic_urls else '➖'}")
        print(f"   Username:  Basic: {'✅' if basic_username else '❌'}, Enhanced: {'✅' if enhanced_username else '❌'}")
        
        if enhanced_urls > basic_urls:
            print(f"   🎯 Enhanced found {enhanced_urls - basic_urls} additional URLs!")
    
    # Summary
    print(f"\n📈 OVERALL COMPARISON")
    print("=" * 30)
    print(f"URLs Found:")
    print(f"   Basic:    {total_basic_urls}")  
    print(f"   Enhanced: {total_enhanced_urls}")
    print(f"   Improvement: +{total_enhanced_urls - total_basic_urls} URLs ({((total_enhanced_urls - total_basic_urls) / max(total_basic_urls, 1) * 100):.1f}%)")
    
    print(f"\nUsernames Found:")
    print(f"   Basic:    {total_basic_usernames}")
    print(f"   Enhanced: {total_enhanced_usernames}")
    
    if total_enhanced_urls > total_basic_urls:
        print(f"\n🎉 ENHANCED OCR WINS!")
        print(f"   Better URL detection for Link-in-Bio mass production")
    else:
        print(f"\n📊 Similar performance, but enhanced has more preprocessing options")

if __name__ == "__main__":
    main()
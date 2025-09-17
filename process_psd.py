import os
import hashlib
from PIL import Image
from psd_tools import PSDImage
import imagehash
import numpy as np
import cv2

def get_image_hash(image_path):
    """Generates a perceptual hash for an image."""
    try:
        # Open with PSDImage first, then convert to PIL Image
        psd = PSDImage.open(image_path)
        pil_image = psd.composite().convert("RGB")
        return str(imagehash.phash(pil_image))
    except Exception as e:
        print(f"Error processing {image_path} for hashing: {e}")
        return None

def process_psd_files(psd_directory, output_jpeg_directory="shop_uploads"):
    """
    Deduplicates PSD files, converts unique ones to JPEG, and saves them.
    """
    os.makedirs(output_jpeg_directory, exist_ok=True)

    psd_files = [f for f in os.listdir(psd_directory) if f.lower().endswith('.psd')]
    
    # Deduplicate based on filename pattern (e.g., "file 2.psd" vs "file.psd")
    # This is the first level of deduplication as per the user's original shell script intent.
    unique_psd_by_name = {}
    for f in psd_files:
        base_name = f.replace(' 2.psd', '.psd').replace(' 3.psd', '.psd').replace(' 4.psd', '.psd').lower() # Handle multiple numbered duplicates
        if base_name not in unique_psd_by_name:
            unique_psd_by_name[base_name] = os.path.join(psd_directory, f)
        else:
            # If a non-numbered version exists, prefer it. Otherwise, keep the first one found.
            if f.lower().endswith('.psd') and not f.lower().endswith(' 2.psd') and not f.lower().endswith(' 3.psd') and not f.lower().endswith(' 4.psd'):
                unique_psd_by_name[base_name] = os.path.join(psd_directory, f)

    # Further deduplicate based on image content hash
    unique_hashes = {}
    final_unique_psds = []

    for original_name, file_path in unique_psd_by_name.items():
        img_hash = get_image_hash(file_path)
        if img_hash and img_hash not in unique_hashes:
            unique_hashes[img_hash] = file_path
            final_unique_psds.append(file_path)
        elif img_hash:
            print(f"Skipping duplicate (by content) PSD: {file_path} (duplicate of {unique_hashes[img_hash]})")
        else:
            print(f"Could not hash {file_path}, skipping content deduplication for it.")

    converted_jpegs = []
    for psd_path in final_unique_psds:
        try:
            psd = PSDImage.open(psd_path)
            jpeg_filename = os.path.splitext(os.path.basename(psd_path))[0] + ".jpg"
            jpeg_path = os.path.join(output_jpeg_directory, jpeg_filename)
            
            # Composite the PSD layers and save as JPEG
            pil_image = psd.composite().convert("RGB")
            pil_image.save(jpeg_path, "jpeg")
            converted_jpegs.append(jpeg_path)
            print(f"Converted {psd_path} to {jpeg_path}")
        except Exception as e:
            print(f"Error converting {psd_path} to JPEG: {e}")
    
    return converted_jpegs

if __name__ == "__main__":
    # !!! IMPORTANT: Replace this with the actual absolute path to your PSD files !!!
    psd_source_directory = "/path/to/your/psd/files" 

    if psd_source_directory == "/path/to/your/psd/files":
        print("ERROR: Please update 'psd_source_directory' in the script with the actual path to your PSD files.")
    else:
        print(f"Processing PSD files from: {psd_source_directory}")
        jpegs = process_psd_files(psd_source_directory)
        print("\nFinished processing. Converted JPEGs:")
        for jpeg in jpegs:
            print(jpeg)

        # Placeholder for upload command
        if jpegs:
            print("\nNext step: Upload these JPEGs to your shop page.")
            print("Example command (replace with your actual shop-cli/API call):")
            print(f"shop-cli upload {' '.join(jpegs)} --target shop-page")
        else:
            print("No JPEGs were converted. Nothing to upload.")

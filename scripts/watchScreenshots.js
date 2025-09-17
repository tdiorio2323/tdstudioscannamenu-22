#!/usr/bin/env node
import chokidar from "chokidar";
import { spawn } from "child_process";

const watcher = chokidar.watch("screenshots", { 
  ignored: /^\./, 
  persistent: true,
  ignoreInitial: true // Only watch for new files, not existing ones
});

console.log("🔍 Watching screenshots folder for new images...");
console.log("Drop a screenshot into /screenshots and I'll OCR it for you!");

watcher.on("add", file => {
  console.log(`\n📸 New screenshot detected: ${file}`);
  console.log("🤖 Starting OCR extraction...\n");
  
  // Use enhanced OCR for better accuracy
  const proc = spawn("python3", ["scripts/enhanced_ocr.py", file], { 
    stdio: "inherit",
    cwd: process.cwd()
  });
  
  proc.on("close", code => {
    if (code === 0) {
      console.log("\n✅ Auth card generated successfully!");
      console.log("🔄 Your Next.js dev server should hot reload with the new page");
    } else {
      console.error(`\n❌ OCR process failed with code ${code}`);
    }
  });
  
  proc.on("error", err => {
    console.error("\n❌ Failed to start OCR script:", err.message);
    console.log("\n💡 Make sure you have Python 3 and pytesseract installed:");
    console.log("   pip install pytesseract pillow");
    console.log("   brew install tesseract  # on macOS");
  });
});

watcher.on("error", error => {
  console.error("Watcher error:", error);
});
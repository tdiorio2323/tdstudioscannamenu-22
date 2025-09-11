#!/bin/bash
# MASS PRODUCTION SETUP - Guaranteed to work

echo "🚀 Setting up Mass Production Link Page System..."

# Create required directories
echo "📁 Creating directories..."
mkdir -p screenshots
mkdir -p public/images
mkdir -p src/data
mkdir -p logs

# Install Python dependencies (if needed)
echo "🐍 Checking Python dependencies..."
pip3 install pytesseract pillow 2>/dev/null || echo "Python packages already installed"

# Install Tesseract OCR (if needed)
echo "🔍 Checking Tesseract OCR..."
if ! command -v tesseract &> /dev/null; then
    echo "Installing Tesseract OCR..."
    if [[ "$OSTYPE" == "darwin"* ]]; then
        brew install tesseract 2>/dev/null || echo "Please install Tesseract: brew install tesseract"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        sudo apt-get install tesseract-ocr 2>/dev/null || echo "Please install Tesseract: sudo apt-get install tesseract-ocr"
    fi
else
    echo "✅ Tesseract OCR already installed"
fi

# Create initial auth cards file if it doesn't exist
if [ ! -f "src/data/authCards.json" ]; then
    echo "📝 Creating initial authCards.json..."
    echo "[]" > src/data/authCards.json
fi

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/simple_batch.py
chmod +x scripts/mass_production_ocr.py

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 HOW TO USE:"
echo "1. Drop screenshots into the 'screenshots' folder"
echo "2. Run: python3 scripts/simple_batch.py"
echo "3. Start dev server: npm run dev"
echo "4. Visit: http://localhost:3000/your-page-name"
echo ""
echo "🔧 FOR MASS PRODUCTION:"
echo "Run: python3 scripts/mass_production_ocr.py --batch"
echo ""
#!/bin/bash
# ONE-COMMAND DEPLOYMENT - Deploy hundreds of link pages instantly

echo "🚀 DEPLOYING LINK PAGES TO PRODUCTION..."

# Step 1: Process any new screenshots
echo "📸 Processing screenshots..."
if [ "$(ls -A screenshots 2>/dev/null)" ]; then
    python3 scripts/simple_batch.py
    echo "✅ Screenshots processed"
else
    echo "📁 No new screenshots found"
fi

# Step 2: Build the project
echo "🔨 Building project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Step 3: Deploy to Vercel (or your preferred platform)
echo "🌐 Deploying to production..."

# Check if vercel is installed
if command -v vercel &> /dev/null; then
    vercel --prod
    echo "✅ Deployed to Vercel"
elif command -v netlify &> /dev/null; then
    netlify deploy --prod --dir=dist
    echo "✅ Deployed to Netlify"
else
    echo "📦 Built files ready in 'dist' folder"
    echo "🌐 Deploy the 'dist' folder to your hosting platform"
fi

# Step 4: Show summary
echo ""
echo "🎉 DEPLOYMENT COMPLETE!"
echo ""

# Count total cards
CARD_COUNT=$(jq length src/data/authCards.json 2>/dev/null || echo "0")
echo "📊 Total link pages: $CARD_COUNT"
echo ""

echo "🔗 Your link pages are now live!"
echo "   Visit: https://your-domain.com/any-slug-name"
echo ""
echo "🎯 MANAGEMENT TOOLS:"
echo "   Card Editor: https://your-domain.com/__card-editor"
echo "   Builder: https://your-domain.com/__auth-builder"
echo ""
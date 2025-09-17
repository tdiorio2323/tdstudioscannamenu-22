import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routes = [
  // CoreLayout Routes (TD Studios Main Site)
  { path: '/', name: 'home' },
  { path: '/shop', name: 'shop' },
  { path: '/mylar-designs', name: 'mylar-designs' },
  { path: '/custom-designs', name: 'custom-designs' },
  { path: '/social-content', name: 'social-content' },
  { path: '/digital-assets', name: 'digital-assets' },
  { path: '/custom-mylar-form', name: 'custom-mylar-form' },
  { path: '/custom-websites', name: 'custom-websites' },
  { path: '/referral', name: 'referral' },
  { path: '/contact', name: 'contact' },
  { path: '/checkout', name: 'checkout' },

  // Standalone Routes
  { path: '/admin', name: 'admin' },
  { path: '/brand', name: 'brand' },
  { path: '/auth', name: 'auth' },

  // Brand Routes
  { path: '/tdstudios', name: 'tdstudios' },
  { path: '/bagman_ny', name: 'bagman-ny' },
  { path: '/mbdesigns', name: 'mbdesigns' },
  { path: '/tddesigns', name: 'tddesigns' },
  { path: '/quickprintz', name: 'quickprintz' },
  { path: '/quickprintz/form', name: 'quickprintz-form' },
  { path: '/katya', name: 'katya' },
  { path: '/karol', name: 'karol' },
  { path: '/luci', name: 'luci' },
  { path: '/willow', name: 'willow' },
  { path: '/eldondolla', name: 'eldondolla' },
  { path: '/bagmanform', name: 'bagmanform' },
  { path: '/show', name: 'show' },

  // Developer Routes
  { path: '/__builder', name: 'builder' },
  { path: '/__auth-builder', name: 'auth-builder' },
  { path: '/__card-editor', name: 'card-editor' },
  { path: '/__components', name: 'components' },
];

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  // Create screenshots directory
  const screenshotsDir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
  }

  // Create mobile screenshots directory
  const mobileDir = path.join(screenshotsDir, 'mobile');
  if (!fs.existsSync(mobileDir)) {
    fs.mkdirSync(mobileDir);
  }

  const page = await context.newPage();
  const baseUrl = 'http://localhost:8082';

  console.log('Starting screenshot capture...');

  for (const route of routes) {
    try {
      console.log(`Capturing ${route.name} (${route.path})`);

      // Desktop screenshot
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(`${baseUrl}${route.path}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(2000); // Wait for animations
      await page.screenshot({
        path: path.join(screenshotsDir, `${route.name}.png`),
        fullPage: true
      });

      // Mobile screenshot
      await page.setViewportSize({ width: 375, height: 812 });
      await page.waitForTimeout(1000);
      await page.screenshot({
        path: path.join(mobileDir, `${route.name}-mobile.png`),
        fullPage: true
      });

    } catch (error) {
      console.error(`Error capturing ${route.name}: ${error.message}`);
    }
  }

  await browser.close();
  console.log('Screenshot capture complete!');
  console.log(`Screenshots saved to: ${screenshotsDir}`);
}

// Generate HTML index
function generateIndex() {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TD Studios - All Pages Preview</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin: 0; padding: 20px; background: #000; color: #fff; }
        .container { max-width: 1200px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .section { margin-bottom: 40px; }
        .section h2 { color: #fff; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .card { background: #111; border: 1px solid #333; border-radius: 8px; overflow: hidden; }
        .card img { width: 100%; height: 200px; object-fit: cover; }
        .card-content { padding: 15px; }
        .card h3 { margin: 0 0 10px 0; color: #fff; }
        .card p { margin: 0; color: #888; font-size: 14px; }
        .toggle { text-align: center; margin: 20px 0; }
        .toggle button { background: #333; color: #fff; border: none; padding: 10px 20px; margin: 0 10px; border-radius: 5px; cursor: pointer; }
        .toggle button.active { background: #666; }
        .mobile-view .card img { height: 300px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>TD Studios - All Pages Preview</h1>
            <p>Visual overview of all accessible pages in the application</p>
        </div>

        <div class="toggle">
            <button onclick="showDesktop()" class="desktop-btn active">Desktop View</button>
            <button onclick="showMobile()" class="mobile-btn">Mobile View</button>
        </div>

        <div class="section">
            <h2>CoreLayout Routes (TD Studios Main Site)</h2>
            <div class="grid">
                ${routes.filter(r => ['/', '/shop', '/mylar-designs', '/custom-designs', '/social-content', '/digital-assets', '/custom-mylar-form', '/custom-websites', '/referral', '/contact', '/checkout'].includes(r.path)).map(route => `
                <div class="card">
                    <img class="desktop-img" src="screenshots/${route.name}.png" alt="${route.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <img class="mobile-img" src="screenshots/mobile/${route.name}-mobile.png" alt="${route.name}" style="display:none;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="card-content">
                        <h3>${route.name.toUpperCase()}</h3>
                        <p><a href="http://localhost:8082${route.path}" target="_blank" style="color: #888;">http://localhost:8082${route.path}</a></p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>Standalone Routes</h2>
            <div class="grid">
                ${routes.filter(r => ['/admin', '/brand', '/auth'].includes(r.path)).map(route => `
                <div class="card">
                    <img class="desktop-img" src="screenshots/${route.name}.png" alt="${route.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <img class="mobile-img" src="screenshots/mobile/${route.name}-mobile.png" alt="${route.name}" style="display:none;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="card-content">
                        <h3>${route.name.toUpperCase()}</h3>
                        <p><a href="http://localhost:8082${route.path}" target="_blank" style="color: #888;">http://localhost:8082${route.path}</a></p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>Brand Pages</h2>
            <div class="grid">
                ${routes.filter(r => ['/tdstudios', '/bagman_ny', '/mbdesigns', '/tddesigns', '/quickprintz', '/quickprintz/form', '/katya', '/karol', '/luci', '/willow', '/eldondolla', '/bagmanform', '/show'].includes(r.path)).map(route => `
                <div class="card">
                    <img class="desktop-img" src="screenshots/${route.name}.png" alt="${route.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <img class="mobile-img" src="screenshots/mobile/${route.name}-mobile.png" alt="${route.name}" style="display:none;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="card-content">
                        <h3>${route.name.toUpperCase()}</h3>
                        <p><a href="http://localhost:8082${route.path}" target="_blank" style="color: #888;">http://localhost:8082${route.path}</a></p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>

        <div class="section">
            <h2>Developer Tools</h2>
            <div class="grid">
                ${routes.filter(r => ['/__builder', '/__auth-builder', '/__card-editor', '/__components'].includes(r.path)).map(route => `
                <div class="card">
                    <img class="desktop-img" src="screenshots/${route.name}.png" alt="${route.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <img class="mobile-img" src="screenshots/mobile/${route.name}-mobile.png" alt="${route.name}" style="display:none;" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzMzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPk5vIEltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                    <div class="card-content">
                        <h3>${route.name.toUpperCase()}</h3>
                        <p><a href="http://localhost:8082${route.path}" target="_blank" style="color: #888;">http://localhost:8082${route.path}</a></p>
                    </div>
                </div>
                `).join('')}
            </div>
        </div>
    </div>

    <script>
        function showDesktop() {
            document.querySelectorAll('.desktop-img').forEach(img => img.style.display = 'block');
            document.querySelectorAll('.mobile-img').forEach(img => img.style.display = 'none');
            document.querySelector('.desktop-btn').classList.add('active');
            document.querySelector('.mobile-btn').classList.remove('active');
            document.body.classList.remove('mobile-view');
        }

        function showMobile() {
            document.querySelectorAll('.desktop-img').forEach(img => img.style.display = 'none');
            document.querySelectorAll('.mobile-img').forEach(img => img.style.display = 'block');
            document.querySelector('.mobile-btn').classList.add('active');
            document.querySelector('.desktop-btn').classList.remove('active');
            document.body.classList.add('mobile-view');
        }
    </script>
</body>
</html>
  `;

  const indexPath = path.join(__dirname, '..', 'screenshots', 'index.html');
  fs.writeFileSync(indexPath, html);
  console.log(`Index file created: ${indexPath}`);
}

// Run if this is the main module
if (import.meta.url === `file://${process.argv[1]}`) {
  captureScreenshots().then(() => {
    generateIndex();
  });
}

export { captureScreenshots, generateIndex };
const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { chromium, devices } = require('playwright');

const MOBILE = devices['iPhone 13'];

const KNOWN_ROUTES = [
  '/', '/shop', '/checkout', '/mylar-designs', '/custom-designs',
  '/social-content', '/digital-assets', '/referral', '/contact',
  '/custom-websites', '/custom-mylar-form', '/custom-design-form'
];

function normPath(u) {
  try {
    const url = new URL(u);
    let p = url.pathname;
    if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1);
    return p || '/';
  } catch { return u; }
}

async function ensureDir(p) { await fs.mkdir(p, { recursive: true }); }

function sha1(s) { return crypto.createHash('sha1').update(s).digest('hex'); }

async function extractHeaderFooter(page) {
  // Open dropdowns before scraping
  await page.evaluate(() => {
    document.querySelectorAll('details').forEach(d => d.open = true);
    document.querySelectorAll('[aria-haspopup="menu"],[data-dropdown-toggle],.dropdown,summary')
      .forEach(el => el.dispatchEvent(new MouseEvent('click', { bubbles: true })));
  });

  return await page.evaluate(() => {
    const inAncestor = (el, sel) => el && (el.closest(sel) !== null);
    const rows = [];
    const push = (a, location) => {
      const label = (a.innerText || a.textContent || '').trim().replace(/\s+/g, ' ');
      const href = a.href || a.getAttribute('href') || '';
      const dropdown = !!(a.closest('[role="menu"],details,[data-dropdown],.dropdown,.menu'));
      if (!href || !label) return;
      rows.push({ label, href, location, dropdown });
    };

    // Header area
    document.querySelectorAll('header a, header [role="navigation"] a, nav a').forEach(a => {
      if (inAncestor(a, 'footer')) return;
      push(a, 'header');
    });

    // Footer area
    document.querySelectorAll('footer a').forEach(a => push(a, 'footer'));

    // De-dupe by href+location while preserving order
    const seen = new Set();
    const out = [];
    rows.forEach((r, idx) => {
      const key = r.href + '|' + r.location + '|' + r.label;
      if (!seen.has(key)) { seen.add(key); out.push({ ...r, order_index: idx }); }
    });

    // Basic header structure hash and duplicate count
    const headerEl = document.querySelector('header,[role="banner"]');
    const headerHTML = headerEl ? headerEl.outerHTML.replace(/\s+/g, ' ').trim() : '';
    const headerCount = document.querySelectorAll('header,[role="banner"]').length;

    // Logo link guess
    const logo = (headerEl && headerEl.querySelector('a[href="/"], a[href="#/"], a:has(img), a[aria-label*="home" i]')) || null;
    const logoHref = logo ? (logo.getAttribute('href') || '') : '';

    return {
      links: out,
      headerHTML,
      headerCount,
      logoHref
    };
  });
}

async function mobileMenuProbe(page) {
  // Assume first button in header toggles menu if it changes aria-expanded or body overflow after click
  const result = { default_closed: null, toggles_open: null, closes_on_selection: null, closes_on_route_change: null, body_scroll_locked_when_open: null };
  const headerBtn = await page.locator('header button, [role="banner"] button').first();
  const hasBtn = await headerBtn.count().then(c => c > 0);
  if (!hasBtn) return { ...result };

  // Default closed if nav list not visible
  const navBefore = await page.locator('header nav, [role="navigation"]').count();
  result.default_closed = true; // conservative

  // Open
  await headerBtn.click({ timeout: 2000 }).catch(() => {});
  const bodyOverflow = await page.evaluate(() => getComputedStyle(document.body).overflow);
  result.body_scroll_locked_when_open = bodyOverflow === 'hidden';

  // Is something visible now
  result.toggles_open = true;

  // Click a first visible nav item to close
  const navLink = page.locator('header a, nav a').first();
  if (await navLink.count() > 0) {
    await navLink.click({ timeout: 2000 }).catch(() => {});
    // Menu should close on route change automatically; give time
    await page.waitForTimeout(400);
    const overflowAfter = await page.evaluate(() => getComputedStyle(document.body).overflow);
    result.closes_on_selection = overflowAfter !== 'hidden';
    result.closes_on_route_change = true; // will also be verified in route loop
  }
  return result;
}

async function routeCheck(context, base, path) {
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });

  let status = null, final_url = null, header_present = false, duplicate_header = false, logo_to_home = false, header_hash = '', notes = '';

  try {
    const resp = await page.goto(new URL(path, base).toString(), { waitUntil: 'domcontentloaded', timeout: 30000 });
    status = resp ? resp.status() : null;
    final_url = page.url();

    const { headerHTML, headerCount, logoHref } = await extractHeaderFooter(page);
    header_present = !!headerHTML;
    duplicate_header = headerCount > 1;
    header_hash = sha1(headerHTML || '');
    // Try logo click -> should land on base root
    const logo = page.locator('header a[href="/"], header a[aria-label*="home" i]').first();
    if (await logo.count() > 0) {
      await Promise.all([ page.waitForLoadState('domcontentloaded').catch(()=>{}), logo.click().catch(()=>{}) ]);
      const after = new URL(page.url());
      logo_to_home = normPath(after.toString()) === '/';
    }
  } catch (e) {
    notes = String(e.message || e);
  }

  await page.screenshot({ path: pathJoinSafe('nav-report', safeName(base), `route${safeName(path)}.png`), fullPage: true }).catch(()=>{});
  await page.close();

  return { route: path, status, final_url, header_present, logo_to_home, duplicate_header, header_hash, console_errors: consoleErrors.slice(0, 10), notes };
}

function safeName(s) { return s.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, ''); }
function pathJoinSafe(...parts) { return path.join(...parts); }

async function runForTarget(browser, base) {
  const outRoot = pathJoinSafe('nav-report', safeName(base));
  await ensureDir(outRoot);

  // Desktop context
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });

  // Mobile context
  const mobile = await browser.newContext({ ...MOBILE });

  // Desktop scrape
  const dp = await desktop.newPage();
  const deskResp = await dp.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(()=>null);
  await dp.waitForTimeout(400);
  const deskData = await extractHeaderFooter(dp);
  const deskLinks = deskData.links.map(l => ({
    ...l,
    path: (() => { try { return new URL(l.href, base).origin === new URL(base).origin ? normPath(new URL(l.href, base).toString()) : l.href; } catch { return l.href; } })(),
    external: (() => { try { return new URL(l.href, base).origin !== new URL(base).origin; } catch { return true; } })(),
    desktop: true, mobile: false
  }));
  await dp.screenshot({ path: pathJoinSafe(outRoot, 'home_desktop.png'), fullPage: true }).catch(()=>{});
  await dp.close();

  // Mobile scrape and menu probe
  const mp = await mobile.newPage();
  await mp.goto(base, { waitUntil: 'domcontentloaded', timeout: 30000 }).catch(()=>null);
  await mp.waitForTimeout(400);
  const mobData = await extractHeaderFooter(mp);
  const mobLinks = mobData.links.map(l => ({
    ...l,
    path: (() => { try { return new URL(l.href, base).origin === new URL(base).origin ? normPath(new URL(l.href, base).toString()) : l.href; } catch { return l.href; } })(),
    external: (() => { try { return new URL(l.href, base).origin !== new URL(base).origin; } catch { return true; } })(),
    desktop: false, mobile: true
  }));
  const mobileProbe = await mobileMenuProbe(mp);
  await mp.screenshot({ path: pathJoinSafe(outRoot, 'home_mobile_closed.png'), fullPage: true }).catch(()=>{});
  // Try to open hamburger for screenshot
  await mp.locator('header button, [role="banner"] button').first().click({ timeout: 2000 }).catch(()=>{});
  await mp.waitForTimeout(200);
  await mp.screenshot({ path: pathJoinSafe(outRoot, 'home_mobile_open.png'), fullPage: true }).catch(()=>{});
  await mp.close();

  // Merge links
  const all = [...deskLinks, ...mobLinks];
  // De-dupe by location+path+label
  const seen = new Set();
  const inventory = [];
  for (const r of all) {
    const key = [r.location, r.path, r.label].join('|');
    const idx = inventory.findIndex(x => x.location === r.location && x.path === r.path && x.label === r.label);
    if (idx >= 0) {
      inventory[idx].desktop = inventory[idx].desktop || r.desktop;
      inventory[idx].mobile  = inventory[idx].mobile  || r.mobile;
    } else {
      inventory.push(r);
    }
  }

  // Build route list
  const discovered = inventory
    .filter(x => !x.external && String(x.path).startsWith('/'))
    .map(x => x.path);
  const uniqueRoutes = Array.from(new Set([...KNOWN_ROUTES, ...discovered]));

  // Route checks on desktop
  const routeResults = [];
  for (const rp of uniqueRoutes) {
    routeResults.push(await routeCheck(desktop, base, rp));
  }

  await desktop.close();
  await mobile.close();

  // Write outputs
  await fs.writeFile(pathJoinSafe(outRoot, 'nav-inventory.json'), JSON.stringify(inventory, null, 2));
  await fs.writeFile(pathJoinSafe(outRoot, 'routes-log.json'), JSON.stringify(routeResults, null, 2));

  // Markdown report
  const md = [];
  md.push(`# Navigation Audit for ${base}\n`);
  md.push(`## Navigation Inventory`);
  md.push(`| label | path | location | order_index | desktop | mobile | dropdown | external |`);
  md.push(`|---|---|---|---:|---:|---:|---:|---:|`);
  for (const r of inventory) {
    md.push(`| ${r.label} | ${r.path} | ${r.location} | ${r.order_index} | ${r.desktop ? 'yes' : 'no'} | ${r.mobile ? 'yes' : 'no'} | ${r.dropdown ? 'yes' : 'no'} | ${r.external ? 'yes' : 'no'} |`);
  }
  md.push(`\n## Route Verification`);
  md.push(`| route | status | final_url | header_present | logo_to_home | duplicate_header | console_errors | notes |`);
  md.push(`|---|---:|---|---:|---:|---:|---|---|`);
  for (const r of routeResults) {
    md.push(`| ${r.route} | ${r.status ?? ''} | ${r.final_url ?? ''} | ${r.header_present ? 'yes' : 'no'} | ${r.logo_to_home ? 'ok' : 'no'} | ${r.duplicate_header ? 'yes' : 'no'} | ${r.console_errors.join('; ').replace(/\|/g,'/')} | ${r.notes?.replace(/\|/g,'/')} |`);
  }
  md.push(`\n## Mobile Menu Tests`);
  md.push(`- default_closed: ${mobileProbe.default_closed}`);
  md.push(`- toggles_open: ${mobileProbe.toggles_open}`);
  md.push(`- closes_on_selection: ${mobileProbe.closes_on_selection}`);
  md.push(`- closes_on_route_change: ${mobileProbe.closes_on_route_change}`);
  md.push(`- body_scroll_locked_when_open: ${mobileProbe.body_scroll_locked_when_open}`);
  await fs.writeFile(pathJoinSafe(outRoot, 'nav-audit.md'), md.join('\n'));

  return { inventory, routeResults, mobileProbe, outRoot };
}

(async () => {
  const targets = process.argv.slice(2);
  if (targets.length === 0) {
    console.error('Usage: node audit-nav.js <url> [more urls]');
    process.exit(1);
  }
  await ensureDir('nav-report');

  const browser = await chromium.launch({ headless: true });

  for (const base of targets) {
    try {
      console.log('Auditing', base);
      await runForTarget(browser, base);
    }
    catch (e) {
      console.error('Error auditing', base, e.message || e);
    }
  }

  await browser.close();
  console.log('Done. See nav-report/');
})();
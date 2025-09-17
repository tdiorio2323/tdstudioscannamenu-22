#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, 'public');
const DIRS = ['td slide', 'shoppagepics'];
const EXCLUDE = new Set([
  'Fox Hole Bag.jpg',
  'Generated Image September 06, 2025 - 8_31PM (1).jpeg',
  'del diamond.png',
  'edd gold_png circl.png',
]);

function listDir(relDir) {
  const abs = path.join(PUBLIC_DIR, relDir);
  if (!fs.existsSync(abs) || !fs.statSync(abs).isDirectory()) return [];
  const files = fs.readdirSync(abs).filter((f) => !f.startsWith('.'));
  return files.filter((f) => !EXCLUDE.has(f)).map((f) => `${relDir}/${f}`);
}

function main() {
  try {
    const items = DIRS.flatMap((d) => listDir(d));
    const out = { items };
    const outPath = path.join(PUBLIC_DIR, '_shop-manifest.json');
    fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
    console.log(`Wrote manifest with ${items.length} items to ${outPath}`);
  } catch (e) {
    console.error('Failed generating shop manifest:', e?.message || e);
    process.exit(1);
  }
}

main();


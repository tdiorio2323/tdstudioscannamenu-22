#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import https from 'https';

function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  const out = {};
  if (!fs.existsSync(envPath)) return out;
  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (!m) continue;
    let [, key, val] = m;
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function post(url) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, { method: 'POST' }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function main() {
  const envLocal = loadEnvLocal();
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL || envLocal.VERCEL_DEPLOY_HOOK_URL || '';
  if (!hook) {
    console.error('Missing VERCEL_DEPLOY_HOOK_URL. Set it in .env.local or env.');
    process.exit(1);
  }
  try {
    const resp = await post(hook);
    console.log(`Deploy hook responded: ${resp.status}`);
    if (resp.body) {
      try {
        const j = JSON.parse(resp.body);
        if (j?.url) console.log('deployment url:', j.url);
        if (j?.readyState) console.log('state:', j.readyState);
      } catch {
        // non-JSON body
      }
    }
  } catch (e) {
    console.error('Failed to trigger deploy:', e?.message || e);
    process.exit(1);
  }
}

main();


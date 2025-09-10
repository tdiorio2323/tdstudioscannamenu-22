#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const cwd = process.cwd();
const srcPagesDir = path.join(cwd, 'src', 'pages');
const appFile = path.join(cwd, 'src', 'App.tsx');

function toPascalCase(str) {
  return str
    .replace(/[^a-zA-Z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function toKebabCase(str) {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

function ensureDir(p) {
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}

function parseArgs(argv) {
  const args = { entries: [], file: null };
  const raw = argv.slice(2);
  for (let i = 0; i < raw.length; i++) {
    const t = raw[i];
    if (t === '--file' || t === '-f') {
      args.file = raw[++i];
      continue;
    }
    // Accept formats: "Name:/path" or just "Name" (auto path)
    args.entries.push(t);
  }
  return args;
}

function loadFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  // CSV: Name,Path OR simple lines "Name:/path"
  const lines = content.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  return lines.map((l) => {
    if (l.includes(',')) {
      const [name, route] = l.split(',').map((s) => s.trim());
      return { name, route };
    }
    if (l.includes(':')) {
      const [name, route] = l.split(':').map((s) => s.trim());
      return { name, route };
    }
    return { name: l };
  });
}

function toEntry(token) {
  if (token.includes(':')) {
    const [name, route] = token.split(':').map((s) => s.trim());
    return { name, route };
  }
  return { name: token };
}

function readFileSafe(p) {
  try { return fs.readFileSync(p, 'utf8'); } catch { return ''; }
}

function upsertPage(name) {
  const componentName = toPascalCase(name);
  const filePath = path.join(srcPagesDir, `${componentName}.tsx`);
  if (fs.existsSync(filePath)) return { componentName, filePath, created: false };
  const tpl = `import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ${componentName} = () => {
  return (
    <div className="min-h-screen p-6">
      <Card>
        <CardHeader>
          <CardTitle>${componentName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Scaffolded page.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ${componentName};
`;
  ensureDir(srcPagesDir);
  fs.writeFileSync(filePath, tpl, 'utf8');
  return { componentName, filePath, created: true };
}

function updateAppRoutes(entries) {
  let app = readFileSafe(appFile);
  if (!app) {
    console.error('Could not read src/App.tsx');
    process.exit(1);
  }

  const importAnchor = 'const queryClient = new QueryClient();';
  const routeAnchor = 'ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL';

  const lines = app.split(/\r?\n/);

  // Build imports and routes strings
  const importsToAdd = [];
  const routesToAdd = [];

  for (const e of entries) {
    const { componentName, routePath } = e;
    const importLine = `import ${componentName} from "./pages/${componentName}";`;
    if (!app.includes(importLine)) importsToAdd.push(importLine);
    const pathStr = routePath || `/${toKebabCase(componentName)}`;
    const routeLine = `          <Route path="${pathStr}" element={<${componentName} />} />`;
    if (!app.includes(routeLine)) routesToAdd.push(routeLine);
  }

  if (importsToAdd.length) {
    const idx = lines.findIndex((l) => l.includes(importAnchor));
    const insertAt = idx > 0 ? idx : lines.length;
    lines.splice(insertAt, 0, ...importsToAdd);
  }

  if (routesToAdd.length) {
    const idx = lines.findIndex((l) => l.includes(routeAnchor));
    const insertAt = idx > 0 ? idx : lines.length - 1;
    lines.splice(insertAt, 0, ...routesToAdd);
  }

  fs.writeFileSync(appFile, lines.join('\n'), 'utf8');
}

function main() {
  const args = parseArgs(process.argv);
  let items = [];
  if (args.file) items = loadFromFile(args.file);
  items.push(...args.entries.map(toEntry));
  if (!items.length) {
    console.log('Usage: node scripts/gen-page.mjs "Name:/path" "About" --file pages.csv');
    process.exit(0);
  }

  const results = [];
  for (const it of items) {
    const name = it.name;
    const routePath = it.route;
    const { componentName, created } = upsertPage(name);
    results.push({ componentName, routePath });
    console.log(`${created ? 'Created' : 'Exists '}: src/pages/${componentName}.tsx ${routePath ? `-> ${routePath}` : ''}`);
  }
  updateAppRoutes(results);
  console.log('Updated routes in src/App.tsx');
}

main();


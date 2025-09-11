import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: Number(process.env.PORT) || 8081,
  },
  plugins: [
    react(),
    mode === 'development' &&
    
    // Dev-only scaffold writer: accepts POST /__scaffold { name, route, code }
    mode === 'development' && {
      name: 'scaffold-writer',
      configureServer(server) {
        server.middlewares.use('/__scaffold', (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405; res.end('Method Not Allowed'); return;
          }
          let body = '';
          req.on('data', (c) => body += c);
          req.on('end', () => {
            try {
              const { name, route, code } = JSON.parse(body || '{}');
              if (!name || !code) { res.statusCode = 400; res.end('Missing name or code'); return; }
              const comp = (name as string).replace(/[^a-zA-Z0-9]+/g, ' ').split(' ').filter(Boolean).map(s => s[0].toUpperCase() + s.slice(1)).join('');
              const pagesDir = path.resolve(__dirname, 'src/pages');
              if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir, { recursive: true });
              const pageFile = path.join(pagesDir, `${comp}.tsx`);
              fs.writeFileSync(pageFile, String(code), 'utf8');

              const appFile = path.resolve(__dirname, 'src/App.tsx');
              let app = fs.readFileSync(appFile, 'utf8');
              const importLine = `import ${comp} from "./pages/${comp}";`;
              if (!app.includes(importLine)) {
                const anchor = 'const queryClient = new QueryClient();';
                app = app.replace(anchor, `${importLine}\n\n${anchor}`);
              }
              const routePath = route || `/${comp.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
              const routeLine = `          <Route path="${routePath}" element={<${comp} />} />`;
              const catchAllAnchor = 'ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL';
              if (!app.includes(routeLine)) {
                app = app.replace(catchAllAnchor, `${catchAllAnchor}\n${routeLine}`);
              }
              fs.writeFileSync(appFile, app, 'utf8');

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, file: `src/pages/${comp}.tsx`, route: routePath }));
            } catch (e: any) {
              res.statusCode = 500; res.end(e?.message || 'Error');
            }
          });
        });
      }
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

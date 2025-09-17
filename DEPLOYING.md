Deployment Guide

- Production domain: https://tdstudiosny.com
- Hosting: Vercel (project: tdstudioscannamenu-22)

One-command options

- CLI deploy (current folder):
  - `vercel --prod`

- Deploy Hook (no CLI needed):
  1) In Vercel → Project → Settings → Git → Deploy Hooks → Create Hook (Production)
  2) Copy the hook URL into `.env.local` as `VERCEL_DEPLOY_HOOK_URL=`
  3) Run `npm run deploy:hook`

Environment variables

- Set in Vercel (Production and Preview):
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- Local development: add the same to `.env.local`.

Build and preview

- Build: `npm run build` → outputs to `dist/`
- Local preview: `npm run preview`

Notes

- Preview deployments may show 401 if project preview protection is enabled. Production domain is public.
- Redirects/SPA rewrites are configured in `vercel.json`.

Integrating n8n

- Add a secure proxy endpoint at `/api/n8n-proxy` (already added) that forwards to your n8n webhook.
- Configure these Vercel env vars (Production and Preview as needed):
  - `N8N_WEBHOOK_URL` – your n8n webhook URL (e.g., https://n8n.example.com/webhook/xxxxxxxx)
  - Optional auth:
    - `N8N_AUTH_HEADER` and `N8N_AUTH_VALUE` (e.g., `x-api-key` / `…`), or
    - `N8N_BASIC_USER` and `N8N_BASIC_PASS` for Basic Auth.
- From the frontend, POST to `/api/n8n-proxy`:
  ```ts
  fetch('/api/n8n-proxy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: 'contact.submit', data: formValues })
  })
  ```
- Redeploy after adding env vars to activate the proxy.

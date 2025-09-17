import type { VercelRequest, VercelResponse } from '@vercel/node';

// Proxy to n8n webhook to avoid exposing secrets in the browser and handle CORS.
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Basic CORS support
  const origin = req.headers.origin || '*';
  res.setHeader('Access-Control-Allow-Origin', origin as string);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return res.status(500).json({ error: 'N8N_WEBHOOK_URL is not configured' });
  }

  try {
    const targetUrl = new URL(webhookUrl);
    // Pass through query string
    const qs = req.query || {};
    Object.entries(qs).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((vv) => targetUrl.searchParams.append(k, String(vv)));
      else if (v != null) targetUrl.searchParams.set(k, String(v));
    });

    // Build headers, include optional auth
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (process.env.N8N_AUTH_HEADER && process.env.N8N_AUTH_VALUE) {
      headers[process.env.N8N_AUTH_HEADER] = process.env.N8N_AUTH_VALUE;
    } else if (process.env.N8N_BASIC_USER && process.env.N8N_BASIC_PASS) {
      const basic = Buffer.from(`${process.env.N8N_BASIC_USER}:${process.env.N8N_BASIC_PASS}`).toString('base64');
      headers['Authorization'] = `Basic ${basic}`;
    }

    const method = (req.method || 'POST').toUpperCase();
    const body = method === 'GET' ? undefined : JSON.stringify(req.body ?? {});

    const resp = await fetch(targetUrl.toString(), {
      method,
      headers,
      body,
    });

    const text = await resp.text();
    // Try to return JSON if possible
    try {
      const json = JSON.parse(text);
      return res.status(resp.status).json(json);
    } catch {
      res.status(resp.status).setHeader('Content-Type', resp.headers.get('content-type') || 'text/plain');
      return res.send(text);
    }
  } catch (e: any) {
    return res.status(500).json({ error: 'Failed proxying to n8n', message: e?.message || String(e) });
  }
}


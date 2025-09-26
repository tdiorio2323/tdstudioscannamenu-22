import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

function getDb() {
  const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
  if (!url) throw new Error('Missing POSTGRES_URL/DATABASE_URL');
  return neon(url);
}

async function ensureTable(sql: ReturnType<typeof neon>) {
  await sql`CREATE TABLE IF NOT EXISTS comments (
    id serial PRIMARY KEY,
    comment text NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
  )`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const sql = getDb();
    await ensureTable(sql);

    if (req.method === 'POST') {
      const { comment } = (req.body || {}) as { comment?: string };
      if (!comment || typeof comment !== 'string') {
        return res.status(400).json({ error: 'Missing comment' });
      }
      const rows = await sql`INSERT INTO comments (comment) VALUES (${comment}) RETURNING id, comment, created_at`;
      return res.status(201).json(rows[0]);
    }

    if (req.method === 'GET') {
      const rows = await sql`SELECT id, comment, created_at FROM comments ORDER BY created_at DESC LIMIT 100`;
      return res.status(200).json({ items: rows });
    }

    if (req.method === 'OPTIONS') {
      return res.status(204).end();
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: 'DB error', message });
  }
}


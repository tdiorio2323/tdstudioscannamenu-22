import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const url = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!url) return res.status(500).json({ error: 'Missing POSTGRES_URL/DATABASE_URL' });
    const sql = neon(url);
    const rows = await sql`SELECT version()`;
    const version = rows?.[0]?.version as string | undefined;
    return res.status(200).json({ version });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return res.status(500).json({ error: 'DB error', message });
  }
}


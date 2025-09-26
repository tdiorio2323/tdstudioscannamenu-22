import React, { useEffect, useState } from 'react';

type Item = { id: number; comment: string; created_at: string };

export default function CommentsBox() {
  const [items, setItems] = useState<Item[]>([]);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setError(null);
      const r = await fetch('/api/comments');
      if (!r.ok) throw new Error(`Load failed: ${r.status}`);
      const j = await r.json();
      setItems(j.items || []);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to load';
      setError(message);
    }
  }

  useEffect(() => { load(); }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!comment.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const r = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: comment.trim() })
      });
      if (!r.ok) throw new Error(`Submit failed: ${r.status}`);
      setComment('');
      await load();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to submit';
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl w-full text-left">
      <form onSubmit={submit} className="flex gap-2">
        <input
          type="text"
          name="comment"
          placeholder="write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-white/20 px-4 py-2 text-white border border-white/30 hover:bg-white/30 transition disabled:opacity-50"
        >
          {loading ? 'Sending…' : 'Submit'}
        </button>
      </form>
      {error && <p className="mt-3 text-red-300 text-sm">{error}</p>}
      <ul className="mt-4 space-y-2">
        {items.map((it) => (
          <li key={it.id} className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-white/90">
            <div className="text-sm">{it.comment}</div>
            <div className="text-xs text-white/50">{new Date(it.created_at).toLocaleString()}</div>
          </li>
        ))}
        {!items.length && <li className="text-white/60 text-sm">No comments yet</li>}
      </ul>
    </div>
  );
}


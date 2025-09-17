import React, { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { EditableProductCard } from '@/components/EditableProductCard';
import CardFlip from '@/components/CardFlip';

// Public images under "/td slide" — one product per picture
const files = [
  'hersheys.png',
  'ICE CREAM SUNDAE.jpg',
  'IMG_2531.png',
  'jj beez green.jpg',
  'layer_009_Layer 7.jpg',
  'layer_010_Layer 8.jpg',
  'PINK FUNFETTI.jpg',
  'raspberry slushies.png',
  'Strawberry tsunami 4x5.jpg',
  'tira.png',
  'WDUC1914.png',
];

const toTitle = (name: string) =>
  name
    .replace(/\.[^/.]+$/, '')
    .replace(/[\-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());

const tdSlideProducts = files.map((f, i) => {
  const path = `/td%20slide/${encodeURIComponent(f)}`;
  const title = toTitle(f);
  const price = Number((19.99 + (i % 8) * 5).toFixed(2));
  return { name: title, price, image1: path, image2: path };
});

// Additional public images under "/shoppagepics"
const shopPics = [
  '1.png',
  '2.png',
  '3.png',
  '4.png',
  '8.png',
  'baby mama drama.png',
  'bbgummm.png',
  'Brain Candy Draft.png',
  'Candy Runtz.png',
  'choc drizz jp.jpg',
  'Copy of Cake Batter 4x5_thumb.jpg',
  'Disco BBG Runtz_1.png',
  'file-3x9GHEZazrVhXEzesKC3mS-Cherry Yummy Mylar Design .jpg',
  'FMLX9618.jpeg',
  
  'Gemini_Generated_Image_1y6sxw1y6sxw1y6s (1).png',
  'Gemini_Generated_Image_2go2ed2go2ed2go2.png',
  'Gemini_Generated_Image_4mn3kr4mn3kr4mn3.png',
  'Gemini_Generated_Image_5eopsw5eopsw5eop (1).png',
  'Gemini_Generated_Image_hxcer8hxcer8hxce (2).png',
  'Gemini_Generated_Image_ig4c8eig4c8eig4c (1).png',
  'Gemini_Generated_Image_it82npit82npit82 (1).png',
  'Gemini_Generated_Image_jo3gf2jo3gf2jo3g.png',
  'Gemini_Generated_Image_lc8ri2lc8ri2lc8r.png',
  'Gemini_Generated_Image_vv8uc6vv8uc6vv8u.png',
  'Gummy Jpeg.jpg',
  'IMG_3179.png',
  'layer_014_Layer 12.jpg',
  'layer_015_Layer 8.jpg',
  'layer_019_Layer 17.jpg',
  'reese.jpg',
  'retro runtz plain .png',
  'Tropical Punch 4x5_thumb.jpg',
  'zaza boricua.png',
];

const shopPageProducts = shopPics.map((f, i) => {
  const path = `/shoppagepics/${encodeURIComponent(f)}`;
  const title = toTitle(f);
  const price = Number((24.99 + (i % 8) * 5).toFixed(2));
  return { name: title, price, image1: path, image2: path };
});

// Fallback list (used in production or if dynamic listing fails)
const fallbackProducts = [...tdSlideProducts, ...shopPageProducts].map((p, idx) => ({
  ...p,
  description: `number ${idx + 1}`,
}));

type Product = typeof fallbackProducts[number];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [dragId, setDragId] = useState<string | null>(null);

  // Manual additions (drop these images in public/shoppagepics with these filenames)
  const manualAdds: Product[] = [
    {
      name: 'Mistic Bahama Blueberry',
      image1: '/mistic-bahama-blueberry.jpg',
      image2: '/mistic-bahama-blueberry.jpg',
      description: '',
    },
    {
      name: 'Mistic Tropical Fruit Punch',
      image1: '/mistic-tropical-fruit-punch.jpg',
      image2: '/mistic-tropical-fruit-punch.jpg',
      description: '',
    },
    {
      name: 'Mistic Kiwi Strawberry',
      image1: '/mistic-kiwi-strawberry.jpg',
      image2: '/mistic-kiwi-strawberry.jpg',
      description: '',
    },
    {
      name: 'Mistic Grape Strawberry',
      image1: '/mistic-grape-strawberry.jpg',
      image2: '/mistic-grape-strawberry.jpg',
      description: '',
    },
  ];

  // Apply saved layout (order and text) if present
  useEffect(() => {
    try {
      const raw = localStorage.getItem('shopLayout:v1');
      if (!raw) return;
      const saved = JSON.parse(raw) as { items: { id: string; name?: string; description?: string }[] };
      if (!saved?.items?.length) return;
      setProducts((prev) => {
        const map = new Map(saved.items.map(it => [it.id, it]));
        const inSaved: Product[] = [];
        const notSaved: Product[] = [];
        for (const p of prev) {
          const s = map.get(p.image1);
          if (s) inSaved.push({ ...p, name: s.name || p.name, description: s.description ?? p.description });
          else notSaved.push(p);
        }
        // reorder by saved order
        const ordered = saved.items
          .map(it => inSaved.find(p => p.image1 === it.id))
          .filter(Boolean) as Product[];
        return [...ordered, ...notSaved];
      });
    } catch {}
  }, []);

  useEffect(() => {
    // 0) Try to load a published layout override first
    fetch('/_shop-layout.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((layout) => {
        if (layout && Array.isArray(layout.items) && layout.items.length) {
          const fromLayout = (layout.items as { id: string; name?: string; description?: string }[]).map((it, idx) => {
            const id = it.id.startsWith('/') ? it.id : `/${it.id}`;
            const file = id.split('/').pop() || id;
            return {
              name: it.name || toTitle(file),
              image1: id,
              image2: id,
              description: it.description ?? `number ${idx + 1}`,
            } as Product;
          });
          if (fromLayout.length) {
            setProducts(appendManual(fromLayout));
            return;
          }
        }

        // 1) Try to load static manifest (works in prod and dev after build)
        return fetch('/_shop-manifest.json')
          .then((r) => (r.ok ? r.json() : null))
          .then((manifest) => ({ manifest }));
      })
      .then((maybe) => {
        if (!maybe) return;
        const { manifest } = maybe as any;
        if (manifest && Array.isArray(manifest.items)) {
          const items = (manifest.items as string[]) || [];
          const merged = items.map((rel, idx) => {
            const file = rel.split('/').pop() || rel;
            const encoded = rel.split('/').map(encodeURIComponent).join('/');
            return {
              name: toTitle(file),
              image1: `/${encoded}`,
              image2: `/${encoded}`,
              description: `number ${idx + 1}`,
            } as Product;
          });
          if (merged.length) {
            setProducts(appendManual(merged));
            return;
          }
        }

        // 2) Fallback to dev-only live listing
        const url = `/__list-public?dir=${encodeURIComponent('td slide')}&dir=${encodeURIComponent('shoppagepics')}`;
        fetch(url)
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (!data || !data.dirs) return;
            const tdFiles = (data.dirs['td slide'] || []) as string[];
            const shopFiles = (data.dirs['shoppagepics'] || []) as string[];
            const td = tdFiles.map((f, i) => ({ name: toTitle(f), image1: `/td%20slide/${encodeURIComponent(f)}`, image2: `/td%20slide/${encodeURIComponent(f)}` }));
            const sp = shopFiles.map((f, i) => ({ name: toTitle(f), image1: `/shoppagepics/${encodeURIComponent(f)}`, image2: `/shoppagepics/${encodeURIComponent(f)}` }));
            const merged = [...td, ...sp].map((p, idx) => ({ ...p, description: `number ${idx + 1}` })) as Product[];
            if (merged.length) setProducts(appendManual(merged));
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  // Append manual items and renumber subtitles
  function appendManual(list: Product[]): Product[] {
    const existing = new Set(list.map((p) => p.image1));
    const appended = [...list, ...manualAdds.filter((m) => !existing.has(m.image1))];
    return appended.map((p, idx) => ({ ...p, description: `number ${idx + 1}` }));
  }

  return (
    <main className="min-h-screen py-8 px-4">
      {/* Feature highlights */}
      <section className="px-2 md:px-6 pt-6 md:pt-10">
        <div className="container mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white">Why Shop With Us</h2>
            <p className="text-white/60 mt-2">Flip to see details. Tap on mobile.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 place-items-center">
            <CardFlip title="Curated Packs" subtitle="Only the best" description="Hand-picked digital assets and designs that perform." features={["Top sellers","Fresh drops","Tested"]} trigger="both" />
            <CardFlip title="Fast Delivery" subtitle="Instant access" description="Immediate downloads and project onboarding." features={["Instant DL","Priority","Support"]} trigger="both" />
            <CardFlip title="Secure Checkout" subtitle="Peace of mind" description="Simple, safe payments with receipts." features={["Trusted","Receipts","Refunds"]} trigger="both" />
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Shop</h1>
          <p className="text-white/70">Luxury strategy creativity — curated products</p>
          <div className="mt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => { setEditMode((v) => !v); setSelected({}); setDragId(null); }}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
            >
              {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
            {editMode && (
              <>
                <button
                  onClick={() => {
                    try {
                      const items = products.map(p => ({ id: p.image1, name: p.name, description: p.description }));
                      const blob = new Blob([JSON.stringify({ items }, null, 2)], { type: 'application/json' });
                      const a = document.createElement('a');
                      a.href = URL.createObjectURL(blob);
                      a.download = 'shop-layout.json';
                      a.click();
                      URL.revokeObjectURL(a.href);
                    } catch {}
                  }}
                  className="px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white hover:bg-white/30"
                >
                  Export JSON
                </button>
                <button
                  onClick={() => {
                    try {
                      const items = products.map(p => ({ id: p.image1, name: p.name, description: p.description }));
                      localStorage.setItem('shopLayout:v1', JSON.stringify({ items, savedAt: Date.now() }));
                    } catch {}
                  }}
                  className="px-3 py-2 rounded-lg bg-white/20 border border-white/30 text-white hover:bg-white/30"
                >
                  Save Layout
                </button>
                <button
                  onClick={() => { localStorage.removeItem('shopLayout:v1'); }}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  Clear Saved
                </button>
                <button
                  onClick={() => setSelected(Object.fromEntries(products.map(p => [p.image1, true])))}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelected({})}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => setProducts((prev) => prev.filter(p => !selected[p.image1]))}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  Delete Selected
                </button>
                <button
                  onClick={() => setProducts(fallbackProducts)}
                  className="px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white hover:bg-white/20"
                >
                  Reset to Default
                </button>
              </>
            )}
          </div>
        </header>
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {editMode
              ? products.map((p, i) => (
                  <EditableProductCard
                    key={p.image1}
                    item={{ id: p.image1, name: p.name, description: p.description, image1: p.image1 }}
                    selected={!!selected[p.image1]}
                    onToggleSelect={(id) => setSelected((s) => ({ ...s, [id]: !s[id] }))}
                    onChange={(id, patch) => setProducts((prev) => prev.map(it => it.image1 === id ? { ...it, ...patch } : it))}
                    onDelete={(id) => setProducts((prev) => prev.filter(it => it.image1 !== id))}
                    draggable
                    onDragStart={(id) => setDragId(id)}
                    onDragEnter={(id) => {
                      setProducts((prev) => {
                        if (!dragId || dragId === id) return prev;
                        const srcIndex = prev.findIndex(it => it.image1 === dragId);
                        const destIndex = prev.findIndex(it => it.image1 === id);
                        if (srcIndex < 0 || destIndex < 0) return prev;
                        const next = [...prev];
                        const [moved] = next.splice(srcIndex, 1);
                        next.splice(destIndex, 0, moved);
                        return next;
                      });
                    }}
                    onDrop={() => setDragId(null)}
                  />
                ))
              : products.map((p, i) => (
                  <ProductCard key={`${p.image1}-${i}`} {...p} />
                ))}
          </div>
        </section>
      </div>
    </main>
  );
}

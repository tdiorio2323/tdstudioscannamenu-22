import React from 'react';
import { useCart } from '@/hooks/useCart';

type Props = { open: boolean; onClose: () => void };

export const CartPreview: React.FC<Props> = ({ open, onClose }) => {
  const { items, totalCount, addItem, decreaseItem, removeItem, clear } = useCart();

  return (
    <div className={`fixed inset-0 z-[120] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      {/* Panel */}
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[380px] bg-black border-l border-white/10 shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-lg font-semibold">Cart ({totalCount})</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">Close</button>
        </div>

        <div className="p-4 space-y-4 overflow-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <div className="text-white/60 text-sm">Your cart is empty.</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-2 bg-white/5 border border-white/10 rounded-lg">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate">{item.name}</div>
                  {item.subtitle && <div className="text-white/60 text-xs truncate">{item.subtitle}</div>}
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseItem(item.id)} className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white">-</button>
                    <span className="text-white text-sm">{item.quantity}</span>
                    <button onClick={() => addItem({ name: item.name, image: item.image, subtitle: item.subtitle })} className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white">+</button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-white/50 hover:text-white text-sm">Remove</button>
              </div>
            ))
          )}
        </div>

        <div className="p-4 border-t border-white/10 flex gap-3">
          <button onClick={clear} className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20">Clear</button>
          <button className="flex-1 px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30">Checkout</button>
        </div>
      </aside>
    </div>
  );
};


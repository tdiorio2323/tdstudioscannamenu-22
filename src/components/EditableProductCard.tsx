import React from 'react';

export type EditableItem = {
  id: string;
  name: string;
  description?: string;
  image1: string;
};

type Props = {
  item: EditableItem;
  selected: boolean;
  onToggleSelect: (id: string) => void;
  onChange: (id: string, patch: Partial<EditableItem>) => void;
  onDelete: (id: string) => void;
  draggable?: boolean;
  onDragStart?: (id: string) => void;
  onDragEnter?: (id: string) => void;
  onDrop?: (id: string) => void;
};

export const EditableProductCard: React.FC<Props> = ({ item, selected, onToggleSelect, onChange, onDelete, draggable, onDragStart, onDragEnter, onDrop }) => {
  return (
    <div
      className="h-full flex flex-col rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10"
      draggable={draggable}
      onDragStart={(e) => { e.dataTransfer.effectAllowed = 'move'; onDragStart?.(item.id); }}
      onDragEnter={() => onDragEnter?.(item.id)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDrop?.(item.id)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={item.image1}
          alt={item.name}
          className="w-full h-full object-cover select-none pointer-events-none user-select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            cursor: 'default'
          }}
        />
        {/* Drag handle + select */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          <button className="px-2 py-1 text-xs bg-white/10 border border-white/20 rounded text-white cursor-grab">Drag</button>
          <label className="flex items-center gap-1 text-xs text-white/80 bg-black/40 px-2 py-1 rounded border border-white/10">
            <input type="checkbox" checked={selected} onChange={() => onToggleSelect(item.id)} />
            Select
          </label>
        </div>
        {/* Delete */}
        <button
          onClick={() => onDelete(item.id)}
          className="absolute top-2 right-2 text-xs px-2 py-1 bg-white/10 border border-white/20 rounded text-white hover:bg-white/20"
        >
          Delete
        </button>
      </div>
      <div className="p-4 flex-1 flex flex-col gap-2">
        <input
          value={item.name}
          onChange={(e) => onChange(item.id, { name: e.target.value })}
          className="w-full px-3 py-2 rounded bg-black/30 border border-white/15 text-white placeholder-white/40 text-sm"
          placeholder="Title"
        />
        <input
          value={item.description || ''}
          onChange={(e) => onChange(item.id, { description: e.target.value })}
          className="w-full px-3 py-2 rounded bg-black/30 border border-white/15 text-white placeholder-white/40 text-sm"
          placeholder="Subtitle"
        />
      </div>
    </div>
  );
};


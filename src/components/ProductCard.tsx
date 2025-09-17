import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";

type Props = {
  name: string;
  price?: number;
  image1: string;
  image2?: string;
  description?: string;
};

export const ProductCard: React.FC<Props> = ({ name, image1, image2, description }) => {
  const [hovered, setHovered] = useState(false);
  const activeImage = hovered && image2 ? image2 : image1;
  const { addItem } = useCart();

  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300">
      <div
        className="relative aspect-[4/3] overflow-hidden bg-black"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={activeImage}
          alt={name}
          className="w-full h-full object-cover transition-opacity duration-300 pointer-events-none select-none user-select-none"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            cursor: 'default'
          }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-white leading-tight line-clamp-2">{name}</h3>
        {description && <p className="text-white/60 text-sm mt-1 mb-3 leading-normal line-clamp-1">{description}</p>}
        <div className="mt-auto">
          <button
            onClick={() => addItem({ name, image: image1, subtitle: description })}
            className="w-full px-4 py-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-lg text-white font-semibold hover:bg-white/30 transition-all duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

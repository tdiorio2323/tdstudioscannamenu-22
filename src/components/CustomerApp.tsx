import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingCart, Star, Heart, Filter, Search, User, MapPin, Clock, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/supabase/client';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  price: number; // dollars
  description: string | null;
  image_url: string | null;
  category: string | null;
  stock_quantity: number | null;
  is_active: boolean | null;
  brand_id: string | null;
}

interface CartItem extends Product {
  quantity: number;
}

interface CustomerAppProps {
  onCheckout?: (items: CartItem[], total: number) => void;
}

const productImages = [
  '/2.png',
  '/3.png',
  '/4.png',
  '/5.png',
  '/6.png',
  '/7.png',
  '/8.png',
  '/Gemini_Generated_Image_1y6sxw1y6sxw1y6s (1).png',
  '/Gemini_Generated_Image_2go2ed2go2ed2go2.png',
  '/Gemini_Generated_Image_4mn3kr4mn3kr4mn3.png',
  '/Gemini_Generated_Image_5eopsw5eopsw5eop (1).png',
  '/Gemini_Generated_Image_hxcer8hxcer8hxce (2).png',
  '/Gemini_Generated_Image_ig4c8eig4c8eig4c (1).png',
  '/Gemini_Generated_Image_it82npit82npit82 (1).png',
  '/Gemini_Generated_Image_jo3gf2jo3gf2jo3g.png',
  '/Gemini_Generated_Image_lc8ri2lc8ri2lc8r.png',
  '/Gemini_Generated_Image_vv8uc6vv8uc6vv8u.png'
];

const chinaProducts: Product[] = [
  {
    id: 'china-1',
    name: 'Baby Mama Drama',
    price: 0,
    description: 'NUMBER 21',
    image_url: '/baby mama drama.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-2',
    name: 'BBGummm',
    price: 0,
    description: 'NUMBER 22',
    image_url: '/bbgummm.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-5',
    name: 'Brain Candy',
    price: 0,
    description: 'NUMBER 23',
    image_url: '/Brain Candy Draft.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-6',
    name: 'Candy Runtz',
    price: 0,
    description: 'NUMBER 24',
    image_url: '/Candy Runtz.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-7',
    name: 'Cake Batter',
    price: 0,
    description: 'NUMBER 25',
    image_url: '/Copy of Cake Batter 4x5_thumb.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-9',
    name: 'Del Diamond',
    price: 0,
    description: 'NUMBER 26',
    image_url: '/del diamond.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-10',
    name: 'Disco BBG Runtz',
    price: 0,
    description: 'NUMBER 27',
    image_url: '/Disco BBG Runtz_1.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-11',
    name: 'Cherry Yummy',
    price: 0,
    description: 'NUMBER 28',
    image_url: '/file-3x9GHEZazrVhXEzesKC3mS-Cherry Yummy Mylar Design .jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-12',
    name: 'Fox Hole Bag',
    price: 0,
    description: 'NUMBER 29',
    image_url: '/Fox Hole Bag.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-13',
    name: 'Gummy',
    price: 0,
    description: 'NUMBER 30',
    image_url: '/Gummy Jpeg.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-14',
    name: 'Ice Cream Sundae',
    price: 0,
    description: 'NUMBER 31',
    image_url: '/ICE CREAM SUNDAE.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-15',
    name: 'Special Design 1',
    price: 0,
    description: 'NUMBER 32',
    image_url: '/IMG_2531.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-16',
    name: 'Special Design 2',
    price: 0,
    description: 'NUMBER 33',
    image_url: '/IMG_3179.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-17',
    name: 'JJ Beez Green',
    price: 0,
    description: 'NUMBER 34',
    image_url: '/jj beez green.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-19',
    name: 'Pink Funfetti',
    price: 0,
    description: 'NUMBER 35',
    image_url: '/PINK FUNFETTI.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-20',
    name: 'Raspberry Slushies',
    price: 0,
    description: 'NUMBER 36',
    image_url: '/raspberry slushies.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-22',
    name: 'Reese',
    price: 0,
    description: 'NUMBER 37',
    image_url: '/reese.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-23',
    name: 'Retro Runtz',
    price: 0,
    description: 'NUMBER 38',
    image_url: '/retro runtz plain .png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-28',
    name: 'Strawberry Tsunami',
    price: 0,
    description: 'NUMBER 39',
    image_url: '/Strawberry tsunami 4x5.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-29',
    name: 'Tira',
    price: 0,
    description: 'NUMBER 40',
    image_url: '/tira.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-30',
    name: 'Tropical Punch',
    price: 0,
    description: 'NUMBER 41',
    image_url: '/Tropical Punch 4x5_thumb.jpg',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-32',
    name: 'WDUC Special',
    price: 0,
    description: 'NUMBER 42',
    image_url: '/WDUC1914.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'china-33',
    name: 'Zaza Boricua',
    price: 0,
    description: 'NUMBER 43',
    image_url: '/zaza boricua.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'new-1',
    name: 'New Design 1',
    price: 0,
    description: 'NUMBER 44',
    image_url: '/1.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'new-2',
    name: 'New Design 2',
    price: 0,
    description: 'NUMBER 45',
    image_url: '/2.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'new-3',
    name: 'New Design 3',
    price: 0,
    description: 'NUMBER 46',
    image_url: '/3.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
  {
    id: 'new-4',
    name: 'New Design 4',
    price: 0,
    description: 'NUMBER 47',
    image_url: '/4.png',
    category: 'MYLAR DESIGNS',
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  },
];

const mockProducts: Product[] = [...Array.from({ length: 17 }, (_, i) => {
  let category = '4x5 DESIGNS';
  if (i >= 0 && i <= 5) {
    category = 'MYSTIC';
  } else if (i >= 7 && i <= 16) {
    category = 'CALYPSO';
  }
  return {
    id: `product-${i + 1}`,
    name: `Product ${i + 1}`,
    price: (i + 1) * 10,
    description: `NUMBER ${i + 1}`,
    image_url: i < productImages.length ? productImages[i] : null,
    category: category,
    stock_quantity: 10,
    is_active: true,
    brand_id: 'brand-1',
  };
}), ...chinaProducts];


const CartPreview = ({ cart, cartTotal, onCheckout, removeFromCart, addToCart, closePreview }) => {
  const navigate = useNavigate();

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg z-50">
      <div className="p-4 flex justify-between items-center border-b border-white/10">
        <h4 className="text-lg font-bold text-white">Your Cart</h4>
        <Button variant="ghost" size="icon" onClick={closePreview} className="text-white/70 hover:text-white">
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="max-h-80 overflow-y-auto p-4">
        {cart.map(item => (
          <div key={item.id} className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img src={item.image_url} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
              <div>
                <p className="text-white font-semibold">{item.name}</p>
                <p className="text-white/70 text-sm">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="h-8 w-8 border-white/20 text-white/80" onClick={() => removeFromCart(item.id)}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-white font-semibold">{item.quantity}</span>
              <Button variant="outline" size="icon" className="h-8 w-8 border-white/20 text-white/80" onClick={() => addToCart(item)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-white/10">
        <div className="flex justify-between items-center mb-4">
          <p className="text-white/80">Total</p>
          <p className="text-white font-bold text-xl">${cartTotal.toFixed(2)}</p>
        </div>
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => {
            sessionStorage.setItem('cartItems', JSON.stringify(cart));
            sessionStorage.setItem('cartTotal', cartTotal.toString());
            navigate('/checkout');
          }}
        >
          Go to Checkout
        </Button>
      </div>
    </div>
  );
};


const CustomerApp = ({ onCheckout }: CustomerAppProps) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartPreviewOpen, setIsCartPreviewOpen] = useState(false);
  const cartContainerRef = useRef(null);


  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
  }, [cart]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartContainerRef.current && !cartContainerRef.current.contains(event.target)) {
        setIsCartPreviewOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== productId);
    });
  };

  return (
    <div>
        {/* Cart Preview Container */}
        <div className="relative" ref={cartContainerRef}>
          {isCartPreviewOpen && (
            <CartPreview
              cart={cart}
              cartTotal={cartTotal}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              closePreview={() => setIsCartPreviewOpen(false)}
            />
          )}
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {mockProducts.map((product) => (
              <div key={product.id} className="flex flex-col items-center">
                <Card className="group relative bg-white/5 backdrop-blur-md border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/30 shadow-lg hover:shadow-primary/20 w-full h-full">
                  <CardContent className="p-0 h-full flex flex-col">
                    <div className="h-64 relative flex-shrink-0">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                            product.category === 'CALYPSO' ? 'object-cover' : 'object-contain'
                          }`}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/40 bg-black/10">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-full mx-auto mb-2 flex items-center justify-center">
                              <span className="text-2xl">🌿</span>
                            </div>
                            <p className="text-sm">No Image</p>
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-50 group-hover:opacity-75 transition-opacity" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="font-bold text-white text-xl tracking-tight">{product.name}</h3>
                        {product.category && (
                          <Badge variant="secondary" className="mt-1 bg-black/30 text-white/80 border border-white/20">
                            {product.category.charAt(0).toUpperCase() + product.category.slice(1).replace('_', ' ')}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                      {product.description && (
                        <p className="text-white/70 text-sm line-clamp-3">{product.description}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-center mt-4">
                  <Button
                    onClick={() => addToCart(product)}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

    </div>
  );
};

export default CustomerApp;
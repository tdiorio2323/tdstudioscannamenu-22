import { useState, useEffect } from 'react';

export default function Katya() {
  const [currentImage, setCurrentImage] = useState(0);
  
  const velAuraImages = [
    '/images/katya2.jpg',
    '/images/katyavelaura1.jpg',
    '/images/VelAura_Main_3_9aac14ea-ee8d-4792-8596-df036ccca732.jpg',
    '/images/VelAura_Main_4.jpg',
    '/images/VELAURA_FILE-removebg-preview.png',
    '/images/Your_paragraph_text_1.png'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % velAuraImages.length);
    }, 5000); // 5 seconds (slower)

    return () => clearInterval(interval);
  }, [velAuraImages.length]);
  return (
    <div
      className="min-h-dvh w-full bg-cover bg-center bg-no-repeat relative"
      style={{ 
        backgroundImage: "url('/images/para.webp')",
        backgroundPosition: "center top"
      }}
    >
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-sm items-start justify-center pt-4 pb-4 px-4">
        <div className="w-full rounded-3xl bg-black/80 shadow-[0_0_80px_rgba(255,255,255,0.3)] ring-1 ring-white/10 p-4 relative overflow-hidden drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">
          
          {/* VelAura Image Slideshow above buttons */}
          <div className="mb-4 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg h-64">
            <img 
              src={velAuraImages[currentImage]} 
              alt="VelAura Collection" 
              className="w-full h-full object-cover transition-opacity duration-500" 
            />
          </div>

          {/* Links Section */}
          <nav className="space-y-3 relative z-10">
            {/* VelAura Life (EXCLUSIVE) */}
            <a
              href="https://velauralife.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/30 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>✨</span>
                <span>VelAura Life</span>
              </div>
            </a>

            {/* OnlyFans */}
            <a
              href="https://onlyfans.com/?return_to=%2Fkatyaelisehenrysworld"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/30 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🔥</span>
                <span>EXCLUSIVE</span>
              </div>
            </a>

            {/* Amazon Shop */}
            <a
              href="https://www.amazon.com/shop/katyaelisehenry?ref_=cm_sw_r_apin_aipsfshop_CQQD923WYEC425H7AMXY&language=en_US"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/30 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🛒</span>
                <span>Amazon Shop</span>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@katyaelisehenryyy?_t=8q21LeeMW8U&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/30 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>🎵</span>
                <span>TikTok</span>
              </div>
            </a>

            {/* YouTube */}
            <a
              href="https://www.youtube.com/@katyaelisehenry"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/30 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>📺</span>
                <span>YouTube</span>
              </div>
            </a>

            {/* PSD Collection */}
            <a
              href="https://www.psd.com/collections/katya-henry"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-full px-6 py-4 text-center font-semibold text-white
                         bg-black/30 backdrop-blur-sm border-2 border-[#1da1f2]/60 
                         hover:bg-black/80 hover:border-[#1da1f2] transition-all duration-200
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <div className="flex items-center justify-center space-x-2">
                <span>👕</span>
                <span>PSD Collection</span>
              </div>
            </a>
          </nav>

          {/* Verification Badge (similar to LinkGenie) */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2 bg-[#1da1f2]/90 backdrop-blur-sm 
                          rounded-full px-4 py-2 border border-white/20">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-white text-xs font-medium">Verified Profile</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
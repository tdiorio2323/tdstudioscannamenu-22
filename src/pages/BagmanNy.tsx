import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// BagmanNY-branded auth page with custom background + logo
// Place assets in public/lovable-uploads/ as below
// Use external image as background (direct Imgur link)
const BG_URL = "/images/bagman_ny_background.png"; // BagmanNY specific background
const LOGO_URL = "/BAGMANS.png"; // BagmanNY specific logo

const BagmanNy = () => {
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState(0); // Add state for slideshow

  useEffect(() => {
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    let originalOgTitle = '';
    if (ogTitleMeta) {
      originalOgTitle = ogTitleMeta.getAttribute('content') || '';
      ogTitleMeta.setAttribute('content', 'BAGMAN');
    }

    return () => {
      if (ogTitleMeta) {
        ogTitleMeta.setAttribute('content', originalOgTitle);
      }
    };
  }, []);

  const recentImages = [ // Add recentImages array
    '/images/bagman_ny_slideshow/Generated Image September 06, 2025 - 8_31PM (1).jpeg',
    '/images/bagman_ny_slideshow/HNRU1785.PNG',
    '/images/bagman_ny_slideshow/IMG_4648.JPG',
    '/images/bagman_ny_slideshow/BAGMAN Floating Mockup.png',
    '/images/bagman_ny_slideshow/BAGMAN GATE.png',
    '/images/bagman_ny_slideshow/bagman book.jpg',
    '/images/bagman_ny_slideshow/BAGMAN.png'
  ];

  useEffect(() => { // Add useEffect for slideshow
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % recentImages.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [recentImages.length]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center relative"
      style={{ backgroundImage: `url(${BG_URL})` }}
    >
      <div className="absolute inset-0 bg-black/40" />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-lg items-center justify-center p-3 sm:p-6">
        <div className="w-full h-[calc(100dvh-1.5rem)] sm:h-[calc(100dvh-3rem)] rounded-3xl bg-black/80 shadow-[0_0_80px_rgba(255,255,255,0.3)] ring-1 ring-white/10 p-4 sm:p-6 relative overflow-hidden drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] drop-shadow-[0_0_5px_#0F0] flex flex-col">
          
          
          {/* static logo (no bounce) - positioned over the smoke image */}
          <div className="flex justify-center mb-4 sm:mb-6 relative z-10">
            <img src={LOGO_URL} alt="BagmanNY" className="h-40 sm:h-60 w-auto" /> {/* Modified logo */}
          </div>

          {/* buttons */}
          <nav className="flex flex-col gap-2 sm:gap-3 relative z-10"> {/* Changed to flex flex-col for vertical stacking */}
            <a
              href="https://www.bagmanpack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-xl text-center font-bold tracking-wide text-lg sm:text-2xl
                         bg-black/50 backdrop-blur-md text-white ring-1 ring-white/20 shadow-lg drop-shadow-md hover:bg-black/70 transition-all duration-300
                         flex items-center justify-center"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              PACKAGING
            </a>
            <a
              href="https://www.bagmanpack.com/design"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-xl text-center font-bold tracking-wide text-lg sm:text-2xl
                         bg-black/50 backdrop-blur-md text-white ring-1 ring-white/20 shadow-lg drop-shadow-md hover:bg-black/70 transition-all duration-300
                         flex items-center justify-center"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              DESIGNS
            </a>
            <a
              href="https://www.bagmanpack.com/form"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 rounded-xl text-center font-bold tracking-wide text-lg sm:text-2xl
                         bg-black/50 backdrop-blur-md text-white ring-1 ring-white/20 shadow-lg drop-shadow-md hover:bg-black/70 transition-all duration-300
                         flex items-center justify-center"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              GET A QUOTE
            </a>
            </nav>

          {/* slideshow of recent images */}
          <div className="mt-4 sm:mt-6 overflow-hidden rounded-2xl ring-1 ring-white/10 relative z-10 flex-1">
            <img 
              src={recentImages[currentImage]} 
              alt="QuickPrintz Showcase" 
              className="w-full h-full object-cover transition-opacity duration-500" 
            />
          </div>
          <div className="text-center text-white/80 text-xl font-bold font-bebas-neue mt-4 relative z-10">
            WWW.BAGMANPACK.COM
          </div>
        </div>
      </main>
    </div>
  );
};

export default BagmanNy;

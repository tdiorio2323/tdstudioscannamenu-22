import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Show page based on BagmanNY but without embedded links
const BG_URL = "/images/bagman_ny_background.png"; // BagmanNY specific background
const LOGO_URL = "/cabana-logo.png"; // CABANA logo

const Show = () => {
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
    <div className="min-h-dvh w-full bg-black flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div
        className="w-full max-w-md mx-auto rounded-3xl bg-black/90 shadow-[0_0_60px_rgba(255,255,255,0.6)] ring-1 ring-white/20 p-4 sm:p-6 relative overflow-hidden drop-shadow-[0_0_30px_rgba(255,255,255,0.8)] flex flex-col"
        style={{
          height: 'calc(100dvh - 1rem)',
          maxHeight: '800px',
          minHeight: '600px'
        }}
      >
        {/* CABANA Logo */}
        <div className="flex justify-center mb-4 sm:mb-6 relative z-10 flex-shrink-0">
          <img src={LOGO_URL} alt="CABANA" className="h-24 sm:h-32 md:h-36 w-auto" />
        </div>

        {/* Slideshow of recent images */}
        <div className="overflow-hidden rounded-2xl ring-1 ring-white/20 relative z-10 flex-1 min-h-0">
          <img
            src={recentImages[currentImage]}
            alt="TD Studios Showcase"
            className="w-full h-full object-cover transition-opacity duration-500"
          />
        </div>

        {/* URL at bottom */}
        <div className="text-center text-white/90 text-lg sm:text-xl font-bold font-bebas-neue mt-4 relative z-10 flex-shrink-0">
          TD STUDIOS
        </div>
      </div>
    </div>
  );
};

export default Show;
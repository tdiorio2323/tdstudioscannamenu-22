import { useState, useEffect } from 'react';

export default function EldonDolla() {
  // Update page meta tags for social sharing
  useEffect(() => {
    document.title = 'ELDON DOLLA - Luxury Courses & Social Media';
    
    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('og:title', 'ELDON DOLLA');
    updateMetaTag('og:description', 'Luxury courses and premium content creator');
    updateMetaTag('og:image', '/eldon-dolla-og-image.png');
    updateMetaTag('og:url', window.location.href);

    // Cleanup function to restore original meta tags when component unmounts
    return () => {
      document.title = 'TD STUDIOS';
      updateMetaTag('og:title', 'TD STUDIOS');
      updateMetaTag('og:description', 'Lovable Generated Project');
      updateMetaTag('og:image', '/og-image.png');
    };
  }, []);

  const socialLinks = [
    {
      name: 'KICK',
      icon: '/icons/kick-logo.svg', // You'll need to add these icons
      url: '#',
      bgColor: 'from-green-500 to-green-600',
    },
    {
      name: 'YOUTUBE',
      icon: '/icons/youtube-logo.svg',
      url: '#',
      bgColor: 'from-red-500 to-red-600',
    },
    {
      name: 'TIKTOK',
      icon: '/icons/tiktok-logo.svg',
      url: '#',
      bgColor: 'from-black to-gray-800',
    },
    {
      name: 'INSTAGRAM',
      icon: '/icons/instagram-logo.svg',
      url: '#',
      bgColor: 'from-purple-500 via-pink-500 to-orange-500',
    },
    {
      name: 'X',
      icon: '/icons/x-logo.svg',
      url: '#',
      bgColor: 'from-black to-gray-800',
    },
    {
      name: 'FACEBOOK',
      icon: '/icons/facebook-logo.svg',
      url: '#',
      bgColor: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-dvh w-full relative overflow-hidden bg-black">
      {/* Animated golden wave background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-amber-500/10 to-yellow-600/20"></div>
        
        {/* Starfield effect */}
        <div className="absolute inset-0">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Golden flowing waves */}
        <div className="absolute inset-0 overflow-hidden">
          <svg
            className="absolute -bottom-10 left-0 w-full h-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#FFA500" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M0,300 Q300,100 600,300 T1200,300 L1200,800 L0,800 Z"
              fill="url(#waveGradient1)"
              className="animate-pulse"
            />
            <path
              d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
              fill="url(#waveGradient2)"
              className="animate-pulse"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>
      </div>

      <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg items-center justify-center p-3 sm:p-6">
        <div className="w-full h-[calc(100dvh-1.5rem)] sm:h-[calc(100dvh-3rem)] rounded-3xl bg-black/80 shadow-[0_0_80px_rgba(255,255,255,0.3)] ring-1 ring-white/10 p-4 sm:p-6 relative overflow-hidden drop-shadow-[0_0_20px_rgba(255,255,255,0.5)] drop-shadow-[0_0_5px_#FFD700] flex flex-col">
          <div className="w-full max-w-sm mx-auto flex flex-col h-full justify-center">
          {/* Profile Image with Golden Circle */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              {/* Golden ring border */}
              <div className="w-48 h-48 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-1 shadow-2xl">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-800 to-black overflow-hidden shadow-inner">
                  {/* Profile image */}
                  <img 
                    src="/edd gold_png circl.png" 
                    alt="Eldon Dolla Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Golden glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 blur-md opacity-50 -z-10"></div>
            </div>
          </div>

          {/* Name Title */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl font-bold text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text drop-shadow-lg tracking-wider"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              ELDON DOLLA
            </h1>
          </div>

          {/* Social Media Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square"
              >
                {/* Golden ring */}
                <div className="w-full h-full rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 p-1 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                    {/* Social icon background */}
                    <div className={`w-full h-full bg-gradient-to-r ${social.bgColor} flex items-center justify-center rounded-full`}>
                      {/* Placeholder for social icons - replace with actual icons */}
                      <span className="text-white font-bold text-xs">
                        {social.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Golden glow on hover */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 blur-sm opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
              </a>
            ))}
          </div>

          {/* Subscribe to Courses Button */}
          <div className="mb-6">
            <button className="w-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-black font-bold py-4 px-6 rounded-xl shadow-2xl hover:from-yellow-400 hover:via-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-md">
              <span 
                className="text-xl tracking-wider"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                SUBSCRIBE TO COURSES
              </span>
            </button>
          </div>

          {/* OnlyKings Club Branding */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-yellow-400/30">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xs">K</span>
              </div>
              <span 
                className="text-transparent bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 bg-clip-text font-bold text-lg tracking-wider"
                style={{ fontFamily: 'Bebas Neue, sans-serif' }}
              >
                ONLYKINGSCLUB
              </span>
            </div>
            <p className="text-yellow-300/70 text-sm mt-2 tracking-wider" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              POWERED BY
            </p>
          </div>
        </div>
        </div>
      </main>
    </div>
  );
}
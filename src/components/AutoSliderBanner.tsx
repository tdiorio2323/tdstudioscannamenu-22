import React, { useEffect, useRef, useState } from "react";

const images = [
  "https://64.media.tumblr.com/db8472cfbb89a155148003b053d5f3de/4d6d987e0cee7307-8e/s400x225/158142e8e876044a6191733a02f6ee5ac1643b58.gif",
  "https://i.pinimg.com/originals/14/f4/35/14f435eaaf8d107cca5055ce150eaf47.gif",
];

export const AutoSliderBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [useVideo, setUseVideo] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen left-1/2 -translate-x-1/2 h-[90vh] md:h-screen overflow-hidden">
      {useVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/TD STUDIOS WHITE TEXT.png"
          onError={() => setUseVideo(false)}
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
      ) : (
        images.map((src, index) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
          >
            <img src={src} alt={`Banner ${index + 1}`} className="w-full h-full object-cover" loading={index === 0 ? "eager" : "lazy"} />
          </div>
        ))
      )}

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 bg-black/10" />
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-100 mb-3">
          <span className="block md:inline">LUXURY</span>
          <span className="block md:inline md:ml-4">STRATEGY</span>
          <span className="block md:inline md:ml-4">CREATIVITY</span>
        </h1>
        <p className="text-2xl font-semibold tracking-tight text-white md:text-3xl mb-8">All in one place</p>
      </div>
    </div>
  );
};

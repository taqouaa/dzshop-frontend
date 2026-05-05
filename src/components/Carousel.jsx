// src/components/Carousel.jsx
import { useState, useEffect } from 'react';

const banners = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden bg-primary-900">
      {banners.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Banner ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-primary-900/50 flex flex-col items-center justify-center">
        <h2 className="text-white text-3xl md:text-5xl font-bold tracking-widest uppercase drop-shadow-lg">
          Pixel<span className="text-silver-300">Shop</span>
        </h2>
        <p className="text-primary-200 mt-2 text-sm md:text-lg tracking-wider">
          Discover the Latest Trends
        </p>
      </div>
      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? 'bg-primary-400' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

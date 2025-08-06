import React, { useEffect, useState } from 'react';

const AnimatedWorldMap = () => {
  const [currentView, setCurrentView] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentView((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getTransform = () => {
    switch (currentView) {
      case 0: // Africa view
        return 'translate(-200, -100) scale(2.5)';
      case 1: // Oceania view
        return 'translate(-800, -200) scale(2.5)';
      case 2: // Global view
        return 'translate(0, 0) scale(1)';
      default:
        return 'translate(0, 0) scale(1)';
    }
  };

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-lg overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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

      {/* SVG World Map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full transition-transform duration-3000 ease-in-out"
          style={{ transform: getTransform() }}
        >
          {/* Africa */}
          <g className="fill-green-400 stroke-green-300 stroke-1">
            <path d="M520 180 Q540 160 560 180 L580 200 Q590 220 580 240 L560 280 Q540 300 520 280 L500 260 Q480 240 500 220 L520 180 Z" />
            <path d="M500 280 Q520 300 540 320 L560 340 Q580 360 570 380 L550 400 Q530 420 510 400 L490 380 Q470 360 480 340 L500 280 Z" />
            <circle cx="530" cy="200" r="8" className="fill-orange-500" />
            <circle cx="520" cy="320" r="6" className="fill-orange-500" />
          </g>

          {/* Australia/Oceania */}
          <g className="fill-yellow-400 stroke-yellow-300 stroke-1">
            <path d="M720 320 Q750 310 780 330 L800 350 Q810 370 800 390 L780 400 Q750 410 720 400 L700 390 Q680 370 690 350 L720 320 Z" />
            <circle cx="750" cy="360" r="5" className="fill-red-500" />
            <circle cx="740" cy="380" r="3" className="fill-red-500" />
            <circle cx="770" cy="340" r="4" className="fill-red-500" />
          </g>

          {/* Other continents (simplified) */}
          <g className="fill-gray-400 stroke-gray-300 stroke-1 opacity-60">
            {/* Europe */}
            <path d="M480 120 Q500 100 520 120 L540 140 Q550 160 540 180 L520 200 Q500 220 480 200 L460 180 Q450 160 460 140 L480 120 Z" />
            
            {/* Asia */}
            <path d="M560 80 Q600 60 640 80 L680 100 Q720 120 700 160 L680 200 Q640 240 600 220 L580 200 Q560 180 570 160 L560 80 Z" />
            
            {/* North America */}
            <path d="M200 100 Q240 80 280 100 L320 120 Q360 140 350 180 L330 220 Q290 260 250 240 L220 220 Q180 200 190 180 L200 100 Z" />
            
            {/* South America */}
            <path d="M300 280 Q320 260 340 280 L360 300 Q380 320 370 360 L350 400 Q330 440 310 420 L290 400 Q270 380 280 360 L300 280 Z" />
          </g>

          {/* Office markers */}
          <g className="fill-primary stroke-white stroke-2">
            <circle cx="530" cy="250" r="8" className="animate-pulse">
              <title>South Africa Office</title>
            </circle>
            <circle cx="750" cy="360" r="8" className="animate-pulse">
              <title>Australia Office</title>
            </circle>
          </g>

          {/* Connection line */}
          <line 
            x1="530" 
            y1="250" 
            x2="750" 
            y2="360" 
            className="stroke-primary stroke-2 opacity-60 animate-pulse"
            strokeDasharray="5,5"
          />
        </svg>
      </div>

      {/* Location labels */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-white text-sm">
        <div className={`transition-opacity duration-1000 ${currentView === 0 ? 'opacity-100' : 'opacity-50'}`}>
          🌍 Africa Focus
        </div>
        <div className={`transition-opacity duration-1000 ${currentView === 1 ? 'opacity-100' : 'opacity-50'}`}>
          🌏 Oceania Focus
        </div>
        <div className={`transition-opacity duration-1000 ${currentView === 2 ? 'opacity-100' : 'opacity-50'}`}>
          🌎 Global View
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/20" />
    </div>
  );
};

export default AnimatedWorldMap;

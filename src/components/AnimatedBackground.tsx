import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: string;
    animationDuration: string;
    animationDelay: string;
    size: number;
  }>>([]);

  useEffect(() => {
    // Generate particles on mount
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${15 + Math.random() * 20}s`,
      animationDelay: `${Math.random() * 5}s`,
      size: Math.random() * 3 + 1,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Particles/Nodes */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/20 animate-float-up"
          style={{
            left: particle.left,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            bottom: '-10px',
            animationDuration: particle.animationDuration,
            animationDelay: particle.animationDelay,
          }}
        />
      ))}

      {/* Geometric Shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-primary/10 rounded-lg animate-spin-slow" />
      <div className="absolute bottom-32 left-16 w-24 h-24 border border-accent/10 rotate-45 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-primary/10 rounded-full animate-scale-pulse" />
      
      {/* Connection Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="currentColor" strokeWidth="1" className="text-primary animate-draw-line" />
        <line x1="80%" y1="30%" x2="20%" y2="70%" stroke="currentColor" strokeWidth="1" className="text-accent animate-draw-line-delayed" />
      </svg>
    </div>
  );
};

export default AnimatedBackground;

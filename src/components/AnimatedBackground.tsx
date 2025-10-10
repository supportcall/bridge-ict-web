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
      {/* Animated Grid Lines - More Visible */}
      <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.12]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Particles/Nodes - More Visible */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 dark:bg-primary/40 animate-float-up shadow-glow"
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

      {/* Geometric Shapes - Enhanced Visibility */}
      <div className="absolute top-20 right-10 w-32 h-32 border-2 border-primary/20 dark:border-primary/30 rounded-lg animate-spin-slow" />
      <div className="absolute bottom-32 left-16 w-24 h-24 border-2 border-accent/20 dark:border-accent/30 rotate-45 animate-pulse-slow" />
      <div className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-primary/15 dark:border-primary/25 rounded-full animate-scale-pulse" />
      <div className="absolute top-1/2 right-1/3 w-20 h-20 border-2 border-accent/15 dark:border-accent/25 rotate-12 animate-pulse-slow" style={{ animationDelay: '1s' }} />
      
      {/* Connection Lines - More Visible */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.12] dark:opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="20%" x2="90%" y2="80%" stroke="currentColor" strokeWidth="1.5" className="text-primary animate-draw-line" />
        <line x1="80%" y1="30%" x2="20%" y2="70%" stroke="currentColor" strokeWidth="1.5" className="text-accent animate-draw-line-delayed" />
        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="currentColor" strokeWidth="1" className="text-primary/50 animate-draw-line" style={{ animationDelay: '3s' }} />
      </svg>

      {/* Tech Circuit Pattern */}
      <div className="absolute top-10 left-10 opacity-[0.08] dark:opacity-[0.15]">
        <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="3" fill="currentColor" className="text-primary animate-pulse-slow" />
          <circle cx="100" cy="20" r="3" fill="currentColor" className="text-accent animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
          <circle cx="20" cy="100" r="3" fill="currentColor" className="text-primary animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <circle cx="100" cy="100" r="3" fill="currentColor" className="text-accent animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <path d="M 20 20 L 100 20 L 100 100 L 20 100 Z" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
          <path d="M 60 20 L 60 100" stroke="currentColor" strokeWidth="1" className="text-accent/50" />
          <path d="M 20 60 L 100 60" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
        </svg>
      </div>

      {/* Tech Circuit Pattern - Bottom Right */}
      <div className="absolute bottom-10 right-10 opacity-[0.08] dark:opacity-[0.15] rotate-180">
        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="2" fill="currentColor" className="text-accent animate-pulse-slow" />
          <circle cx="85" cy="15" r="2" fill="currentColor" className="text-primary animate-pulse-slow" style={{ animationDelay: '0.7s' }} />
          <circle cx="50" cy="50" r="3" fill="currentColor" className="text-accent animate-pulse-slow" style={{ animationDelay: '1.2s' }} />
          <path d="M 15 15 L 50 50 L 85 15" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary/50" />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedBackground;

// Cross-Platform Optimization Utilities
// Ensures consistent experience across all devices and platforms

export const detectUserAgent = () => {
  const ua = navigator.userAgent;
  return {
    isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
    isTablet: /iPad|Android(?=.*\bMobile\b)/i.test(ua),
    isDesktop: !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua),
    isIOS: /iPad|iPhone|iPod/.test(ua),
    isAndroid: /Android/.test(ua),
    isSafari: /Safari/.test(ua) && !/Chrome/.test(ua),
    isChrome: /Chrome/.test(ua),
    isFirefox: /Firefox/.test(ua),
    isEdge: /Edge/.test(ua)
  };
};

export const optimizeForDevice = () => {
  const device = detectUserAgent();
  
  // iOS-specific optimizations
  if (device.isIOS) {
    // Prevent zoom on form focus
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    }
    
    // Fix iOS scroll bounce
    document.body.addEventListener('touchmove', (e) => {
      if (e.target === document.body) {
        e.preventDefault();
      }
    }, { passive: false });
  }
  
  // Android-specific optimizations
  if (device.isAndroid) {
    // Optimize touch events
    document.body.style.touchAction = 'manipulation';
  }
  
  // Desktop optimizations
  if (device.isDesktop) {
    // Enable advanced CSS features
    document.documentElement.classList.add('desktop');
  }
};

export const ensureConsistentFonts = () => {
  // Ensure consistent font rendering across platforms
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-rendering: optimizeLegibility;
    }
    
    /* Consistent form styling across platforms */
    input, select, textarea, button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      font-family: inherit;
    }
    
    /* Consistent scrollbar styling */
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    
    ::-webkit-scrollbar-track {
      background: hsl(var(--muted));
    }
    
    ::-webkit-scrollbar-thumb {
      background: hsl(var(--primary));
      border-radius: 4px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
      background: hsl(var(--primary-glow));
    }
  `;
  document.head.appendChild(style);
};

export const initializeCrossPlatformOptimizations = () => {
  optimizeForDevice();
  ensureConsistentFonts();
  
  // Ensure consistent viewport height handling
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', () => {
    setTimeout(setVH, 100);
  });
};
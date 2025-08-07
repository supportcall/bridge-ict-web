// Performance monitoring and optimization utilities

export const performanceObserver = {
  // Monitor Core Web Vitals
  observeWebVitals: () => {
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      // This would integrate with web-vitals library in production
      console.log('Web Vitals monitoring enabled');
    }
  },

  // Resource loading optimization
  preloadCriticalResources: () => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = '/assets/hero-tech.jpg';
    link.as = 'image';
    document.head.appendChild(link);
  },

  // Image optimization helper
  optimizeImage: (src: string, width?: number, height?: number) => {
    if (width && height) {
      return `${src}?w=${width}&h=${height}&fit=crop&auto=format`;
    }
    return src;
  }
};

export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Bundle size analysis helper
export const analyzeBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Bundle size analysis available in build mode');
  }
};

// Memory leak detection
export const memoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    return {
      usedJSMemory: memory.usedJSHeapSize,
      totalJSMemory: memory.totalJSHeapSize,
      jsMemoryLimit: memory.jsHeapSizeLimit
    };
  }
  return null;
};

// Critical rendering path optimization
export const optimizeCriticalPath = () => {
  // Preconnect to external domains
  const preconnectDomains = [
    'https://api.mapbox.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ];

  preconnectDomains.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Service Worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
};
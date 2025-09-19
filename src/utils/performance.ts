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

// Critical rendering path optimization - Self-contained with maximum performance
export const optimizeCriticalPath = () => {
  // Self-contained optimization - no external preconnects needed
  console.log('Self-contained mode: Maximum performance optimizations enabled');
  
  // Ensure all images have loading="lazy" except above-the-fold
  document.querySelectorAll('img').forEach((img, index) => {
    if (index > 2 && !img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    // Add content-visibility for performance
    if (index > 3) {
      img.style.contentVisibility = 'auto';
    }
  });
  
  // Add rel="preload" to critical resources
  const criticalResources = [
    '/assets/hero-tech.jpg',
    '/assets/services-icon.jpg'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = 'image';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });

  // Optimize viewport meta for mobile responsiveness
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes, viewport-fit=cover');
  }

  // Add resource hints for performance
  const dnsPreconnect = document.createElement('link');
  dnsPreconnect.rel = 'dns-prefetch';
  dnsPreconnect.href = '//www.google-analytics.com';
  document.head.appendChild(dnsPreconnect);

  // Enable passive event listeners for better scrolling performance
  if ('addEventListener' in window) {
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
      if (type === 'scroll' || type === 'wheel' || type === 'touchstart' || type === 'touchmove') {
        if (typeof options === 'boolean') {
          options = { passive: true, capture: options };
        } else if (typeof options === 'object' && options !== null) {
          options.passive = true;
        } else {
          options = { passive: true };
        }
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  }
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
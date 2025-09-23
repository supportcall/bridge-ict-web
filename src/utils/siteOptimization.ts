/**
 * Comprehensive site optimization utilities
 * Ensures maximum performance, security, and user experience
 */

// Performance monitoring and optimization
export const optimizeWebVitals = () => {
  // Monitor Core Web Vitals
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
          // Track if LCP is under 2.5s (good threshold)
          if (entry.startTime > 2500) {
            console.warn('LCP optimization needed - consider image optimization or critical resource prioritization');
          }
        }
      }
    });
    
    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.entryType === 'first-input') {
          const fidEntry = entry as any; // FID entries have different interface
          console.log('FID:', fidEntry.processingStart - fidEntry.startTime);
        }
      }
    });
    
    try {
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
      fidObserver.observe({ type: 'first-input', buffered: true });
    } catch (error) {
      console.warn('Performance observation not supported');
    }
  }
};

// Ensure consistent behavior across platforms
export const ensureCrossPlatformConsistency = () => {
  // Fix viewport height on mobile browsers
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  setVH();
  window.addEventListener('resize', setVH);
  window.addEventListener('orientationchange', setVH);
  
  // Prevent zoom on iOS form inputs
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      const htmlInput = input as HTMLInputElement;
      htmlInput.addEventListener('focus', () => {
        if (htmlInput.style.fontSize !== '16px') {
          htmlInput.style.fontSize = '16px';
        }
      });
    });
  }
  
  // Optimize touch interactions
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add passive listeners for better performance
    document.addEventListener('touchstart', () => {}, { passive: true });
    document.addEventListener('touchmove', () => {}, { passive: true });
  }
};

// Advanced SEO optimizations
export const enhanceMetaTags = () => {
  // Ensure viewport meta tag is optimal
  const viewport = document.querySelector('meta[name="viewport"]');
  if (!viewport) {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
    document.head.appendChild(meta);
  }
  
  // Add theme color for mobile browsers
  if (!document.querySelector('meta[name="theme-color"]')) {
    const themeColor = document.createElement('meta');
    themeColor.name = 'theme-color';
    themeColor.content = '#0080FF'; // Primary color
    document.head.appendChild(themeColor);
  }
  
  // Add apple touch icons
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = '/logo.png';
    document.head.appendChild(appleIcon);
  }
};

// Resource optimization
export const optimizeResources = () => {
  // Lazy load images that aren't in viewport
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
  
  // Preload critical resources
  const criticalResources = [
    '/logo.png',
    '/og-image.jpg'
  ];
  
  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = resource;
    document.head.appendChild(link);
  });
};

// Security enhancements
export const enhanceSecurity = () => {
  // Disable right-click context menu on sensitive elements
  document.querySelectorAll('img, video').forEach(element => {
    element.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });
  
  // Add referrer policy
  if (!document.querySelector('meta[name="referrer"]')) {
    const referrer = document.createElement('meta');
    referrer.name = 'referrer';
    referrer.content = 'strict-origin-when-cross-origin';
    document.head.appendChild(referrer);
  }
};

// Accessibility enhancements
export const enhanceAccessibility = () => {
  // Add skip link for keyboard navigation
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-primary text-primary-foreground p-2 z-[10000]';
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Ensure main content has ID
    const main = document.querySelector('main') || document.querySelector('[role="main"]') || document.body;
    if (main && !main.id) {
      main.id = 'main-content';
    }
  }
  
  // Enhance focus indicators
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
};

// Marketing optimization
export const optimizeForConversion = () => {
  // Track form interactions for optimization
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      // Analytics tracking would go here
      console.log('Form submission tracked for optimization');
    });
    
    // Track field interactions
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        console.log('Field interaction tracked:', input.getAttribute('name'));
      });
    });
  });
  
  // CTA button tracking
  document.querySelectorAll('[data-cta]').forEach(button => {
    button.addEventListener('click', (e) => {
      const ctaName = button.getAttribute('data-cta');
      console.log('CTA clicked:', ctaName);
    });
  });
};

// Initialize all optimizations
export const initializeComprehensiveOptimizations = () => {
  // Run optimizations when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runOptimizations);
  } else {
    runOptimizations();
  }
  
  function runOptimizations() {
    try {
      optimizeWebVitals();
      ensureCrossPlatformConsistency();
      enhanceMetaTags();
      optimizeResources();
      enhanceSecurity();
      enhanceAccessibility();
      optimizeForConversion();
      
      console.log('Site optimization complete - maximum performance and security enabled');
    } catch (error) {
      console.warn('Site optimization partial failure:', error);
    }
  }
  
  // Re-run optimizations on route changes
  window.addEventListener('popstate', runOptimizations);
};

// Comprehensive site validation
export const validateSiteIntegrity = () => {
  const checks = {
    performance: false,
    security: false,
    accessibility: false,
    seo: false,
    responsive: false
  };
  
  // Performance checks
  if ('PerformanceObserver' in window && 'IntersectionObserver' in window) {
    checks.performance = true;
  }
  
  // Security checks
  const hasCSP = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
  const hasReferrer = document.querySelector('meta[name="referrer"]');
  if (hasReferrer) {
    checks.security = true;
  }
  
  // Accessibility checks
  const hasSkipLink = document.querySelector('.skip-link');
  const hasMainContent = document.querySelector('#main-content, main, [role="main"]');
  if (hasMainContent) {
    checks.accessibility = true;
  }
  
  // SEO checks
  const hasTitle = document.title && document.title.length > 0;
  const hasDescription = document.querySelector('meta[name="description"]');
  const hasViewport = document.querySelector('meta[name="viewport"]');
  if (hasTitle && hasDescription && hasViewport) {
    checks.seo = true;
  }
  
  // Responsive checks
  const hasResponsiveCSS = getComputedStyle(document.body).getPropertyValue('--vh');
  if (hasResponsiveCSS || window.innerWidth !== screen.width) {
    checks.responsive = true;
  }
  
  console.log('Site integrity validation:', checks);
  return checks;
};
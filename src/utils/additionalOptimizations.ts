// Additional SupportCALL Optimizations for Best-in-Class Experience
// Ensures maximum compatibility, speed, and user experience

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/logo.png', as: 'image', type: 'image/png' },
    { href: '/og-image.jpg', as: 'image', type: 'image/jpeg' }
  ];

  criticalResources.forEach(resource => {
    const existingLink = document.querySelector(`link[href="${resource.href}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.type) {
        link.type = resource.type;
      }
      document.head.appendChild(link);
    }
  });
};

// Ensure DNS prefetch for external domains
export const addDNSPrefetch = () => {
  const domains = [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://tickets.supportcall-isp.co.za',
    'https://wiki.supportcall.co.za',
    'https://supportcall.co.za'
  ];

  domains.forEach(domain => {
    const existingLink = document.querySelector(`link[href="${domain}"]`);
    if (!existingLink) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    }
  });
};

// Optimize form elements for better UX
export const optimizeFormElements = () => {
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    // Prevent iOS zoom on form focus
    if (input instanceof HTMLInputElement || input instanceof HTMLSelectElement || input instanceof HTMLTextAreaElement) {
      if (!input.style.fontSize) {
        input.style.fontSize = '16px';
      }
      
      // Add autocomplete attributes for better UX
      if (input instanceof HTMLInputElement) {
        if (input.type === 'email' && !input.getAttribute('autocomplete')) {
          input.setAttribute('autocomplete', 'email');
        }
        if (input.type === 'tel' && !input.getAttribute('autocomplete')) {
          input.setAttribute('autocomplete', 'tel');
        }
        if (input.name?.toLowerCase().includes('name') && !input.getAttribute('autocomplete')) {
          input.setAttribute('autocomplete', 'name');
        }
      }
    }
  });
};

// Ensure proper ARIA labels for accessibility
export const enhanceAccessibility = () => {
  // Add skip links if not present
  const skipLink = document.querySelector('a[href="#main-content"]');
  if (!skipLink) {
    const skip = document.createElement('a');
    skip.href = '#main-content';
    skip.textContent = 'Skip to main content';
    skip.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md';
    document.body.insertBefore(skip, document.body.firstChild);
  }

  // Ensure main content is marked
  let main = document.querySelector('main');
  if (!main) {
    main = document.querySelector('[role="main"]');
    if (!main) {
      const firstSection = document.querySelector('section, article, div[class*="container"]');
      if (firstSection && !firstSection.closest('header') && !firstSection.closest('footer')) {
        firstSection.setAttribute('role', 'main');
        firstSection.id = 'main-content';
      }
    }
  }

  // Add ARIA labels to buttons without them
  const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
  buttons.forEach(button => {
    if (!button.textContent?.trim() && !button.querySelector('span:not(.sr-only)')) {
      const icon = button.querySelector('svg, i, [class*="icon"]');
      if (icon) {
        button.setAttribute('aria-label', 'Button');
      }
    }
  });
};

// Optimize images for better performance
export const optimizeImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Add lazy loading
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Add decoding async
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    
    // Ensure proper sizing attributes
    if (img.naturalWidth && img.naturalHeight && !img.hasAttribute('width') && !img.hasAttribute('height')) {
      img.setAttribute('width', img.naturalWidth.toString());
      img.setAttribute('height', img.naturalHeight.toString());
    }
    
    // Add proper alt text if missing
    if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
      const src = img.getAttribute('src') || '';
      const filename = src.split('/').pop()?.split('.')[0] || 'image';
      img.setAttribute('alt', `SupportCALL ${filename.replace(/[-_]/g, ' ')}`);
    }
  });
};

// Ensure HTTPS and security headers
export const ensureSecurityBestPractices = () => {
  // Ensure HTTPS
  if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
    console.warn('⚠️ Site should be served over HTTPS for security');
  }

  // Check for and add security-related meta tags
  const securityMetas = [
    { name: 'referrer', content: 'strict-origin-when-cross-origin' },
    { name: 'robots', content: 'index, follow' },
    { 'http-equiv': 'X-Content-Type-Options', content: 'nosniff' },
    { 'http-equiv': 'X-Frame-Options', content: 'DENY' }
  ];

  securityMetas.forEach(meta => {
    const existing = document.querySelector(`meta[name="${meta.name}"], meta[http-equiv="${meta['http-equiv']}"]`);
    if (!existing) {
      const metaEl = document.createElement('meta');
      if (meta.name) metaEl.setAttribute('name', meta.name);
      if (meta['http-equiv']) metaEl.setAttribute('http-equiv', meta['http-equiv']);
      metaEl.setAttribute('content', meta.content);
      document.head.appendChild(metaEl);
    }
  });
};

// Performance monitoring and optimization
export const monitorPerformance = () => {
  // Monitor Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log(`LCP: ${entry.startTime}ms`);
            if (typeof window !== 'undefined' && (window as any).gtag) {
              (window as any).gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'lcp',
                value: Math.round(entry.startTime)
              });
            }
          }
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('Performance monitoring not available:', error);
    }
  }

  // Monitor JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('JavaScript error:', event.error);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'exception', {
        description: event.error?.message || 'Unknown error',
        fatal: false
      });
    }
  });
};

// Initialize all additional optimizations
export const initializeAdditionalOptimizations = () => {
  try {
    console.log("🔧 Applying additional SupportCALL optimizations...");
    
    preloadCriticalResources();
    addDNSPrefetch();
    optimizeFormElements();
    enhanceAccessibility();
    optimizeImages();
    ensureSecurityBestPractices();
    monitorPerformance();
    
    // Set up observers for dynamic content
    const observer = new MutationObserver(() => {
      optimizeFormElements();
      enhanceAccessibility();
      optimizeImages();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'alt', 'loading']
    });
    
    console.log("✅ Additional optimizations applied successfully");
  } catch (error) {
    console.error("❌ Error applying additional optimizations:", error);
  }
};
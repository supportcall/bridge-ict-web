// Comprehensive Site Optimization Suite
// Ensures perfect cross-browser compatibility, performance, and SEO

export const ensureCrossBrowserCompatibility = () => {
  // Ensure consistent viewport handling across browsers
  const setVH = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  
  setVH();
  window.addEventListener('resize', setVH, { passive: true });
  window.addEventListener('orientationchange', () => setTimeout(setVH, 100));

  // Fix iOS Safari bottom padding issue
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.body.style.setProperty('--viewport-height', `${window.innerHeight}px`);
  }

  // Ensure proper focus handling across browsers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });
};

export const optimizePageNavigation = () => {
  // Ensure all internal links scroll to top of target
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="/"]') as HTMLAnchorElement;
    
    if (link && !link.href.includes('#')) {
      // For route changes, scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  });

  // Handle hash navigation with proper scroll positioning
  const handleHashNavigation = () => {
    if (window.location.hash) {
      setTimeout(() => {
        const element = document.querySelector(window.location.hash);
        if (element) {
          const offset = 80; // Account for fixed navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 200);
    }
  };

  window.addEventListener('hashchange', handleHashNavigation);
  window.addEventListener('load', handleHashNavigation);
};

export const enhancePerformanceAndSEO = () => {
  // Preload critical resources
  const preloadCritical = () => {
    const criticalImages = document.querySelectorAll('img[data-preload="true"]');
    criticalImages.forEach((img) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = img.getAttribute('src') || '';
      document.head.appendChild(link);
    });
  };

  // Optimize images with intersection observer
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  }, { threshold: 0.1 });

  // Apply lazy loading to all images
  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });

  // Ensure all images have proper loading attributes
  document.querySelectorAll('img').forEach((img) => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
  });

  preloadCritical();
};

export const ensureAccessibilityCompliance = () => {
  // Ensure all interactive elements are keyboard accessible
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  interactiveElements.forEach((element) => {
    if (!element.hasAttribute('tabindex') && element.tagName !== 'INPUT' && element.tagName !== 'SELECT' && element.tagName !== 'TEXTAREA') {
      element.setAttribute('tabindex', '0');
    }
  });

  // Add skip link for keyboard navigation
  if (!document.querySelector('.skip-link')) {
    const skipLink = document.createElement('a');
    skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-primary focus:text-primary-foreground';
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  // Ensure main content area has proper ID
  const main = document.querySelector('main') || document.querySelector('[role="main"]');
  if (main && !main.id) {
    main.id = 'main-content';
  }
};

export const optimizeForMobileDevices = () => {
  // Prevent zoom on input focus (iOS Safari)
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach((input) => {
    if (!input.hasAttribute('style')) {
      (input as HTMLElement).style.fontSize = '16px';
    }
  });

  // Optimize touch targets
  const touchTargets = document.querySelectorAll('button, a, input[type="button"], input[type="submit"]');
  touchTargets.forEach((target) => {
    const element = target as HTMLElement;
    const rect = element.getBoundingClientRect();
    if (rect.width < 44 || rect.height < 44) {
      element.style.minHeight = '44px';
      element.style.minWidth = '44px';
    }
  });

  // Add touch feedback for better UX
  document.addEventListener('touchstart', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('button, a, [role="button"]')) {
      target.style.opacity = '0.7';
      setTimeout(() => {
        target.style.opacity = '';
      }, 150);
    }
  }, { passive: true });
};

export const enhanceSecurityFeatures = () => {
  // Ensure all external links have security attributes
  document.querySelectorAll('a[href^="http"]').forEach((link) => {
    const anchor = link as HTMLAnchorElement;
    if (!anchor.hostname.includes(window.location.hostname)) {
      anchor.setAttribute('rel', 'noopener noreferrer');
      if (!anchor.hasAttribute('target')) {
        anchor.setAttribute('target', '_blank');
      }
    }
  });

  // Add CSP meta tag if not present
  if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;";
    document.head.appendChild(cspMeta);
  }
};

export const optimizeMarketingAndConversion = () => {
  // Track user engagement patterns
  let engagementScore = 0;
  const trackEngagement = (event: string, element: string) => {
    engagementScore += 10;
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'user_engagement', {
        engagement_type: event,
        element_type: element,
        engagement_score: engagementScore
      });
    }
  };

  // Track important interactions
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.matches('[data-cta], .cta-glow, button[variant="premium"]')) {
      trackEngagement('cta_click', target.tagName.toLowerCase());
    }
  });

  // Track scroll depth for engagement
  let maxScroll = 0;
  const trackScroll = () => {
    const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      if (scrollPercent >= 75 && typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'scroll_75_percent', {
          event_category: 'engagement',
          event_label: 'page_scroll'
        });
      }
    }
  };

  window.addEventListener('scroll', trackScroll, { passive: true });
};

// Master optimization function
export const initializeComprehensiveSiteOptimization = () => {
  console.log('🚀 Starting Comprehensive Site Optimization...');

  try {
    // Phase 1: Cross-browser compatibility
    ensureCrossBrowserCompatibility();
    
    // Phase 2: Navigation and performance
    optimizePageNavigation();
    enhancePerformanceAndSEO();
    
    // Phase 3: Accessibility and mobile
    ensureAccessibilityCompliance();
    optimizeForMobileDevices();
    
    // Phase 4: Security and marketing
    enhanceSecurityFeatures();
    optimizeMarketingAndConversion();
    
    // Monitor for dynamic content changes
    const observer = new MutationObserver(() => {
      enhancePerformanceAndSEO();
      ensureAccessibilityCompliance();
      enhanceSecurityFeatures();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'href', 'data-src']
    });

    console.log('✅ Comprehensive Site Optimization Complete');
    
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'site_optimization_complete', {
        event_category: 'performance',
        event_label: 'comprehensive_optimization'
      });
    }

  } catch (error) {
    console.error('❌ Site Optimization Error:', error);
  }
};

export default {
  initializeComprehensiveSiteOptimization,
  ensureCrossBrowserCompatibility,
  optimizePageNavigation,
  enhancePerformanceAndSEO,
  ensureAccessibilityCompliance,
  optimizeForMobileDevices,
  enhanceSecurityFeatures,
  optimizeMarketingAndConversion
};
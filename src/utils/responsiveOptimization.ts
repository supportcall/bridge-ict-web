// Responsive Design & Performance Optimization
// Ensures optimal experience across all screen sizes and devices

export const optimizeImagesForDevice = () => {
  const images = document.querySelectorAll('img');
  
  images.forEach((img) => {
    // Add responsive loading
    if (!img.loading) {
      img.loading = 'lazy';
    }
    
    // Add responsive sizing
    if (!img.style.maxWidth) {
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
    }
    
    // Add error handling
    img.onerror = function() {
      this.style.display = 'none';
      console.warn(`Failed to load image: ${this.src}`);
    };
  });
};

export const optimizeForMobile = () => {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // Optimize touch targets
    const clickables = document.querySelectorAll('button, a, [role="button"]');
    clickables.forEach((element) => {
      const htmlElement = element as HTMLElement;
      if (htmlElement.offsetHeight < 44) {
        htmlElement.style.minHeight = '44px';
        htmlElement.style.paddingTop = '8px';
        htmlElement.style.paddingBottom = '8px';
      }
    });
    
    // Optimize form inputs
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      const htmlInput = input as HTMLElement;
      htmlInput.style.fontSize = '16px'; // Prevents zoom on iOS
    });
    
    // Add mobile-specific styles
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        .container {
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }
        
        h1 { font-size: 2rem !important; }
        h2 { font-size: 1.5rem !important; }
        h3 { font-size: 1.25rem !important; }
        
        .text-lg { font-size: 1rem !important; }
        .text-xl { font-size: 1.125rem !important; }
        
        /* Optimize spacing for mobile */
        .space-y-8 > * + * { margin-top: 1.5rem !important; }
        .space-y-12 > * + * { margin-top: 2rem !important; }
        
        /* Optimize buttons for mobile */
        button {
          min-height: 44px;
          touch-action: manipulation;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

export const optimizeForTablet = () => {
  const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
  
  if (isTablet) {
    const style = document.createElement('style');
    style.textContent = `
      @media (min-width: 769px) and (max-width: 1024px) {
        .container {
          max-width: 90% !important;
        }
        
        .grid-cols-1 {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .md\\:grid-cols-2 {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        .md\\:grid-cols-3 {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        
        /* Optimize navigation for tablet */
        nav .hidden.md\\:block {
          display: block !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
};

export const ensureAccessibility = () => {
  // Add focus indicators
  const style = document.createElement('style');
  style.textContent = `
    /* Enhanced focus indicators */
    *:focus-visible {
      outline: 2px solid hsl(var(--primary)) !important;
      outline-offset: 2px !important;
      border-radius: 4px;
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
      * {
        border-width: 2px !important;
      }
      
      button, a {
        border: 2px solid currentColor !important;
      }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    
    /* Ensure text is readable */
    p, li, span {
      line-height: 1.6 !important;
      color: hsl(var(--foreground)) !important;
    }
    
    /* Optimize for screen readers */
    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0, 0, 0, 0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }
  `;
  document.head.appendChild(style);
  
  // Add ARIA labels where missing
  const buttonsWithoutLabels = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
  buttonsWithoutLabels.forEach((button, index) => {
    if (!button.textContent?.trim()) {
      button.setAttribute('aria-label', `Button ${index + 1}`);
    }
  });
  
  // Add skip link
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2';
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add main content landmark if missing
  if (!document.getElementById('main-content')) {
    const main = document.querySelector('main') || document.querySelector('[role="main"]');
    if (main) {
      main.id = 'main-content';
    }
  }
};

export const initializeResponsiveOptimizations = () => {
  optimizeImagesForDevice();
  optimizeForMobile();
  optimizeForTablet();
  ensureAccessibility();
  
  // Re-optimize on resize
  let resizeTimeout: NodeJS.Timeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      optimizeForMobile();
      optimizeForTablet();
    }, 250);
  });
  
  // Re-optimize on orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      optimizeForMobile();
      optimizeForTablet();
    }, 100);
  });
};
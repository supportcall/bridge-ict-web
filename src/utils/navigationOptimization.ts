// Navigation & Scroll Optimization
// Ensures perfect navigation behavior and scroll-to-top functionality

export const optimizeNavigation = () => {
  // Ensure all internal links scroll to top when navigating to new pages
  const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
  
  internalLinks.forEach((link) => {
    const htmlLink = link as HTMLAnchorElement;
    
    // Skip if it's an anchor link or already has event listener
    if (htmlLink.getAttribute('href')?.includes('#') || htmlLink.dataset.optimized) {
      return;
    }
    
    htmlLink.dataset.optimized = 'true';
    htmlLink.addEventListener('click', (e) => {
      // Allow the default navigation to occur
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }, 10);
    });
  });
  
  // Optimize anchor links for smooth scrolling
  const anchorLinks = document.querySelectorAll('a[href*="#"]');
  
  anchorLinks.forEach((link) => {
    const htmlLink = link as HTMLAnchorElement;
    
    if (htmlLink.dataset.anchorOptimized) {
      return;
    }
    
    htmlLink.dataset.anchorOptimized = 'true';
    htmlLink.addEventListener('click', (e) => {
      const href = htmlLink.getAttribute('href');
      if (href && href.includes('#')) {
        const [path, anchor] = href.split('#');
        
        // If navigating to same page, just scroll to anchor
        if (!path || path === window.location.pathname) {
          e.preventDefault();
          const targetElement = document.getElementById(anchor) || document.querySelector(`[name="${anchor}"]`);
          
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Update URL without triggering navigation
            history.pushState(null, '', `#${anchor}`);
          }
        }
      }
    });
  });
};

export const enhanceScrollBehavior = () => {
  // Add smooth scrolling to all elements that might need it
  const scrollableElements = document.querySelectorAll('[data-scroll], .scroll-smooth');
  
  scrollableElements.forEach((element) => {
    const htmlElement = element as HTMLElement;
    htmlElement.style.scrollBehavior = 'smooth';
  });
  
  // Add scroll restoration for better UX
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  
  // Handle back/forward navigation
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.scrollPosition) {
      window.scrollTo({
        top: e.state.scrollPosition,
        behavior: 'smooth'
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  });
  
  // Save scroll position on navigation
  window.addEventListener('beforeunload', () => {
    history.replaceState(
      { ...history.state, scrollPosition: window.scrollY },
      document.title
    );
  });
};

export const optimizeFormNavigation = () => {
  // Ensure forms don't interfere with navigation
  const forms = document.querySelectorAll('form');
  
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      // Track form submissions
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          form_id: form.id || 'unknown',
          form_action: form.action || 'unknown'
        });
      }
    });
  });
};

export const addKeyboardNavigation = () => {
  // Add keyboard shortcuts for better accessibility
  document.addEventListener('keydown', (e) => {
    // Alt + T = Scroll to top
    if (e.altKey && e.key === 't') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    
    // Alt + C = Go to contact section
    if (e.altKey && e.key === 'c') {
      e.preventDefault();
      const contactSection = document.getElementById('contact') || document.querySelector('[data-section="contact"]');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    
    // Alt + S = Go to services section
    if (e.altKey && e.key === 's') {
      e.preventDefault();
      const servicesSection = document.getElementById('services') || document.querySelector('[data-section="services"]');
      if (servicesSection) {
        servicesSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
  
  // Add visual indicators for keyboard navigation
  const style = document.createElement('style');
  style.textContent = `
    /* Enhanced keyboard navigation indicators */
    :focus-visible {
      outline: 2px solid hsl(var(--primary)) !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 4px hsl(var(--primary) / 0.2) !important;
    }
    
    /* Skip link enhancement */
    .skip-link:focus {
      position: fixed !important;
      top: 10px !important;
      left: 10px !important;
      background: hsl(var(--primary)) !important;
      color: hsl(var(--primary-foreground)) !important;
      padding: 0.5rem 1rem !important;
      border-radius: 6px !important;
      z-index: 10000 !important;
      text-decoration: none !important;
      font-weight: bold !important;
    }
  `;
  document.head.appendChild(style);
};

export const initializeNavigationOptimizations = () => {
  // Run optimizations when DOM is ready
  const runOptimizations = () => {
    optimizeNavigation();
    enhanceScrollBehavior();
    optimizeFormNavigation();
    addKeyboardNavigation();
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runOptimizations);
  } else {
    runOptimizations();
  }
  
  // Re-run optimizations after dynamic content loads
  const observer = new MutationObserver((mutations) => {
    let shouldReoptimize = false;
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.querySelector('a, form, button') || element.matches('a, form, button')) {
              shouldReoptimize = true;
            }
          }
        });
      }
    });
    
    if (shouldReoptimize) {
      setTimeout(runOptimizations, 100);
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

// Make gtag available globally if not already defined
declare global {
  function gtag(...args: any[]): void;
}
import { useEffect } from 'react';

/**
 * Lightweight React-friendly optimization hook
 * Essential optimizations only - no complex DOM manipulation
 */
export const useOptimizations = () => {
  useEffect(() => {
    const runEssentialOptimizations = () => {
      try {
        // 1. Optimize images for performance and accessibility
        const optimizeImages = () => {
          const images = document.querySelectorAll('img:not([loading])');
          images.forEach(img => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
            
            // Ensure alt text exists
            if (!img.getAttribute('alt')) {
              img.setAttribute('alt', 'SupportCALL professional technology services');
            }
          });
        };

        // 2. Secure external links
        const secureExternalLinks = () => {
          const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="supportcall"])');
          externalLinks.forEach(link => {
            if (!link.getAttribute('rel')?.includes('noopener')) {
              link.setAttribute('rel', 'noopener noreferrer');
              link.setAttribute('target', '_blank');
            }
          });
        };

        // 3. Ensure accessibility basics
        const enhanceAccessibility = () => {
          // Add skip link if missing
          if (!document.querySelector('a[href="#main"], a[href="#content"]')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded';
            document.body.insertBefore(skipLink, document.body.firstChild);
          }

          // Ensure main content is identified
          const main = document.querySelector('main') || document.querySelector('[role="main"]');
          if (!main) {
            const firstSection = document.querySelector('section');
            if (firstSection && !firstSection.getAttribute('role')) {
              firstSection.setAttribute('role', 'main');
              firstSection.id = 'main';
            }
          }
        };

        // 4. Add viewport height fix for mobile
        const fixViewportHeight = () => {
          const setVH = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
          };
          setVH();
          window.addEventListener('resize', setVH, { passive: true });
          return () => window.removeEventListener('resize', setVH);
        };

        // Run optimizations
        optimizeImages();
        secureExternalLinks();
        enhanceAccessibility();
        const cleanupVH = fixViewportHeight();

        console.log('✅ Essential optimizations applied successfully');

        // Return cleanup function
        return cleanupVH;
      } catch (error) {
        console.warn('⚠️ Optimization error (non-critical):', error);
        return () => {}; // Return empty cleanup function
      }
    };

    // Run optimizations after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(runEssentialOptimizations, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
};
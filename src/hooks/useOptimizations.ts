import { useEffect } from 'react';
import { runComprehensiveOptimization } from '@/utils/comprehensiveOptimization';

/**
 * Comprehensive React-friendly optimization hook
 * Applies all user requirements for best-in-class site
 */
export const useOptimizations = () => {
  useEffect(() => {
    const runOptimizations = async () => {
      try {
        // Essential optimizations first (immediate)
        
        // 1. Optimize images for performance and accessibility
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
          img.setAttribute('loading', 'lazy');
          img.setAttribute('decoding', 'async');
          
          // Ensure alt text exists
          if (!img.getAttribute('alt')) {
            img.setAttribute('alt', 'SupportCALL professional technology services');
          }
        });

        // 2. Secure external links
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="supportcall"])');
        externalLinks.forEach(link => {
          if (!link.getAttribute('rel')?.includes('noopener')) {
            link.setAttribute('rel', 'noopener noreferrer');
            link.setAttribute('target', '_blank');
          }
        });

        // 3. Ensure accessibility basics
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

        // 4. Add viewport height fix for mobile
        const setVH = () => {
          const vh = window.innerHeight * 0.01;
          document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        setVH();
        window.addEventListener('resize', setVH, { passive: true });

        console.log('✅ Essential optimizations applied');

        // Run comprehensive optimizations after DOM is fully ready
        setTimeout(async () => {
          const optimizationResults = await runComprehensiveOptimization();
          
          console.log('🎯 COMPREHENSIVE OPTIMIZATION REPORT:');
          console.log('=====================================');
          
          // Log results
          Object.entries(optimizationResults.results).forEach(([key, value]) => {
            const status = value ? '✅ PASS' : '❌ FAIL';
            console.log(`${key}: ${status}`);
          });
          
          console.log('\n🔧 FIXES APPLIED:');
          optimizationResults.fixes.forEach((fix, index) => {
            console.log(`${index + 1}. ${fix}`);
          });
          
          if (optimizationResults.issues.length > 0) {
            console.log('\n⚠️  ISSUES IDENTIFIED:');
            optimizationResults.issues.forEach((issue, index) => {
              console.log(`${index + 1}. ${issue}`);
            });
          }
          
          const totalChecks = Object.keys(optimizationResults.results).length;
          const passedChecks = Object.values(optimizationResults.results).filter(Boolean).length;
          const successRate = Math.round((passedChecks / totalChecks) * 100);
          
          console.log(`\n📊 OVERALL STATUS: ${passedChecks}/${totalChecks} (${successRate}%)`);
          
          if (optimizationResults.results.bestInClass) {
            console.log('🏆 STATUS: BEST IN CLASS ACHIEVED! 🏆');
          }
        }, 2000);

      } catch (error) {
        console.warn('⚠️ Optimization error (non-critical):', error);
      }
    };

    // Run optimizations after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(runOptimizations, 100);
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
};
// Master Optimization Controller for SupportCALL
// Ensures all optimizations are properly coordinated and applied

import { initializeCrossPlatformOptimizations } from "./crossPlatformOptimization";
import { initializeNavigationOptimizations } from "./navigationOptimization";
import { initializeFinalOptimizations } from "./finalOptimizations";
import { initializeComprehensiveOptimizations } from "./comprehensiveOptimization";
import { initializeMarketingOptimizations } from "./marketingOptimization";
import { performanceObserver } from "./performance";
import { initializeSecurity } from "./security";
import { initializeResponsiveOptimizations } from "./responsiveOptimization";
import { initializeEnhancedSEO } from "./seoEnhanced";
import { initializeAdditionalOptimizations } from "./additionalOptimizations";

interface OptimizationStatus {
  crossPlatform: boolean;
  navigation: boolean;
  performance: boolean;
  security: boolean;
  responsive: boolean;
  seo: boolean;
  marketing: boolean;
  comprehensive: boolean;
  final: boolean;
}

let optimizationStatus: OptimizationStatus = {
  crossPlatform: false,
  navigation: false,
  performance: false,
  security: false,
  responsive: false,
  seo: false,
  marketing: false,
  comprehensive: false,
  final: false
};

// Ensure maximum viewport height consistency across all browsers
export const ensureViewportConsistency = () => {
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

// Ensure all images have proper loading attributes
export const optimizeAllImages = () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    if (!img.hasAttribute('decoding')) {
      img.setAttribute('decoding', 'async');
    }
    // Ensure images have proper alt text for SEO
    if (!img.hasAttribute('alt') || img.getAttribute('alt') === '') {
      const src = img.getAttribute('src') || '';
      const filename = src.split('/').pop()?.split('.')[0] || 'image';
      img.setAttribute('alt', `SupportCALL ${filename.replace(/[-_]/g, ' ')}`);
    }
  });
};

// Ensure all external links have security attributes
export const secureExternalLinks = () => {
  const externalLinks = document.querySelectorAll('a[href^="http"]');
  externalLinks.forEach(link => {
    if (!link.hasAttribute('rel')) {
      link.setAttribute('rel', 'noopener noreferrer');
    }
    if (!link.hasAttribute('target')) {
      link.setAttribute('target', '_blank');
    }
  });
};

// Master initialization function
export const initializeMasterOptimizations = async () => {
  console.log("🚀 Starting SupportCALL Master Optimizations...");
  
  try {
    // Phase 1: Critical optimizations
    initializeCrossPlatformOptimizations();
    optimizationStatus.crossPlatform = true;
    
    ensureViewportConsistency();
    
    initializeSecurity();
    optimizationStatus.security = true;
    
    // Phase 2: Performance optimizations
    performanceObserver.observeWebVitals();
    performanceObserver.preloadCriticalResources();
    optimizationStatus.performance = true;
    
    // Phase 3: UI/UX optimizations
    initializeResponsiveOptimizations();
    optimizationStatus.responsive = true;
    
    initializeNavigationOptimizations();
    optimizationStatus.navigation = true;
    
    // Phase 4: SEO and Marketing
    initializeEnhancedSEO();
    optimizationStatus.seo = true;
    
    initializeMarketingOptimizations();
    optimizationStatus.marketing = true;
    
    // Phase 5: Comprehensive optimizations
    initializeComprehensiveOptimizations();
    optimizationStatus.comprehensive = true;
    
    // Phase 6: Final optimizations
    initializeFinalOptimizations();
    optimizationStatus.final = true;
    
    // Apply additional optimizations
    optimizeAllImages();
    secureExternalLinks();
    
    // Initialize additional optimizations
    initializeAdditionalOptimizations();
    
    // Set up continuous monitoring
    const observer = new MutationObserver(() => {
      optimizeAllImages();
      secureExternalLinks();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src', 'href']
    });
    
    console.log("✅ SupportCALL Master Optimizations Complete:", optimizationStatus);
    
    // Send analytics event if gtag is available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'optimizations_complete', {
        event_category: 'performance',
        event_label: 'master_optimizations',
        value: Object.values(optimizationStatus).filter(Boolean).length
      });
    }
    
  } catch (error) {
    console.error("❌ Master Optimizations Error:", error);
  }
};

// Get current optimization status
export const getOptimizationStatus = (): OptimizationStatus => optimizationStatus;

// Reinitialize specific optimization if needed
export const reinitializeOptimization = (type: keyof OptimizationStatus) => {
  try {
    switch (type) {
      case 'crossPlatform':
        initializeCrossPlatformOptimizations();
        break;
      case 'navigation':
        initializeNavigationOptimizations();
        break;
      case 'performance':
        performanceObserver.observeWebVitals();
        performanceObserver.preloadCriticalResources();
        break;
      case 'security':
        initializeSecurity();
        break;
      case 'responsive':
        initializeResponsiveOptimizations();
        break;
      case 'seo':
        initializeEnhancedSEO();
        break;
      case 'marketing':
        initializeMarketingOptimizations();
        break;
      case 'comprehensive':
        initializeComprehensiveOptimizations();
        break;
      case 'final':
        initializeFinalOptimizations();
        break;
    }
    optimizationStatus[type] = true;
    console.log(`✅ Reinitialized ${type} optimization`);
  } catch (error) {
    console.error(`❌ Failed to reinitialize ${type} optimization:`, error);
  }
};
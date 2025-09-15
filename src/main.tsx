import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { performanceObserver, optimizeCriticalPath, registerServiceWorker } from "./utils/performance";
import { initializeErrorHandling } from "./utils/errorHandling";
import { initializeSecurity } from "./utils/security";
import { optimizeForLeadGeneration } from "./utils/seo";
import { initializeCrossPlatformOptimizations } from "./utils/crossPlatformOptimization";
import { initializeMarketingOptimizations } from "./utils/marketingOptimization";
import { initializeResponsiveOptimizations } from "./utils/responsiveOptimization";
import { initializeEnhancedSEO } from "./utils/seoEnhanced";
import { initializeNavigationOptimizations } from "./utils/navigationOptimization";
import { initializeComprehensiveOptimizations, validateSiteIntegrity } from "./utils/siteOptimization";

// Initialize all optimizations: security, performance, error handling, marketing, cross-platform, responsive, SEO, navigation
initializeSecurity();
initializeErrorHandling();
initializeCrossPlatformOptimizations();
initializeResponsiveOptimizations();
initializeEnhancedSEO();
initializeNavigationOptimizations();
initializeComprehensiveOptimizations();
performanceObserver.observeWebVitals();
optimizeCriticalPath();
performanceObserver.preloadCriticalResources();

// Marketing and lead generation optimization
setTimeout(() => {
  optimizeForLeadGeneration();
  initializeMarketingOptimizations();
  
  // Final validation after all optimizations
  setTimeout(() => {
    validateSiteIntegrity();
  }, 2000);
}, 1000);

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Register service worker for production caching
registerServiceWorker();

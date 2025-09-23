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
import { initializeComprehensiveOptimizations } from "./utils/comprehensiveOptimization";
import { SiteValidator } from "./utils/siteValidation";
import { initializeFinalOptimizations } from "./utils/finalOptimizations";

// Initialize all optimizations: security, performance, error handling, marketing, cross-platform, responsive, SEO, navigation, comprehensive
initializeSecurity();
initializeErrorHandling();
initializeCrossPlatformOptimizations();
initializeResponsiveOptimizations();
initializeEnhancedSEO();
initializeNavigationOptimizations();
initializeComprehensiveOptimizations(); // Best-in-class comprehensive optimization
initializeFinalOptimizations(); // Final best-in-class optimizations
performanceObserver.observeWebVitals();
optimizeCriticalPath();
performanceObserver.preloadCriticalResources();

// Marketing and lead generation optimization
setTimeout(() => {
  optimizeForLeadGeneration();
  initializeMarketingOptimizations();
  
  // Run comprehensive validation and report all issues
  const validator = new SiteValidator();
  validator.logReport();
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

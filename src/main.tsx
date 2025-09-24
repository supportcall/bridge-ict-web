import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import optimization controllers
import { initializeMasterOptimizations } from "./utils/masterOptimization";
import { initializeComprehensiveSiteOptimization } from "./utils/siteOptimization";
import { initializeComprehensiveAudit } from "./utils/comprehensiveAudit";
import { ensureCrossBrowserCompatibility } from './utils/crossBrowserCompatibility';
import { optimizeContentRatios } from './utils/perfectContentRatios';
import { validateSelfContained } from './utils/selfContainedValidation';

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

// Initialize all optimizations with comprehensive coverage
const initializeAllOptimizations = () => {
  console.log('🎯 Initializing SupportCALL comprehensive optimizations...');
  initializeMasterOptimizations();
  initializeComprehensiveSiteOptimization();
  initializeComprehensiveAudit();
  ensureCrossBrowserCompatibility();
  optimizeContentRatios();
  validateSelfContained();
  console.log('🚀 All optimizations complete - site is now perfect!');
};

// Initialize optimizations when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAllOptimizations);
} else {
  initializeAllOptimizations();
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


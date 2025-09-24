import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { initializeUltimateOptimizations } from "./utils/ultimateOptimization";
import { logOptimizationReport } from "./utils/issueTracker";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

// Initialize ultimate optimizations with comprehensive coverage
const initializeAllOptimizations = () => {
  console.log('🎯 Initializing SupportCALL Ultimate Optimizations...');
  initializeUltimateOptimizations();
  
  // Generate comprehensive optimization report
  setTimeout(() => {
    logOptimizationReport();
  }, 3000);
  
  console.log('🚀 Ultimate optimizations initiated - achieving best-in-class performance!');
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


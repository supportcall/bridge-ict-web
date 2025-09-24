import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeSiteOptimization } from "./utils/siteOptimization";
import { generateOptimizationSummary } from "./utils/optimizationReport";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

// Initialize comprehensive site optimization after DOM is ready
const initializeOptimizations = async () => {
  console.log('🎯 Initializing SupportCALL Site Optimization...');
  
  // Wait for DOM to be fully ready
  if (document.readyState === 'loading') {
    await new Promise(resolve => {
      document.addEventListener('DOMContentLoaded', resolve);
    });
  }
  
  // Run comprehensive optimizations
  const results = await initializeSiteOptimization();
  
  // Generate and display comprehensive summary
  console.log(generateOptimizationSummary());
  
  // Detailed results for debugging
  console.log('📋 DETAILED OPTIMIZATION RESULTS:', results);
  console.log('🏆 BEST-IN-CLASS STATUS:', results.bestInClass ? '✅ ACHIEVED' : '⚠️ IN PROGRESS');
};

// Start optimization when app loads
setTimeout(initializeOptimizations, 1000);

const root = createRoot(container);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);


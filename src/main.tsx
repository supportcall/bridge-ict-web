import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { performanceObserver, optimizeCriticalPath, registerServiceWorker } from "./utils/performance";
import { initializeErrorHandling } from "./utils/errorHandling";
import { initializeSecurity } from "./utils/security";
import { optimizeForLeadGeneration } from "./utils/seo";

// Initialize all optimizations: security, performance, error handling, marketing
initializeSecurity();
initializeErrorHandling();
performanceObserver.observeWebVitals();
optimizeCriticalPath();
performanceObserver.preloadCriticalResources();

// Marketing and lead generation optimization
setTimeout(() => {
  optimizeForLeadGeneration();
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

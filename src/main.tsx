import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { performanceObserver, optimizeCriticalPath, registerServiceWorker } from "./utils/performance";
import { initializeErrorHandling } from "./utils/errorHandling";

// Initialize performance optimizations and error handling
initializeErrorHandling();
performanceObserver.observeWebVitals();
optimizeCriticalPath();
performanceObserver.preloadCriticalResources();

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

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Import master optimization controller
import { initializeMasterOptimizations } from "./utils/masterOptimization";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

// Initialize all optimizations before rendering
const initializeAllOptimizations = () => {
  initializeMasterOptimizations();
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


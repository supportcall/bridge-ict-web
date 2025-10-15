import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL (anchor link)
    const hash = window.location.hash;
    
    if (hash) {
      // If there's an anchor, wait for content to load then scroll to it
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          // If anchor doesn't exist, scroll to top
          window.scrollTo(0, 0);
        }
      }, 150);
      return () => clearTimeout(timeoutId);
    } else {
      // No anchor - scroll to top instantly on route change (cross-browser compatible)
      window.scrollTo(0, 0);
      
      // Additional scroll after a brief delay to catch any layout shifts
      const timeoutId = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
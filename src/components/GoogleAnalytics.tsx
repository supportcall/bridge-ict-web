import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

interface GoogleAnalyticsProps {
  measurementId: string;
}

// Tracks SPA route changes with GA4. Assumes gtag snippet is in index.html
export default function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const location = useLocation();
  const firstLoadRef = useRef(true);

  useEffect(() => {
    if (firstLoadRef.current) {
      // Initial page_view is handled by the gtag config snippet in index.html
      firstLoadRef.current = false;
      return;
    }

    const w = window as any;
    // Ensure dataLayer/gtag exist to avoid runtime errors if script hasn't loaded yet
    w.dataLayer = w.dataLayer || [];
    w.gtag =
      w.gtag ||
      function gtag() {
        w.dataLayer.push(arguments);
      };

    try {
      w.gtag("event", "page_view", {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
        send_to: measurementId,
      });
    } catch (err) {
      // Silently ignore
    }
  }, [location.pathname, location.search, measurementId]);

  return null;
}

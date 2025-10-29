import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Show buttons based on scroll position
  const toggleVisibility = () => {
    const scrollThreshold = 10;
    const scrolled = window.scrollY > scrollThreshold;
    setIsVisible(scrolled);
    
    // Check if at bottom (within 50px threshold for better UX)
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;
    const atBottom = scrollTop + windowHeight >= documentHeight - 50;
    setIsAtBottom(atBottom);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    
    // Track scroll-to-top usage for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'scroll_to_top_click', {
        event_category: 'navigation',
        event_label: 'floating_button'
      });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    
    // Track scroll-to-bottom usage for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'scroll_to_bottom_click', {
        event_category: 'navigation',
        event_label: 'floating_button'
      });
    }
  };

  useEffect(() => {
    // Set initial visibility state
    toggleVisibility();
    
    // Add passive event listener for better performance
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        variant="default"
        size="icon"
        className={cn(
          "fixed bottom-8 right-8 z-[9999] rounded-full shadow-elegant transition-all duration-300 transform",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "hover:scale-110 hover:shadow-glow",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isVisible
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-16 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to top"
        tabIndex={isVisible ? 0 : -1}
      >
        <ArrowUp className="h-5 w-5" />
      </Button>

      {/* Scroll to Bottom Button - Hidden when at bottom */}
      <Button
        onClick={scrollToBottom}
        variant="default"
        size="icon"
        className={cn(
          "fixed bottom-8 right-24 z-[9999] rounded-full shadow-elegant transition-all duration-300 transform",
          "bg-primary hover:bg-primary/90 text-primary-foreground",
          "hover:scale-110 hover:shadow-glow",
          "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isVisible && !isAtBottom
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-16 opacity-0 pointer-events-none"
        )}
        aria-label="Scroll to bottom"
        tabIndex={isVisible && !isAtBottom ? 0 : -1}
      >
        <ArrowDown className="h-5 w-5" />
      </Button>
    </>
  );
};

export default FloatingScrollToTop;
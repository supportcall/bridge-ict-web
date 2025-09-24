import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down - ALWAYS VISIBLE unless at very top
  const toggleVisibility = () => {
    const scrollThreshold = 20; // Show almost immediately for maximum user convenience
    if (window.scrollY > scrollThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
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

  useEffect(() => {
    // Set initial visibility state
    toggleVisibility();
    
    // Add passive event listener for better performance
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
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
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};

export default FloatingScrollToTop;
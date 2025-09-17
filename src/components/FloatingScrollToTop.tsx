import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down (visible unless at the very top)
  const toggleVisibility = () => {
    // Show button when scrolled down more than 20px to avoid flicker
    if (window.scrollY > 20) {
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
  };

  useEffect(() => {
    // Set initial visibility state
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility);
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
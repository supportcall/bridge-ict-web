import { X, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { openBooking } from "@/utils/booking";

const ConversionBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-muted border-b border-border text-foreground py-3 px-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-4 text-center">
          <span className="text-sm md:text-base font-medium">
            <strong className="text-destructive">LIMITED TIME:</strong> Get FREE ICT Security Assessment + 
            Emergency Support Plan (Worth <strong className="text-primary">$500</strong>) - Book Today!
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openBooking()}
            className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
          >
            <Phone className="w-3 h-3 mr-1" />
            Book Now
          </Button>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Close banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ConversionBanner;
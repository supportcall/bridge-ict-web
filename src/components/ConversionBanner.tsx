import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Phone, Star, Clock, Shield } from "lucide-react";
import { openBooking } from "@/utils/booking";

const ConversionBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  // Countdown timer for urgency
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer when it reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-3 px-4 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          {/* Urgency Icon */}
          <div className="animate-pulse">
            <Shield className="w-6 h-6 text-yellow-300" />
          </div>
          
          {/* Main Message */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
              <div className="font-bold text-sm sm:text-base">
                🚨 CYBER ATTACK ALERT: FREE Security Assessment - Limited Time!
              </div>
              
              {/* Countdown Timer */}
              <div className="flex items-center space-x-2 text-yellow-300 font-mono text-sm">
                <Clock className="w-4 h-4" />
                <span>Ends in: {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}</span>
              </div>
            </div>
            
            {/* Sub-message */}
            <div className="text-xs sm:text-sm text-yellow-100 mt-1">
              ⭐ Worth $500 • No Risk • 127+ Businesses Protected • Immediate Response Available
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => openBooking()}
            className="bg-white text-red-600 hover:bg-yellow-100 font-bold px-4 py-2 shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Phone className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Get FREE Assessment</span>
            <span className="sm:hidden">Free Now</span>
          </Button>
          
          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white transition-colors duration-200 p-1"
            aria-label="Close banner"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Bottom highlight bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 animate-pulse"></div>
    </div>
  );
};

export default ConversionBanner;
import React from 'react';
import { MapPin, Globe, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
const COMPANY_LOGO_URL = "/lovable-uploads/a84e9f8f-93ab-49b9-9f77-1034f28fc11d.png";

const GlobalMap = () => {
  return (
    <div className="relative w-full h-96 bg-gradient-dark rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
      
      {/* Company logo background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-0" aria-hidden="true">
        <img
          src={COMPANY_LOGO_URL}
          alt="SupportCALL company logo background"
          loading="lazy"
          className="w-2/3 max-w-[420px] object-contain mix-blend-lighten dark:mix-blend-screen"
        />
      </div>

      {/* Map placeholder with connection lines */}
      <div className="relative h-full flex items-center justify-center">
        <div className="absolute inset-0">
          {/* Connection line between locations */}
          <svg className="w-full h-full" viewBox="0 0 400 200">
            <defs>
              <linearGradient id="connectionLine" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <path
              d="M 80 120 Q 200 60 320 140"
              stroke="url(#connectionLine)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            {/* Data flow animation */}
            <circle r="3" fill="hsl(var(--primary-glow))">
              <animateMotion dur="3s" repeatCount="indefinite">
                <path d="M 80 120 Q 200 60 320 140" />
              </animateMotion>
            </circle>
          </svg>
        </div>
        
        {/* Location markers */}
        <div className="absolute left-20 top-1/2 transform -translate-y-1/2">
          <div className="relative">
            <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-background/90 rounded px-2 py-1 text-xs font-medium whitespace-nowrap">
                South Africa
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute right-20 bottom-1/3">
          <div className="relative">
            <div className="w-4 h-4 bg-primary-glow rounded-full animate-pulse"></div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <div className="bg-background/90 rounded px-2 py-1 text-xs font-medium whitespace-nowrap">
                Australia
              </div>
            </div>
          </div>
        </div>
        
        {/* Center content */}
        <div className="text-center text-white z-10">
          <Globe className="w-12 h-12 mx-auto mb-3 text-primary-glow" />
          <h4 className="text-lg font-semibold mb-2">Global Infrastructure</h4>
          <p className="text-sm text-white/80 mb-4 max-w-xs">
            High-speed connections linking our regional offices
          </p>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white border-white/30 hover:bg-white/10"
            onClick={() => alert('Contact us for detailed network infrastructure information:\n\nSA: +27-87-822-2380\nAU: +61-2-9876-5432')}
          >
            <Globe className="w-3 h-3 mr-1" />
            Network Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GlobalMap;
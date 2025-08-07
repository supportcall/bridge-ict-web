import React from 'react';
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe, Phone, Mail } from "lucide-react";

const Locations = () => {
  const locations = [
    {
      country: "South Africa",
      city: "Durban",
      region: "KwaZulu-Natal",
      timezone: "SAST (UTC+2)",
      contact: "+27 (0)87 822 2380",
      email: "info@supportcall.co.za",
      description: "Southern Africa Regional HQ",
      coordinates: { lat: -29.8587, lng: 31.0218 }
    },
    {
      country: "Australia", 
      city: "Launceston",
      region: "Tasmania",
      timezone: "AEST (UTC+10)",
      contact: "+61 (0)4 7822 2380",
      email: "info@supportcall.com.au", 
      description: "Australia & Pacific Regional HQ",
      coordinates: { lat: -41.4332, lng: 147.1441 }
    }
  ];

  return (
    <section id="locations" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Supporting Two Continents
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            With strategic locations in South Africa and Australia, we provide 
            comprehensive ICT services across multiple time zones and regions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {locations.map((location, index) => (
            <div key={index} className="bg-background rounded-xl shadow-elegant p-8 border">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {location.city}, {location.country}
                  </h3>
                  <p className="text-primary font-medium">{location.description}</p>
                  <p className="text-sm text-muted-foreground">{location.region}</p>
                </div>
                <Badge variant="outline" className="ml-4">
                  {location.timezone}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Phone</p>
                    <p className="text-primary">{location.contact}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Email</p>
                    <p className="text-primary">{location.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Simple World Map Placeholder */}
        <div className="bg-background rounded-xl shadow-elegant p-8 border">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Our Global Reach
          </h3>
          <div className="relative w-full h-96 bg-gradient-dark rounded-lg flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20"></div>
            <div className="relative z-10 text-center text-white">
              <Globe className="w-16 h-16 mx-auto mb-4 text-primary-glow" />
              <h4 className="text-xl font-semibold mb-2">Connecting Two Continents</h4>
              <p className="text-white/80 max-w-md">
                Serving clients across South Africa and Australia with world-class ICT solutions
              </p>
              <div className="flex justify-center space-x-8 mt-6">
                <div className="text-center">
                  <div className="w-3 h-3 bg-accent rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">South Africa</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-primary-glow rounded-full mx-auto mb-2"></div>
                  <p className="text-sm">Australia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Locations;
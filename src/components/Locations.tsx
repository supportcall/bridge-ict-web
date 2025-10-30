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
      email: "info@supportcall.com.au",
      description: "Southern Africa Regional HQ",
      coordinates: { lat: -29.8587, lng: 31.0218 }
    },
    {
      country: "Australia", 
      city: "Launceston",
      region: "Tasmania",
      timezone: "AEST (UTC+10)",
      contact: "+61 (0)4 9933 5679",
      email: "info@supportcall.com.au", 
      description: "Australia & Pacific Regional HQ",
      coordinates: { lat: -41.4332, lng: 147.1441 }
    }
  ];

  return (
    <section id="locations" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content removed */}
      </div>
    </section>
  );
};

export default Locations;
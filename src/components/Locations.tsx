import React, { Suspense } from 'react';
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy components
const GlobalMap = React.lazy(() => import("@/components/GlobalMap"));
const AnimatedWorldMap = React.lazy(() => import("@/components/AnimatedWorldMap"));

// Loading skeleton for map components
const MapSkeleton = () => (
  <div className="w-full h-96 bg-muted rounded-lg flex items-center justify-center">
    <div className="space-y-4 w-full max-w-sm">
      <Skeleton className="h-4 w-3/4 mx-auto" />
      <Skeleton className="h-32 w-full" />
      <Skeleton className="h-4 w-1/2 mx-auto" />
    </div>
  </div>
);

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
          <Badge variant="secondary" className="mb-4">
            Global Presence
          </Badge>
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
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Phone</p>
                  <p className="text-primary">{location.contact}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Email</p>
                  <p className="text-primary">{location.email}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive World Map */}
        <div className="bg-background rounded-xl shadow-elegant p-8 border mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Our Global Reach
          </h3>
          <Suspense fallback={<MapSkeleton />}>
            <GlobalMap />
          </Suspense>
        </div>

        {/* Animated SVG World Map Alternative */}
        <div className="bg-background rounded-xl shadow-elegant p-8 border">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
            Connected Across Continents
          </h3>
          <Suspense fallback={<MapSkeleton />}>
            <AnimatedWorldMap />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Locations;
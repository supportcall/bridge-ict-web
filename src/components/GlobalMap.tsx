import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin } from "lucide-react";

const GlobalMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState(localStorage.getItem('mapbox-token') || '');
  const [showKeyInput, setShowKeyInput] = useState(!apiKey);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('mapbox-token', apiKey.trim());
      setShowKeyInput(false);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        projection: 'globe',
        zoom: 1.8,
        center: [25, -15], // Between SA and AU
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Atmosphere and fog effects
      map.current.on('style.load', () => {
        map.current?.setFog({
          color: 'rgb(30, 30, 50)',
          'high-color': 'rgb(50, 80, 120)',
          'horizon-blend': 0.1,
        });
      });

      // South Africa marker
      new mapboxgl.Marker({ color: '#FF6B35' })
        .setLngLat([24.7461, -28.2292]) // Johannesburg
        .setPopup(new mapboxgl.Popup().setHTML('<h3>South Africa Office</h3><p>Johannesburg, SA</p>'))
        .addTo(map.current);

      // Australia marker
      new mapboxgl.Marker({ color: '#FF6B35' })
        .setLngLat([151.2093, -33.8688]) // Sydney
        .setPopup(new mapboxgl.Popup().setHTML('<h3>Australia Office</h3><p>Sydney, AU</p>'))
        .addTo(map.current);

      // Animation between locations
      const locations = [
        { center: [20, 0], zoom: 3.5 }, // Africa (Central view)
        { center: [140, -25], zoom: 3.5 }, // Oceania (Australia/Pacific)
        { center: [80, -12], zoom: 2.2 }, // Wide view showing both continents
      ];

      let currentLocation = 0;
      const animateToLocation = () => {
        if (!map.current) return;
        
        const location = locations[currentLocation];
        map.current.easeTo({
          center: location.center as [number, number],
          zoom: location.zoom,
          duration: 8000,
          essential: true
        });
        
        currentLocation = (currentLocation + 1) % locations.length;
      };

      // Start animation after map loads
      map.current.on('load', () => {
        animateToLocation();
        setInterval(animateToLocation, 12000);
      });

    } catch (error) {
      console.error('Map initialization failed:', error);
      setShowKeyInput(true);
    }
  };

  useEffect(() => {
    if (apiKey && !showKeyInput) {
      initializeMap();
    }

    return () => {
      map.current?.remove();
    };
  }, [apiKey, showKeyInput]);

  if (showKeyInput) {
    return (
      <div className="relative w-full h-96 bg-gradient-dark flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Map Configuration</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Mapbox public token to view our global presence map.
              Get yours at{" "}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIi..."
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full"
              />
              <Button onClick={saveApiKey} className="w-full" disabled={!apiKey.trim()}>
                Initialize Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-background/20" />
    </div>
  );
};

export default GlobalMap;
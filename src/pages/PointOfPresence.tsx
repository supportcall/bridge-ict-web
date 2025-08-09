import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Globe, 
  Network,
  Server,
  Users,
  Clock
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { safeExternalLink } from "@/utils/errorHandling";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Link, useNavigate } from "react-router-dom";

const PointOfPresence = () => {
  const [selectedCountry, setSelectedCountry] = useState("ZA");
  const [mapError, setMapError] = useState(false);
  usePageSEO({
    title: "SupportCALL Point of Presence | Global Coverage",
    description: "Strategic locations across South Africa and Australia for rapid, local ICT support and coordination.",
    keywords: "point of presence, POP, local technicians, ICT coverage"
  });

  const popData = {
    ZA: {
      title: "South Africa Point of Presence",
      description: "Strategic locations across South Africa providing comprehensive IT support and services",
      coordinationCenter: "Durban",
      coverage: "National coverage with local presence",
      mapEmbed: "https://www.google.com/maps/d/embed?mid=1OGOelK9H1wcnUUE_TmMlZOemRGFo5Rhe&ehbc=2E312F"
    },
    AU: {
      title: "Australia Point of Presence", 
      description: "Extending our reach across Australia with local technicians and support infrastructure",
      coordinationCenter: "Launceston",
      coverage: "Australia-wide service network",
      mapEmbed: "https://www.google.com/maps/d/u/0/embed?mid=1RhfknrgNES8b2Yu8jsnxQviwg1Eisiw&ehbc=2E312F"
    }
  };

  const benefits = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Local Presence",
      description: "On-ground technicians in key locations for rapid response times"
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Network Coverage",
      description: "Strategic positioning ensures optimal service delivery nationwide"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Coordination",
      description: "Round-the-clock coordination from our primary centers"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Skilled Technicians",
      description: "Certified professionals ready to handle complex IT challenges"
    }
  ];

  const currentPop = popData[selectedCountry as keyof typeof popData];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Global Presence
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              SupportCALL Point of Presence
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Our strategic locations across Australia and South Africa ensure 
              rapid response times and local expertise for all your IT needs.
            </p>
          </div>
        </div>
      </section>

      {/* Country Selector */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Select Your Region
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our point of presence locations in your region
            </p>
            
            <Tabs value={selectedCountry} onValueChange={setSelectedCountry} className="w-full max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ZA">South Africa</TabsTrigger>
                <TabsTrigger value="AU">Australia</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Current Region Info */}
          <div className="mb-12">
            <Card className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">{currentPop.title}</h3>
                <p className="text-muted-foreground text-lg">{currentPop.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-card border border-border rounded-lg">
                  <Server className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Coordination Center</h4>
                  <p className="text-muted-foreground">{currentPop.coordinationCenter}</p>
                </div>
                <div className="text-center p-4 bg-card border border-border rounded-lg">
                  <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                  <h4 className="font-semibold text-foreground mb-1">Service Coverage</h4>
                  <p className="text-muted-foreground">{currentPop.coverage}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Interactive Map */}
          <div className="mb-12">
            <Card className="p-8">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">Interactive Coverage Map</CardTitle>
                <p className="text-muted-foreground">
                  Explore our technician locations and service areas
                </p>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full">
                  {mapError ? (
                    <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center p-8">
                        <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <h4 className="font-semibold text-foreground mb-2">Map Temporarily Unavailable</h4>
                        <p className="text-muted-foreground mb-4">
                          Please contact us directly for location details:
                        </p>
                        <div className="text-sm">
                          <p><strong>SA:</strong> +27 (0)87 822 2380</p>
                          <p><strong>AU:</strong> +61 (0)4 7822 2380</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <iframe 
                      src={currentPop.mapEmbed}
                      width="100%" 
                      height="100%"
                      className="border-0 rounded-lg"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`${currentPop.title} Map`}
                      onError={() => setMapError(true)}
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Network Expansion */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Expanding Our Network
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're continuously growing our point of presence to better serve our clients. 
            If we don't have a technician in your area, we'll work to establish one within two weeks.
          </p>
          <Button variant="premium" size="lg" onClick={() => navigate('/services/hire-us')}>
            Request Local Support
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PointOfPresence;
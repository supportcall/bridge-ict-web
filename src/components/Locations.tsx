import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Users, ArrowRight } from "lucide-react";
import GlobalMap from "./GlobalMap";

const Locations = () => {
  const locations = [
    {
      country: "South Africa",
      city: "Johannesburg",
      region: "Gauteng",
      description: "Our primary hub serving the African continent",
      phone: "+27 87 822 2380",
      whatsapp: "+27 78 862 0716",
      email: "info@supportcall.co.za",
      hours: "Mon - Fri: 09H00 - 16H00 SAST",
      services: ["Enterprise Solutions", "Emergency Response", "On-site Support", "Cabling"],
      coverage: "Nationwide Coverage"
    },
    {
      country: "Australia", 
      city: "Sydney",
      region: "New South Wales",
      description: "Expanding our reach across the Asia-Pacific region",
      phone: "+61 (0)2 9876 5432",
      whatsapp: "+61 488 123 456",
      email: "info@supportcall.com.au",
      hours: "Mon - Fri: 09H00 - 17H00 AEST",
      services: ["Remote Management", "Cloud Services", "Security Solutions", "Consulting"],
      coverage: "Australia & New Zealand"
    }
  ];

  return (
    <section id="locations" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Our Global Presence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            No Location Left Behind
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We understand the importance of local and remote support. Even if we don't have a 
            technician in your area immediately, we'll move quickly to secure one within two weeks. 
            Your needs are our priority.
          </p>
        </div>

        {/* Interactive Map */}
        <div className="mb-16">
          <GlobalMap />
        </div>

        {/* Location Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {locations.map((location, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-5 h-5 text-supportcall-orange" />
                      <h3 className="text-2xl font-bold text-foreground">
                        {location.country}
                      </h3>
                    </div>
                    <p className="text-lg text-supportcall-blue font-medium">
                      {location.city}, {location.region}
                    </p>
                    <p className="text-muted-foreground mt-2">
                      {location.description}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {location.coverage}
                  </Badge>
                </div>

                {/* Contact Information */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-supportcall-green" />
                    <div>
                      <a href={`tel:${location.phone}`} className="text-sm hover:text-primary">
                        {location.phone}
                      </a>
                      <br />
                      <a href={`tel:${location.whatsapp}`} className="text-xs text-muted-foreground hover:text-primary">
                        {location.whatsapp} (WhatsApp)
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-supportcall-green" />
                    <a href={`mailto:${location.email}`} className="text-sm hover:text-primary">
                      {location.email}
                    </a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-supportcall-green" />
                    <span className="text-sm text-muted-foreground">
                      {location.hours}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <Users className="w-4 h-4 text-supportcall-blue" />
                    <h4 className="font-semibold text-foreground">Key Services</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {location.services.map((service, serviceIndex) => (
                      <Badge key={serviceIndex} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button variant="outline" className="w-full group">
                  Contact {location.city} Office
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expansion Notice */}
        <Card className="border-l-4 border-l-supportcall-orange bg-supportcall-orange/5">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <MapPin className="w-6 h-6 text-supportcall-orange mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Expanding Our Network
                </h4>
                <p className="text-sm text-muted-foreground mb-4">
                  We actively expand our network of technicians across both countries. 
                  Even if we don't have immediate coverage in your area, we'll secure 
                  local support within two weeks. Remote support is available immediately.
                </p>
                <Button variant="premium" size="sm">
                  Request Coverage Assessment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Locations;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Server, 
  Shield, 
  Cloud, 
  Monitor, 
  Users, 
  Headphones, 
  Settings, 
  Wifi,
  Database,
  Lock,
  Phone,
  ArrowRight,
  ChevronDown,
  DollarSign
} from "lucide-react";
import servicesIcon from "@/assets/services-icon.jpg";
import { useState } from "react";

const Services = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' }
  ];

  const exchangeRates = {
    USD: 1,
    AUD: 1.52,
    ZAR: 18.0
  };

  const formatPrice = (baseUSDPrice: number) => {
    const convertedPrice = baseUSDPrice * exchangeRates[selectedCurrency as keyof typeof exchangeRates];
    const currency = currencies.find(c => c.code === selectedCurrency);
    
    if (convertedPrice >= 1000) {
      return `${currency?.symbol}${Math.round(convertedPrice / 1000)}k`;
    }
    return `${currency?.symbol}${Math.round(convertedPrice)}`;
  };
  const primaryServices = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "Enterprise ICT Solutions",
      description: "Comprehensive ICT infrastructure design, implementation, and management for large enterprises.",
      features: ["Server Management", "Network Infrastructure", "System Integration", "Performance Optimization"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Security & Compliance",
      description: "Advanced cybersecurity solutions to protect your business from modern digital threats.",
      features: ["Threat Assessment", "Security Audits", "Compliance Management", "Incident Response"]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Cloud Services",
      description: "Seamless cloud migration, management, and optimization for scalable business operations.",
      features: ["Cloud Migration", "Hybrid Solutions", "Backup & Recovery", "Cost Optimization"]
    },
    {
      icon: <Headphones className="w-8 h-8" />,
      title: "Proactive Support & Monitoring",
      description: "Continuous monitoring, automation, patching, and preventive systems operate 24/7 to maintain system integrity and uptime. After-hours technical support, emergency response, and help desk services are available based on operational coverage and client requirements.",
      features: ["Remote Monitoring", "Help Desk", "Emergency Response", "Preventive Maintenance"]
    }
  ];

  const specializedServices = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Remote Management & Monitoring",
      description: "Proactive system monitoring and remote management services."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Support for Seniors",
      description: "Specialized ICT support tailored for senior users and accessibility needs."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Consulting & Rates",
      description: "Expert ICT consulting and competitive service rates."
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Network Solutions",
      description: "Complete networking solutions from design to implementation."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Management",
      description: "Comprehensive data backup, recovery, and management solutions."
    },
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Cybersecurity",
      description: "Advanced security measures to protect your digital assets."
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Comprehensive ICT Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From enterprise infrastructure to specialized support, we provide the complete 
            range of ICT services your business needs to thrive in the digital age.
          </p>
        </div>

        {/* Hero Service Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img 
                src={servicesIcon} 
                alt="ICT Services" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                    Complete ICT Ecosystem
                  </h3>
                  <p className="text-white max-w-2xl mx-auto text-lg font-medium drop-shadow-md">
                    Integrated solutions covering every aspect of your technology infrastructure
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Primary Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {primaryServices.map((service, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="text-primary group-hover:text-primary-glow transition-colors">
                    {service.icon}
                  </div>
                  <div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Specialized Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-8 text-center">
            Specialized Services
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specializedServices.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-3">
                    <div className="text-primary mt-1">
                      {service.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {service.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Service Levels */}
        <Card className="bg-gradient-subtle">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Service Levels We Support
              </h3>
              <p className="text-muted-foreground">
                Tailored solutions for every business size and requirement
              </p>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Server className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Enterprise</h4>
                <p className="text-sm text-muted-foreground">Large-scale solutions for major corporations</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Corporate</h4>
                <p className="text-sm text-muted-foreground">Mid-size business ICT infrastructure</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Settings className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">SME</h4>
                <p className="text-sm text-muted-foreground">Small to medium enterprise solutions</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">Home Users</h4>
                <p className="text-sm text-muted-foreground">Personal and home office support</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing Overview Section */}
        <div className="mt-16 mb-16">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <DollarSign className="w-6 h-6 text-primary mr-2" />
                  <h3 className="text-2xl font-semibold text-foreground">
                    Service Pricing Overview
                  </h3>
                </div>
                
                {/* Currency Selector */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-lg text-sm px-4 py-2.5 inline-flex items-center border focus:ring-4 focus:outline-none focus:ring-primary/20"
                      type="button"
                    >
                      {currencies.find(c => c.code === selectedCurrency)?.name} ({selectedCurrency})
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-1 z-50 bg-card border border-border rounded-lg shadow-lg w-48">
                        <ul className="py-2 text-sm">
                          {currencies.map((currency) => (
                            <li key={currency.code}>
                              <button
                                onClick={() => {
                                  setSelectedCurrency(currency.code);
                                  setIsDropdownOpen(false);
                                }}
                                className="w-full text-left block px-4 py-2 hover:bg-muted text-foreground"
                              >
                                {currency.name} ({currency.code})
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
                  <strong>Pricing Disclaimer:</strong> All pricing shown on this website serves as a general guide only. 
                  Final pricing may vary based on specific requirements, project scope, and current market conditions. 
                  Please contact us for accurate, up-to-date pricing tailored to your needs.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-card rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Service Rates</h4>
                  <div className="text-lg font-bold text-primary mb-2">
                    {selectedCurrency === 'ZAR' ? 'R400 - R1,500/hr' : 
                     selectedCurrency === 'AUD' ? 'A$35 - A$250/hr' : 
                     '$22 - $82/hr'}
                  </div>
                  <p className="text-sm text-muted-foreground">Billed in 30-min increments, 1hr minimum</p>
                </div>
                
                <div className="text-center p-4 bg-card rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">RMM Services</h4>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {formatPrice(50)}/month
                  </div>
                  <p className="text-sm text-muted-foreground">Remote monitoring and management</p>
                </div>
                
                <div className="text-center p-4 bg-card rounded-lg">
                  <h4 className="font-semibold text-foreground mb-2">Custom Projects</h4>
                  <div className="text-2xl font-bold text-primary mb-2">
                    Quote
                  </div>
                  <p className="text-sm text-muted-foreground">Tailored solutions and consulting</p>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <Badge variant="secondary" className="text-xs">
                  * Prices are estimates and subject to change. Contact us for detailed quotes.
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold text-foreground mb-4">
            Ready to Transform Your ICT Infrastructure?
          </h3>
          <p className="text-muted-foreground mb-8">
            Get in touch with our experts to discuss your specific requirements
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => window.open('https://calendar.google.com/calendar/appointments/AcZssZ080B_PhEBAKSwXoxQoRe5UoUNhjEfq07OIxgo=?gv=true', '_blank')}
            >
              Book Consultation
            </Button>
            <Button variant="outline" size="lg">
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
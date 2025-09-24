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
  Heart,
  Zap
} from "lucide-react";
import servicesIcon from "@/assets/services-icon.jpg";
import { openBooking } from "@/utils/booking";
import { useNavigate } from "react-router-dom";

import { usePageSEO } from "@/hooks/usePageSEO";
import { generateServiceSchema, MARKETING_OPTIMIZATIONS } from "@/utils/seo";

const Services = () => {
  const navigate = useNavigate();
  
  // SEO optimization for services section
  usePageSEO({
    title: "Comprehensive ICT Services | SupportCALL - Remote Monitoring, Security & Tech Support",
    description: "Expert ICT services including TacticalRMM monitoring, W.system security, senior care support, and local tech sourcing. Professional IT solutions that drive real results.",
    keywords: "ICT services, remote monitoring, IT security, senior tech support, TacticalRMM, W.system, local tech support, IT consulting",
    structuredData: generateServiceSchema('SupportCALL ICT Services', 'Comprehensive ICT solutions including remote monitoring, security, compliance, and specialized support services.')
  });

  const primaryServices = [
    {
      icon: <Server className="w-8 h-8" />,
      title: "TacticalRMM - Remote Management & Monitoring",
      description: "Proactive system monitoring with real-time alerts, automated patch management, security checks, and remote issue resolution to keep your IT infrastructure running at peak performance.",
      features: ["Proactive Monitoring", "Patch Management", "Security Checks", "Remote Issue Resolution", "Automated Maintenance"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "W.System - Security & Compliance",
      description: "Comprehensive XDR and SIEM protection with unified endpoint security, threat intelligence, vulnerability detection, and regulatory compliance for SME, corporate, and individual users.",
      features: ["Unified XDR & SIEM", "Endpoint Security", "Threat Intelligence", "Compliance Management", "Vulnerability Detection"]
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "Local Tech Field Support",
      description: "Our Local Best Tech Sourcing Service connects clients with/in remote locations with local technical support available on-site. Where in-house resources aren't available, we coordinate trusted local technicians to deliver reliable, hands-on assistance, ensuring seamless continuity and minimal disruption to operations.",
      features: ["Remote Location Coverage", "Local Tech Sourcing", "On-site Support", "Emergency Response", "Field Reporting"]
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Peace of Mind for Seniors", 
      description: "Specialized reduced-cost monthly remote support service for verified pensioners and retired users, providing patient and comprehensive tech assistance.",
      features: ["Reduced Monthly Fee", "Senior-Friendly Support", "Remote Assistance", "Verified Eligibility", "Patient Guidance"]
    }
  ];

  const specializedServices = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Emergency Response",
      description: "Prompt and effective emergency response to mitigate risks and minimize downtime during critical incidents."
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Onsite & Remote Support",
      description: "Timely support both onsite and remotely to resolve issues quickly and minimize business disruptions."
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Connectivity Solutions",
      description: "Reliable high-speed connectivity solutions for communication, collaboration, and online resource access."
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Storage & Backup",
      description: "Secure data storage and backup solutions to ensure business continuity and protect against data loss."
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Hardware & Software Supply",
      description: "Reliable hardware and software solutions to support business operations and enable productivity."
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Consulting & Asset Management",
      description: "Professional IT consulting and asset management to optimize resource utilization and control costs."
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
            Comprehensive ICT Solutions That Drive Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <strong>Don't let IT problems cost you money.</strong><br />
            From TacticalRMM monitoring and W.system security to local tech sourcing for remote locations, 
            we provide <span className="text-primary font-semibold">genuine ICT services that work</span> - including specialized support where no local 
            technical assistance is available.<br />
            <strong className="text-primary font-semibold">Get your FREE consultation today!</strong>
          </p>
        </div>

        {/* Hero Service Image */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img 
                src={servicesIcon} 
                alt="ICT services montage highlighting SupportCALL offerings" 
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 drop-shadow-lg">
                    Complete ICT Solutions & Local Tech Support
                  </h3>
                  <p className="text-white max-w-2xl mx-auto text-lg font-medium drop-shadow-md">
                    From remote monitoring to on-site local tech sourcing for areas without technical support
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Primary Services Grid - Perfect grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          {primaryServices.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-elegant transition-all duration-300 group h-full"
              data-track="service-card"
            >
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
        <Card className="bg-card border-border">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                We Support
              </h3>
              <p className="text-muted-foreground">
                Tailored solutions for every business size and requirement
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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

        {/* Monthly ICT Expertise Access */}
        <Card className="border-l-4 border-l-primary bg-primary/5 mb-16">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Settings className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Monthly ICT Expertise Access
                </h4>
                <p className="text-sm text-muted-foreground">
                  Stop worrying about call-out fees! For a low monthly fee, get unlimited access to 20+ years of ICT expertise - 
                  like having your own in-house CTO, IT Manager, or Senior Tech. Pick up the phone anytime for guidance, 
                  advice, or planning without the fear of consultation billing. Just expert help when you need it.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Simplified CTA Section - No duplication */}
        <div className="text-center mt-16">
          <p className="text-muted-foregor mb-8">
            <strong>Ready to stop IT problems?</strong> Get expert help with our comprehensive ICT solutions.
          </p>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              } else {
                navigate('/#contact');
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
              }
            }}
            data-cta="get-quote"
            aria-label="Get instant quote for ICT services"
          >
            Get Instant Quote
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
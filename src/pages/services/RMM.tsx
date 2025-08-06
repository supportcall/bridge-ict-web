import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Shield, 
  Bell, 
  BarChart3, 
  Settings, 
  Clock,
  CheckCircle,
  ArrowRight,
  Users,
  Server,
  AlertTriangle
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Acknowledgement from "@/components/Acknowledgement";
import Footer from "@/components/Footer";
import CurrencySelector, { useCurrencyPricing } from "@/components/CurrencySelector";

const RMM = () => {
  const { currency, setCurrency, formatPrice } = useCurrencyPricing();

  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Real-time Monitoring",
      description: "24/7 monitoring of all your systems, networks, and applications"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Proactive Alerts",
      description: "Instant notifications when issues are detected before they impact your business"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Remote Management",
      description: "Complete remote control and management of your IT infrastructure"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Performance Analytics",
      description: "Detailed reports and analytics on system performance and health"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Security Monitoring",
      description: "Continuous security monitoring and threat detection"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Automated Maintenance",
      description: "Scheduled updates, patches, and maintenance tasks"
    }
  ];

  const benefits = [
    "Reduced downtime and system failures",
    "Lower IT operational costs",
    "Improved system performance",
    "Enhanced security posture",
    "Proactive issue resolution",
    "Comprehensive reporting and compliance"
  ];

  const packages = [
    {
      name: "Essential",
      price: formatPrice(99),
      description: "Perfect for small businesses",
      features: [
        "Up to 10 devices",
        "Basic monitoring",
        "Email alerts",
        "Monthly reports",
        "Business hours support"
      ]
    },
    {
      name: "Professional",
      price: formatPrice(199),
      description: "Ideal for growing companies",
      features: [
        "Up to 50 devices",
        "Advanced monitoring",
        "SMS & email alerts",
        "Weekly reports",
        "24/7 support",
        "Remote management"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      description: "For large organizations",
      features: [
        "Unlimited devices",
        "Full monitoring suite",
        "Multi-channel alerts",
        "Real-time reports",
        "Dedicated support",
        "Custom integrations"
      ]
    }
  ];

  return (
    <div className="min-h-screen dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Remote Monitoring & Management
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Proactive IT Management for Your Business
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Our RMM solutions provide 24/7 monitoring, proactive maintenance, and remote management 
              to keep your IT infrastructure running at peak performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg">
                Start Free Trial
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Comprehensive RMM Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to monitor, manage, and maintain your IT infrastructure
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-primary">
                      {feature.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose Our RMM Solution?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Our Remote Monitoring & Management service delivers measurable business value 
                through proactive IT management and continuous optimization.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Choose Your RMM Package
            </h2>
            <div className="flex justify-center mb-6">
              <CurrencySelector onCurrencyChange={setCurrency} selectedCurrency={currency} />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing options to match your business needs and budget
            </p>
            <p className="text-xs text-muted-foreground mt-4 italic">
              * Pricing serves as a guide and actual pricing may differ based on service requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-primary shadow-elegant' : ''}`}>
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mt-4">{pkg.name === "Essential" ? `From ${pkg.price}/month` : pkg.name === "Professional" ? `From ${pkg.price}/month` : pkg.price}</div>
                  <p className="text-muted-foreground mt-2">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={index === 1 ? "premium" : "outline"} 
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your IT Management?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Join hundreds of businesses that trust our RMM solutions for their IT infrastructure
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="premium" size="lg">
              Start Free 30-Day Trial
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              Contact Sales Team
            </Button>
          </div>
        </div>
      </section>

      <Acknowledgement />
      <Footer />
    </div>
  );
};

export default RMM;
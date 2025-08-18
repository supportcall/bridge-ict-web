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
import { openBooking } from "@/utils/booking";
import { usePageSEO } from "@/hooks/usePageSEO";
import { generateMarketingMeta, generateServiceSchema } from "@/utils/seo";

const RMM = () => {
  const { currency, setCurrency, formatPrice } = useCurrencyPricing();
  usePageSEO({ ...generateMarketingMeta('rmm'), structuredData: generateServiceSchema('SupportCALL TacticalRMM', 'Remote monitoring & management with proactive alerts, patching, asset tracking, and automation.') });

  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Proactive Monitoring",
      description: "Constantly tracks critical metrics like CPU and memory usage, disk space, and SMART status with real-time alerts"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Patch Management",
      description: "Automated system updates and patches to reduce vulnerabilities and improve system reliability"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Security Checks",
      description: "Continuous security monitoring to safeguard your data and infrastructure from potential threats"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Remote Management",
      description: "Full remote access and control capabilities for quick issue resolution and system management"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Custom Alerts",
      description: "Personalized notifications for critical events to keep you informed about your system's health"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Automated Maintenance",
      description: "Scheduled system maintenance tasks to prevent issues before they affect your business"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Backup Solutions (Optional)",
      description: "Optional backup services to ensure critical data is regularly backed up and quickly restored if needed"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Proactive Issue Resolution",
      description: "Identify and resolve potential problems before they affect your business operations"
    }
  ];

  const benefits = [
    "Proactive issue resolution before business impact",
    "Enhanced security with continuous monitoring",
    "Cost efficiency through early problem detection",
    "Reduced need for on-site IT callouts",
    "Peace of mind with expert system management",
    "Minimized downtime and business disruptions"
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
              SupportCALL TacticalRMM
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              SupportCALL TacticalRMM - Confidence in Your IT Systems
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              SupportCALL TacticalRMM offers extensive Remote Monitoring and Management services, 
              designed to ensure your IT systems run at peak performance while we handle the technical 
              details—maintaining security, reliability, and efficiency.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="premium" 
                size="lg"
                onClick={() => openBooking()}
              >
                Book a Consultation
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
              Key Features of SupportCALL TacticalRMM
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Proactive monitoring and management tools to keep your business systems running smoothly
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose SupportCALL TacticalRMM?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We don't just monitor; we act. Our proactive approach identifies and resolves potential 
              problems before they affect your business operations, providing peace of mind and 
              reduced operational costs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center p-4 bg-background rounded-lg border border-border">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              TacticalRMM Service Packages
            </h2>
            <div className="flex justify-center mb-6">
              <CurrencySelector onCurrencyChange={setCurrency} selectedCurrency={currency} />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing options to match your business needs and budget
            </p>
            <p className="text-xs text-muted-foreground mt-4 italic">
              * Pricing serves as a guide and actual pricing may differ based on individual needs and requirements
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
            Join other businesses that trust SupportCALL TacticalRMM for their IT infrastructure.
          </p>
        </div>
      </section>

      <Acknowledgement />
      <Footer />
    </div>
  );
};

export default RMM;
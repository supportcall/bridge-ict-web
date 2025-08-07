import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Users, 
  Clock, 
  BarChart3, 
  CheckCircle2, 
  Workflow,
  Bell,
  Archive,
  Search,
  Shield,
  Database,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Acknowledgement from "@/components/Acknowledgement";
import Footer from "@/components/Footer";
import CurrencySelector, { useCurrencyPricing } from "@/components/CurrencySelector";

const WSystem = () => {
  const { currency, setCurrency, formatPrice } = useCurrencyPricing();

  const features = [
    {
      icon: <FileText className="w-6 h-6" />,
      title: "Warranty Management",
      description: "Track and manage all your hardware warranties from a single dashboard"
    },
    {
      icon: <Workflow className="w-6 h-6" />,
      title: "Workflow Automation",
      description: "Automate warranty claims, renewals, and service requests"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Notifications",
      description: "Get alerts before warranties expire and when claims are processed"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Detailed Reporting",
      description: "Comprehensive reports on warranty status, costs, and claim history"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Asset Database",
      description: "Complete database of all your assets with warranty information"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Quick Search",
      description: "Instantly find warranty information for any device or component"
    }
  ];

  const benefits = [
    "Reduce warranty claim processing time by 70%",
    "Never miss a warranty expiration again",
    "Centralized warranty documentation",
    "Automated vendor communication",
    "Cost optimization through warranty tracking",
    "Improved asset lifecycle management"
  ];

  const workflowSteps = [
    {
      step: "1",
      title: "Asset Registration",
      description: "Automatically register new assets and their warranty details"
    },
    {
      step: "2",
      title: "Monitoring",
      description: "Continuous monitoring of warranty status and expiration dates"
    },
    {
      step: "3",
      title: "Alerts",
      description: "Proactive notifications for upcoming expirations and claim opportunities"
    },
    {
      step: "4",
      title: "Claims Processing",
      description: "Streamlined warranty claim submission and tracking"
    }
  ];

  const packages = [
    {
      name: "Starter",
      price: formatPrice(199),
      description: "Perfect for small businesses",
      features: [
        "Up to 100 assets",
        "Basic warranty tracking",
        "Email notifications",
        "Standard reporting",
        "Email support"
      ]
    },
    {
      name: "Professional",
      price: formatPrice(399),
      description: "Ideal for growing companies",
      features: [
        "Up to 1,000 assets",
        "Advanced workflow automation",
        "Multi-channel alerts",
        "Custom reporting",
        "Priority support",
        "Vendor integrations"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      description: "For large organizations",
      features: [
        "Unlimited assets",
        "Full automation suite",
        "Real-time monitoring",
        "Advanced analytics",
        "Dedicated account manager",
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
              Warranty System Management
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Streamline Your Warranty Management
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Our WSystem solution provides comprehensive warranty tracking, automated workflows, 
              and intelligent reporting to maximize your hardware investments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg">
                Request Demo
              </Button>
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
                View Features
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
              Powerful Warranty Management Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to efficiently manage warranties across your entire IT infrastructure
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

      {/* Workflow Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Automated Warranty Workflow
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our intelligent system automates the entire warranty management process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {workflowSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < workflowSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute top-8 -right-4 w-6 h-6 text-primary/40" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Transform Your Warranty Management
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop losing money on expired warranties and manual processes. Our WSystem 
                delivers measurable ROI through intelligent automation and proactive management.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle2 className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              <Button variant="premium" size="lg" className="mt-8">
                Schedule Consultation
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-gradient-subtle">
                <Archive className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">10,000+</div>
                <div className="text-sm text-muted-foreground">Assets Tracked</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">70%</div>
                <div className="text-sm text-muted-foreground">Time Saved</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Seamless Integration
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              WSystem integrates with your existing tools and workflows
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "Asset Management Systems",
              "Help Desk Software", 
              "Financial Systems",
              "Vendor Portals"
            ].map((integration, index) => (
              <Card key={index} className="text-center p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{integration}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Choose Your WSystem Package
            </h2>
            <div className="flex justify-center mb-6">
              <CurrencySelector onCurrencyChange={setCurrency} selectedCurrency={currency} />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing options to match your warranty management needs
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
                  <div className="text-3xl font-bold text-primary mt-4">
                    {pkg.name === "Enterprise" ? pkg.price : `From ${pkg.price}/month`}
                  </div>
                  <p className="text-muted-foreground mt-2">{pkg.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
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
            Ready to Optimize Your Warranty Management?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let us show you how WSystem can save time, reduce costs, and improve your warranty processes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="premium" size="lg" asChild>
              <a href="#contact">Get Started Today</a>
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary">
              Download Brochure
            </Button>
          </div>
        </div>
      </section>

      <Acknowledgement />
      <Footer />
    </div>
  );
};

export default WSystem;
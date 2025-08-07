import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  FileSearch, 
  Activity, 
  Cloud,
  Server,
  Globe,
  CheckCircle2,
  Target,
  Lock,
  Search,
  BarChart3,
  Users,
  Zap,
  Layers,
  Monitor,
  Database,
  ArrowRight
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Acknowledgement from "@/components/Acknowledgement";
import Footer from "@/components/Footer";
import CurrencySelector, { useCurrencyPricing } from "@/components/CurrencySelector";
import { openBooking } from "@/utils/booking";

const WSystem = () => {
  const { currency, setCurrency, formatPrice } = useCurrencyPricing();

  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Endpoint Security",
      description: "Comprehensive protection for all your endpoints with real-time threat detection and response"
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Security Information Event Management (SIEM)",
      description: "Centralized logging, correlation, and analysis of security events across your infrastructure"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Threat Intelligence",
      description: "Advanced threat hunting capabilities with integrated intelligence feeds and behavioral analysis"
    },
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Configuration Assessment",
      description: "Continuous monitoring and assessment of security configurations across your environment"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Vulnerability Detection",
      description: "Automated vulnerability scanning and assessment with prioritized remediation guidance"
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "File Integrity Monitoring",
      description: "Real-time monitoring of critical files and system changes with detailed audit trails"
    }
  ];

  const benefits = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "Unified Protection",
      description: "Single platform combining XDR and SIEM capabilities for comprehensive security coverage"
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud & On-Premise",
      description: "Protect public clouds, private clouds, and on-premise data centers from one console"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Advanced Analytics",
      description: "Machine learning-powered analytics for proactive threat detection and response"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Compliance Ready",
      description: "Built-in compliance reporting for PCI DSS, HIPAA, SOX, and other regulatory frameworks"
    }
  ];

  const capabilities = [
    {
      category: "Endpoint Protection",
      features: ["Malware Detection", "Intrusion Detection", "Rootkit Detection", "Configuration Assessment"]
    },
    {
      category: "Log Analysis",
      features: ["Real-time Log Collection", "Log Correlation", "Threat Intelligence", "Custom Rules"]
    },
    {
      category: "Vulnerability Management",
      features: ["Automated Scanning", "Risk Assessment", "Patch Management", "Compliance Monitoring"]
    },
    {
      category: "Incident Response",
      features: ["Automated Response", "Forensic Analysis", "Threat Hunting", "Custom Playbooks"]
    }
  ];

  const packages = [
    {
      name: "Essential",
      price: formatPrice(299),
      description: "Perfect for small to medium businesses",
      features: [
        "Up to 50 endpoints",
        "Basic SIEM functionality",
        "Standard threat detection",
        "Email alerts",
        "Basic reporting",
        "Community support"
      ]
    },
    {
      name: "Professional",
      price: formatPrice(599),
      description: "Ideal for growing organizations",
      features: [
        "Up to 500 endpoints",
        "Advanced SIEM & XDR",
        "Machine learning analytics",
        "Custom alerting",
        "Advanced reporting",
        "Priority support",
        "Compliance modules"
      ]
    },
    {
      name: "Enterprise",
      price: "Custom pricing",
      description: "For large organizations",
      features: [
        "Unlimited endpoints",
        "Full XDR suite",
        "Custom integrations",
        "Advanced threat hunting",
        "Dedicated support",
        "Custom compliance",
        "Professional services"
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
              Unified XDR & SIEM Protection
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              SupportCALL W.system
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              The unified security platform providing XDR and SIEM protection for endpoints and cloud workloads. 
              Comprehensive threat detection, response, and compliance in one powerful solution.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Complete Security Architecture
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              W.system unifies historically separate security functions into a single agent and platform architecture, 
              providing comprehensive protection for your entire infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-border bg-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Comprehensive Security Capabilities
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From endpoint protection to advanced threat hunting, W.system covers all aspects of modern cybersecurity
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-foreground flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-primary" />
                    {capability.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Why Choose W.system?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the power of unified security operations with enterprise-grade protection that scales with your business
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-border bg-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl text-foreground">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Deployment Options */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Flexible Deployment Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Deploy W.system however works best for your organization
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card text-center">
              <CardHeader>
                <Cloud className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-foreground">Cloud-Based</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Fully managed cloud deployment with automatic updates and maintenance
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center">
              <CardHeader>
                <Server className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-foreground">On-Premise</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Complete control with on-premise deployment for maximum security and compliance
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card text-center">
              <CardHeader>
                <Globe className="w-12 h-12 mx-auto text-primary mb-4" />
                <CardTitle className="text-foreground">Hybrid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Best of both worlds with hybrid deployment across cloud and on-premise environments
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Choose Your W.system Package
            </h2>
            <div className="flex justify-center mb-6">
              <CurrencySelector onCurrencyChange={setCurrency} selectedCurrency={currency} />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Flexible pricing options to match your security needs and organization size
            </p>
            <p className="text-xs text-muted-foreground mt-4 italic">
              * Pricing serves as a guide and actual pricing may differ based on specific requirements and deployment model
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${index === 1 ? 'border-primary shadow-elegant' : 'border-border bg-card'}`}>
                {index === 1 && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold text-foreground">{pkg.name}</CardTitle>
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
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Statistics */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Proven Security Performance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              W.system delivers measurable security improvements for organizations worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 bg-card border-border">
              <Monitor className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">100,000+</div>
              <div className="text-sm text-muted-foreground">Endpoints Protected</div>
            </Card>
            <Card className="text-center p-6 bg-card border-border">
              <Zap className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">90%</div>
              <div className="text-sm text-muted-foreground">Faster Threat Detection</div>
            </Card>
            <Card className="text-center p-6 bg-card border-border">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Guarantee</div>
            </Card>
            <Card className="text-center p-6 bg-card border-border">
              <Target className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">0.1%</div>
              <div className="text-sm text-muted-foreground">False Positive Rate</div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Secure Your Organization?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations worldwide who trust W.system for their cybersecurity needs. 
            Start with a free trial or schedule a personalized demo today.
          </p>
          <p className="text-sm text-white/70 mt-6">
            Available in Australia and South Africa • 24/7 Expert Support • Enterprise-Grade Security
          </p>
        </div>
      </section>

      <Acknowledgement />
      <Footer />
    </div>
  );
};

export default WSystem;
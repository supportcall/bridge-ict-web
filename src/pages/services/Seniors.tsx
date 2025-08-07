import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Phone, 
  Monitor, 
  Users, 
  Clock, 
  CheckCircle,
  Headphones,
  Shield,
  Home,
  Tablet,
  Smartphone,
  Laptop
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Acknowledgement from "@/components/Acknowledgement";
import Footer from "@/components/Footer";
import CurrencySelector, { useCurrencyPricing } from "@/components/CurrencySelector";
import { openBooking } from "@/utils/booking";

const Seniors = () => {
  const { currency, setCurrency, formatPrice } = useCurrencyPricing();

  const services = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Remote Support",
      description: "Friendly technicians connect to your computer remotely to troubleshoot problems during business hours"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Software Support",
      description: "Installation, configuration, updates, and troubleshooting for email, web browsers, and productivity programs"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Internet Connectivity",
      description: "Troubleshooting basic internet connection problems to keep you connected"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Virus & Malware Removal",
      description: "Scanning and removal of basic threats to keep your computer safe and secure"
    },
    {
      icon: <Laptop className="w-6 h-6" />,
      title: "Hardware Troubleshooting",
      description: "Diagnosing basic hardware issues and recommending solutions"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "System Optimization",
      description: "Optimizing system settings for improved performance and better user experience"
    }
  ];

  const packages = [
    {
      name: "Monthly Remote Support",
      price: formatPrice(35),
      description: "Reduced-cost monthly remote support for verified pensioners and retirees",
      features: [
        "Low monthly fee for peace of mind",
        "Pay-as-you-go monthly billing",
        "Verified pensioner/retiree exclusive",
        "Remote computer troubleshooting",
        "Patient, friendly support",
        "Business hours availability",
        "Software issue resolution",
        "Basic email and internet help"
      ],
      popular: true
    },
    {
      name: "One-Time Support",
      price: formatPrice(65),
      description: "Single session support for specific issues",
      features: [
        "One-time remote session",
        "Specific problem resolution",
        "No monthly commitment",
        "Perfect for occasional issues",
        "Same patient support approach",
        "Up to 2 hours of assistance"
      ],
      popular: false
    },
    {
      name: "On-Site Support",
      price: "Quote on request",
      description: "Physical on-site support when remote assistance isn't sufficient",
      features: [
        "In-person technical assistance",
        "Hardware setup and installation",
        "Physical device troubleshooting",
        "Training on your own equipment",
        "Custom pricing based on location",
        "Available when remote support can't resolve the issue"
      ],
      popular: false
    }
  ];

  const commonNeeds = [
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Smartphone Help",
      description: "Learning to use your phone for calls, texts, and staying connected with family"
    },
    {
      icon: <Laptop className="w-8 h-8" />,
      title: "Computer Basics",
      description: "Getting comfortable with email, web browsing, and online services"
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Video Calling",
      description: "Setting up and using video calls to see family and friends"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Online Safety",
      description: "Learning to spot scams and browse the internet safely"
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
              Peace of Mind for Seniors
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay Connected with Confidence
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              SupportCALL understands the challenges that seniors can face with technology. 
              Our reduced-cost monthly remote support service is designed specifically for 
              verified pensioners and retired desktop and laptop users.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="premium" 
                size="lg"
                onClick={() => openBooking()}
              >
                Call for Free Consultation
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-white border-white hover:bg-white hover:text-primary"
                onClick={() => openBooking()}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What's Included in Our Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Remote support limited to services that can be actioned remotely. For complex issues 
              requiring physical access, on-site support may be necessary at additional cost.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-primary">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Needs Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              We Help With Common Technology Challenges
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're just getting started or need help with specific tasks, we're here for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commonNeeds.map((need, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="text-primary mb-4 flex justify-center">
                  {need.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">{need.title}</h3>
                <p className="text-sm text-muted-foreground">{need.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Seniors Choose Our Support
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Patient & Understanding</h3>
                    <p className="text-muted-foreground">We take the time to explain things clearly, never rushing or using confusing technical terms.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Personal Service</h3>
                    <p className="text-muted-foreground">You'll work with the same friendly technician who gets to know you and your needs.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Family Involvement</h3>
                    <p className="text-muted-foreground">We work with your family to ensure everyone stays connected and informed.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-primary mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Flexible Scheduling</h3>
                    <p className="text-muted-foreground">We work around your schedule with convenient appointment times.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-gradient-subtle">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">1000+</div>
                <div className="text-sm text-muted-foreground">Seniors Helped</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <Headphones className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-foreground mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Support Available</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Simple and Affordable Plans
            </h2>
            <div className="flex justify-center mb-6">
              <CurrencySelector onCurrencyChange={setCurrency} selectedCurrency={currency} />
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the level of support that's right for you and your budget
            </p>
            <p className="text-xs text-muted-foreground mt-4 italic">
              * Pricing serves as a guide and actual pricing may differ based on individual needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative ${pkg.popular ? 'border-primary shadow-elegant' : ''}`}>
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mt-4">{pkg.price}/month</div>
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
                    variant={pkg.popular ? "premium" : "outline"} 
                    className="w-full"
                  >
                    Choose Plan
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
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Call us today for a friendly conversation about how we can help you with technology
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="premium" size="lg">
              Call Now: (555) 123-4567
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-white border-white hover:bg-white hover:text-primary"
              onClick={() => openBooking()}
            >
              Schedule Home Visit
            </Button>
          </div>
        </div>
      </section>

      <Acknowledgement />
      <Footer />
    </div>
  );
};

export default Seniors;
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Briefcase, 
  Clock, 
  Target, 
  CheckCircle,
  Star,
  Code,
  Server,
  Shield,
  Headphones,
  Database,
  Monitor,
  Network,
  Wifi
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Acknowledgement from "@/components/Acknowledgement";
import Footer from "@/components/Footer";
import CurrencySelector, { useCurrencyPricing } from "@/components/CurrencySelector";
import { openBooking } from "@/utils/booking";

const HireUs = () => {
  const { currency, setCurrency, getHourlyRate } = useCurrencyPricing();
  const hourlyRate = getHourlyRate();

  const services = [
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Remote Support",
      description: "Comprehensive remote IT support and troubleshooting via secure connections",
      features: ["Screenconnect remote access", "Teams/Skype meetings", "Real-time problem solving", "System configuration"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Onsite Support",
      description: "Professional technicians available for on-location IT support and installations",
      features: ["Hardware installation", "Network setup", "System maintenance", "Equipment upgrades"]
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Consulting Services",
      description: "Expert IT consulting for strategic planning and technical guidance",
      features: ["System architecture", "Technology planning", "Project management", "Technical audits"]
    }
  ];

  const rateStructure = [
    {
      service: "Consulting",
      zarRate: "ZAR 550.00",
      audRate: "AUD 200.00", 
      description: "Per hour, billed in 30-minute increments, 1-hour minimum"
    },
    {
      service: "Onsite Callouts",
      zarRate: "ZAR 400 - 1,500",
      audRate: "AUD 35 - 250",
      description: "Per hour, varies by complexity and location"
    },
    {
      service: "Advanced Products",
      zarRate: "Premium rates apply",
      audRate: "Premium rates apply",
      description: "XCP-ng, HAProxy, TrueNAS and specialized systems"
    }
  ];

  const policies = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      description: "Monday - Friday 09H00 - 15H00 (after-hours available at premium rates)"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Warranty Policy",
      description: "Hourly work is billable regardless of outcome. No warranty on time-based services."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Pre-Purchase Hours",
      description: "Hours can be pre-purchased and expire 1 year from purchase date"
    }
  ];

  const meetingTools = [
    "Teams and Skype for communication",
    "Screenconnect for remote access",
    "Phone backup if microphone unavailable",
    "Webcams optional for meetings"
  ];

  return (
    <div className="min-h-screen dark">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Professional IT Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Consulting, Onsite & Remote Support
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Expert IT consulting and support services tailored to your business needs. 
              From strategic planning to hands-on technical support, we're here to help.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="premium" 
                size="lg"
                onClick={() => openBooking()}
              >
                Book a Consultant
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
              Our Service Areas
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive IT support across remote, onsite, and consulting services
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <div className="text-primary">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
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

      {/* Rate and Billing Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Rate and Billing Structure
            </h2>
            <div className="flex justify-center mb-6">
              <CurrencySelector onCurrencyChange={setCurrency} selectedCurrency={currency} />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {rateStructure.map((rate, index) => (
              <Card key={index} className="text-center p-6">
                <h3 className="text-xl font-bold text-foreground mb-3">{rate.service}</h3>
                <div className="text-2xl font-bold text-primary mb-2">
                  {currency === 'ZAR' ? rate.zarRate : rate.audRate}
                </div>
                <p className="text-sm text-muted-foreground">{rate.description}</p>
              </Card>
            ))}
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Billing Terms & Conditions</h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>• Billed in 30-minute increments</li>
                <li>• 1-hour minimum purchase required</li>
                <li>• Retirement home rates available (subject to verification)</li>
                <li>• Higher rates for after-hours and holidays</li>
                <li>• Premium rates for David Maree consultations</li>
              </ul>
              <ul className="space-y-2">
                <li>• Hours can be pre-purchased upon request</li>
                <li>• Account setup required for pre-purchase</li>
                <li>• Invoices due immediately</li>
                <li>• Unused hours expire 1 year from purchase</li>
                <li>• Estimates available with defined scope</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meeting Tools & Process */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Meeting Tools & Process
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We use industry-standard tools to ensure seamless communication and efficient problem resolution.
              </p>
              <div className="space-y-4">
                {meetingTools.map((tool, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{tool}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Security Notice</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  DO NOT send passwords or sensitive information via email. Our technician will coordinate secure information transfer during your meeting.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Ticket System Available</h3>
                <p className="text-sm text-muted-foreground">
                  Registered clients receive ticket system access for streamlined support requests and callout coordination.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="font-semibold text-foreground mb-3">Documentation Policy</h3>
                <p className="text-sm text-muted-foreground">
                  Send documentation after booking confirmation. Pre-meeting review is at technician's discretion and considered billable time.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Service Policies
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">
                    {policy.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{policy.title}</h3>
                <p className="text-muted-foreground">{policy.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Network Coverage */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              No Location Left Behind
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We actively expand our network of technicians across both South Africa and Australia. 
              Even if we don't have a technician in your area immediately, we'll move quickly to secure one within two weeks.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Contact SupportCALL
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We value every client and would love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">South Africa</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <span className="text-muted-foreground">Phone: </span>
                  <a href="tel:+27878222380" className="text-primary hover:underline ml-2">+27 87 822 2380</a>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-muted-foreground">WhatsApp: </span>
                  <a href="tel:+27788620716" className="text-primary hover:underline ml-2">+27 78 862 0716</a>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-muted-foreground">Email: </span>
                  <a href="mailto:info@supportcall.co.za" className="text-primary hover:underline ml-2">info@supportcall.co.za</a>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Australia</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center">
                  <span className="text-muted-foreground">Phone: </span>
                  <a href="tel:+61878222380" className="text-primary hover:underline ml-2">+61 87 822 2380</a>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-muted-foreground">Alt: </span>
                  <a href="tel:+61788620716" className="text-primary hover:underline ml-2">+61 78 862 0716</a>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-muted-foreground">Email: </span>
                  <a href="mailto:info@supportcall.com.au" className="text-primary hover:underline ml-2">info@supportcall.com.au</a>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-2">Signal: @SupportCALL.01</p>
            <p className="text-sm text-muted-foreground">Mon - Fri 09H00 - 15H00 (after-hours standby available)</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Expert IT Support?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Book your consultation today and let our experienced technicians solve your IT challenges.
          </p>
          <div className="flex justify-center">
            <Button 
              variant="premium" 
              size="lg"
              onClick={() => openBooking()}
            >
              Book a Consultant
            </Button>
          </div>
        </div>
      </section>

      <Acknowledgement />
      <Footer />
    </div>
  );
};

export default HireUs;
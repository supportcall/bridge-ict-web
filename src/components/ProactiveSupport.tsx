import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Monitor, 
  Clock, 
  AlertTriangle, 
  Settings, 
  HeadphonesIcon,
  Wrench,
  ArrowRight
} from "lucide-react";

const ProactiveSupport = () => {
  const supportFeatures = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Remote Monitoring",
      description: "24/7 automated monitoring of your systems and infrastructure"
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: "Help Desk",
      description: "Professional technical support when you need it most"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Emergency Response",
      description: "Rapid response for critical issues and system failures"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "Preventive Maintenance",
      description: "Scheduled maintenance to prevent issues before they occur"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Proactive Support & Monitoring
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Always-On Protection for Your Systems
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Continuous monitoring, automation, patching, and preventive systems operate 24/7 to maintain 
            system integrity and uptime. After-hours technical support, emergency response, and help desk 
            services are available based on operational coverage and client requirements.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {supportFeatures.map((feature, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 text-center">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-primary">
                    {feature.icon}
                  </div>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-foreground mb-6">
              Comprehensive Support Coverage
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Our proactive approach means we identify and resolve issues before they impact 
                your business operations. With automated monitoring, regular maintenance, and 
                immediate response capabilities, your systems stay healthy and productive.
              </p>
              <p>
                Technical support is available through multiple channels, with emergency response 
                protocols in place for critical situations. Our help desk ensures your team has 
                the assistance they need to maintain productivity.
              </p>
            </div>
            <Button variant="premium" size="lg" className="mt-6 group">
              Learn More About Our Support
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <Card className="text-center p-6 bg-gradient-subtle">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">System Monitoring</div>
            </Card>
            <Card className="text-center p-6 bg-gradient-subtle">
              <Clock className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime Target</div>
            </Card>
            <Card className="text-center p-6 bg-gradient-subtle">
              <Settings className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">Auto</div>
              <div className="text-sm text-muted-foreground">Patch Management</div>
            </Card>
            <Card className="text-center p-6 bg-gradient-subtle">
              <AlertTriangle className="w-8 h-8 text-primary mx-auto mb-3" />
              <div className="text-2xl font-bold text-foreground mb-2">15min</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProactiveSupport;
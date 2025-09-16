import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Monitor, 
  Shield, 
  Clock, 
  Users,
  Wifi,
  Settings,
  CheckCircle,
  Zap,
  Lock,
  Headphones
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { openBooking } from "@/utils/booking";
import { usePageSEO } from "@/hooks/usePageSEO";
import { generateServiceSchema } from "@/utils/seo";

const RemoteSupport = () => {
  usePageSEO({
    title: "Remote Support Services | SupportCALL",
    description: "Instant, secure remote IT support for Windows, macOS, Linux, servers and cloud instances. ScreenConnect-based sessions with enterprise-grade encryption.",
    keywords: "remote IT support, ScreenConnect, secure remote help, instant tech support",
    structuredData: generateServiceSchema('SupportCALL Remote Support', 'Secure, instant remote IT support over ScreenConnect with enterprise encryption.')
  });
  const features = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Screen Sharing",
      description: "Secure remote desktop access using ScreenConnect for real-time troubleshooting"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Connections",
      description: "Bank-grade encryption ensures your data remains protected during sessions"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Rapid Response",
      description: "Connect within minutes for immediate problem resolution"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Expert Technicians",
      description: "Certified professionals with extensive experience across all platforms"
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "System Configuration",
      description: "Complete system setup, optimization, and configuration services"
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Voice Communication",
      description: "Teams, Skype, or phone support for clear communication during sessions"
    }
  ];

  const supportedPlatforms = [
    "Windows (All Versions)",
    "macOS",
    "Linux Distributions", 
    "Server Operating Systems",
    "Virtual Machines",
    "Cloud Instances"
  ];

  const commonSolutions = [
    {
      category: "System Issues",
      problems: [
        "Performance optimization",
        "Startup problems",
        "Blue screen errors",
        "Software conflicts"
      ]
    },
    {
      category: "Network Problems",
      problems: [
        "Internet connectivity",
        "VPN configuration",
        "Network printer setup",
        "Wi-Fi troubleshooting"
      ]
    },
    {
      category: "Software Support",
      problems: [
        "Application installation",
        "Software updates",
        "License activation",
        "Configuration issues"
      ]
    },
    {
      category: "Security & Maintenance",
      problems: [
        "Virus removal",
        "Security updates",
        "System cleanup",
        "Backup configuration"
      ]
    }
  ];

  const process = [
    {
      step: 1,
      title: "Book Your Session",
      description: "Schedule a remote support session at your convenience"
    },
    {
      step: 2,
      title: "Receive Connection Details",
      description: "Get secure connection instructions via email or SMS"
    },
    {
      step: 3,
      title: "Connect Safely",
      description: "Join the session using our secure ScreenConnect platform"
    },
    {
      step: 4,
      title: "Problem Resolution",
      description: "Our technician diagnoses and resolves your IT issues"
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
              Instant IT Support
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Remote Support Services
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Get immediate IT assistance from our expert technicians without leaving your desk. 
              Secure, fast, and effective remote support for all your technical needs.
            </p>
            <div className="flex justify-center">
              <Button 
                variant="premium" 
                size="lg"
                onClick={() => openBooking()}
              >
                Book Remote Session
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
              Why Choose Our Remote Support?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Professional remote IT support with enterprise-grade security and instant connectivity
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
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Supported Platforms
            </h2>
            <p className="text-lg text-muted-foreground mb-4">
              We provide remote support across all major operating systems and platforms
            </p>
            <p className="text-sm text-muted-foreground/80 italic">
              * Local support levels may vary based on support levels available at the time
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {supportedPlatforms.map((platform, index) => (
              <div key={index} className="flex items-center p-4 bg-background border border-border rounded-lg">
                <CheckCircle className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                <span className="text-foreground">{platform}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Solutions */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Common Issues We Resolve
            </h2>
            <p className="text-lg text-muted-foreground">
              From simple fixes to complex configurations, we handle it all remotely
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {commonSolutions.map((solution, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">{solution.category}</h3>
                <ul className="space-y-2">
                  {solution.problems.map((problem, problemIndex) => (
                    <li key={problemIndex} className="flex items-start">
                      <Zap className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{problem}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Simple 4-step process to get your issues resolved
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Notice */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start">
              <Lock className="w-6 h-6 text-yellow-600 dark:text-yellow-400 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  Security & Privacy Notice
                </h3>
                <div className="text-yellow-700 dark:text-yellow-300 space-y-2">
                  <p>• All remote sessions use enterprise-grade encryption</p>
                  <p>• Never share passwords or sensitive information via email</p>
                  <p>• Our technicians will guide you through secure information transfer</p>
                  <p>• Sessions can be terminated by you at any time</p>
                  <p>• No data is stored or accessed without your explicit permission</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready for Instant IT Support?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Connect with our expert technicians in minutes and get your issues resolved quickly and securely.
          </p>
          <Button 
            variant="premium" 
            size="lg"
            onClick={() => openBooking()}
          >
            Book Remote Session Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RemoteSupport;
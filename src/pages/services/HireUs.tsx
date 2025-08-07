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
      icon: <Code className="w-6 h-6" />,
      title: "Software Development",
      description: "Custom software solutions, web development, and application maintenance",
      skills: ["React", "Node.js", "Python", "Database Design", "API Development"]
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: "Infrastructure Management",
      description: "Server administration, cloud migration, and system optimization",
      skills: ["AWS/Azure", "Linux Administration", "Docker", "Network Security", "Performance Tuning"]
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Cybersecurity Services",
      description: "Security audits, penetration testing, and compliance management",
      skills: ["Security Auditing", "Threat Assessment", "Compliance", "Incident Response", "Risk Management"]
    },
    {
      icon: <Headphones className="w-6 h-6" />,
      title: "Technical Support",
      description: "Help desk services, user training, and ongoing technical assistance",
      skills: ["Customer Service", "Troubleshooting", "Training", "Documentation", "Remote Support"]
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Data Analytics",
      description: "Business intelligence, reporting, and data visualization solutions",
      skills: ["SQL", "Power BI", "Data Modeling", "ETL Processes", "Analytics"]
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Project Management",
      description: "IT project coordination, implementation, and delivery management",
      skills: ["Agile/Scrum", "Risk Management", "Stakeholder Communication", "Budget Management", "Timeline Control"]
    },
    {
      icon: <Network className="w-6 h-6" />,
      title: "Network Cabling",
      description: "Professional network infrastructure installation and maintenance",
      skills: ["Structured Cabling", "Fiber Optics", "Cat6/Cat6a Installation", "Cable Management", "Network Testing"]
    },
    {
      icon: <Wifi className="w-6 h-6" />,
      title: "Wireless Point to Point, Mesh and AP",
      description: "Advanced wireless network design and implementation solutions",
      skills: ["Point-to-Point Links", "Mesh Networks", "Access Points", "Wireless Site Surveys", "RF Planning"]
    }
  ];

  const engagementTypes = [
    {
      type: "Contract Staffing",
      duration: "3-12 months",
      description: "Skilled professionals for specific projects with defined timelines",
      benefits: ["Quick deployment", "Specialized skills", "Project-focused", "Cost-effective"]
    },
    {
      type: "Staff Augmentation",
      duration: "6-24 months",
      description: "Extend your team with our experts for ongoing projects",
      benefits: ["Seamless integration", "Long-term commitment", "Knowledge transfer", "Flexible scaling"]
    },
    {
      type: "Dedicated Teams",
      duration: "12+ months",
      description: "Complete teams working exclusively on your initiatives",
      benefits: ["Full ownership", "Deep expertise", "Consistent delivery", "Strategic partnership"]
    }
  ];

  const industries = [
    "Healthcare & Medical",
    "Financial Services",
    "Manufacturing",
    "Retail & E-commerce",
    "Education",
    "Government",
    "Non-profit Organizations",
    "Technology Startups"
  ];

  const whyChooseUs = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Proven Track Record",
      description: "15+ years delivering successful IT projects across diverse industries"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Skilled Professionals",
      description: "Certified experts with deep technical knowledge and business acumen"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Fast Deployment",
      description: "Get your project team up and running within 1-2 weeks"
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Quality Assurance",
      description: "Rigorous vetting process ensures only top-tier talent joins your team"
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
              Professional IT Staffing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Hire Our Expert IT Professionals
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto mb-8">
              Scale your team quickly with our experienced IT professionals. From short-term projects 
              to long-term partnerships, we provide the talent you need to succeed.
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
              Our Expertise Areas
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our professionals bring deep expertise across all areas of information technology
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
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {service.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* Pricing Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Service Pricing
            </h2>
            <div className="flex justify-center mb-6">
              <CurrencySelector onCurrencyChange={setCurrency} selectedCurrency={currency} />
            </div>
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-border p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Professional IT Services</h3>
                  <div className="text-4xl font-bold text-primary mb-4">
                    {hourlyRate.min} - {hourlyRate.max}
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">per hour</p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>• Billed in 30-minute increments</p>
                    <p>• 1-hour minimum purchase required</p>
                  </div>
                </div>
              </Card>
              <p className="text-xs text-muted-foreground mt-4 italic">
                * Pricing serves as a guide and actual pricing may differ based on individual needs and requirements
              </p>
            </div>
          </div>

          {/* Engagement Types */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Flexible Engagement Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the staffing model that best fits your project needs and timeline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {engagementTypes.map((engagement, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardHeader className="text-center">
                  <Badge variant="outline" className="mb-4 mx-auto">
                    {engagement.duration}
                  </Badge>
                  <CardTitle className="text-2xl">{engagement.type}</CardTitle>
                  <p className="text-muted-foreground">{engagement.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {engagement.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="w-full mt-6">
                    Learn More
                  </Button>
                </CardContent>
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
                Why Choose Our IT Professionals?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                When you hire our team, you get more than just technical skills. You get partners 
                committed to your success with a proven methodology for delivering results.
              </p>
              <div className="space-y-6">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <div className="text-primary">
                        {reason.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
                      <p className="text-muted-foreground">{reason.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center p-6 bg-gradient-subtle">
                <div className="text-2xl font-bold text-primary mb-2">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <div className="text-2xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm text-muted-foreground">Client Satisfaction</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <div className="text-2xl font-bold text-primary mb-2">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </Card>
              <Card className="text-center p-6 bg-gradient-subtle">
                <div className="text-2xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Expert Consultants</div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-card border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Industries We Serve
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our professionals have experience across diverse industries and understand sector-specific challenges
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{industry}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Hiring Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From initial consultation to team deployment, we make hiring IT talent simple and efficient
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Requirements Analysis", description: "We understand your project needs, timeline, and team requirements" },
              { step: "2", title: "Talent Matching", description: "Our team identifies the best-fit professionals from our network" },
              { step: "3", title: "Interview Process", description: "You interview and select the candidates that meet your criteria" },
              { step: "4", title: "Team Deployment", description: "Your new team members start working on your project within days" }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{process.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{process.title}</h3>
                <p className="text-muted-foreground">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Scale Your IT Team?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Let's discuss your staffing needs and find the perfect IT professionals for your project
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
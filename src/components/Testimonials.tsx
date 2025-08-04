import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Users, Clock, Award, TrendingUp, Shield } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      company: "Highway Corporate Services",
      duration: "20+ Years Service",
      logo: "HCS",
      testimonial: "TechConnect provides exceptional ICT support with unmatched reliability. Their proactive approach and deep technical expertise have been instrumental in our business growth over two decades.",
      rating: 5,
      contact: "Managing Director"
    },
    {
      company: "Australian Mining Corp",
      duration: "15+ Years Service",
      logo: "AMC",
      testimonial: "Outstanding service delivery across multiple time zones. TechConnect's 24/7 support ensures our operations never skip a beat, whether we're in Perth or Johannesburg.",
      rating: 5,
      contact: "IT Director"
    },
    {
      company: "FinServ Solutions",
      duration: "12+ Years Service",
      logo: "FSS",
      testimonial: "Their security-first approach and compliance expertise make them our trusted ICT partner. TechConnect understands the critical nature of financial services infrastructure.",
      rating: 5,
      contact: "CTO"
    },
    {
      company: "MedTech Innovation",
      duration: "8+ Years Service",
      logo: "MTI",
      testimonial: "Reliable, professional, and always available when we need them. TechConnect's support has been crucial in maintaining our healthcare technology systems.",
      rating: 5,
      contact: "Operations Manager"
    }
  ];

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "500+",
      label: "Happy Clients",
      description: "Enterprises trust us globally"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      number: "20+",
      label: "Years Experience",
      description: "Proven track record"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "99.9%",
      label: "Uptime Guarantee",
      description: "Reliable service delivery"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "24/7",
      label: "Support Coverage",
      description: "Always here when you need us"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Hear from our valued clients who have trusted us for decades. 
            Many have been with us for over 20 years!
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-primary mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">
                        {testimonial.logo}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {testimonial.company}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {testimonial.duration}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                  <p className="text-muted-foreground italic pl-6 mb-4">
                    "{testimonial.testimonial}"
                  </p>
                  <div className="text-sm text-muted-foreground font-medium">
                    — {testimonial.contact}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <Card className="bg-gradient-dark text-white">
          <CardContent className="p-8">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">
                Why Industry Leaders Choose TechConnect
              </h3>
              <div className="grid md:grid-cols-3 gap-8 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary-glow" />
                  </div>
                  <h4 className="font-semibold mb-2">Enterprise Security</h4>
                  <p className="text-white/80 text-sm">
                    Bank-level security protocols and compliance standards
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-primary-glow" />
                  </div>
                  <h4 className="font-semibold mb-2">Proven Reliability</h4>
                  <p className="text-white/80 text-sm">
                    Two decades of consistent service delivery
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary-glow" />
                  </div>
                  <h4 className="font-semibold mb-2">Expert Team</h4>
                  <p className="text-white/80 text-sm">
                    Certified professionals passionate about ICT excellence
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Industries */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Trusted Across Industries
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">Financial Services</Badge>
            <Badge variant="outline">Healthcare</Badge>
            <Badge variant="outline">Mining & Resources</Badge>
            <Badge variant="outline">Manufacturing</Badge>
            <Badge variant="outline">Education</Badge>
            <Badge variant="outline">Government</Badge>
            <Badge variant="outline">Retail</Badge>
            <Badge variant="outline">Professional Services</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
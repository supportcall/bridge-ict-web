import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote, Users, Clock, Award, TrendingUp, Shield, Heart } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      company: "Highway Corporate Services",
      duration: "20+ Years Service",
      logo: "HCS",
      testimonial: "SupportCALL provides a high quality, independent, professional advisory and support service to our clients in the fields of company secretaryship and corporate governance.",
      rating: 5,
      contact: "Corporate Services"
    },
    {
      company: "Sherwood After Hours Veterinary Clinic",
      duration: "10+ Years Service",
      logo: "SAH",
      testimonial: "Being an after-hours emergency clinic we have often needed to call on him for support at all hours of the day and night. David has always made himself available and has gone out of his way to resolve any problems that we may have had as soon as possible, even if it meant a midnight callout.",
      rating: 5,
      contact: "Practice Manager"
    },
    {
      company: "Sheriff Camperdown",
      duration: "5+ Years Service",
      logo: "SC",
      testimonial: "We incorporated SupportCALL in our team of experts when we were setting up our business in 2017. By the time we opened our doors everything was in its place and we were up and running. Thanks to SupportCALL's speedy, friendly and professional service.",
      rating: 5,
      contact: "Business Operations"
    },
    {
      company: "National Renal Care",
      duration: "25+ Years Service",
      logo: "NRC",
      testimonial: "IT related issues at our units that he services have been taken care of by SupportCALL for over 5 years. I trust him with the quality products and equipment he uses for support and his work is always on time. I have never faced a situation where the work has been delayed and not done properly.",
      rating: 5,
      contact: "IT Operations"
    }
  ];

  const stats = [];

  return (
    <section id="testimonials" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Client Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            What 20+ Years of Happy Clients Say About Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <strong>Results speak louder than promises!</strong> Many clients have trusted us for over two decades 
            because we deliver what we promise. <span className="text-primary font-semibold">See why they chose us 
            and stayed with us for years!</span>
          </p>
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
                Why Industry and Clients Choose SupportCALL
              </h3>
              <div className="grid md:grid-cols-4 gap-8 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-primary-glow" />
                  </div>
                  <h4 className="font-semibold mb-2">Enterprise Security</h4>
                  <p className="text-white/80 text-sm">
                    Bank-level security protocols, ethical compliance standards, and rather high levels of security
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
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-primary-glow" />
                  </div>
                  <h4 className="font-semibold mb-2">Ethical Standards</h4>
                  <p className="text-white/80 text-sm">
                    Transparent practices and ethical business conduct
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Client Industries */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-foreground mb-8">
            Across Industries
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
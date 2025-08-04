import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Clock, Heart, Shield, Globe2 } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Client-First Approach",
      description: "We prioritize our clients' needs, interests, and budgets above all else."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Service Excellence",
      description: "Delivering exceptional ICT services with unwavering quality and precision."
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "20+ Years Experience",
      description: "Two decades of proven expertise in enterprise ICT solutions."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Passionate Team",
      description: "Our staff love what they do and strive to deliver their very best."
    }
  ];

  const achievements = [
    { number: "18", label: "Locations" },
    { number: "99%", label: "Happy Clients" },
    { number: "1.2", label: "Avg Time Onsite - HRS" },
    { number: "0", label: "Injuries on Duty" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            About SupportCALL
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Your Trusted ICT & iSP Partner
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            SupportCALL delivers comprehensive ICT services, management, and products to clients across 
            Enterprise, Corporate, SME, and home user levels. With clients in South Africa and internationally, 
            we prioritize building true trust relationships by putting our clients' needs, interests, and budgets first.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Story */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Building Trust Through Excellence
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                SupportCALL delivers comprehensive ICT services to clients not only based in 
                South Africa but also internationally. We aim to supply our clients with the best 
                products and services for their needs and budget. We always deliver and have worked 
                hard on simple principles to build true trust relationships with our clients.
              </p>
              <p>
                We are at our happiest when our clients are happy with the results we deliver. 
                Our success stems from our company founder and staff - every staff member loves 
                our company and being with SupportCALL. Our team therefore loves to do their very best.
              </p>
              <p>
                Building long-standing relationships with our clients is very important to us, 
                building on trust relationships. We employ right and empower our team to be the 
                best that they could be. We even have clients in the industry themselves calling 
                for guidance, making us an essential part of their team and business.
              </p>
            </div>

            {/* COVID-19 Response */}
            <Card className="border-l-4 border-l-accent bg-accent/5">
              <CardContent className="p-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      Essential Services During COVID-19
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      During the challenging COVID-19 lockdown, SupportCALL continued to provide 
                      essential services, products, and unwavering support, contributing to keeping 
                      trade, industry, and the public safe and our country moving forward.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Values */}
          <div className="grid gap-6">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="text-primary mt-1">
                      {value.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {value.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {achievement.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Global Presence */}
        <Card className="mt-16 bg-gradient-dark text-white">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Globe2 className="w-8 h-8 text-primary-glow" />
              <h3 className="text-2xl font-semibold">Global Presence</h3>
            </div>
            <p className="text-center text-white/80 max-w-2xl mx-auto">
              Serving clients across South Africa and Australia with plans for further 
              international expansion. Our global perspective combined with local expertise 
              ensures world-class ICT solutions tailored to your market needs.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default About;
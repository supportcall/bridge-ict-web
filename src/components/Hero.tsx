import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Optimized Background Image with lazy loading */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${heroImage})`,
          willChange: 'transform', // Optimize for animations
          backfaceVisibility: 'hidden' // Improve performance
        }}
      >
        <div className="absolute inset-0 bg-background/80 dark:bg-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-supportcall-orange/20 bg-supportcall-orange/10 text-supportcall-orange text-sm font-medium">
            <Globe className="w-4 h-4 mr-2" />
            SupportCALL - Est. 2013 in SA
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Get{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              FREE ICT
            </span>{" "}
            Consultation
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <strong>20+ years</strong> delivering cutting-edge ICT services across Australia & South Africa. 
            <span className="text-primary font-semibold"> Book your free consultation today</span> and discover why 
            industry leaders trust us with their digital transformation.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Shield className="w-4 h-4 mr-2 text-accent" />
              Enterprise Security
            </div>
            <div className="flex items-center">
              <Zap className="w-4 h-4 mr-2 text-accent" />
              Proactive Support
            </div>
            <div className="flex items-center">
              <Globe className="w-4 h-4 mr-2 text-accent" />
              Global Reach
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button variant="premium" size="lg" className="group animate-pulse hover:animate-none" asChild>
              <a href="#contact">
                Book FREE Consultation
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="#testimonials">See Client Results</a>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Trusted by industry leaders for 20+ years | Serving SA & AU</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-xs font-medium bg-destructive/10 text-destructive px-3 py-1 rounded-full">24/7 Emergency Support</div>
              <div className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">FREE Initial Assessment</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
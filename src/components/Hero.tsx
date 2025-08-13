import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { openBooking } from "@/utils/booking";
import { 
  Shield, 
  Clock, 
  Globe2, 
  ChevronDown, 
  Star,
  Award,
  Zap,
  PhoneCall,
  ArrowRight
} from "lucide-react";
import heroTech from "@/assets/hero-tech.jpg";
import { Card } from "@/components/ui/card";

const Hero = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Enterprise Security",
      description: "Advanced cybersecurity protection"
    },
    {
      icon: <Clock className="w-5 h-5" />,
      title: "24/7 Support", 
      description: "Always-on emergency response"
    },
    {
      icon: <Globe2 className="w-5 h-5" />,
      title: "Global Reach",
      description: "SA & AU coverage with local expertise"
    }
  ];

  const urgencyTriggers = [
    "127+ businesses protected",
    "Zero breaches in 2024",
    "Average 3-minute response",
    "20+ years experience"
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-dark overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroTech} 
          alt="Advanced ICT infrastructure and cybersecurity technology"
          className="w-full h-full object-cover opacity-20"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-dark opacity-85"></div>
      </div>

      {/* Hero Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center lg:text-left">
          
          {/* Trust Badge */}
          <div className="flex justify-center lg:justify-start mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary-glow border border-primary/20">
              <Award className="w-4 h-4 mr-2" />
              Trusted Since 2004 • 20+ Years Excellence
            </Badge>
          </div>

          {/* Main Headline - Maximum Impact */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Get <span className="text-primary-glow">FREE</span> ICT Consultation
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl text-white/90 font-normal">
              Worth $500 - <span className="text-supportcall-orange font-bold">No Strings Attached!</span>
            </span>
          </h1>

          {/* Subheadline with Social Proof */}
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto lg:mx-0 leading-relaxed">
            <strong className="text-white">Stop losing money to IT disasters!</strong> Join 127+ businesses across SA & AU who trust our 
            <span className="text-primary-glow font-semibold"> enterprise-grade cybersecurity</span> and 
            <span className="text-accent font-semibold"> 24/7 emergency response</span>.
          </p>

          {/* Urgency Triggers */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto lg:mx-0">
            {urgencyTriggers.map((trigger, index) => (
              <Card key={index} className="p-3 bg-white/10 border-white/20 backdrop-blur-sm">
                <div className="flex items-center text-white text-sm">
                  <Star className="w-4 h-4 text-supportcall-orange mr-2 flex-shrink-0" />
                  <span className="font-medium">{trigger}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="grid md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto lg:mx-0">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
                <div className="text-primary-glow">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm">{feature.title}</h3>
                  <p className="text-white/70 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Maximum Conversion */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <Button 
              variant="premium" 
              size="lg" 
              onClick={() => openBooking()}
              className="text-lg px-8 py-4 h-auto shadow-glow animate-pulse hover:animate-none transform hover:scale-105 transition-all duration-300"
              aria-label="Book your FREE ICT consultation worth $500"
            >
              <PhoneCall className="w-5 h-5 mr-2" />
              <span className="flex flex-col items-start">
                <span className="font-bold">Book FREE Consultation</span>
                <span className="text-xs opacity-90">Worth $500 • 100% Free</span>
              </span>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const testimonials = document.querySelector('#contact');
                if (testimonials) {
                  testimonials.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-lg px-8 py-4 h-auto border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm"
            >
              <Zap className="w-5 h-5 mr-2" />
              See Client Results
            </Button>
          </div>

          {/* Risk Reversal */}
          <div className="text-center lg:text-left">
            <p className="text-white/80 text-sm mb-2">
              <strong className="text-supportcall-orange">⚡ Emergency? Call now:</strong> +27 87 822 2380 | +61 4 7822 2380
            </p>
            <p className="text-white/60 text-xs">
              🛡️ No risk, no obligation • 🏆 20+ years trusted • ⚡ Immediate response available
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 hover:text-white transition-colors duration-300 animate-bounce"
        aria-label="Scroll to learn more about SupportCALL"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;
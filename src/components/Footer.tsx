import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Globe, 
  Linkedin, 
  Twitter, 
  Facebook,
  ArrowUp
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    services: [
      "Enterprise Solutions",
      "Security & Compliance",
      "Cloud Services",
      "24/7 Support",
      "Remote Monitoring",
      "Consulting"
    ],
    company: [
      "About Us",
      "Our Team",
      "Careers",
      "News & Updates",
      "Case Studies",
      "Contact"
    ],
    support: [
      "Help Center",
      "Documentation",
      "System Status",
      "Emergency Support",
      "Training",
      "Community"
    ],
    legal: [
      "Privacy Policy",
      "Terms of Service",
      "Data Protection",
      "Cookie Policy",
      "Compliance",
      "Security"
    ]
  };

  return (
    <footer className="bg-gradient-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-primary-glow mb-4">
                  SupportCALL
                </h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Delivering cutting-edge ICT services, management, and products to 
                  enterprises across Australia, South Africa and the world. Your trusted partner
                  for digital transformation.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-3 text-primary-glow" />
                  <span className="text-sm">+27 (0)87 822 2380 | +61 (0)4 7822 2380</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-3 text-primary-glow" />
                  <span className="text-sm">info@supportcall.co.za | info@supportcall.com.au</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-3 text-primary-glow" />
                  <span className="text-sm">Regional HQ Offices in Durban, SA and Launceston, AU</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-3 text-primary-glow" />
                  <span className="text-sm">Serving clients globally</span>
                </div>
              </div>

            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#services" 
                      className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#about" 
                      className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <a 
                      href="#contact" 
                      className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="max-w-md">
              <h4 className="font-semibold text-white mb-2">Stay Updated</h4>
              <p className="text-white/60 text-sm mb-4">
                Get the latest ICT insights and industry updates delivered to your inbox.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary-glow"
                />
                <Button variant="premium" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/60 mb-4 md:mb-0">
              © {new Date().getFullYear()} SupportCALL. All rights reserved. | 
              <a href="#" className="hover:text-primary-glow ml-1">Privacy Policy</a> | 
              <a href="#" className="hover:text-primary-glow ml-1">Terms of Service</a>
            </div>
            
            <div className="flex items-center space-x-4">
                <div className="text-xs text-white/40">
                  Australian - South African - Global | Expertise - Operations - Standards
                </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={scrollToTop}
                className="text-white/60 hover:text-primary-glow"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
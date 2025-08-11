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
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const location = useLocation();
  const navigate = useNavigate();
  const handleAnchorClick = (href: string) => {
    if (location.pathname !== '/') {
      navigate(`/${href}`);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
                  Delivering ICT services, management, and products to enterprises, SME and home users across 
                  Australia, South Africa and the world. Your trusted partner for digital transformation.
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
                  <span className="text-sm">Coordination centres : Launceston, AU | Durban, ZA</span>
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
                <li><button type="button" onClick={() => handleAnchorClick("#services")} className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Services</button></li>
                <li><Link to="/remote-support" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Remote Services</Link></li>
                <li><Link to="/services/wsystem" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Security & Compliance</Link></li>
                <li><Link to="/services/seniors" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Senior Care</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2">
                <li><button type="button" onClick={() => handleAnchorClick("#about")} className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">About Us</button></li>
                <li><a href="https://wiki.supportcall.co.za/doku.php?id=supportcall_ausa_company_profile#company_information" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Company Profile</a></li>
                <li><a href="https://wiki.supportcall.co.za/doku.php?id=buzi_rmm_compli_pricing" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">MSP Partners</a></li>
                <li><a href="https://supportcall.co.za/store/forms/SC-RegForm.pdf" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">SIgn Up Forn</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="https://tickets.supportcall-isp.co.za/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Ticket System</a></li>
                <li><a href="https://wiki.supportcall.co.za/doku.php" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Our Docuwiki</a></li>
                <li><Link to="/links" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Links</Link></li>
                <li><Link to="/feedback-insights" className="text-white/60 hover:text-primary-glow text-sm transition-colors duration-200">Feedback & Insights</Link></li>
              </ul>
            </div>
          </div>

        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-white/60 mb-4 md:mb-0">
              © {new Date().getFullYear()} SupportCALL. All rights reserved. | 
              <a href="https://wiki.supportcall.co.za/doku.php?id=policy_-_privacy_policy" target="_blank" rel="noopener noreferrer" className="hover:text-primary-glow ml-1">Privacy Policy</a>
              <br />
              <a href="https://wiki.supportcall.co.za/doku.php?id=terms_of_enduser_ticket_system_usage" target="_blank" rel="noopener noreferrer" className="hover:text-primary-glow ml-1">Terms of Service</a> | 
              <a href="https://wiki.supportcall.co.za/doku.php?id=terms_of_enduser_signup_debitorder" target="_blank" rel="noopener noreferrer" className="hover:text-primary-glow ml-1">Service Application & Debit Order Terms</a>
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
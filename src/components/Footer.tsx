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
      navigate('/');
      // Scroll to anchor after navigation completes
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-gradient-dark text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                    <img 
                      src="/logo.png" 
                      alt="SupportCALL ICT Services Logo - Professional IT Support Australia & South Africa" 
                      className="h-10 w-10 mr-3"
                      width="40"
                      height="40"
                      loading="lazy"
                  />
                  <span className="text-2xl font-bold text-primary-glow">
                    SupportCALL
                  </span>
                </div>
                <p className="text-primary-foreground/80 mb-6 leading-relaxed">
                  Professional ICT services from home to enterprise. Expert cybersecurity,
                  monitoring & emergency response across Australia & South Africa.
                </p>
                
                {/* Contact Information */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary-glow" />
                    <div>
                      <a href="tel:+61499335679" className="text-primary-foreground/80 hover:text-primary-glow transition-colors">
                        +61-4-9933-5679 (AU)
                      </a>
                      {" | "}
                      <a href="tel:+27878222380" className="text-primary-foreground/80 hover:text-primary-glow transition-colors">
                        +27-87-822-2380 (SA)
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary-glow" />
                    <a href="mailto:info@supportcall.co.za" className="text-primary-foreground/80 hover:text-primary-glow transition-colors">
                      info@supportcall.co.za
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary-glow" />
                    <span className="text-primary-foreground/80">
                      Launceston, AU | Durban, SA
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary-glow" />
                    <a href="https://www.supportcall.co.za" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-primary-glow transition-colors">
                      www.supportcall.co.za
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer Links */}
            <div className="sm:col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {/* Services Column */}
              <div>
                <h4 className="font-semibold text-primary-foreground mb-4">Services</h4>
                <ul className="space-y-3">
                  <li><button type="button" onClick={() => handleAnchorClick("#services")} className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Services</button></li>
                  <li><Link to="/remote-support" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Remote Services</Link></li>
                  <li><Link to="/services/rmm" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Remote Monitoring & Mgmt</Link></li>
                  <li><Link to="/services/wsystem" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Security & Compliance</Link></li>
                  <li><Link to="/services/seniors" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Senior Care</Link></li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold text-primary-foreground mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><button type="button" onClick={() => handleAnchorClick("#about")} className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">About Us</button></li>
                  <li><a href="https://wiki.supportcall.co.za/doku.php?id=supportcall_ausa_company_profile#company_information" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Company Profile</a></li>
                  <li><a href="https://wiki.supportcall.co.za/doku.php?id=buzi_rmm_compli_pricing" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">MSP Partners</a></li>
                  <li><a href="https://supportcall.co.za/forms/SC-RegForm.pdf" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Sign Up Form</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold text-primary-foreground mb-4">Support</h4>
                <ul className="space-y-3">
                  <li><a href="https://tickets.supportcall-isp.co.za/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Ticket System</a></li>
                  <li><a href="https://wiki.supportcall.co.za/doku.php" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Our Docuwiki</a></li>
                  <li><Link to="/links" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Links</Link></li>
                  <li><Link to="/feedback-insights" className="text-primary-foreground/60 hover:text-primary-glow text-sm transition-colors duration-200">Feedback & Insights</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/10" />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-primary-foreground/60 mb-4 md:mb-0">
              © {new Date().getFullYear()} SupportCALL. All rights reserved. | 
              <a href="https://wiki.supportcall.co.za/doku.php?id=policy_-_privacy_policy" target="_blank" rel="noopener noreferrer" className="hover:text-primary-glow ml-1">Privacy Policy</a>
              <br />
              <a href="https://wiki.supportcall.co.za/doku.php?id=terms_of_enduser_ticket_system_usage" target="_blank" rel="noopener noreferrer" className="hover:text-primary-glow ml-1">Terms of Service</a> | 
              <a href="https://wiki.supportcall.co.za/doku.php?id=terms_of_enduser_signup_debitorder" target="_blank" rel="noopener noreferrer" className="hover:text-primary-glow ml-1">Service Application & Debit Order Terms</a>
            </div>
            
            <div className="text-xs text-primary-foreground/40">
              Australian - South African - Global | Expertise - Operations - Standards
            </div>
          </div>
          
          {/* Acknowledgement */}
          <div className="text-center mt-6 pt-6 border-t border-primary-foreground/10">
            <div className="text-xs text-primary-foreground/60 max-w-4xl mx-auto px-4">
              <div className="font-medium text-primary-foreground/80 mb-2 uppercase tracking-wide text-center">
                Acknowledgement of Humanity & Country
              </div>
              <p className="leading-relaxed text-center">
                We honour all people, from all cultures, lands, and histories - past and present. 
                Across Australia, Oceania, and the world, we stand for unity, respect, and shared humanity. 
                This includes acknowledging the enduring cultural connections of First Nations peoples, 
                while affirming dignity and equality for all.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
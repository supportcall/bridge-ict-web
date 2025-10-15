import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Menu, X, Phone } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { openBooking } from "@/utils/booking";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", type: "route" },
    { name: "About", href: "#about", type: "anchor" },
    { name: "Services", href: "#services", type: "anchor" },
    { name: "Remote Monitoring & Mgmt", href: "/services/rmm", type: "route" },
    { name: "Security & Compliance", href: "/services/wsystem", type: "route" },
    { name: "Senior Care", href: "/services/seniors", type: "route" },
    { name: "Hire Us", href: "/services/hire-us", type: "route" },
    { name: "Contact", href: "#contact", type: "anchor" },
  ];

  const handleAnchorClick = (href: string) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      // Navigate to home with hash
      navigate('/' + href);
    } else {
      // Already on home page - scroll to element
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <>
      {/* Special Offer Banner */}
      {showBanner && (
        <div className="bg-[#2a2a2a] text-white py-3 px-4 relative z-50 border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-bold text-sm sm:text-base text-supportcall-orange">SPECIAL OFFER:</span>
              <span className="text-sm sm:text-base">2 months FREE ICT TacticalRMM + Emergency Remote Support Plan - Book Today!</span>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Button 
                size="sm"
                onClick={() => openBooking()}
                className="bg-cyan-500 hover:bg-cyan-600 text-white border-0"
              >
                <Phone className="w-4 h-4 mr-1" />
                Book Now
              </Button>
              <button
                onClick={() => setShowBanner(false)}
                className="text-white hover:text-white/70 transition-colors p-1"
                aria-label="Close banner"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <nav className="sticky top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img 
              src="/logo.png" 
              alt="SupportCALL ICT Services Logo - Professional IT Support Australia & South Africa" 
              className="h-10 w-10 mr-3"
              width="40"
              height="40"
            />
            <span className="text-xl font-bold text-primary">SupportCALL</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                item.type === "route" ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    onClick={(e) => {
                      if (item.href === "/" && location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setIsOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleAnchorClick(item.href)}
                    className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <Button 
                variant="premium" 
                size="sm" 
                className="ml-4"
                onClick={() => openBooking()}
              >
                Book Consultation
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary hover:bg-muted/50 relative z-10"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 bg-background border-t border-border shadow-lg">
              {navItems.map((item) => (
                item.type === "route" ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-foreground hover:text-primary hover:bg-muted/50 block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 border-l-2 border-transparent hover:border-primary"
                    onClick={(e) => {
                      if (item.href === "/" && location.pathname === "/") {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }
                      setIsOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleAnchorClick(item.href)}
                    className="text-foreground hover:text-primary hover:bg-muted/50 block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 border-l-2 border-transparent hover:border-primary w-full text-left"
                  >
                    {item.name}
                  </button>
                )
              ))}
              <div className="pt-3 px-3">
                <Button 
                  variant="premium" 
                  className="w-full h-12 text-base"
                  onClick={() => {
                    openBooking();
                    setIsOpen(false);
                  }}
                >
                  Book Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default Navigation;
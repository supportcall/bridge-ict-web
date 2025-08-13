import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Star } from "lucide-react";
import { openBooking } from "@/utils/booking";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/", type: "route" },
    { name: "About", href: "#about", type: "anchor" },
    { name: "Services", href: "#services", type: "anchor" },
    { name: "Contact", href: "#contact", type: "anchor" },
    { name: "Remote Support", href: "/remote-support", type: "route" },
    { name: "Links & Resources", href: "/links", type: "route" }
  ];

  const handleAnchorClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      navigate(`/${href}`);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200/20 dark:border-gray-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            aria-label="SupportCALL - Return to homepage"
          >
            <img 
              src="/logo.png" 
              alt="SupportCALL Logo" 
              className="h-8 w-8"
              loading="eager"
              decoding="async"
            />
            <div>
              <span className="text-xl font-bold text-primary">SupportCALL</span>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-muted-foreground">20+ Years Trusted</span>
                <div className="flex space-x-0.5">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-2.5 h-2.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.type === "route" ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleAnchorClick(item.href)}
                  className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              )
            ))}
            
            {/* Emergency Phone Number */}
            <div className="hidden lg:flex items-center text-sm text-muted-foreground">
              <Phone className="w-4 h-4 mr-1 text-red-500" />
              <span className="font-mono">+27-87-822-2380</span>
            </div>

            {/* Primary CTA */}
            <Button 
              variant="premium" 
              onClick={() => openBooking()}
              className="shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              aria-label="Book your FREE ICT consultation"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-semibold">Book FREE Consultation</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-foreground hover:text-primary hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/20 dark:border-gray-800/20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
            <div className="space-y-3">
              {navItems.map((item) => (
                item.type === "route" ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => handleAnchorClick(item.href)}
                    className="block w-full text-left px-4 py-2 text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors font-medium"
                  >
                    {item.name}
                  </button>
                )
              ))}
              
              {/* Mobile Emergency Contact */}
              <div className="px-4 py-2 text-sm text-muted-foreground border-t border-gray-200/20 dark:border-gray-800/20">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-red-500" />
                  <span>Emergency: +27-87-822-2380</span>
                </div>
              </div>
              
              {/* Mobile CTA */}
              <div className="px-4 pt-2">
                <Button 
                  variant="premium" 
                  className="w-full justify-center shadow-lg"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openBooking();
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Book FREE Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
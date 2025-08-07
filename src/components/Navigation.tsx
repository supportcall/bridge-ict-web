import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { openBooking } from "@/utils/booking";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "RMM", href: "/services/rmm" },
    { name: "WSystem", href: "/services/wsystem" },
    { name: "Seniors", href: "/services/seniors" },
    { name: "Hire Us", href: "/services/hire-us" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (item: { name: string; href: string }) => {
    if (item.name === "Home") {
      window.location.href = "/";
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/98 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-primary">SupportCALL</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                  onClick={(e) => {
                    if (item.name === "Home") {
                      e.preventDefault();
                      handleNavClick(item);
                    }
                  }}
                >
                  {item.name}
                </a>
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
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary hover:bg-muted/50 block px-3 py-3 rounded-md text-base font-medium transition-all duration-200 border-l-2 border-transparent hover:border-primary"
                  onClick={(e) => {
                    if (item.name === "Home") {
                      e.preventDefault();
                      handleNavClick(item);
                    }
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </a>
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
  );
};

export default Navigation;
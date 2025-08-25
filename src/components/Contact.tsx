import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  Globe, 
  MessageSquare,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { openBooking } from "@/utils/booking";
import { validateFormData, sanitizeInput, RateLimiter } from "@/utils/validation";

const Contact = () => {
  const { toast } = useToast();
  const [rateLimiter] = useState(() => new RateLimiter(3, 60000)); // 3 attempts per minute
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: ""
  });

  // Simple human verification (math challenge)
  const [humanA] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [humanB] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [humanAnswer, setHumanAnswer] = useState("");
  const [humanError, setHumanError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    // Rate limiting check
    if (!rateLimiter.canAttempt()) {
      const timeUntilReset = Math.ceil(rateLimiter.getTimeUntilReset() / 1000);
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${timeUntilReset} seconds before trying again.`,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Simple human verification
    if (parseInt(humanAnswer, 10) !== humanA + humanB) {
      setHumanError("Please solve the verification correctly.");
      toast({
        title: "Verification failed",
        description: "Please answer the human verification question.",
        variant: "destructive",
      });
      const hv = (e.currentTarget as HTMLFormElement).querySelector<HTMLInputElement>("#human_verification");
      hv?.focus();
      setIsSubmitting(false);
      return;
    } else {
      setHumanError("");
    }

    // Validate form data
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      toast({
        title: "Form Validation Error",
        description: "Please correct the highlighted fields and try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Send to all three email addresses
    const targetEmails = [
      "info@supportcall.co.za",
      "info@supportcall.com.au", 
      "scmyhelp@gmail.com"
    ];
    
    // Create email content with new format
    const subject = `SupportCALL Web Contact Form: ${formData.service || 'General'} | ${formData.email}`;
    const body = `
═══════════════════════════════════════════════════════════════
                    SUPPORTCALL WEB CONTACT FORM
═══════════════════════════════════════════════════════════════

📋 CONTACT DETAILS:
──────────────────────────────────────────────────────────────
👤 Full Name:           ${formData.name}
📧 Email Address:       ${formData.email}
🏢 Company:             ${formData.company || 'Not provided'}
📞 Phone Number:        ${formData.phone}

🔧 SERVICE INFORMATION:
──────────────────────────────────────────────────────────────
🎯 Service of Interest: ${formData.service}

💬 MESSAGE:
──────────────────────────────────────────────────────────────
${formData.message}

═══════════════════════════════════════════════════════════════
📅 Submitted: ${new Date().toLocaleString()}
🌐 Source: SupportCALL Website Contact Form
═══════════════════════════════════════════════════════════════
    `.trim();
    
    // Create mailto link with all recipients
    const mailtoLink = `mailto:${targetEmails.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    toast({
      title: "Email Client Opened",
      description: "Your email client should now open with the pre-filled message. Please send the email to complete your inquiry.",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      company: "",
      phone: "",
      service: "",
      message: ""
    });
    setFormErrors({});
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let sanitizedValue: string;
    if (name === "message") {
      // Preserve spaces and new lines for message, only strip angle brackets and limit length
      sanitizedValue = value.replace(/[<>]/g, "").slice(0, 2000);
    } else {
      sanitizedValue = sanitizeInput(value);
    }
    
    setFormData({
      ...formData,
      [name]: sanitizedValue
    });
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: ["+27 (0)87 822 2380", "+61 (0)4 7822 2380", "+27 (0)78 862 0716 (Emergency)"],
      description: "Available with after-hours standby"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Support",
      details: ["info@supportcall.co.za", "info@supportcall.com.au"],
      description: "We aim to respond ASAP, within 24 hours"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Offices",
      details: ["Coordination centres : Launceston, AU | Durban, ZA"],
      description: "Serving both continents"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: ["SA: Mon - Fri: 09:00 - 15:00 SAST", "AU: Mon - Fri: 09:00 - 15:00 AEST"],
      description: "Regular support hours"
    }
  ];

  const services = [
    "Special Offer",
    "General",
    "Remote Monitoring & Management",
    "Security & Compliance",
    "Senior Care",
    "Consultation",
    "Join our Team",
    "MSP Partnering"
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Stop Losing Money to IT Problems, Book Your FREE FIRST Consultation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            <strong>Don't wait for IT disasters to cost you thousands!</strong><br />
            Get immediate access to 20+ years of ICT expertise. Our free first consultation will identify your risks and show you exactly how to protect your business.<br />
            <span className="text-primary font-semibold">We've helped businesses slash IT downtime and cut costs – now we can do the same for you.</span>
          </p>
        </div>


        <div className="text-center mb-16">
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Let's Connect - It's FREE!
              </h3>
              <p className="text-muted-foreground mb-8">
                <strong>Zero-risk, maximum value!</strong> Whether you're facing urgent IT issues or planning upgrades, 
                our experts are standing by with 20+ years of proven solutions.<br />
                <span className="text-primary font-semibold">Get the help you need today!</span>
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-primary mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-foreground font-medium">
                            {detail}
                          </p>
                        ))}
                        <p className="text-xs text-muted-foreground mt-1">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <Button 
                variant="premium" 
                className="w-full animate-pulse hover:animate-none" 
                size="lg"
                onClick={() => openBooking()}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book FREE Consultation NOW
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Get Instant FREE Quote</CardTitle>
                <p className="text-muted-foreground">
                  <strong>Fast response guaranteed!</strong> Fill out the form below and get your personalized quote within 24 hours. 
                  No hidden fees, no surprises - just honest pricing from ICT experts.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        aria-describedby="name-help"
                        className={formErrors.name ? "border-destructive" : ""}
                      />
                      {formErrors.name && (
                        <p className="text-sm text-destructive mt-1">{formErrors.name}</p>
                      )}
                      <p id="name-help" className="sr-only">Enter your full name for contact purposes</p>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@company.com"
                        className={formErrors.email ? "border-destructive" : ""}
                      />
                      {formErrors.email && (
                        <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company Name
                      </label>
                      <Input
                        id="company"
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+27 or +61 phone number"
                        className={formErrors.phone ? "border-destructive" : ""}
                      />
                      {formErrors.phone && (
                        <p className="text-sm text-destructive mt-1">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                      Service of Interest *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className={`w-full p-3 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring relative z-10 ${formErrors.service ? "border-destructive" : ""}`}
                      aria-describedby="service-help"
                      style={{ backgroundColor: 'hsl(var(--background))', position: 'relative', zIndex: 10 }}
                    >
                      <option value="">Select a service</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                    {formErrors.service && (
                      <p className="text-sm text-destructive mt-1">{formErrors.service}</p>
                    )}
                    <p id="service-help" className="sr-only">Select the service you're interested in from the dropdown menu</p>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your ICT requirements, challenges, or questions..."
                      rows={6}
                      className={formErrors.message ? "border-destructive" : ""}
                    />
                    {formErrors.message && (
                      <p className="text-sm text-destructive mt-1">{formErrors.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="human_verification" className="block text-sm font-medium text-foreground mb-2">
                      Human verification: What is {humanA} + {humanB}? *
                    </label>
                    <Input
                      id="human_verification"
                      name="human_verification"
                      type="number"
                      inputMode="numeric"
                      required
                      value={humanAnswer}
                      onChange={(e) => {
                        setHumanAnswer(e.target.value);
                        if (humanError) setHumanError("");
                      }}
                      className={humanError ? "border-destructive" : ""}
                    />
                    {humanError && <p className="text-sm text-destructive mt-1">{humanError}</p>}
                  </div>

                  <Button 
                    type="submit" 
                    variant="premium" 
                    size="lg" 
                    className="w-full group"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                    {isSubmitting ? "Sending..." : "Send My FREE Quote Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="mt-16 bg-gradient-dark text-white">
          <CardContent className="p-8">
            <div className="text-center">
              <Globe className="w-12 h-12 text-primary-glow mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4">
                Global Reach, Local Expertise
              </h3>
              <p className="text-white/80 max-w-2xl mx-auto mb-6">
                With offices in Australia and South Africa, we provide world-class ICT 
                solutions with the personal touch of local service. Our team understands 
                the unique challenges of both markets.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Badge variant="outline" className="text-white border-white/30">
                  Australian - South African - Global | Operations - Standards - Expertise
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
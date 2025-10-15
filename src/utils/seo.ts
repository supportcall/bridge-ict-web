/**
 * SEO optimization utilities for maximum search visibility and client acquisition
 */

// Dynamic meta tags for different pages - MAXIMIZED for marketing impact and conversion
export const PAGE_SEO = {
  home: {
    title: "🎉 SPECIAL: 2 Months FREE! | Complete ICT Solutions AU & SA | SupportCALL",
    description: "⚡ SPECIAL OFFER: Get 2 months FREE ICT TacticalRMM + Emergency Support! 20+ years trusted expertise. Home to enterprise IT solutions. 24/7 emergency response across Australia & South Africa. Book your FREE consultation NOW - Call +27-87-822-2380 or +61-4-9933-5679. Stop losing money to IT problems today!",
    keywords: "SupportCALL, IT support, ICT support, FREE consultation, special offer, 2 months free, TacticalRMM, emergency IT support, cybersecurity, managed IT services, enterprise IT solutions, home computer help, business IT support, network security, remote monitoring, technical support, Australia, South Africa, 24/7 support"
  },
  rmm: {
    title: "🎉 2 Months FREE TacticalRMM! | Remote Monitoring & Management | SupportCALL",
    description: "⚡ LIMITED TIME: 2 months FREE TacticalRMM + Emergency Remote Support! Stop downtime before it costs you thousands. 24/7 proactive monitoring, automated patching, instant security alerts. Enterprise-grade protection at SME prices. Book FREE consultation NOW - +27-87-822-2380. Available across AU & SA.",
    keywords: "TacticalRMM, free offer, 2 months free, remote monitoring, managed IT services, proactive IT support, automated patching, system monitoring, RMM solutions, prevent downtime, emergency support, SupportCALL, Australia, South Africa"
  },
  wsystem: {
    title: "Stop Cyber Attacks NOW! | W.system XDR & SIEM Security | SupportCALL",
    description: "Don't wait for a breach to cost your business! Advanced W.system XDR & SIEM protection. Unified endpoint security, real-time threat detection, compliance reporting. Enterprise cybersecurity that actually works. FREE security assessment worth $500! Call +27-87-822-2380 to protect your business today.",
    keywords: "W.system, XDR security, SIEM platform, endpoint protection, cyber attack prevention, threat detection, cybersecurity platform, enterprise security, free security assessment, data breach prevention, compliance, SupportCALL"
  },
  seniors: {
    title: "Peace of Mind Tech Support for Seniors 65+ | Reduced Rates | SupportCALL", 
    description: "Patient, compassionate technology support designed for seniors. No rushing, no jargon - just friendly help when you need it. SPECIAL reduced monthly rates for verified pensioners. Remote assistance for computers, phones, tablets. FREE FIRST consultation - Call +27-87-822-2380. We treat you like family!",
    keywords: "senior tech support, elderly technology help, patient IT assistance, pensioner discount, senior-friendly tech support, technology for seniors, reduced rates, compassionate support, remote help for elderly"
  },
  hireUs: {
    title: "Hire Expert ICT Consultants - 20+ Years Proven Results | SupportCALL",
    description: "Get access to 20+ years ICT expertise without full-time costs! Flexible hiring: onsite, remote, or hybrid. Emergency callouts, project work, ongoing support. No lock-in contracts. Serving enterprise to home users across AU & SA. Book FREE consultation to discuss your needs - Call +27-87-822-2380 NOW!",
    keywords: "hire ICT consultants, IT consulting services, onsite support, remote IT assistance, flexible ICT staffing, emergency callouts, project-based IT, business technology services, professional IT consultants, SupportCALL"
  },
  remoteSupport: {
    title: "Remote IT Support | Available NOW 24/7 | Windows, Mac, Linux",
    description: "IT problem right now? Get secure remote support from our expert team! Professional help for Windows, macOS, Linux. Fix issues without waiting for onsite visits. Available 24/7 across Australia & South Africa. Safe, secure, professional. Book session NOW - Call +27-87-822-2380 or +61-4-9933-5679. Emergency support available!",
    keywords: "remote IT support, professional support, 24/7 IT help, remote desktop, secure remote connection, expert assistance, Windows support, macOS support, Linux support, emergency IT support, same-day support, SupportCALL"
  },
  links: {
    title: "FREE IT Tools & Resources | Expert-Curated Downloads | SupportCALL",
    description: "Access professional-grade IT tools and resources FREE! Expert-curated security utilities, remote support tools, system diagnostics, and professional IT resources. Download essential tools to protect and optimize your systems today!",
    keywords: "free IT tools, IT resources, downloads, remote support tools, security utilities, system diagnostics, technical resources, professional tools, virus removal, system optimization"
  },
  notFound: {
    title: "Page Not Found | Get FREE IT Consultation Instead | SupportCALL",
    description: "Oops! Page not found. But don't leave empty-handed - claim your FREE IT consultation! 20+ years expertise, 24/7 emergency support across AU & SA. Call +27-87-822-2380 now to discuss your IT needs.",
    keywords: "404 error, page not found, free consultation, IT support, SupportCALL"
  }
};

// Marketing-focused meta descriptions with strong CTAs
export const generateMarketingMeta = (page: keyof typeof PAGE_SEO) => {
  const seo = PAGE_SEO[page];
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords
  };
};

// Schema markup generators for rich snippets
export const generateServiceSchema = (serviceName: string, description: string, price?: string) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "SupportCALL"
    },
    "areaServed": ["ZA", "AU"],
    "offers": {
      "@type": "Offer",
      "price": price || "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  };
};

// Emergency contact structured data for local SEO
export const EMERGENCY_CONTACT_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  "name": "SupportCALL Emergency IT Response",
  "description": "24/7 emergency IT support and cybersecurity response services",
  "serviceType": "Emergency IT Support",
  "provider": {
    "@type": "Organization", 
    "name": "SupportCALL"
  },
  "areaServed": ["South Africa", "Australia"],
  "availableChannel": {
    "@type": "ServiceChannel",
    "servicePhone": "+27-87-822-2380",
    "availableLanguage": "English"
  }
};

// Conversion tracking and analytics helpers
export const trackConversion = (eventName: string, value?: number) => {
  // GTM/GA4 conversion tracking (self-contained)
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, {
      'custom_parameter_1': 'supportcall_conversion',
      'value': value || 0,
      'currency': 'USD'
    });
  }
  
  // Console tracking for development
  console.log(`Conversion Event: ${eventName}`, { value });
};

// Marketing performance optimization
export const MARKETING_OPTIMIZATIONS = {
  // Critical above-the-fold content
  aboveTheFold: [
    'FREE FIRST ICT Consultation',
    'No Cost Assessment',
    'Emergency Support',
    'Book Today',
    '20+ Years Trusted'
  ],
  
  // High-converting call-to-action phrases
  ctaPhrases: [
    'Book FREE FIRST Consultation NOW',
    'Get Your Quote',
    'Claim Your FREE FIRST Assessment',
    'Emergency Support Available',
    'Talk to Expert Today'
  ],
  
  // Trust signals for conversion optimization
  trustSignals: [
    '20+ Years Experience',
    '24/7 Emergency Response',
    'Enterprise Security Certified',
    'Australia & South Africa Coverage'
  ]
};
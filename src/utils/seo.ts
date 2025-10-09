/**
 * SEO optimization utilities for maximum search visibility and client acquisition
 */

// Dynamic meta tags for different pages - optimized for current website content
export const PAGE_SEO = {
  home: {
    title: "SupportCALL: Complete ICT Solutions Home to Enterprise | IT Support AU & SA",
    description: "SupportCALL delivers genuine ICT services that work. Home to enterprise IT support, cybersecurity, emergency response across Australia & South Africa. 20+ years expertise. FREE FIRST consultation - call +27-87-822-2380!",
    keywords: "SupportCALL, IT support, ICT support, ICT services, computer support, cyber security, managed IT services, emergency IT response, enterprise IT solutions, home computer help, business IT support, network security, remote monitoring, technical support, FREE consultation, Australia, South Africa"
  },
  rmm: {
    title: "TacticalRMM - Remote Monitoring & Management | SupportCALL",
    description: "Proactive remote monitoring and management with TacticalRMM. 24/7 system monitoring, automated patching, security alerts. Enterprise-grade RMM solutions. FREE FIRST consultation available.",
    keywords: "TacticalRMM, remote monitoring, managed IT services, proactive IT support, automated patching, system monitoring, RMM solutions, SupportCALL"
  },
  wsystem: {
    title: "W.system XDR & SIEM Security Platform | SupportCALL",
    description: "Advanced XDR and SIEM cybersecurity platform by W.system. Unified endpoint protection, cloud workload security, real-time threat detection. Enterprise cybersecurity solutions.",
    keywords: "W.system, XDR security, SIEM platform, endpoint protection, cloud security, threat detection, cybersecurity platform, enterprise security"
  },
  seniors: {
    title: "Tech Angels - Senior Technology Support | SupportCALL", 
    description: "Compassionate technology support for seniors aged 65+. Patient, understanding tech help designed for older adults. Peace of mind technology assistance. FREE FIRST consultation.",
    keywords: "Tech Angels, senior tech support, elderly technology help, patient IT assistance, senior-friendly tech support, technology for seniors"
  },
  hireUs: {
    title: "Hire ICT Consultants - Expert IT Services | SupportCALL",
    description: "Professional ICT consulting with 20+ years experience. Onsite and remote support services. Expert technicians for business IT needs. Flexible engagement models available.",
    keywords: "hire ICT consultants, IT consulting services, onsite support, remote IT assistance, business technology services, professional IT consultants"
  },
  remoteSupport: {
    title: "Remote IT Support Services | Instant Secure Connection | SupportCALL",
    description: "Instant remote IT support for Windows, macOS, Linux. Secure remote desktop assistance, troubleshooting, system maintenance. Available 24/7 across AU & SA. Book session now.",
    keywords: "remote IT support, remote desktop, instant support, secure remote connection, troubleshooting, system maintenance, Windows support, macOS support, Linux support"
  },
  links: {
    title: "Useful IT Resources & Tools | Downloads & Links | SupportCALL",
    description: "Essential IT tools, downloads, and resources curated by SupportCALL experts. Security utilities, remote support tools, system diagnostics, and professional IT resources.",
    keywords: "IT resources, IT tools, downloads, remote support tools, security utilities, system diagnostics, technical resources"
  },
  notFound: {
    title: "404 - Page Not Found | SupportCALL",
    description: "The page you're looking for could not be found. Return to SupportCALL homepage for complete ICT solutions and expert IT support services.",
    keywords: "404 error, page not found, SupportCALL"
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
    'Get Instant Quote',
    'Claim Your FREE FIRST Assessment',
    'Emergency Support Available',
    'Talk to Expert Today'
  ],
  
  // Trust signals for conversion optimization
  trustSignals: [
    '20+ Years Experience',
    '500+ Satisfied Clients',
    '24/7 Emergency Response',
    'Enterprise Security Certified',
    'Australia & South Africa Coverage'
  ]
};
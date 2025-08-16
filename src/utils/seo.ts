/**
 * SEO optimization utilities for maximum search visibility and client acquisition
 */

// Dynamic meta tags for different pages
export const PAGE_SEO = {
  home: {
    title: "FREE FIRST ICT Consultation | Expert IT Support SA & AU | SupportCALL",
    description: "Get FREE FIRST ICT consultation! Enterprise cybersecurity, 24/7 emergency IT support, remote monitoring. We've helped businesses slash IT downtime and cut costs across SA & AU for 20+ years.",
    keywords: "free ICT consultation, IT support South Africa Australia, cybersecurity services, emergency IT response, enterprise IT solutions"
  },
  rmm: {
    title: "TacticalRMM - Remote Monitoring & Management | SupportCALL",
    description: "Advanced remote monitoring and management services. Proactive IT support, automated patching, security monitoring. Confidence in your IT systems 24/7.",
    keywords: "remote monitoring, managed IT services, TacticalRMM, proactive IT support, automated patching"
  },
  wsystem: {
    title: "W.system XDR & SIEM Security Platform | SupportCALL",
    description: "Unified XDR and SIEM protection for endpoints and cloud workloads. Enterprise-grade cybersecurity with real-time threat detection and response.",
    keywords: "XDR security, SIEM platform, endpoint protection, cloud security, threat detection"
  },
  seniors: {
    title: "Tech Angels - Senior Technology Support | SupportCALL", 
    description: "Specialized technology support for seniors. Patient, understanding tech help designed specifically for older adults. Peace of mind technology assistance.",
    keywords: "senior tech support, elderly technology help, patient IT assistance, senior-friendly tech support"
  },
  hireUs: {
    title: "Hire ICT Consultants - Expert IT Services | SupportCALL",
    description: "Professional ICT consulting, onsite and remote support services. Expert technicians for your business IT needs. Flexible engagement models available.",
    keywords: "ICT consultants, IT consulting services, onsite support, remote IT assistance, business technology services"
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

// Lead generation optimization
export const optimizeForLeadGeneration = () => {
  // Ensure contact forms are easily accessible
  const contactForms = document.querySelectorAll('form[data-contact]');
  contactForms.forEach(form => {
    form.setAttribute('data-conversion-optimized', 'true');
  });
  
  // Track form interactions
  const formInputs = document.querySelectorAll('input, textarea, select');
  formInputs.forEach(input => {
    input.addEventListener('focus', () => {
      trackConversion('form_field_engagement');
    });
  });
};
// Enhanced SEO & Marketing Meta Management
// Ensures optimal search engine visibility and marketing performance

import { generateServiceSchema, EMERGENCY_CONTACT_SCHEMA } from './seo';

export const addStructuredDataToHead = () => {
  // Remove existing structured data to prevent duplicates
  const existingSchemas = document.querySelectorAll('script[type="application/ld+json"]');
  existingSchemas.forEach(schema => {
    if (!schema.innerHTML.includes('"@context": "https://schema.org"')) {
      schema.remove();
    }
  });

  // Add enhanced business schema
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "SupportCALL",
    "alternateName": "SupportCALL ICT Services",
    "description": "Professional ICT services from home to enterprise. Expert cybersecurity, monitoring & emergency response across South Africa & Australia.",
    "url": "https://www.supportcall.co.za",
    "logo": "https://www.supportcall.co.za/lovable-uploads/84165b4e-46a6-4065-8ddd-eb8da8017502.png",
    "image": "https://www.supportcall.co.za/og-image.jpg",
    "telephone": ["+27-87-822-2380", "+61-4-9933-5679"],
    "email": "info@supportcall.co.za",
    "priceRange": "Free Consultation Available",
    "currenciesAccepted": ["ZAR", "AUD", "USD"],
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "PayPal"],
    "areaServed": [
      {
        "@type": "Country",
        "name": "South Africa",
        "alternateName": "ZA"
      },
      {
        "@type": "Country", 
        "name": "Australia",
        "alternateName": "AU"
      }
    ],
    "serviceType": ["IT Support", "Cybersecurity", "Emergency Response", "Remote Monitoring", "Senior Care Tech Support"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "ICT Services Catalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "FREE ICT Security Assessment",
            "description": "Comprehensive cybersecurity evaluation worth $500",
            "category": "Cybersecurity"
          },
          "price": "0",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "24/7 Emergency IT Response",
            "description": "Immediate response to critical IT issues",
            "category": "Emergency Support"
          },
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Senior-Friendly Tech Support", 
            "description": "Patient, specialized support for seniors and less tech-savvy users",
            "category": "Senior Care"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00",
    "sameAs": [
      "https://signal.me/#u/SupportCALL.01"
    ]
  };

  const businessSchemaScript = document.createElement('script');
  businessSchemaScript.type = 'application/ld+json';
  businessSchemaScript.textContent = JSON.stringify(businessSchema);
  document.head.appendChild(businessSchemaScript);

  // Add WebSite schema for site search
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SupportCALL",
    "url": "https://www.supportcall.co.za",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.supportcall.co.za/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const websiteSchemaScript = document.createElement('script');
  websiteSchemaScript.type = 'application/ld+json';
  websiteSchemaScript.textContent = JSON.stringify(websiteSchema);
  document.head.appendChild(websiteSchemaScript);
};

export const optimizeMeta = () => {
  // Ensure all meta tags are optimized
  const metaTags = {
    'description': 'SupportCALL delivers genuine ICT services that work. Home to enterprise IT support, cybersecurity, and emergency response across Australia & South Africa. 20+ years of expertise. FREE FIRST consultation - CALL NOW!',
    'keywords': 'SupportCALL, IT support, ICT support, computer support, cyber security, managed IT services, emergency IT response, enterprise IT solutions, home computer help, business IT support, network security, remote monitoring, technical support, FREE consultation, genuine ICT services, South Africa, Australia',
    'author': 'SupportCALL - David Maree',
    'robots': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'googlebot': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',
    'theme-color': '#0080CC'
  };

  Object.entries(metaTags).forEach(([name, content]) => {
    let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  });

  // Ensure canonical URL is set
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = window.location.href.split('?')[0].split('#')[0];

  // Add preconnect for performance
  const preconnects = [
    'https://www.google-analytics.com',
    'https://www.googletagmanager.com'
  ];

  preconnects.forEach(url => {
    if (!document.querySelector(`link[href="${url}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      document.head.appendChild(link);
    }
  });
};

export const addLocalBusinessMarkup = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SupportCALL",
    "image": "https://www.supportcall.co.za/og-image.jpg",
    "telephone": "+27-87-822-2380",
    "email": "info@supportcall.co.za",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Durban",
      "addressRegion": "KwaZulu-Natal",
      "addressCountry": "ZA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -29.8587,
      "longitude": 31.0218
    },
    "url": "https://www.supportcall.co.za",
    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-24:00",
    "priceRange": "Free Consultation Available"
  };

  const localSchemaScript = document.createElement('script');
  localSchemaScript.type = 'application/ld+json';
  localSchemaScript.textContent = JSON.stringify(localBusinessSchema);
  document.head.appendChild(localSchemaScript);
};

export const initializeEnhancedSEO = () => {
  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addStructuredDataToHead();
      optimizeMeta();
      addLocalBusinessMarkup();
    });
  } else {
    addStructuredDataToHead();
    optimizeMeta();
    addLocalBusinessMarkup();
  }

  // Update meta on route changes
  window.addEventListener('popstate', () => {
    setTimeout(optimizeMeta, 100);
  });
};
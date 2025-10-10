/**
 * Generate BreadcrumbList structured data for better SEO
 */
export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

// Common breadcrumb paths for service pages
export const SERVICE_BREADCRUMBS = {
  rmm: [
    { name: "Home", url: "https://www.supportcall.co.za/" },
    { name: "Services", url: "https://www.supportcall.co.za/#services" },
    { name: "Remote Monitoring & Management", url: "https://www.supportcall.co.za/services/rmm" }
  ],
  wsystem: [
    { name: "Home", url: "https://www.supportcall.co.za/" },
    { name: "Services", url: "https://www.supportcall.co.za/#services" },
    { name: "Security & Compliance", url: "https://www.supportcall.co.za/services/wsystem" }
  ],
  seniors: [
    { name: "Home", url: "https://www.supportcall.co.za/" },
    { name: "Services", url: "https://www.supportcall.co.za/#services" },
    { name: "Senior Tech Support", url: "https://www.supportcall.co.za/services/seniors" }
  ],
  hireUs: [
    { name: "Home", url: "https://www.supportcall.co.za/" },
    { name: "Services", url: "https://www.supportcall.co.za/#services" },
    { name: "Hire Us", url: "https://www.supportcall.co.za/services/hire-us" }
  ]
};

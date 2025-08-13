import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: 'WebSite' | 'Organization' | 'LocalBusiness' | 'Service' | 'FAQ' | 'BreadcrumbList';
  data: any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default StructuredData;

// Pre-built schemas for maximum SEO impact
export const organizationSchema = {
  name: "SupportCALL",
  alternateName: "SupportCALL ICT Services",
  description: "FREE ICT consultation and expert cybersecurity services for Enterprise, Corporate, SME, and home users across South Africa and Australia",
  url: "https://www.supportcall.co.za",
  logo: {
    "@type": "ImageObject",
    url: "https://www.supportcall.co.za/logo.png",
    width: 400,
    height: 400
  },
  telephone: ["+27-87-822-2380", "+61-4-7822-2380"],
  email: "info@supportcall.co.za",
  areaServed: ["ZA", "AU"],
  foundingDate: "2004",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "127",
    bestRating: "5"
  },
  priceRange: "Free Consultation Available"
};

export const websiteSchema = {
  url: "https://www.supportcall.co.za",
  name: "SupportCALL - Expert ICT Services",
  alternateName: "SupportCALL ICT",
  description: "FREE ICT consultation worth $500. Expert cybersecurity & IT support across South Africa and Australia.",
  publisher: organizationSchema,
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.supportcall.co.za/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const faqSchema = {
  mainEntity: [
    {
      "@type": "Question",
      name: "Is the ICT consultation really free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! We offer a completely FREE ICT consultation worth $500, including security assessment and emergency support plan."
      }
    },
    {
      "@type": "Question",
      name: "Do you provide 24/7 IT support?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SupportCALL provides 24/7 emergency IT support and monitoring services across South Africa and Australia."
      }
    },
    {
      "@type": "Question",
      name: "What areas do you serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We serve clients across South Africa (coordination center in Durban) and Australia (coordination center in Launceston) with national coverage."
      }
    }
  ]
};
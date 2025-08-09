import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export type PageMeta = {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  noindex?: boolean;
  structuredData?: any | any[];
};

// Ensure a meta tag exists or create it
function ensureMeta(name: string): HTMLMetaElement {
  let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  return tag;
}

function ensureCanonical(): HTMLLinkElement {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  return link;
}

export const usePageSEO = (meta: PageMeta) => {
  const location = useLocation();

  useEffect(() => {
    if (meta.title) document.title = meta.title;

    if (meta.description) {
      const desc = ensureMeta("description");
      desc.setAttribute("content", meta.description);
    }

    if (meta.keywords) {
      const kw = ensureMeta("keywords");
      kw.setAttribute("content", meta.keywords);
    }

    const canonical = ensureCanonical();
    canonical.setAttribute("href", meta.canonical || `${window.location.origin}${location.pathname}`);

    if (meta.noindex) {
      const robots = ensureMeta("robots");
      robots.setAttribute("content", "noindex, nofollow");
    }

    // Remove previously injected JSON-LD by this hook
    document.querySelectorAll('script[data-seo-ld="true"]').forEach((el) => el.remove());

    // Inject JSON-LD structured data if provided
    const jsonLds = Array.isArray(meta.structuredData) ? meta.structuredData : meta.structuredData ? [meta.structuredData] : [];
    jsonLds.forEach((data) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo-ld', 'true');
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    });
  }, [location.pathname, meta.title, meta.description, meta.keywords, meta.canonical, meta.noindex, JSON.stringify(meta.structuredData)]);
};

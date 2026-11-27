import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPageMetadata, SITE_URL } from "@/lib/siteMetadata";

function updateMeta(attribute: "name" | "property", name: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, name);
    document.head.appendChild(element);
  }
  element.content = content;
}

export default function PageMetadata() {
  const { pathname } = useLocation();

  useEffect(() => {
    const page = getPageMetadata(pathname);
    document.title = page.title;
    updateMeta("name", "description", page.description);
    updateMeta("name", "robots", page.robots);
    updateMeta("property", "og:title", page.title);
    updateMeta("property", "og:description", page.description);
    updateMeta("name", "twitter:title", page.title);
    updateMeta("name", "twitter:description", page.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let structuredData = document.head.querySelector<HTMLScriptElement>("script[data-page-structured-data]");

    if (page.canonical) {
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = page.canonical;
      updateMeta("property", "og:url", page.canonical);

      if (!structuredData) {
        structuredData = document.createElement("script");
        structuredData.type = "application/ld+json";
        structuredData.dataset.pageStructuredData = "true";
        document.head.appendChild(structuredData);
      }

      const pageType = pathname === "/game"
        ? "Game"
        : pathname.startsWith("/scenario-")
          ? "CreativeWork"
          : pathname === "/credits"
            ? "AboutPage"
            : "WebPage";

      structuredData.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": pageType,
        name: page.title,
        description: page.description,
        url: page.canonical,
        inLanguage: "en",
        author: { "@id": `${SITE_URL}/#eunice-rigo` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
      });
    } else {
      canonical?.remove();
      structuredData?.remove();
      document.head.querySelector('meta[property="og:url"]')?.remove();
    }
  }, [pathname]);

  return null;
}
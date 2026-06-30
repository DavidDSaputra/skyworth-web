import { absoluteUrl, siteConfig } from "./site-config";
import type { Product, Article } from "./types";
import { getTranslation } from "./data";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl("/skyworth-logo.svg"),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        areaServed: "Global",
      },
    ],
  };
}

export function generateProductSchema(product: Product) {
  const translation = getTranslation(product, "en");
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: translation.name,
    description: translation.shortDescription,
    image: [
      absoluteUrl(product.heroImage),
      absoluteUrl(product.thumbnail),
      ...product.gallery.map((item) => absoluteUrl(item.url))
    ],
    sku: product.sku,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/products/${product.slug}`),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };
}

export function generateArticleSchema(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/skyworth-logo.svg"),
      },
    },
  };
}

export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

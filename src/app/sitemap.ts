import type { MetadataRoute } from "next";
import { listProducts, caseStudies, articles } from "@/lib/data";
import { absoluteUrl } from "@/lib/site-config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await listProducts();
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/products"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/why-us"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/case-studies"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/news"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/id"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  return [
    ...staticRoutes,
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: product.featured ? 0.85 : 0.75,
      images: [product.heroImage, product.thumbnail],
    })),
    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/case-studies/${study.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(`/news/${article.slug}`),
      lastModified: new Date(article.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}

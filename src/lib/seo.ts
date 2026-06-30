import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "./site-config";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article" | "profile";
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = siteConfig.socialImage,
  keywords = siteConfig.keywords,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${title} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

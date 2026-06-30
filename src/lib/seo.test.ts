import { describe, expect, it } from "vitest";
import { buildPageMetadata } from "./seo";
import { absoluteUrl, siteConfig } from "./site-config";

describe("buildPageMetadata", () => {
  it("builds canonical and social metadata for a public page", () => {
    const metadata = buildPageMetadata({
      title: "Products",
      description: "Browse products.",
      path: "/products",
    });

    expect(metadata.alternates).toEqual({
      canonical: absoluteUrl("/products"),
    });
    expect(metadata.openGraph).toMatchObject({
      siteName: siteConfig.name,
      title: "Products",
      url: absoluteUrl("/products"),
    });
    expect(metadata.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Products",
    });
  });
});

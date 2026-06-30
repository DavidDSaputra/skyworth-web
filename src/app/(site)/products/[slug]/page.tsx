import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { getProductBySlug, getTranslation, listProducts } from "@/lib/data";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { generateProductSchema } from "@/lib/structured-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 300;

export async function generateStaticParams() {
  const products = await listProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  const translation = getTranslation(product, "en");

  return buildPageMetadata({
    title: translation.metaTitle,
    description: translation.metaDescription,
    path: `/products/${product.slug}`,
    image: product.heroImage,
  });
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const translation = getTranslation(product, "en");
  const productJsonLd = generateProductSchema(product);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}

import { ProductFilters } from "@/components/product-filters";
import { RFQForm } from "@/components/rfq-form";
import { Section } from "@/components/ui";
import { listProducts } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Products",
  description:
    "Browse solar products by category, product line, and certification, then request a B2B quote.",
  path: "/products",
});

export const revalidate = 300;

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <>
      <section className="bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Product Catalog
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-950 sm:text-5xl">
            Technical solar product catalog
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            Filter by main category, product line, and certification, open
            detail pages for specs, then submit RFQs with product context
            attached.
          </p>
        </div>
      </section>
      <Section title="Published products">
        <ProductFilters products={products} />
      </Section>
      <Section id="rfq" eyebrow="General RFQ" title="Request a quote">
        <div className="max-w-3xl rounded-md border border-slate-200 bg-white p-6">
          <RFQForm />
        </div>
      </Section>
    </>
  );
}

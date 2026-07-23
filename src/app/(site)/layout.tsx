import { Footer, Header } from "@/components/site-shell";
import { ScrollToTop } from "@/components/scroll-to-top";
import { SmoothScroll } from "@/components/smooth-scroll";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { getTranslation, listProducts } from "@/lib/data";

export const revalidate = 300;

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await listProducts();
  const productLinks = products.slice(0, 4).map((product) => ({
    href: `/products/${product.slug}`,
    label: getTranslation(product, "en").name,
  }));

  return (
    <>
      <SmoothScroll />
      <Header productLinks={productLinks} />
      <main id="main" className="pt-[108px]">
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </>
  );
}

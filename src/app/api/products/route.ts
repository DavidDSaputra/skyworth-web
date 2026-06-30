import { getTranslation, listProducts } from "@/lib/data";
import type { Locale } from "@/lib/types";

export async function GET(request: Request) {
  const products = await listProducts();
  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") ?? "en") as Locale;
  const featured = searchParams.get("featured");
  const category = searchParams.get("category");
  const productLine = searchParams.get("productLine");
  const cert = searchParams.get("cert");

  const filtered = products.filter((product) => {
    if (featured === "true" && !product.featured) return false;
    if (category && product.category !== category) return false;
    if (productLine && product.productLine !== productLine) return false;
    if (cert && !product.certifications.includes(cert)) return false;
    return true;
  });

  return Response.json({
    data: filtered.map((product) => ({
      ...product,
      translation: getTranslation(product, locale === "id" ? "id" : "en"),
    })),
    total: filtered.length,
  });
}

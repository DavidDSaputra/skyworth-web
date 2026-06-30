import { getProductBySlug, getTranslation } from "@/lib/data";
import type { Locale } from "@/lib/types";

export async function GET(
  request: Request,
  context: RouteContext<"/api/products/[slug]">,
) {
  const { slug } = await context.params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const locale = (searchParams.get("locale") ?? "en") as Locale;

  return Response.json({
    data: {
      ...product,
      translation: getTranslation(product, locale === "id" ? "id" : "en"),
    },
  });
}

import { revalidatePath } from "next/cache";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { createProduct, listProducts } from "@/lib/data";
import { productSchema } from "@/lib/validation";

export async function GET(request: Request) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const products = await listProducts();
  return Response.json({ data: products });
}

export async function POST(request: Request) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const input = productSchema.parse(payload);
    const product = await createProduct(input);
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    revalidatePath("/sitemap.xml");

    return Response.json({ data: product }, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to create product",
      },
      { status: 400 },
    );
  }
}

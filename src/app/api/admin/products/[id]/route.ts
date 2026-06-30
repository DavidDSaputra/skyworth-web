import { revalidatePath } from "next/cache";
import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { deleteProduct, getProductById, updateProduct } from "@/lib/data";
import { productSchema } from "@/lib/validation";

export async function GET(
  request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const product = await getProductById(id);

  if (!product) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json({ data: product });
}

export async function PUT(
  request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const payload = await request.json();
    const input = productSchema.parse(payload);
    const previous = await getProductById(id);
    const product = await updateProduct(id, input);
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath(`/products/${product.slug}`);
    if (previous?.slug && previous.slug !== product.slug) {
      revalidatePath(`/products/${previous.slug}`);
    }
    revalidatePath("/sitemap.xml");

    return Response.json({ data: product });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to update product",
      },
      { status: 400 },
    );
  }
}

export async function DELETE(
  request: Request,
  context: RouteContext<"/api/admin/products/[id]">,
) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const previous = await getProductById(id);
    await deleteProduct(id);
    revalidatePath("/");
    revalidatePath("/products");
    if (previous?.slug) {
      revalidatePath(`/products/${previous.slug}`);
    }
    revalidatePath("/sitemap.xml");

    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to delete product",
      },
      { status: 400 },
    );
  }
}

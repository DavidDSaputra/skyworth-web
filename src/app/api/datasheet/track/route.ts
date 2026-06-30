import { getDatasheetById } from "@/lib/data";
import { trackServerEvent } from "@/lib/integrations";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const clientId = searchParams.get("client_id") ?? undefined;

  if (!id) {
    return Response.json({ error: "Missing datasheet id" }, { status: 400 });
  }

  const record = await getDatasheetById(id);

  if (!record) {
    return Response.json({ error: "Datasheet not found" }, { status: 404 });
  }

  try {
    await trackServerEvent({
      name: "datasheet_download",
      clientId,
      params: {
        datasheet_id: record.datasheet.id,
        product_sku: record.product.sku,
        file_name: record.datasheet.filename,
      },
    });
  } catch (error) {
    console.error("[datasheet-analytics-error]", error);
  }

  return Response.redirect(record.datasheet.storageUrl, 302);
}

import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { storeAdminUpload } from "@/lib/admin-upload";

export async function POST(request: Request) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  const kind = formData?.get("kind");

  if (!(file instanceof File)) {
    return Response.json({ error: "Missing file" }, { status: 400 });
  }

  if (kind !== "image" && kind !== "datasheet") {
    return Response.json(
      { error: "Upload kind must be image or datasheet" },
      { status: 400 },
    );
  }

  try {
    const data = await storeAdminUpload(file, kind);
    return Response.json({ data }, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to upload file",
      },
      { status: 400 },
    );
  }
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({
    revalidated: true,
    note: "Wire revalidatePath/revalidateTag once CMS paths and cache tags are finalized.",
  });
}

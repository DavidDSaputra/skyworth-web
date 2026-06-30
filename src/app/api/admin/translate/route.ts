import { isAdminRequestAuthenticated } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { text?: string; sourceLanguageCode?: string; targetLanguageCode?: string }
    | null;

  if (!body?.text) {
    return Response.json({ error: "Missing text" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

  if (!apiKey) {
    return Response.json({
      data: {
        translatedText: `[draft ${body.targetLanguageCode ?? "en"}] ${body.text}`,
        provider: "development-stub",
      },
    });
  }

  return Response.json({
    error:
      "Google Cloud Translation v3 requires OAuth access tokens. Wire service account auth before enabling production calls.",
  }, { status: 501 });
}

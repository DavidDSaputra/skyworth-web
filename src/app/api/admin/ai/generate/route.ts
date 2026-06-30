import { isAdminRequestAuthenticated } from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { prompt?: string }
    | null;

  if (!body?.prompt) {
    return Response.json({ error: "Missing prompt" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return Response.json({
      data: {
        text: "Draft copy stub: high-efficiency PV module for B2B solar projects, emphasizing reliability, certification coverage, and procurement-ready documentation.",
        provider: "development-stub",
      },
    });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a technical marketing writer for a PV module manufacturer.",
        },
        { role: "user", content: body.prompt },
      ],
      temperature: 0.5,
    }),
  });

  if (!response.ok) {
    return Response.json({ error: "OpenAI request failed" }, { status: 502 });
  }

  const data = await response.json();
  return Response.json({
    data: {
      text: data.choices?.[0]?.message?.content ?? "",
      provider: "openai",
    },
  });
}

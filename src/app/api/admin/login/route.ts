import {
  createAdminSessionToken,
  getAdminCookieName,
  isAdminAuthConfigured,
  validateAdminPassword,
} from "@/lib/admin-auth";

function buildAdminCookie(value: string, maxAge: number) {
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `${getAdminCookieName()}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secureFlag}`;
}

export async function POST(request: Request) {
  if (!isAdminAuthConfigured()) {
    return Response.json(
      { error: "Admin authentication is not configured." },
      { status: 503 },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { password?: string }
    | null;

  if (!body?.password) {
    return Response.json({ error: "Password is required" }, { status: 400 });
  }

  if (!validateAdminPassword(body.password)) {
    return Response.json({ error: "Invalid password" }, { status: 401 });
  }

  const sessionToken = createAdminSessionToken();

  if (!sessionToken) {
    return Response.json(
      { error: "Admin authentication is not configured." },
      { status: 503 },
    );
  }

  const response = Response.json({ success: true });
  response.headers.append("Set-Cookie", buildAdminCookie(sessionToken, 43200));

  return response;
}

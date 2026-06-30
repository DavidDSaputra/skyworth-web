import { getAdminCookieName } from "@/lib/admin-auth";

export async function POST() {
  const response = Response.json({ success: true });
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  response.headers.append(
    "Set-Cookie",
    `${getAdminCookieName()}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secureFlag}`,
  );

  return response;
}

import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { listLeads, updateLeadStatus } from "@/lib/leads";
import { z } from "zod";

const leadStatusSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "contacted", "archived"]),
});

export async function GET(request: Request) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ data: await listLeads() });
}

export async function PATCH(request: Request) {
  if (!isAdminRequestAuthenticated(request)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const parsed = leadStatusSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 400 },
    );
  }

  try {
    const lead = await updateLeadStatus(parsed.data.id, parsed.data.status);
    return Response.json({ data: lead });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof Error ? error.message : "Unable to update lead status",
      },
      { status: 400 },
    );
  }
}

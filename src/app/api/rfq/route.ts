import { sendLeadEmail, trackServerEvent } from "@/lib/integrations";
import { saveLead } from "@/lib/leads";
import { leadSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid payload" },
      { status: 400 },
    );
  }

  if (parsed.data.website) {
    return Response.json({ error: "Spam detected" }, { status: 400 });
  }

  const lead = await saveLead(parsed.data);

  try {
    await sendLeadEmail(lead, lead.id);
  } catch (error) {
    console.error("[rfq-email-error]", error);
  }

  try {
    await trackServerEvent({
      name: lead.type === "rfq" ? "rfq_submitted" : "contact_submitted",
      clientId: lead.clientId,
      params: {
        product_sku: lead.productSku,
        project_type: lead.projectType,
        lead_email_domain: lead.email.split("@")[1],
      },
    });
  } catch (error) {
    console.error("[rfq-analytics-error]", error);
  }

  return Response.json({ leadId: lead.id, status: lead.status }, { status: 201 });
}

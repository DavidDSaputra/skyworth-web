import type { LeadPayload } from "./types";
import { defaultFromEmail, siteConfig } from "./site-config";

type AnalyticsEvent = {
  name: "rfq_submitted" | "contact_submitted" | "datasheet_download";
  clientId?: string;
  params: Record<string, string | number | undefined>;
};

export async function sendLeadEmail(lead: LeadPayload, leadId: string) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const salesEmail = process.env.SALES_EMAIL ?? siteConfig.contact.email;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL ?? defaultFromEmail();

  if (!apiKey) {
    console.info("[dev-email]", { leadId, salesEmail, lead });
    return { skipped: true };
  }

  const content = [
    `<p>Lead ID: ${leadId}</p>`,
    `<p>Type: ${lead.type}</p>`,
    `<p>Name: ${lead.name}</p>`,
    `<p>Company: ${lead.company}</p>`,
    `<p>Email: ${lead.email}</p>`,
    lead.phone ? `<p>Phone: ${lead.phone}</p>` : "",
    lead.productName ? `<p>Product: ${lead.productName}</p>` : "",
    lead.quantity ? `<p>Quantity: ${lead.quantity}</p>` : "",
    `<p>Message: ${lead.message}</p>`,
  ].join("");

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [
        {
          to: [{ email: salesEmail, name: "Sales Team" }],
          subject:
            lead.type === "rfq"
              ? "New RFQ from B2B PV Website"
              : "New contact lead from B2B PV Website",
        },
      ],
      from: { email: fromEmail, name: "Skyworth PV Website" },
      reply_to: { email: lead.email, name: lead.name },
      content: [{ type: "text/html", value: content }],
    }),
  });

  if (!response.ok) {
    throw new Error(`SendGrid failed with ${response.status}`);
  }

  return { skipped: false };
}

export async function trackServerEvent(event: AnalyticsEvent) {
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!measurementId || !apiSecret) {
    console.info("[dev-analytics]", event);
    return { skipped: true };
  }

  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: event.clientId ?? "555.1234567890",
        events: [{ name: event.name, params: event.params }],
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`GA4 Measurement Protocol failed with ${response.status}`);
  }

  return { skipped: false };
}

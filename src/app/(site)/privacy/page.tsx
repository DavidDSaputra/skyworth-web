import { Section } from "@/components/ui";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Skyworth PV handles contact details, RFQ submissions, analytics, and sales follow-up information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Section eyebrow="Legal" title="Privacy policy">
      <div className="max-w-3xl space-y-8 text-sm leading-7 text-slate-600">
        <p>
          {siteConfig.legalName} collects the information submitted through
          contact and RFQ forms so the sales team can respond to product,
          datasheet, pricing, availability, and project support requests.
        </p>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">
            Information we collect
          </h2>
          <p>
            Form submissions may include contact name, company, email, phone,
            requested product, quantity, project type, message content, and
            technical context attached to a datasheet or RFQ request.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">
            How we use it
          </h2>
          <p>
            We use submitted information to reply to inquiries, prepare sales
            follow-up, improve website conversion flows, and track aggregate
            events such as RFQ submissions or datasheet downloads.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">
            Contact
          </h2>
          <p>
            For privacy questions or data removal requests, contact{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="font-semibold text-brand-blue"
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </section>
      </div>
    </Section>
  );
}

import { Section } from "@/components/ui";
import { buildPageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";

export const metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Terms for using Skyworth PV website content, product information, datasheets, and inquiry forms.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terms of use">
      <div className="max-w-3xl space-y-8 text-sm leading-7 text-slate-600">
        <p>
          This website provides product information, datasheets, project
          examples, and inquiry tools for B2B solar procurement. By using the
          site, you agree to use the content for legitimate business evaluation
          and communication with {siteConfig.legalName}.
        </p>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">
            Product information
          </h2>
          <p>
            Product specifications, certifications, images, and datasheets are
            provided for evaluation and may change as product lines, regions,
            or documentation packs are updated.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">
            Inquiry submissions
          </h2>
          <p>
            RFQ and contact submissions do not create a binding purchase order.
            Pricing, availability, delivery windows, and final technical
            requirements must be confirmed directly with the sales team.
          </p>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-950">
            Contact
          </h2>
          <p>
            Questions about these terms can be sent to{" "}
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

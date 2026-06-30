import { AboutParallaxStory } from "@/components/about-parallax-story";
import { FaIcon } from "@/components/fa-icon";
import { Reveal } from "@/components/reveal";
import { icons } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Discover Skyworth PV's industrial scale, global solar capability, and technical-first execution model.",
  path: "/why-us",
  image: "/about-us.png",
});

const strengths = [
  {
    icon: icons.procurement,
    title: "Documentation-Ready Delivery",
    text: "Datasheets, certificates, gallery assets, translations, and structured product specs are prepared for fast B2B review and internal procurement workflows.",
  },
  {
    icon: icons.security,
    title: "Security-Minded Lead Capture",
    text: "Server-side validation, honeypot protection, and PII-aware workflows help keep consultation and RFQ submissions clean, trackable, and trustworthy.",
  },
  {
    icon: icons.award,
    title: "Certification-Focused Presentation",
    text: "IEC, TUV, CE, and UL cues are surfaced clearly so technical buyers can shortlist products faster and validate readiness with less friction.",
  },
  {
    icon: icons.conversion,
    title: "Conversion-Aware Sales Flow",
    text: "Product context, CTAs, and follow-up paths are shaped to move visitors from discovery into quote-ready conversations with fewer dead ends.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <AboutParallaxStory />

      <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1480px]">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">
              Why Teams Choose Skyworth
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4vw,4rem)] font-medium leading-[1.06] text-slate-950">
              Technical clarity, scalable supply, and a smoother solar buying
              path.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600">
              Beyond visual storytelling, the platform is structured to support
              B2B solar sales with stronger documentation, cleaner conversion
              flows, and a more reliable product evaluation experience.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {strengths.map((item, index) => (
              <Reveal key={item.title} delayMs={90 + index * 90} className="h-full">
                <article className="hover-sweep flex h-full flex-col rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_16px_50px_rgba(2,12,27,0.06)] transition sm:p-7">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue-soft text-brand-blue">
                    <FaIcon icon={item.icon} size={22} />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold leading-tight text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-[0.98rem]">
                    {item.text}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

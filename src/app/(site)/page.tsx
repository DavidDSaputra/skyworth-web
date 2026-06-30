import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Image from "next/image";
import Link from "next/link";
import { FaIcon } from "@/components/fa-icon";
import { articles, caseStudies, listProducts } from "@/lib/data";
import { AnimatedProductIntro } from "@/components/animated-product-intro";
import { ExpandableProductShowcase } from "@/components/expandable-product-showcase";
import { GlobalReachVideoShowcase } from "@/components/global-reach-video-showcase";
import { HeroBanner } from "@/components/hero-banner";
import { LatestStoriesSection } from "@/components/latest-stories-section";
import { Reveal } from "@/components/reveal";
import { SkyworthCloudSection } from "@/components/skyworth-cloud-section";
import { icons } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import { generateOrganizationSchema } from "@/lib/structured-data";

export const revalidate = 300;

export const metadata = buildPageMetadata({
  title: "Skyworth PV | B2B Solar Module Manufacturer",
  description:
    "Explore Skyworth PV modules, solar project support, datasheets, and RFQ workflows for B2B procurement teams.",
  path: "/",
  image: "/hero_banner.png",
  type: "website",
});

const processSteps = [
  {
    number: "01",
    title: "Technical Consultation",
    text: "Share project location, target capacity, grid requirements, and certification needs with our sales engineers.",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    href: "/contact",
    cta: "Book Now",
  },
  
  {
    number: "02",
    title: "Module and Supply Plan",
    text: "Receive a procurement-ready plan covering modules, datasheets, certificates, warranty, and delivery windows.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80",
    href: "/products",
    cta: "Explore",
  },
  {
    number: "03",
    title: "Project Support",
    text: "Coordinate batch documentation, datasheet downloads, and RFQ follow-up through one conversion-focused workflow.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
    href: "/case-studies",
    cta: "See Work",
  },
];

const companyHighlights = [
  {
    icon: icons.company,
    value: "2",
    lineOne: "Listed Company Skyworth Group (00751.HK)",
    lineTwo: "Skyworth Digital (000810.SZ)",
  },
  {
    icon: icons.highTech,
    value: "20+",
    lineOne: "National High-tech Enterprise (2023)",
    lineTwo: "Advanced solar and storage capability",
  },
  {
    icon: icons.people,
    value: "40000+",
    lineOne: "Global Professional Staff (2023)",
    lineTwo: "Engineering, supply, and service teams",
  },
  {
    icon: icons.revenue,
    value: "9.6",
    lineOne: "Revenue Billion USD (2023)",
    lineTwo: "Scalable manufacturing-backed growth",
  },
];

export default async function Home() {
  const products = await listProducts();
  const featured = products.filter((product) => product.featured);
  const organizationJsonLd = generateOrganizationSchema();
  

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <HeroBanner />

      <section className="relative overflow-hidden bg-white px-4 py-18 sm:px-6 sm:py-22 lg:px-8">
        <div className="absolute inset-y-0 left-0 w-[24%] bg-[radial-gradient(circle_at_left,rgba(16,211,255,0.18),transparent_64%)]" />
        <div className="absolute inset-y-0 right-0 w-[24%] bg-[radial-gradient(circle_at_right,rgba(16,211,255,0.14),transparent_64%)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(0,91,170,0.08),transparent_72%)]" />

        <Reveal className="relative mx-auto max-w-[1520px]">
          <div className="mx-auto max-w-[1280px] text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-blue/75 sm:text-sm">
              Skyworth At A Glance
            </p>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,4.85rem)] font-medium leading-[1.08] text-black">
              Empowering a{" "}
              <span className="bg-[linear-gradient(90deg,#005baa_0%,#16c7e8_100%)] bg-clip-text text-transparent">
                Sustainable Future
              </span>{" "}
              with End-to-End Solar &amp; Storage Solutions
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-[clamp(1rem,1.45vw,1.35rem)] font-normal leading-7 text-slate-500 sm:mt-8 sm:max-w-4xl sm:leading-8">
              Transforming Energy with Skyworth for a Greener, Better Life
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:mt-16 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4 xl:gap-8">
            {companyHighlights.map((item, index) => {
              return (
                <Reveal
                  key={item.value}
                  delayMs={80 + index * 90}
                  className="h-full"
                >
                  <article className="hover-sweep relative flex h-full flex-col items-start overflow-hidden rounded-[28px] border border-sky-100/80 bg-white/88 px-5 py-6 text-left shadow-[0_18px_60px_rgba(0,91,170,0.08)] backdrop-blur-sm transition sm:px-7 sm:py-8 xl:rounded-[34px] xl:px-8">
                    <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(22,199,232,0.45),transparent)]" />
                    <div className="absolute -right-10 top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(22,199,232,0.16),transparent_70%)] blur-2xl spotlight-breathe" />
                    <div className="absolute -left-12 bottom-0 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(0,91,170,0.12),transparent_72%)] blur-2xl" />

                    <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
                      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(22,199,232,0.22),rgba(22,199,232,0.04)_58%,transparent_74%)] blur-[1px] spotlight-breathe" />
                      <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-cyan-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(234,248,255,0.98))] shadow-[0_16px_34px_rgba(22,199,232,0.14)] sm:h-18 sm:w-18">
                        <FaIcon
                          icon={item.icon}
                          size={28}
                          className="text-sky-500"
                        />
                      </div>
                    </div>

                    <p className="mt-5 text-[clamp(2.35rem,3.4vw,4rem)] font-medium leading-none tracking-[-0.04em] text-black number-float sm:mt-6">
                      {item.value}
                    </p>

                    <div className="mt-4 max-w-full space-y-2 text-[0.98rem] leading-7 text-slate-500 sm:max-w-[26ch] sm:text-[1rem] sm:leading-8 xl:max-w-[24ch]">
                      <p className="break-words font-medium text-slate-600">
                        {item.lineOne}
                      </p>
                      <p className="break-words text-slate-400">
                        {item.lineTwo}
                      </p>
                    </div>

                    <div className="mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(0,91,170,0.14),rgba(22,199,232,0.22),transparent)]" />
                  </article>
                </Reveal>
              );
            })}
          </div>
        </Reveal>
      </section>

      <GlobalReachVideoShowcase />

      <AnimatedProductIntro />

      <SkyworthCloudSection />

      <ExpandableProductShowcase products={featured.slice(0, 2)} />

      <section className="bg-black px-4 py-20 text-white sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
                Our Process
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">
                Transform projects in three steps
              </h2>
              <p className="mt-5 text-base leading-7 text-white/65">
                Move from product research to quote-ready documentation with a
                direct workflow for B2B solar procurement.
              </p>
            </div>
            <div className="grid gap-4">
              {processSteps.map((step) => (
                <article
                  key={step.number}
                  className="hover-sweep group grid gap-5 border border-white/15 bg-white p-4 text-black transition hover:shadow-2xl md:grid-cols-[120px_1fr_210px]"
                >
                  <div className="text-4xl font-light text-brand-blue">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {step.text}
                    </p>
                    <Link
                      href={step.href}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-black transition hover:text-brand-blue"
                    >
                      {step.cta} <FaIcon icon={icons.arrowRight} size={16} />
                    </Link>
                  </div>
                  <div className="relative min-h-40 overflow-hidden">
                    <Image
                      src={step.image}
                      alt=""
                      fill
                      sizes="210px"
                      className="object-cover transition duration-700 group-hover:scale-110"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="relative min-h-[520px] overflow-hidden bg-slate-100">
            <Image
              src="https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1400&q=80"
              alt="PV module field"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <button
              type="button"
              aria-label="Play project video"
              className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-2xl transition hover:scale-105 hover:bg-brand-blue hover:text-white"
            >
              <FaIcon icon={icons.play} size={30} />
            </button>
          </div>
          <div className="grid content-center gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
                Innovative solutions
              </p>
              <h2 className="mt-4 text-4xl font-medium leading-tight text-black sm:text-5xl">
                Reliable modules for commercial solar growth.
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                Skyworth supports EPCs and distributors with high-efficiency PV
                modules, clear documentation, and technical sales workflows.
              </p>
            </div>
            <div className="grid gap-3">
              {[
                [icons.solar, "Solar Energy Integration"],
                [icons.battery, "Storage-ready Project Planning"],
                [icons.specs, "High-performance Module Specs"],
                [icons.security, "Certification and Warranty Packs"],
              ].map(([icon, label]) => (
                <div
                  key={label as string}
                  className="hover-sweep flex items-center justify-between border-b border-slate-200 py-4"
                >
                  <span className="flex items-center gap-3 text-lg font-semibold text-black">
                    <FaIcon
                      icon={icon as IconDefinition}
                      className="text-brand-blue"
                      size={22}
                    />
                    {label as string}
                  </span>
                  <FaIcon icon={icons.arrowRight} size={18} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <LatestStoriesSection
        featuredStudy={caseStudies[0]}
        sideStories={[articles[0], articles[1], caseStudies[1]].map((item) =>
          "publishedAt" in item
            ? item
            : {
                id: item.id,
                type: "case-study",
                title: item.title,
                slug: item.slug,
                publishedAt: "2026-06-02",
                excerpt: item.summary,
              },
        )}
      />

      <section className="relative isolate overflow-hidden bg-black px-4 py-24 text-white sm:px-6 lg:px-8">
        <Image
          src="https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1800&q=80"
          alt="Clean energy infrastructure"
          fill
          sizes="100vw"
          className="-z-20 object-cover opacity-35"
        />
        <div className="absolute inset-0 -z-10 bg-black/55" />
        <Reveal className="mx-auto max-w-7xl">
          <h2 className="max-w-4xl text-5xl font-light leading-tight">
            Join the movement toward smarter solar procurement.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/75">
            Share your project requirements and get module recommendations,
            datasheets, and quotation support from the sales team.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center gap-3 bg-white px-6 font-semibold text-black transition hover:bg-brand-blue hover:text-white"
            >
              Get Started <FaIcon icon={icons.arrowRight} size={20} />
            </Link>
            <Link
              href="/why-us"
              className="inline-flex min-h-14 items-center gap-3 border border-white/40 px-6 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Learn More <FaIcon icon={icons.arrowRight} size={20} />
            </Link>
          </div>
          <div className="mt-10 grid max-w-2xl gap-3 text-sm text-white/75 sm:grid-cols-3">
            {["Datasheet tracking", "RFQ notification", "CMS-ready content"].map(
              (item) => (
                <p key={item} className="flex items-center gap-2">
                  <FaIcon icon={icons.check} size={16} /> {item}
                </p>
              ),
            )}
          </div>
        </Reveal>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-blue">
            Latest updates
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {articles.map((article) => (
              <Link
                key={article.id}
                href="/news"
                className="hover-sweep group border border-slate-200 bg-white p-6 transition hover:shadow-xl"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  {article.type} · {article.publishedAt}
                </p>
                <h3 className="mt-4 text-2xl font-semibold leading-tight text-black group-hover:text-brand-blue">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {article.excerpt}
                </p>
              </Link>
            ))}
            <Link
              href="/contact"
              className="hover-sweep grid content-between bg-brand-blue p-6 text-white transition hover:bg-black"
            >
              <FaIcon icon={icons.consultation} size={28} />
              <div>
                <h3 className="text-2xl font-semibold">Need pricing?</h3>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Send a quick RFQ and attach product context automatically.
                </p>
              </div>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

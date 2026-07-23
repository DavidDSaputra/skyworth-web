import Image from "next/image";
import Link from "next/link";
import { FaIcon } from "@/components/fa-icon";
import { Reveal } from "@/components/reveal";
import { formatBytes, getTranslation } from "@/lib/product-helpers";
import { icons } from "@/lib/icons";
import type { Locale, Product } from "@/lib/types";
import { Badge } from "./ui";
import { RFQForm } from "./rfq-form";

function buildProductMedia(product: Product) {
  const images = [
    {
      url: product.heroImage,
      caption: "Primary product view",
    },
    ...product.gallery,
    {
      url: product.thumbnail,
      caption: "Additional product preview",
    },
  ];

  return Array.from(new Map(images.map((item) => [item.url, item])).values());
}

function Spec({
  label,
  value,
  tone = "light",
}: {
  label: string;
  value: string | number;
  tone?: "light" | "warm";
}) {
  return (
    <div
      className={`grid gap-2 border-b pb-4 last:border-b-0 last:pb-0 ${
        tone === "warm" ? "border-black/10" : "border-slate-200"
      }`}
    >
      <dt
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          tone === "warm" ? "text-slate-500" : "text-slate-400"
        }`}
      >
        {label}
      </dt>
      <dd className="text-base font-semibold text-slate-950">{value}</dd>
    </div>
  );
}

export function ProductDetail({
  product,
  locale = "en",
}: {
  product: Product;
  locale?: Locale;
}) {
  const translation = getTranslation(product, locale);
  const media = buildProductMedia(product);
  const highlights = product.features.length
    ? product.features.slice(0, 4)
    : [
        `Up to ${product.powerW}W output`,
        `${product.efficiency}% module efficiency`,
        product.cells,
        product.warranty,
      ];
  const primaryDatasheet = product.datasheets[0];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden px-4 pb-18 pt-8 sm:px-6 lg:px-8 lg:pb-24 lg:pt-10">
        <div className="absolute inset-x-0 top-0 h-[540px] bg-[linear-gradient(180deg,#f5f1e8_0%,#fbfaf7_50%,#ffffff_100%)]" />
        <div className="absolute left-0 top-16 h-64 w-64 bg-[radial-gradient(circle,rgba(0,91,170,0.08),transparent_72%)] blur-3xl" />
        <div className="absolute right-0 top-24 h-64 w-64 bg-[radial-gradient(circle,rgba(46,125,76,0.08),transparent_72%)] blur-3xl" />

        <div className="relative mx-auto max-w-[1420px]">
          <Reveal className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
            <div className="lg:pt-10">
              <div className="flex flex-wrap items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <Link href="/" className="transition hover:text-brand-blue">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href="/products"
                  className="transition hover:text-brand-blue"
                >
                  Product
                </Link>
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.24em] text-brand-blue">
                {product.category}
              </p>
              <p className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                {product.productLine}
              </p>
              <h1 className="mt-5 max-w-[13ch] text-[clamp(2.4rem,4.8vw,4.3rem)] font-medium leading-[1] tracking-[-0.05em] text-slate-950">
                {translation.name}
              </h1>
              <p className="mt-5 max-w-[58ch] text-[0.95rem] leading-7 text-slate-600">
                {translation.shortDescription}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="border-b border-black/12 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Maximum power
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-slate-950">
                    {product.powerW}W
                  </p>
                </div>
                <div className="border-b border-black/12 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Efficiency
                  </p>
                  <p className="mt-3 text-[1.55rem] font-semibold text-slate-950">
                    {product.efficiency}%
                  </p>
                </div>
                <div className="border-b border-black/12 pb-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Warranty
                  </p>
                  <p className="mt-3 text-base font-semibold leading-7 text-slate-950">
                    {product.warranty}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#rfq"
                  className="inline-flex min-h-13 items-center gap-3 bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-brand-blue"
                >
                  Request Quote <FaIcon icon={icons.arrowRight} size={16} />
                </Link>
                {primaryDatasheet ? (
                  <a
                    href={`/api/datasheet/track?id=${primaryDatasheet.id}`}
                    className="inline-flex min-h-13 items-center gap-3 border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-950 transition hover:border-slate-950 hover:bg-slate-50"
                  >
                    Download Datasheet{" "}
                    <FaIcon icon={icons.download} size={16} />
                  </a>
                ) : null}
              </div>

              <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
                <FaIcon icon={icons.certification} size={14} />
                Technical pack and certification set available on request
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {product.certifications.map((cert) => (
                  <Badge key={cert}>{cert}</Badge>
                ))}
              </div>

              <div className="mt-10 rounded-[1.5rem] border border-black/8 bg-white/82 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] backdrop-blur">
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-blue text-white">
                    <FaIcon icon={icons.quote} size={16} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                      Quick summary
                    </p>
                    <div className="mt-4 grid gap-3">
                      {highlights.map((item) => (
                        <p
                          key={item}
                          className="text-sm font-medium leading-7 text-slate-700"
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-5 lg:gap-6">
              {media.slice(0, 3).map((image, index) => (
                <Reveal key={image.url} delayMs={120 + index * 90}>
                  <div className="group relative overflow-hidden rounded-[2rem] border border-black/8 bg-[#f7f3eb] p-5 shadow-[0_28px_80px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_34px_90px_rgba(15,23,42,0.12)] sm:p-7">
                    <div className="absolute right-4 top-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="absolute left-0 top-0 h-40 w-40 bg-[radial-gradient(circle,rgba(0,91,170,0.08),transparent_72%)] blur-3xl" />
                    <div className="relative aspect-[1.25/1] overflow-hidden rounded-[1.5rem] bg-white">
                      <Image
                        src={image.url}
                        alt={image.caption}
                        fill
                        priority={index === 0}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="object-cover transition duration-700 group-hover:scale-104"
                      />
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">
                      {image.caption}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1420px] gap-10 lg:grid-cols-[0.92fr_0.42fr] lg:gap-14">
          <Reveal className="grid gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">
                About the module details
              </p>
              <h2 className="mt-4 max-w-[13ch] text-[clamp(2rem,3.2vw,3.2rem)] font-medium leading-[1.06] tracking-[-0.04em] text-slate-950">
                Built for clean output and easier project decisions.
              </h2>
            </div>

            <div className="grid gap-8 text-[0.95rem] leading-7 text-slate-600 lg:grid-cols-2">
              <div className="space-y-6">
                <p>{translation.description}</p>
                <p>
                  Designed for B2B procurement workflows, this model combines
                  stable electrical performance with clearer product grouping,
                  feature communication, and documentation support for EPC
                  review.
                </p>
              </div>
              <div className="space-y-6">
                <ul className="grid gap-4">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span className="mt-2 text-brand-blue">
                        <FaIcon icon={icons.check} size={14} />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <p>
                  Product features are kept separate from the long description,
                  so buyers can scan key advantages quickly before moving into
                  the full technical details below.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delayMs={120} className="lg:pt-16">
            <div className="rounded-[2rem] bg-[#f5f1e8] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Product facts
              </p>
              <dl className="mt-6 grid gap-5">
                <Spec label="SKU" value={product.sku} tone="warm" />
                <Spec
                  label={product.category === "PV Module" ? "Cells" : "Configuration"}
                  value={product.cells}
                  tone="warm"
                />
                <Spec
                  label="Datasheet size"
                  value={
                    primaryDatasheet
                      ? formatBytes(primaryDatasheet.fileSize)
                      : "Available on request"
                  }
                  tone="warm"
                />
                <Spec
                  label="Certifications"
                  value={product.certifications.join(", ")}
                  tone="warm"
                />
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1420px]">
          <Reveal className="overflow-hidden rounded-[2.2rem] bg-[#f8fafc] p-6 shadow-[0_24px_70px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-blue">
                  Technical specifications
                </p>
                <h2 className="mt-4 max-w-[12ch] text-[clamp(1.95rem,3vw,3rem)] font-medium leading-[1.06] tracking-[-0.04em] text-slate-950">
                  A concise engineering snapshot.
                </h2>
                <p className="mt-5 max-w-[36ch] text-[0.95rem] leading-7 text-slate-600">
                  The table keeps the structure clean while surfacing the
                  electrical, dimensional, and installation-related data that
                  procurement teams need first.
                </p>
              </div>

              <dl className="grid overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white sm:grid-cols-2">
                {Object.entries(product.specs).map(([label, value], index) => (
                  <div
                    key={label}
                    className={`grid gap-2 border-b border-slate-200 p-5 ${
                      index % 2 === 0 ? "sm:border-r" : ""
                    } ${index >= Object.entries(product.specs).length - 2 ? "sm:border-b-0" : ""}`}
                  >
                    <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {label}
                    </dt>
                    <dd className="text-base font-semibold text-slate-950">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="px-4 py-18 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-[1420px] gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal className="grid gap-5">
            <div className="overflow-hidden rounded-[2rem] bg-[#f5f1e8] p-5 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-7">
              <div className="relative aspect-[1.05/1] overflow-hidden rounded-[1.5rem] bg-white">
                <Image
                  src={media[0]?.url ?? product.heroImage}
                  alt={media[0]?.caption ?? translation.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5">
            {media.slice(1, 3).map((image, index) => (
              <Reveal key={image.url} delayMs={100 + index * 90}>
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.06)] sm:p-6">
                  <div className="relative aspect-[1.35/1] overflow-hidden rounded-[1.3rem] bg-slate-100">
                    <Image
                      src={image.url}
                      alt={image.caption}
                      fill
                      sizes="(min-width: 1024px) 40vw, 100vw"
                      className="object-cover transition duration-700 hover:scale-105"
                    />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {image.caption}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section
        id="rfq"
        className="relative overflow-hidden px-4 pb-20 pt-18 sm:px-6 lg:px-8 lg:pb-24 lg:pt-24"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0f172a_0%,#050816_100%)]" />
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 bg-[radial-gradient(circle,rgba(22,199,232,0.18),transparent_70%)] blur-3xl" />

        <div className="relative mx-auto grid max-w-[1420px] gap-8 lg:grid-cols-[0.72fr_0.82fr] lg:gap-14">
          <Reveal className="text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">
              Request pricing and availability
            </p>
            <h2 className="mt-4 max-w-[12ch] text-[clamp(2.1rem,3.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              Turn product interest into a quote-ready conversation.
            </h2>
            <p className="mt-6 max-w-[46ch] text-[0.95rem] leading-7 text-white/72">
              Share target volume, project type, delivery expectations, and
              certification requirements. We will follow up with the relevant
              datasheet pack and a tailored RFQ response.
            </p>
            <div className="mt-8 grid gap-3 text-sm text-white/74">
              <p className="flex items-center gap-3">
                <FaIcon icon={icons.check} size={14} />
                Fast response for EPC, distributor, and commercial rooftop
                teams
              </p>
              <p className="flex items-center gap-3">
                <FaIcon icon={icons.check} size={14} />
                Datasheet and certification context included automatically
              </p>
              <p className="flex items-center gap-3">
                <FaIcon icon={icons.check} size={14} />
                Built for technical-first B2B procurement workflows
              </p>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <div className="rounded-[2rem] bg-white p-6 shadow-[0_26px_90px_rgba(0,0,0,0.18)] sm:p-8">
              <RFQForm
                product={{
                  id: product.id,
                  name: translation.name,
                  sku: product.sku,
                }}
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

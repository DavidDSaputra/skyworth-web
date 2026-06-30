import Image from "next/image";
import { FaIcon } from "@/components/fa-icon";
import { Section } from "@/components/ui";
import { caseStudies } from "@/lib/data";
import { icons } from "@/lib/icons";
import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Case Studies",
  description: "PV project references with geo coordinates and module context.",
  path: "/case-studies",
});

export default function CaseStudiesPage() {
  return (
    <Section eyebrow="Projects" title="Case studies and project gallery">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-5 md:grid-cols-2">
          {caseStudies.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-md border border-slate-200 bg-white"
            >
              <div className="relative aspect-[16/10]">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  <FaIcon icon={icons.location} size={16} />
                  {item.location}
                </p>
                <h2 className="mt-3 text-xl font-semibold text-slate-950">
                  {item.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.summary}
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-800">
                  {item.projectSize} · {item.productSku}
                </p>
              </div>
            </article>
          ))}
        </div>
        <aside className="h-fit rounded-md border border-slate-200 bg-white p-5">
          <h2 className="text-xl font-semibold text-slate-950">Map data</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Google Maps or Mapbox can consume these stored coordinates from the
            CMS after geocoding in admin.
          </p>
          <div className="mt-4 grid gap-3">
            {caseStudies.map((item) => (
              <div key={item.id} className="rounded-md bg-slate-50 p-3 text-sm">
                <p className="font-semibold text-slate-950">{item.title}</p>
                <p className="text-slate-600">
                  {item.lat}, {item.lng}
                </p>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </Section>
  );
}

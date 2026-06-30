"use client";

import { usePathname } from "next/navigation";

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  "/admin": {
    title: "Overview",
    subtitle: "Snapshot of products, leads, media, and locale workflow",
  },
  "/admin/products": {
    title: "Products",
    subtitle: "Manage catalog records, specs, images, and datasheets",
  },
  "/admin/media": {
    title: "Media",
    subtitle: "Track upload channels, formats, and storage behavior",
  },
  "/admin/leads": {
    title: "Leads",
    subtitle: "Review inbound RFQ requests and follow-up queue",
  },
  "/admin/locales": {
    title: "Locales",
    subtitle: "Maintain bilingual product copy and SEO metadata",
  },
};

export function AdminTopbar() {
  const pathname = usePathname();
  const meta = pageMeta[pathname] ?? pageMeta["/admin"];

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
        Admin Panel
      </p>
      <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
        {meta.title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{meta.subtitle}</p>
    </div>
  );
}

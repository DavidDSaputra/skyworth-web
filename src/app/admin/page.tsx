import Link from "next/link";
import type { Metadata } from "next";
import { FaIcon } from "@/components/fa-icon";
import { listProducts } from "@/lib/data";
import { icons } from "@/lib/icons";
import { listLeads } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Admin Overview",
  description: "Overview dashboard for products, media, leads, and locales.",
};

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const leads = await listLeads();
  const products = await listProducts();
  const featuredProducts = products.filter((product) => product.featured).length;
  const recentLeads = [...leads]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);
  const storageProvider = process.env.CLOUDINARY_CLOUD_NAME
    ? "Cloudinary configured"
    : "Local storage active";
  const cards = [
    {
      label: "Total products",
      value: products.length,
      helper: `${featuredProducts} featured products`,
      icon: icons.adminProducts,
    },
    {
      label: "Lead inbox",
      value: leads.length,
      helper: leads.length ? "Needs follow-up" : "Inbox currently empty",
      icon: icons.adminLeads,
    },
    {
      label: "Media pipeline",
      value: storageProvider,
      helper: "Admin uploads and datasheets",
      icon: icons.adminUploads,
    },
    {
      label: "Locales",
      value: "ID / EN",
      helper: "Bilingual product content",
      icon: icons.adminLocales,
    },
  ];
  const modules = [
    {
      href: "/admin/products",
      label: "Products",
      description: "Kelola data produk dan asset utamanya.",
      cta: "Open",
      icon: icons.adminProducts,
    },
    {
      href: "/admin/media",
      label: "Media",
      description: "Cek format upload dan aturan file.",
      cta: "Open",
      icon: icons.adminUploads,
    },
    {
      href: "/admin/leads",
      label: "Leads",
      description: "Pantau RFQ dan inquiry terbaru.",
      cta: "Open",
      icon: icons.adminLeads,
    },
    {
      href: "/admin/locales",
      label: "Locales",
      description: "Atur konten bilingual ID dan EN.",
      cta: "Open",
      icon: icons.adminLocales,
    },
  ];

  return (
    <div className="mx-auto max-w-[1400px] space-y-5">
      <section className="rounded-2xl border border-slate-200 bg-white px-5 py-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Admin overview
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
              Ringkas, fokus, dan siap dipakai.
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Halaman ini sekarang dipakai sebagai pintu masuk cepat ke modul
              CRUD tanpa hero besar dan elemen yang terlalu ramai.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Fokus utama: CRUD produk, media, leads, dan locale.
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-4">
        {cards.map((card) => (
          <article
            key={card.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
                <FaIcon icon={card.icon} size={18} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {card.value}
            </p>
            <p className="mt-2 text-sm text-slate-500">{card.helper}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[1fr_0.92fr]">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-950">Quick actions</h2>
            <span className="text-sm text-slate-500">Pilih modul</span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {modules.map((module) => (
              <Link
                key={module.href}
                href={module.href}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-blue hover:bg-white"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-slate-950">
                      {module.label}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {module.description}
                    </p>
                  </div>
                  <span className="mt-1 text-brand-blue">
                    <FaIcon icon={module.icon} size={16} />
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-brand-blue">
                  {module.cta}
                </p>
              </Link>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold text-slate-950">Recent leads</h2>
            <span className="text-sm text-slate-500">{leads.length} total</span>
          </div>
          <div className="mt-4 grid gap-3">
            {recentLeads.length ? (
              recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-slate-950">{lead.company}</p>
                    <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      {lead.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{lead.name}</p>
                  <p className="mt-2 text-xs text-slate-500">
                    {new Date(lead.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-sm text-slate-500">
                Belum ada lead masuk.
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">Storage</p>
          <p className="mt-2 text-base font-semibold text-slate-950">
            {storageProvider}
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">Locales</p>
          <p className="mt-2 text-base font-semibold text-slate-950">
            Indonesian and English
          </p>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">Featured products</p>
          <p className="mt-2 text-base font-semibold text-slate-950">
            {featuredProducts} produk tampil di homepage
          </p>
        </article>
      </section>
    </div>
  );
}

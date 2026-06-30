import type { Metadata } from "next";
import Link from "next/link";
import { listProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Locales",
  description: "Track bilingual product content structure and locale workflow.",
};

export const dynamic = "force-dynamic";

export default async function AdminLocalesPage() {
  const products = await listProducts();
  const translationCount = products.reduce(
    (count, product) => count + product.translations.length,
    0,
  );
  const localeRows = products.map((product) => {
    const en = product.translations.find((item) => item.locale === "en");
    const id = product.translations.find((item) => item.locale === "id");
    const missingFields = [
      ["EN name", en?.name],
      ["EN summary", en?.shortDescription],
      ["EN description", en?.description],
      ["EN meta title", en?.metaTitle],
      ["EN meta description", en?.metaDescription],
      ["ID name", id?.name],
      ["ID summary", id?.shortDescription],
      ["ID description", id?.description],
      ["ID meta title", id?.metaTitle],
      ["ID meta description", id?.metaDescription],
    ]
      .filter(([, value]) => !String(value ?? "").trim())
      .map(([label]) => label);

    return {
      product,
      en,
      id,
      missingFields,
    };
  });
  const completeProducts = localeRows.filter(
    (row) => row.missingFields.length === 0,
  ).length;

  return (
    <div className="mx-auto max-w-[1280px] grid gap-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Locale workflow
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Bilingual product content
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Ringkasan struktur konten bilingual yang dipakai di product form.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Metric label="Products" value={String(products.length)} />
            <Metric label="Translations" value={String(translationCount)} />
            <Metric label="Complete" value={String(completeProducts)} />
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Panel
          title="Current locales"
          items={[
            "English for global catalog presentation",
            "Indonesian for local market content",
            "Both locales are editable inside the product CRUD form",
          ]}
        />
        <Panel
          title="Translated fields"
          items={[
            "Product name",
            "Short description",
            "Long description",
            "Meta title",
            "Meta description",
          ]}
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
          Operational note
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          Locale management still lives inside product editing.
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          This page acts as a clearer admin destination for translation
          operations. If you want, the next step can be a dedicated translation
          editor table so language work is fully separated from product CRUD.
        </p>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
              Translation status
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Product locale checklist
            </h2>
          </div>
          <Link
            href="/admin/products"
            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue"
          >
            Edit product content
          </Link>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-slate-200 text-xs uppercase tracking-[0.16em] text-slate-400">
              <tr>
                <th className="py-3 pr-4 font-semibold">Product</th>
                <th className="px-4 py-3 font-semibold">English</th>
                <th className="px-4 py-3 font-semibold">Indonesian</th>
                <th className="px-4 py-3 font-semibold">Missing</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {localeRows.map((row) => (
                <tr key={row.product.id}>
                  <td className="py-4 pr-4">
                    <p className="font-semibold text-slate-950">
                      {row.en?.name ?? row.product.slug}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {row.product.sku} / {row.product.slug}
                    </p>
                  </td>
                  <td className="px-4 py-4">
                    <LocalePill complete={Boolean(row.en)}>
                      {row.en ? "Ready" : "Missing"}
                    </LocalePill>
                  </td>
                  <td className="px-4 py-4">
                    <LocalePill complete={Boolean(row.id)}>
                      {row.id ? "Ready" : "Missing"}
                    </LocalePill>
                  </td>
                  <td className="px-4 py-4 text-slate-600">
                    {row.missingFields.length
                      ? row.missingFields.join(", ")
                      : "Complete"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function Panel({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-xl font-semibold tracking-[-0.03em] text-slate-950">
        {title}
      </h2>
      <ul className="mt-5 grid gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
          >
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}

function LocalePill({
  complete,
  children,
}: {
  complete: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] ${
        complete
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      {children}
    </span>
  );
}

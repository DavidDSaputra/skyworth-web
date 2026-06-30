import type { Metadata } from "next";
import { ProductCrudManager } from "@/components/product-crud-manager";
import { listProducts } from "@/lib/data";

export const metadata: Metadata = {
  title: "Admin Products",
  description: "Manage product catalog entries, specs, media, and datasheets.",
};

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await listProducts();
  const categories = new Set(products.map((product) => product.category));

  return (
    <div className="mx-auto max-w-[1600px] space-y-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Product CRUD
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Catalog manager
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Semua fungsi utama CRUD produk ada di bawah ini.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <SummaryBadge label="Products" value={String(products.length)} />
            <SummaryBadge
              label="Categories"
              value={String(categories.size)}
            />
          </div>
        </div>

      </section>

      <ProductCrudManager initialProducts={products} />
    </div>
  );
}

function SummaryBadge({
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

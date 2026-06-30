import Image from "next/image";
import Link from "next/link";
import { getTranslation } from "@/lib/product-helpers";
import type { Locale, Product } from "@/lib/types";
import { Badge } from "./ui";

export function ProductCard({
  product,
  locale = "en",
}: {
  product: Product;
  locale?: Locale;
}) {
  const translation = getTranslation(product, locale);

  return (
    <article className="grid overflow-hidden rounded-md border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="relative aspect-[4/3]">
        <Image
          src={product.thumbnail}
          alt={translation.name}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </Link>
      <div className="grid gap-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            {product.category} / {product.productLine}
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-950">
            <Link href={`/products/${product.slug}`}>{translation.name}</Link>
          </h3>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
            {product.sku}
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {translation.shortDescription}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-slate-500">Power</dt>
            <dd className="font-semibold text-slate-950">{product.powerW} W</dd>
          </div>
          <div>
            <dt className="text-slate-500">Efficiency</dt>
            <dd className="font-semibold text-slate-950">
              {product.efficiency}%
            </dd>
          </div>
        </dl>
        <ul className="grid gap-2 text-sm text-slate-600">
          {product.features.slice(0, 2).map((feature) => (
            <li key={feature} className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-blue" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {product.certifications.slice(0, 3).map((cert) => (
            <Badge key={cert}>{cert}</Badge>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="rounded-md border border-slate-300 px-3 py-2 text-center text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            View
          </Link>
          <Link
            href={`/products/${product.slug}#rfq`}
            className="rounded-md bg-brand-blue px-3 py-2 text-center text-sm font-semibold text-white hover:bg-brand-blue-dark"
          >
            Request Quote
          </Link>
        </div>
      </div>
    </article>
  );
}

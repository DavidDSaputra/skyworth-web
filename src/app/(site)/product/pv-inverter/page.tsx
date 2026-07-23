import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { listProducts, getTranslation } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faHeart, faMicrochip } from "@fortawesome/free-solid-svg-icons";
import type { Product } from "@/lib/types";

export const metadata: Metadata = {
  title: "PV Inverters",
  description: "Explore our collection of high-efficiency PV Inverters.",
};

export const revalidate = 300;

export default async function PvInverterPage() {
  const products = await listProducts();
  const inverters = products.filter((p) =>
    p.category.toLowerCase().includes("inverter")
  );

  const featuredInverter = inverters.find((p) => p.featured) || inverters[0];
  const otherInverters = inverters.filter((p) => p.id !== featuredInverter?.id);

  return (
    <main className="min-h-screen bg-slate-50/50 py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            PV Inverters
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            High-efficiency solar inverters designed for reliability and maximum yield.
          </p>
        </div>

        {inverters.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
            <FontAwesomeIcon icon={faMicrochip} className="mb-4 h-8 w-8 text-slate-400" />
            <p className="text-slate-500">
              Belum ada data inverter. Silakan tambahkan dari menu Admin &gt; Products dengan Kategori &quot;PV Inverter&quot;.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Featured Inverter (Left / Large) */}
            {featuredInverter && (
              <div className="lg:col-span-7 xl:col-span-8">
                <InverterLargeCard product={featuredInverter} />
              </div>
            )}

            {/* Other Inverters (Right / Stacked) */}
            <div className="grid gap-6 lg:col-span-5 xl:col-span-4 lg:grid-rows-2">
              {otherInverters.slice(0, 2).map((product) => (
                <InverterSmallCard key={product.id} product={product} />
              ))}
            </div>

            {/* Remaining Inverters if any (Below) */}
            {otherInverters.length > 2 && (
              <div className="lg:col-span-12 mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherInverters.slice(2).map((product) => (
                  <InverterStandardCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function InverterLargeCard({ product }: { product: Product }) {
  const trans = getTranslation(product, "en");
  
  return (
    <div className="group relative flex h-full min-h-[500px] flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md sm:p-12">
      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
            <FontAwesomeIcon icon={faMicrochip} className="h-6 w-6" />
          </div>
          <p className="text-sm font-medium text-slate-500">{product.productLine || product.category}</p>
        </div>
        <h2 className="mt-6 text-3xl font-semibold text-slate-900 sm:text-4xl">
          {trans.name}
        </h2>
      </div>

      <div className="relative z-10 mt-12 flex items-center gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-medium text-brand-blue transition hover:border-brand-blue hover:bg-blue-50"
        >
          Learn More <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
        </Link>
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-blue transition hover:border-brand-blue hover:bg-blue-50">
          <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
        </button>
      </div>

      {/* Image positioned at the bottom right */}
      <div className="absolute -bottom-10 -right-10 h-[400px] w-[400px] sm:-bottom-12 sm:-right-12 sm:h-[500px] sm:w-[500px] transition-transform duration-500 group-hover:scale-105">
        <Image
          src={product.heroImage || product.thumbnail}
          alt={trans.name}
          fill
          className="object-contain object-bottom right"
        />
      </div>
    </div>
  );
}

function InverterSmallCard({ product }: { product: Product }) {
  const trans = getTranslation(product, "en");

  return (
    <div className="group relative flex h-[240px] flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md sm:p-8">
      <div className="relative z-10 max-w-[60%]">
        <p className="text-xs font-medium text-slate-500">{product.productLine || product.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900 line-clamp-2">
          {trans.name}
        </h3>
      </div>
    

      <div className="relative z-10 mt-auto flex items-center gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="flex items-center gap-1.5 text-sm font-medium text-brand-blue transition hover:text-blue-700"
        >
          Learn More <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
        </Link>
        <button className="text-brand-blue transition hover:text-blue-700">
          <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
        </button>
      </div>

      {/* Image positioned at the right */}
      <div className="absolute -right-4 top-1/2 h-40 w-40 -translate-y-1/2 transition-transform duration-500 group-hover:scale-105 sm:-right-2 sm:h-48 sm:w-48">
        <Image
          src={product.thumbnail || product.heroImage}
          alt={trans.name}
          fill
          className="object-contain object-right"
        />
      </div>
    </div>
  );
}

function InverterStandardCard({ product }: { product: Product }) {
  const trans = getTranslation(product, "en");

  return (
    <div className="group relative flex h-[350px] flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 transition-shadow hover:shadow-md sm:p-8">
      <div className="relative z-10">
        <p className="text-xs font-medium text-slate-500">{product.productLine || product.category}</p>
        <h3 className="mt-2 text-xl font-semibold text-slate-900 line-clamp-2">
          {trans.name}
        </h3>
      </div>

      <div className="relative z-10 mt-auto flex items-center gap-4">
        <Link
          href={`/products/${product.slug}`}
          className="flex items-center gap-1.5 text-sm font-medium text-brand-blue transition hover:text-blue-700"
        >
          Learn More <FontAwesomeIcon icon={faArrowRight} className="h-4 w-4" />
        </Link>
        <button className="text-brand-blue transition hover:text-blue-700">
          <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
        </button>
      </div>

      {/* Image positioned at the right/bottom */}
      <div className="absolute -bottom-6 -right-6 h-48 w-48 transition-transform duration-500 group-hover:scale-105">
        <Image
          src={product.thumbnail || product.heroImage}
          alt={trans.name}
          fill
          className="object-contain object-bottom right"
        />
      </div>
    </div>
  );
}

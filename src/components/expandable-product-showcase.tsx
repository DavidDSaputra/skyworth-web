"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { getTranslation } from "@/lib/product-helpers";
import { icons } from "@/lib/icons";
import type { Product } from "@/lib/types";

export function ExpandableProductShowcase({
  products,
}: {
  products: Product[];
}) {
  const [activeId, setActiveId] = useState(products[0]?.id ?? "");

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1520px]">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-[1060px]">
            <p className="text-sm font-medium tracking-[-0.01em] text-black">
              Elevate Your Living
            </p>
            <h2 className="mt-5 max-w-[20ch] text-[clamp(2.35rem,4vw,4.1rem)] font-medium leading-[1.04] text-black">
              Tomorrow&apos;s energy is being designed today with clean power
              and sustainable supply chains.
            </h2>
            <p className="mt-12 max-w-[18ch] text-[clamp(2rem,3vw,3.2rem)] font-medium leading-[1.06] text-black">
              Because the future runs on energy.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-start lg:self-end">
            <Link
              href="/contact"
              className="inline-flex min-h-14 items-center gap-2 bg-black px-6 text-base font-medium text-white transition hover:bg-brand-blue"
            >
              Get Started <FaIcon icon={icons.arrowRight} size={18} />
            </Link>
            <Link
              href="/why-us"
              className="inline-flex min-h-14 items-center gap-2 border border-black px-6 text-base font-medium text-black transition hover:bg-black hover:text-white"
            >
              Learn More <FaIcon icon={icons.arrowRight} size={18} />
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 lg:flex-row">
          {products.map((product) => {
            const active = product.id === activeId;
            const translation = getTranslation(product, "en");

            return (
              <button
                key={product.id}
                type="button"
                onClick={() => setActiveId(product.id)}
                className={`group relative min-h-[420px] overflow-hidden bg-black text-left text-white transition-all duration-500 ease-out lg:min-h-[460px] ${
                  active ? "lg:flex-[1.9]" : "lg:flex-[0.62]"
                }`}
              >
                <Image
                  src={product.heroImage}
                  alt={translation.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className={`object-cover transition duration-700 ${
                    active ? "scale-100 opacity-92" : "scale-110 opacity-68"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                <div
                  className={`absolute inset-x-0 bottom-0 p-7 transition-all duration-500 ${
                    active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-92"
                  }`}
                >
                  <div className="max-w-md">
                    <p className="text-xs uppercase tracking-[0.24em] text-white/65">
                      {product.sku}
                    </p>
                    <h3 className="mt-4 text-[clamp(1.8rem,2.7vw,3rem)] font-medium leading-[1.02]">
                      {translation.name}
                    </h3>
                    <p
                      className={`mt-3 max-w-sm text-sm leading-6 text-white/78 transition-all duration-500 ${
                        active
                          ? "max-h-24 opacity-100"
                          : "max-h-0 overflow-hidden opacity-0"
                      }`}
                    >
                      {translation.shortDescription}
                    </p>
                    <span className="mt-6 inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-black/45 text-white transition group-hover:bg-brand-blue">
                      <FaIcon icon={icons.arrowRight} size={18} />
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useMemo, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function ProductFilters({ products }: { products: Product[] }) {
  const [category, setCategory] = useState("All");
  const [productLine, setProductLine] = useState("All");
  const [certification, setCertification] = useState("All");
  const categories = [
    "All",
    ...Array.from(new Set(products.map((item) => item.category))),
  ];
  const productLines = [
    "All",
    ...Array.from(new Set(products.map((item) => item.productLine))),
  ];
  const certifications = [
    "All",
    ...Array.from(new Set(products.flatMap((item) => item.certifications))),
  ];

  const filtered = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory =
          category === "All" || product.category === category;
        const matchesProductLine =
          productLine === "All" || product.productLine === productLine;
        const matchesCertification =
          certification === "All" ||
          product.certifications.includes(certification);
        return matchesCategory && matchesProductLine && matchesCertification;
      }),
    [category, certification, productLine, products],
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
      <aside className="h-fit rounded-md border border-slate-200 bg-white p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
          <FaIcon icon={icons.filter} size={16} />
          Filters
        </div>
        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Category
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Product line
            <select
              value={productLine}
              onChange={(event) => setProductLine(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            >
              {productLines.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Certification
            <select
              value={certification}
              onChange={(event) => setCertification(event.target.value)}
              className="rounded-md border border-slate-300 px-3 py-2"
            >
              {certifications.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              setCategory("All");
              setProductLine("All");
              setCertification("All");
            }}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            Reset
          </button>
        </div>
      </aside>
      <div>
        <p className="mb-4 text-sm text-slate-600">
          Showing {filtered.length} of {products.length} published products
        </p>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

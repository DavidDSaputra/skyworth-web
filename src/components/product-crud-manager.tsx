"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";

type ProductFormState = {
  id?: string;
  sku: string;
  slug: string;
  category: string;
  productLine: string;
  featured: boolean;
  powerW: string;
  efficiency: string;
  cells: string;
  warranty: string;
  thumbnail: string;
  heroImage: string;
  featuresText: string;
  certificationsText: string;
  specsText: string;
  galleryText: string;
  datasheetsText: string;
  enName: string;
  enShortDescription: string;
  enDescription: string;
  enMetaTitle: string;
  enMetaDescription: string;
  idName: string;
  idShortDescription: string;
  idDescription: string;
  idMetaTitle: string;
  idMetaDescription: string;
};

const emptyForm: ProductFormState = {
  sku: "",
  slug: "",
  category: "",
  productLine: "",
  featured: false,
  powerW: "",
  efficiency: "",
  cells: "",
  warranty: "",
  thumbnail: "",
  heroImage: "",
  featuresText: "",
  certificationsText: "",
  specsText: "",
  galleryText: "",
  datasheetsText: "",
  enName: "",
  enShortDescription: "",
  enDescription: "",
  enMetaTitle: "",
  enMetaDescription: "",
  idName: "",
  idShortDescription: "",
  idDescription: "",
  idMetaTitle: "",
  idMetaDescription: "",
};

function buildDummyForm(): ProductFormState {
  const uniqueCode = `${Date.now()}`.slice(-6);
  const slug = `dummy-test-module-${uniqueCode}`;
  const sku = `TEST-PV-${uniqueCode}`;
  const productNameEn = `Dummy Test Solar Module ${uniqueCode}`;
  const productNameId = `Modul Surya Dummy Test ${uniqueCode}`;

  return {
    sku,
    slug,
    category: "PV Module",
    productLine: "QA Sandbox",
    featured: false,
    powerW: "575",
    efficiency: "22.4",
    cells: "144 half-cell N-type",
    warranty: "15-year product / 30-year linear output",
    thumbnail:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=900&q=80",
    heroImage:
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1600&q=80",
    featuresText: [
      "Dummy feature for admin create-product testing",
      "Supports quick validation of form submission flow",
      "Contains complete bilingual content for QA checks",
    ].join("\n"),
    certificationsText: "IEC 61215, IEC 61730, TUV, CE",
    specsText: [
      "Maximum power: 575 W",
      "Module efficiency: 22.4%",
      "Open-circuit voltage: 51.2 V",
      "Short-circuit current: 14.3 A",
      "Dimensions: 2278 x 1134 x 35 mm",
      "Weight: 28.9 kg",
    ].join("\n"),
    galleryText: [
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80 | Dummy utility-scale installation photo",
      "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=80 | Dummy module inspection photo",
    ].join("\n"),
    datasheetsText:
      "Dummy 575W Datasheet | dummy-575w-module.pdf | https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf | 345678",
    enName: productNameEn,
    enShortDescription:
      "Dummy product entry for testing whether the admin form can create a valid product.",
    enDescription:
      "This dummy solar module record is intended for QA and admin testing. It includes complete product metadata, specifications, gallery assets, and datasheet references so the create-product flow can be validated end to end.",
    enMetaTitle: `${productNameEn} | Admin Dummy`,
    enMetaDescription:
      "Dummy admin product used to verify create-product submission, validation, and catalog persistence.",
    idName: productNameId,
    idShortDescription:
      "Entri produk dummy untuk menguji apakah form admin bisa membuat produk dengan benar.",
    idDescription:
      "Data modul surya dummy ini dipakai untuk kebutuhan QA dan pengujian admin. Seluruh field penting seperti metadata, spesifikasi, galeri, dan datasheet sudah diisi agar alur tambah produk dapat dites dari awal sampai akhir.",
    idMetaTitle: `${productNameId} | Dummy Admin`,
    idMetaDescription:
      "Produk dummy admin untuk verifikasi submit form tambah produk, validasi, dan penyimpanan katalog.",
  };
}

function productToForm(product: Product): ProductFormState {
  const en = product.translations.find((item) => item.locale === "en");
  const id = product.translations.find((item) => item.locale === "id");

  return {
    id: product.id,
    sku: product.sku,
    slug: product.slug,
    category: product.category,
    productLine: product.productLine,
    featured: product.featured,
    powerW: String(product.powerW),
    efficiency: String(product.efficiency),
    cells: product.cells,
    warranty: product.warranty,
    thumbnail: product.thumbnail,
    heroImage: product.heroImage,
    featuresText: product.features.join("\n"),
    certificationsText: product.certifications.join(", "),
    specsText: Object.entries(product.specs)
      .map(([label, value]) => `${label}: ${value}`)
      .join("\n"),
    galleryText: product.gallery
      .map((item) => `${item.url} | ${item.caption}`)
      .join("\n"),
    datasheetsText: product.datasheets
      .map(
        (item) =>
          `${item.label} | ${item.filename} | ${item.storageUrl} | ${item.fileSize}`,
      )
      .join("\n"),
    enName: en?.name ?? "",
    enShortDescription: en?.shortDescription ?? "",
    enDescription: en?.description ?? "",
    enMetaTitle: en?.metaTitle ?? "",
    enMetaDescription: en?.metaDescription ?? "",
    idName: id?.name ?? "",
    idShortDescription: id?.shortDescription ?? "",
    idDescription: id?.description ?? "",
    idMetaTitle: id?.metaTitle ?? "",
    idMetaDescription: id?.metaDescription ?? "",
  };
}

function parseSpecs(text: string) {
  return Object.fromEntries(
    text
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");
        if (separatorIndex === -1) {
          throw new Error(`Invalid spec line: "${line}"`);
        }

        return [
          line.slice(0, separatorIndex).trim(),
          line.slice(separatorIndex + 1).trim(),
        ];
      }),
  );
}

function parseLineList(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseGallery(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [url, caption] = line.split("|").map((item) => item.trim());
      if (!url || !caption) {
        throw new Error(`Invalid gallery line: "${line}"`);
      }

      return { url, caption };
    });
}

function parseDatasheets(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [label, filename, storageUrl, fileSize] = line
        .split("|")
        .map((item) => item.trim());

      if (!label || !filename || !storageUrl || !fileSize) {
        throw new Error(`Invalid datasheet line: "${line}"`);
      }

      return {
        label,
        filename,
        storageUrl,
        fileSize: Number(fileSize),
      };
    });
}

function buildPayload(form: ProductFormState) {
  return {
    sku: form.sku.trim(),
    slug: form.slug.trim(),
    category: form.category.trim(),
    productLine: form.productLine.trim(),
    featured: form.featured,
    powerW: Number(form.powerW),
    efficiency: Number(form.efficiency),
    cells: form.cells.trim(),
    warranty: form.warranty.trim(),
    thumbnail: form.thumbnail.trim(),
    heroImage: form.heroImage.trim(),
    features: parseLineList(form.featuresText),
    certifications: form.certificationsText
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    specs: parseSpecs(form.specsText),
    gallery: parseGallery(form.galleryText),
    datasheets: parseDatasheets(form.datasheetsText),
    translations: [
      {
        locale: "en",
        name: form.enName.trim(),
        shortDescription: form.enShortDescription.trim(),
        description: form.enDescription.trim(),
        metaTitle: form.enMetaTitle.trim(),
        metaDescription: form.enMetaDescription.trim(),
      },
      {
        locale: "id",
        name: form.idName.trim(),
        shortDescription: form.idShortDescription.trim(),
        description: form.idDescription.trim(),
        metaTitle: form.idMetaTitle.trim(),
        metaDescription: form.idMetaDescription.trim(),
      },
    ],
  };
}

export function ProductCrudManager({
  initialProducts,
}: {
  initialProducts: Product[];
}) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [mode, setMode] = useState<"create" | "edit">("create");
  const [pending, setPending] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [featuredFilter, setFeaturedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("slug-asc");

  const categories = useMemo(
    () => Array.from(new Set(products.map((product) => product.category))).sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const nextProducts = products.filter((product) => {
      const en = product.translations.find((item) => item.locale === "en");
      const matchesQuery =
        !normalizedQuery ||
        product.slug.toLowerCase().includes(normalizedQuery) ||
        product.sku.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.productLine.toLowerCase().includes(normalizedQuery) ||
        en?.name.toLowerCase().includes(normalizedQuery);
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;
      const matchesFeatured =
        featuredFilter === "all" ||
        (featuredFilter === "featured" ? product.featured : !product.featured);

      return matchesQuery && matchesCategory && matchesFeatured;
    });

    nextProducts.sort((a, b) => {
      if (sortBy === "slug-desc") return b.slug.localeCompare(a.slug);
      if (sortBy === "name-asc") {
        const aName =
          a.translations.find((item) => item.locale === "en")?.name ?? a.slug;
        const bName =
          b.translations.find((item) => item.locale === "en")?.name ?? b.slug;
        return aName.localeCompare(bName);
      }
      if (sortBy === "power-desc") return b.powerW - a.powerW;
      if (sortBy === "power-asc") return a.powerW - b.powerW;
      return a.slug.localeCompare(b.slug);
    });

    return nextProducts;
  }, [categoryFilter, featuredFilter, products, searchQuery, sortBy]);

  function resetForm() {
    setMode("create");
    setForm(emptyForm);
    setMessage(null);
    setError(null);
  }

  function fillDummyForm() {
    setMode("create");
    setForm(buildDummyForm());
    setMessage("Dummy product form loaded. Review if needed, then click Create Product.");
    setError(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage(null);
    setError(null);

    try {
      const payload = buildPayload(form);
      const endpoint =
        mode === "create" || !form.id
          ? "/api/admin/products"
          : `/api/admin/products/${form.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        data?: Product;
        error?: string;
      };

      if (!response.ok || !result.data) {
        throw new Error(result.error ?? "Unable to save product");
      }

      setProducts((current) => {
        if (mode === "create") {
          return [...current, result.data!].sort((a, b) =>
            a.slug.localeCompare(b.slug),
          );
        }

        return current
          .map((item) => (item.id === result.data!.id ? result.data! : item))
          .sort((a, b) => a.slug.localeCompare(b.slug));
      });
      setForm(productToForm(result.data));
      setMode("edit");
      setMessage(mode === "create" ? "Product created." : "Product updated.");
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to save product",
      );
    } finally {
      setPending(false);
    }
  }

  async function handleDelete(product: Product) {
    if (!window.confirm(`Delete ${product.slug}? This cannot be undone.`)) {
      return;
    }

    setPending(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to delete product");
      }

      setProducts((current) => current.filter((item) => item.id !== product.id));

      if (form.id === product.id) {
        resetForm();
      }

      setMessage("Product deleted.");
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Unable to delete product",
      );
    } finally {
      setPending(false);
    }
  }

  function updateField<K extends keyof ProductFormState>(
    key: K,
    value: ProductFormState[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function uploadFile(
    field:
      | "thumbnail"
      | "heroImage"
      | "galleryText"
      | "datasheetsText",
    file: File,
    kind: "image" | "datasheet",
  ) {
    setUploadingField(field);
    setMessage(null);
    setError(null);

    try {
      const body = new FormData();
      body.append("file", file);
      body.append("kind", kind);

      const response = await fetch("/api/admin/uploads", {
        method: "POST",
        body,
      });
      const result = (await response.json()) as {
        data?: {
          url: string;
          size: number;
          filename: string;
          originalFilename?: string;
        };
        error?: string;
      };

      if (!response.ok || !result.data) {
        throw new Error(result.error ?? "Upload failed");
      }

      if (field === "thumbnail" || field === "heroImage") {
        updateField(field, result.data.url as ProductFormState[typeof field]);
      }

      if (field === "galleryText") {
        const nextLine = `${result.data.url} | ${
          result.data.originalFilename ?? result.data.filename
        }`;
        updateField(
          "galleryText",
          form.galleryText.trim()
            ? `${form.galleryText.trim()}\n${nextLine}`
            : nextLine,
        );
      }

      if (field === "datasheetsText") {
        const displayName =
          result.data.originalFilename?.replace(/\.[^.]+$/, "") ??
          result.data.filename.replace(/\.[^.]+$/, "");
        const nextLine = `${displayName} | ${result.data.filename} | ${result.data.url} | ${result.data.size}`;
        updateField(
          "datasheetsText",
          form.datasheetsText.trim()
            ? `${form.datasheetsText.trim()}\n${nextLine}`
            : nextLine,
        );
      }

      setMessage("File uploaded.");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error ? uploadError.message : "Upload failed",
      );
    } finally {
      setUploadingField(null);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
      <aside className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Product List
            </p>
            <h3 className="mt-2 text-xl font-semibold text-slate-950">
              {products.length} products
            </h3>
          </div>
          <button
            type="button"
            onClick={resetForm}
            className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue"
          >
            New Product
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Search
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Name, SKU, category, or product line"
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
            />
          </label>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Category
              <select
                value={categoryFilter}
                onChange={(event) => setCategoryFilter(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Visibility
              <select
                value={featuredFilter}
                onChange={(event) => setFeaturedFilter(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
              >
                <option value="all">All</option>
                <option value="featured">Featured</option>
                <option value="regular">Not featured</option>
              </select>
            </label>
          </div>
          <label className="grid gap-2 text-sm font-medium text-slate-700">
            Sort
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
            >
              <option value="slug-asc">Slug A-Z</option>
              <option value="slug-desc">Slug Z-A</option>
              <option value="name-asc">Name A-Z</option>
              <option value="power-desc">Power high-low</option>
              <option value="power-asc">Power low-high</option>
            </select>
          </label>
        </div>

        <div className="mt-5 grid gap-3">
          {filteredProducts.map((product) => {
            const en = product.translations.find((item) => item.locale === "en");

            return (
              <article
                key={product.id}
                className={`rounded-xl border bg-slate-50 p-4 transition ${
                  form.id === product.id
                    ? "border-brand-blue bg-white"
                    : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    setMode("edit");
                    setForm(productToForm(product));
                    setMessage(null);
                    setError(null);
                  }}
                  className="w-full text-left"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    {product.sku}
                  </p>
                  <h4 className="mt-2 text-lg font-semibold text-slate-950">
                    {en?.name ?? product.slug}
                  </h4>
                  <p className="mt-1 text-sm text-slate-500">
                    {product.category} / {product.productLine}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-slate-400">
                    {product.slug}
                  </p>
                </button>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode("edit");
                      setForm(productToForm(product));
                      setMessage(null);
                      setError(null);
                    }}
                    className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(product)}
                    className="rounded-xl border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    disabled={pending}
                  >
                    Delete
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </aside>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-xl border border-slate-200 bg-white p-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              {mode === "create" ? "Create Product" : "Edit Product"}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-950">
              {mode === "create"
                ? "New product entry"
                : form.productLine || form.slug || "Product editor"}
            </h3>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillDummyForm}
              className="rounded-xl border border-brand-blue/30 px-4 py-2 text-sm font-semibold text-brand-blue transition hover:bg-blue-50"
            >
              Isi Dummy
            </button>
            {mode === "edit" ? (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Cancel
              </button>
            ) : null}
            <button
              type="submit"
              disabled={pending}
              className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Saving..." : mode === "create" ? "Create Product" : "Save Changes"}
            </button>
          </div>
        </div>

        {message ? (
          <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        ) : null}

        <section className="grid gap-4 md:grid-cols-2">
          <Input label="SKU" value={form.sku} onChange={(value) => updateField("sku", value)} />
          <Input label="Slug" value={form.slug} onChange={(value) => updateField("slug", value)} />
          <Input
            label="Main Category"
            value={form.category}
            onChange={(value) => updateField("category", value)}
          />
          <Input
            label="Product Line"
            value={form.productLine}
            onChange={(value) => updateField("productLine", value)}
          />
          <Checkbox
            label="Featured on homepage"
            checked={form.featured}
            onChange={(value) => updateField("featured", value)}
          />
          <Input
            label="Power (W)"
            value={form.powerW}
            onChange={(value) => updateField("powerW", value)}
          />
          <Input
            label="Efficiency (%)"
            value={form.efficiency}
            onChange={(value) => updateField("efficiency", value)}
          />
          <Input label="Cells" value={form.cells} onChange={(value) => updateField("cells", value)} />
          <Input
            label="Warranty"
            value={form.warranty}
            onChange={(value) => updateField("warranty", value)}
          />
          <Input
            label="Thumbnail URL"
            value={form.thumbnail}
            onChange={(value) => updateField("thumbnail", value)}
            actionSlot={
              <UploadButton
                label={
                  uploadingField === "thumbnail" ? "Uploading..." : "Upload Image"
                }
                disabled={uploadingField !== null}
                accept="image/*,.svg"
                onFileSelect={(file) => uploadFile("thumbnail", file, "image")}
              />
            }
          />
          <Input
            label="Hero image URL"
            value={form.heroImage}
            onChange={(value) => updateField("heroImage", value)}
            actionSlot={
              <UploadButton
                label={
                  uploadingField === "heroImage" ? "Uploading..." : "Upload Image"
                }
                disabled={uploadingField !== null}
                accept="image/*,.svg"
                onFileSelect={(file) => uploadFile("heroImage", file, "image")}
              />
            }
          />
        </section>

        <Textarea
          label="Product Features"
          hint="One feature per line. Example: Smart monitoring support"
          value={form.featuresText}
          onChange={(value) => updateField("featuresText", value)}
          rows={5}
        />
        <Textarea
          label="Certifications"
          hint="Comma-separated. Example: IEC 61215, IEC 61730, TUV"
          value={form.certificationsText}
          onChange={(value) => updateField("certificationsText", value)}
          rows={3}
        />
        <Textarea
          label="Specs"
          hint='One per line. Example: Maximum power: 550 W'
          value={form.specsText}
          onChange={(value) => updateField("specsText", value)}
          rows={8}
        />
        <Textarea
          label="Gallery"
          hint='One per line. Example: https://... | Utility solar field installation'
          value={form.galleryText}
          onChange={(value) => updateField("galleryText", value)}
          rows={6}
          actionSlot={
            <UploadButton
              label={
                uploadingField === "galleryText" ? "Uploading..." : "Upload Gallery Image"
              }
              disabled={uploadingField !== null}
              accept="image/*,.svg"
              onFileSelect={(file) => uploadFile("galleryText", file, "image")}
            />
          }
        />
        <Textarea
          label="Datasheets"
          hint='One per line. Example: 550W Module Datasheet | skyworth-550w-module.pdf | https://... | 345678'
          value={form.datasheetsText}
          onChange={(value) => updateField("datasheetsText", value)}
          rows={5}
          actionSlot={
            <UploadButton
              label={
                uploadingField === "datasheetsText"
                  ? "Uploading..."
                  : "Upload Datasheet"
              }
              disabled={uploadingField !== null}
              accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf"
              onFileSelect={(file) =>
                uploadFile("datasheetsText", file, "datasheet")
              }
            />
          }
        />

        <div className="grid gap-6 xl:grid-cols-2">
          <TranslationSection
            title="English Content"
            name={form.enName}
            shortDescription={form.enShortDescription}
            description={form.enDescription}
            metaTitle={form.enMetaTitle}
            metaDescription={form.enMetaDescription}
            onChange={(field, value) =>
              updateField(field as keyof ProductFormState, value)
            }
            fieldPrefix="en"
          />
          <TranslationSection
            title="Indonesian Content"
            name={form.idName}
            shortDescription={form.idShortDescription}
            description={form.idDescription}
            metaTitle={form.idMetaTitle}
            metaDescription={form.idMetaDescription}
            onChange={(field, value) =>
              updateField(field as keyof ProductFormState, value)
            }
            fieldPrefix="id"
          />
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  actionSlot,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  actionSlot?: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {actionSlot}
      </span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex min-h-[52px] items-center gap-3 rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4"
      />
      {label}
    </label>
  );
}

function Textarea({
  label,
  hint,
  value,
  onChange,
  rows,
  actionSlot,
}: {
  label: string;
  hint: string;
  value: string;
  onChange: (value: string) => void;
  rows: number;
  actionSlot?: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {actionSlot}
      </span>
      <span className="text-xs font-normal leading-5 text-slate-500">{hint}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}

function UploadButton({
  label,
  accept,
  disabled,
  onFileSelect,
}: {
  label: string;
  accept: string;
  disabled: boolean;
  onFileSelect: (file: File) => void;
}) {
  return (
    <label className={`inline-flex cursor-pointer items-center rounded-xl border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 ${disabled ? "pointer-events-none opacity-60" : ""}`}>
      <input
        type="file"
        accept={accept}
        className="hidden"
        disabled={disabled}
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) {
            onFileSelect(file);
          }

          event.currentTarget.value = "";
        }}
      />
      {label}
    </label>
  );
}

function TranslationSection({
  title,
  name,
  shortDescription,
  description,
  metaTitle,
  metaDescription,
  onChange,
  fieldPrefix,
}: {
  title: string;
  name: string;
  shortDescription: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  onChange: (field: string, value: string) => void;
  fieldPrefix: "en" | "id";
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h4 className="text-lg font-semibold text-slate-950">{title}</h4>
      <div className="mt-4 grid gap-4">
        <Input
          label="Product Name"
          value={name}
          onChange={(value) => onChange(`${fieldPrefix}Name`, value)}
        />
        <Textarea
          label="Product Summary"
          hint="Short overview for cards and top product sections."
          value={shortDescription}
          onChange={(value) =>
            onChange(`${fieldPrefix}ShortDescription`, value)
          }
          rows={4}
        />
        <Textarea
          label="Product Description"
          hint="Long-form product description for the detail page."
          value={description}
          onChange={(value) => onChange(`${fieldPrefix}Description`, value)}
          rows={7}
        />
        <Input
          label="Meta title"
          value={metaTitle}
          onChange={(value) => onChange(`${fieldPrefix}MetaTitle`, value)}
        />
        <Textarea
          label="Meta description"
          hint="SEO description for the detail page."
          value={metaDescription}
          onChange={(value) =>
            onChange(`${fieldPrefix}MetaDescription`, value)
          }
          rows={4}
        />
      </div>
    </section>
  );
}

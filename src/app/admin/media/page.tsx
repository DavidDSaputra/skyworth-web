import type { Metadata } from "next";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Admin Media",
  description: "Review media upload flow and supported asset formats.",
};

const imageFormats = ["JPG", "PNG", "WEBP", "SVG", "GIF", "AVIF"];
const documentFormats = ["PDF", "DOC", "DOCX", "XLS", "XLSX"];

export default function AdminMediaPage() {
  const storageProvider = process.env.CLOUDINARY_CLOUD_NAME
    ? "Cloudinary target configured"
    : "Local filesystem fallback";

  return (
    <div className="mx-auto max-w-[1280px] grid gap-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
          Media operations
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
          Upload rules
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
          Ringkasan singkat untuk format file dan jalur upload.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <Panel
          eyebrow="Storage target"
          title="Current provider"
          body={storageProvider}
        />
        <Panel
          eyebrow="Security"
          title="Access model"
          body="Uploads require an authenticated admin session and go through server-side validation before being saved."
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
              <FaIcon icon={icons.adminUploads} size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Product images
              </p>
              <h2 className="text-xl font-semibold text-slate-950">
                Accepted image formats
              </h2>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {imageFormats.map((format) => (
              <span
                key={format}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {format}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Use these for thumbnail, hero, and gallery fields from the Products
            page.
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
              <FaIcon icon={icons.download} size={18} />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Datasheets
              </p>
              <h2 className="text-xl font-semibold text-slate-950">
                Accepted document formats
              </h2>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {documentFormats.map((format) => (
              <span
                key={format}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                {format}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Datasheets are attached per product and exposed through the tracked
            download endpoint on the storefront.
          </p>
        </article>
      </section>
    </div>
  );
}

function Panel({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-blue">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
        {title}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{body}</p>
    </article>
  );
}

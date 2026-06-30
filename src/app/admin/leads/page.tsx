import type { Metadata } from "next";
import { LeadStatusSelect } from "@/components/lead-status-select";
import { listLeads } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Admin Leads",
  description: "Review inbound RFQ leads captured from the website.",
};

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const leads = await listLeads();
  const newLeads = leads.filter((lead) => lead.status === "new").length;

  return (
    <div className="mx-auto max-w-[1400px] grid gap-4">
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-blue">
              Lead inbox
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              RFQ and inquiries
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Semua lead dari website tampil di sini untuk ditindaklanjuti.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <Badge label="Total leads" value={String(leads.length)} />
            <Badge label="New status" value={String(newLeads)} />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        {leads.length ? (
          <div className="grid gap-4">
            {leads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                      {lead.company}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {lead.name} • {lead.email} • {lead.phone ?? "No phone"}
                    </p>
                  </div>
                  <LeadStatusSelect id={lead.id} initialStatus={lead.status} />
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoRow label="Requested product" value={lead.productName} />
                  <InfoRow label="Product SKU" value={lead.productSku} />
                  <InfoRow label="Project type" value={lead.projectType} />
                  <InfoRow label="Created at" value={new Date(lead.createdAt).toLocaleString()} />
                </div>
                <div className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                    Message
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    {lead.message}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.4rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-sm leading-6 text-slate-500">
            Belum ada lead yang masuk. Setelah RFQ form dipakai oleh visitor,
            data inquiry akan muncul di halaman ini.
          </div>
        )}
      </section>
    </div>
  );
}

function Badge({
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

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-950">
        {value || "Not provided"}
      </p>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";

type ProductOption = {
  id: string;
  name: string;
  sku: string;
};

type Status =
  | { type: "idle" }
  | { type: "success"; leadId: string }
  | { type: "error"; message: string };

export function RFQForm({
  product,
  mode = "rfq",
}: {
  product?: ProductOption;
  mode?: "rfq" | "contact";
}) {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setStatus({ type: "idle" });

    const payload = {
      type: mode,
      productId: product?.id,
      productName: product?.name,
      productSku: product?.sku,
      name: String(formData.get("name") ?? ""),
      company: String(formData.get("company") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      quantity: String(formData.get("quantity") ?? ""),
      projectType: String(formData.get("projectType") ?? ""),
      message: String(formData.get("message") ?? ""),
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        leadId?: string;
        error?: string;
      };

      if (!response.ok || !data.leadId) {
        throw new Error(data.error ?? "Unable to submit RFQ");
      }

      setStatus({ type: "success", leadId: data.leadId });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to submit RFQ",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form action={submit} className="grid gap-4" id="rfq">
      {product ? (
        <div className="rounded-md border border-blue-200 bg-brand-blue-soft p-3 text-sm text-blue-950">
          RFQ product: <span className="font-semibold">{product.name}</span>{" "}
          <span className="text-brand-blue">({product.sku})</span>
        </div>
      ) : null}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Contact name
          <input
            name="name"
            required
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Company
          <input
            name="company"
            required
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Email
          <input
            type="email"
            name="email"
            required
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Phone
          <input
            name="phone"
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Quantity
          <input
            name="quantity"
            placeholder="e.g. 5 MW"
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-slate-700">
          Project type
          <select
            name="projectType"
            className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
          >
            <option value="">Select</option>
            <option value="utility_scale">Utility scale</option>
            <option value="commercial_rooftop">Commercial rooftop</option>
            <option value="distribution">Distribution/import</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Message
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Share project location, module volume, target delivery, certificates, or datasheet requirements."
          className="rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-brand-blue focus:ring-2 focus:ring-blue-100"
        />
      </label>
      <p className="text-xs leading-5 text-slate-500">
        We will email you regarding this RFQ. By submitting, you consent to
        storing your contact information for sales follow-up under our{" "}
        <Link href="/privacy" className="font-semibold text-brand-blue">
          privacy policy
        </Link>
        .
      </p>
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-brand-blue px-4 text-sm font-semibold text-white hover:bg-brand-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FaIcon icon={icons.send} size={16} />
        {pending
          ? "Submitting..."
          : mode === "rfq"
            ? "Submit RFQ"
            : "Send Message"}
      </button>
      <div aria-live="polite">
        {status.type === "success" ? (
          <p className="rounded-md bg-blue-50 p-3 text-sm font-medium text-blue-800">
            Lead received. Reference ID: {status.leadId}
          </p>
        ) : null}
        {status.type === "error" ? (
          <p className="rounded-md bg-red-50 p-3 text-sm font-medium text-red-700">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

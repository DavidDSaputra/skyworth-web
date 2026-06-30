"use client";

import { useState } from "react";
import type { LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = ["new", "contacted", "archived"];

export function LeadStatusSelect({
  id,
  initialStatus,
}: {
  id: string;
  initialStatus: LeadStatus;
}) {
  const [status, setStatus] = useState(initialStatus);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function updateStatus(nextStatus: LeadStatus) {
    const previousStatus = status;
    setStatus(nextStatus);
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to update lead status");
      }
    } catch (updateError) {
      setStatus(previousStatus);
      setError(
        updateError instanceof Error
          ? updateError.message
          : "Unable to update lead status",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="grid gap-2">
      <select
        value={status}
        disabled={pending}
        onChange={(event) => updateStatus(event.target.value as LeadStatus)}
        className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-blue outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100 disabled:opacity-60"
      >
        {statuses.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

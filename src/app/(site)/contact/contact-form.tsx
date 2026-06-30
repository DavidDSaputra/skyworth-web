"use client";

import { useState } from "react";

type Status =
  | { type: "idle" }
  | { type: "success"; leadId: string }
  | { type: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [pending, setPending] = useState(false);

  async function submit(formData: FormData) {
    setPending(true);
    setStatus({ type: "idle" });

    const payload = {
      type: "contact",
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
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
        throw new Error(data.error ?? "Unable to submit message");
      }

      setStatus({ type: "success", leadId: data.leadId });
    } catch (error) {
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Unable to submit message",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <form action={submit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-base font-medium text-slate-800">
          Name
        </label>
        <input
          id="name"
          name="name"
          required
          type="text"
          placeholder="Enter your name"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base placeholder:text-slate-400 outline-none focus:border-[#005baa] focus:ring-1 focus:ring-[#005baa] transition-colors bg-white"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-base font-medium text-slate-800">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          required
          type="email"
          placeholder="Enter your email address"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base placeholder:text-slate-400 outline-none focus:border-[#005baa] focus:ring-1 focus:ring-[#005baa] transition-colors bg-white"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="message" className="block text-base font-medium text-slate-800">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="Type your message here..."
          rows={5}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base placeholder:text-slate-400 outline-none focus:border-[#005baa] focus:ring-1 focus:ring-[#005baa] transition-colors resize-none bg-white"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full mt-4 flex items-center justify-between rounded-xl bg-[#DAFF47] px-6 py-4 text-lg font-bold text-black hover:bg-[#c2e63c] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        <span>{pending ? "Sending..." : "Send Message"}</span>
        <div className="bg-black text-white rounded-full p-2 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </div>
      </button>

      <div aria-live="polite">
        {status.type === "success" ? (
          <p className="rounded-xl bg-green-50 p-4 text-sm font-medium text-green-800">
            Message sent successfully! Reference ID: {status.leadId}
          </p>
        ) : null}
        {status.type === "error" ? (
          <p className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

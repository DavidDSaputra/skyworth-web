"use client";

import { useState } from "react";

export function AdminAccessGate({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error ?? "Unable to sign in");
      }

      window.location.reload();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to sign in",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-7rem)] max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_0.7fr]">
        <div className="text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">
            Skyworth Internal
          </p>
          <h1 className="mt-4 max-w-[12ch] text-[clamp(2.5rem,5vw,4.8rem)] font-semibold leading-[0.98] tracking-[-0.05em]">
            Admin dashboard access.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
            Product CRUD, media uploads, and operational tools are protected
            behind an authenticated admin session.
          </p>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
            Sign in
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950">
            Enter admin password
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            This workspace controls the live product catalog and protected
            upload routes.
          </p>
          {!configured ? (
            <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm font-medium leading-6 text-amber-800">
              Admin login is disabled until ADMIN_PASSWORD and
              ADMIN_SESSION_SECRET are configured in the environment.
            </p>
          ) : null}

          <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
            <label className="grid gap-2 text-sm font-medium text-slate-700">
              Admin password
              <input
                type="password"
                value={password}
                disabled={!configured}
                onChange={(event) => setPassword(event.target.value)}
                className="rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-blue-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
              />
            </label>
            {error ? (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}
            <button
              type="submit"
              disabled={pending || !configured}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export function AdminLogoutButton({
  variant = "default",
}: {
  variant?: "default" | "sidebar";
}) {
  const [pending, setPending] = useState(false);

  async function handleLogout() {
    setPending(true);
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.reload();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={pending}
      className={`rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
        variant === "sidebar"
          ? "w-full border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.1]"
          : "border border-slate-300 text-slate-700 hover:bg-slate-100"
      }`}
    >
      {pending ? "Signing out..." : "Sign Out"}
    </button>
  );
}

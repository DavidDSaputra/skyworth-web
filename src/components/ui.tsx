import Link from "next/link";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-4 py-16 sm:px-6 lg:px-8 ${className}`}>
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 text-3xl font-semibold text-slate-950 sm:text-4xl">
            {title}
          </h2>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}) {
  const styles =
    variant === "primary"
      ? "bg-brand-blue text-white hover:bg-brand-blue-dark"
      : "border border-slate-300 bg-white text-slate-950 hover:bg-slate-100";

  return (
    <Link
      href={href}
      className={`inline-flex min-h-11 items-center justify-center rounded-md px-4 text-sm font-semibold transition ${styles}`}
    >
      {children}
    </Link>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-sm border border-blue-200 bg-brand-blue-soft px-2 py-1 text-xs font-semibold text-brand-blue-dark">
      {children}
    </span>
  );
}

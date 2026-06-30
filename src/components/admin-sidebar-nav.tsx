"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AppIcon } from "@/lib/icons";
import { FaIcon } from "./fa-icon";

export type AdminNavItem = {
  href: string;
  label: string;
  description: string;
  icon: AppIcon;
};

export function AdminSidebarNav({ items }: { items: AdminNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="mt-6 grid gap-2">
      {items.map((item) => {
        const active =
          pathname === item.href ||
          (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`group rounded-xl border px-4 py-3 transition ${
              active
                ? "border-white/14 bg-white/[0.1] shadow-[0_12px_26px_rgba(0,0,0,0.22)]"
                : "border-white/8 bg-white/[0.03] hover:border-white/12 hover:bg-white/[0.06]"
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`${active ? "text-white" : "text-white/58"} mt-0.5`}
              >
                <FaIcon icon={item.icon} size={16} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-white">
                  {item.label}
                </span>
                <span
                  className={`block text-xs leading-5 ${
                    active ? "text-white/74" : "text-white/52"
                  }`}
                >
                  {item.description}
                </span>
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

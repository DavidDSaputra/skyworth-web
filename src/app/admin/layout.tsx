import Link from "next/link";
import { AdminAccessGate, AdminLogoutButton } from "@/components/admin-access-gate";
import { AdminSidebarNav, type AdminNavItem } from "@/components/admin-sidebar-nav";
import { AdminTopbar } from "@/components/admin-topbar";
import { isAdminAuthConfigured, isAdminAuthenticated } from "@/lib/admin-auth";
import { icons } from "@/lib/icons";

const adminMenu: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Overview",
    description: "Summary and activity",
    icon: icons.growth,
  },
  {
    href: "/admin/products",
    label: "Products",
    description: "Catalog CRUD",
    icon: icons.adminProducts,
  },
  {
    href: "/admin/media",
    label: "Media",
    description: "Images and datasheets",
    icon: icons.adminUploads,
  },
  {
    href: "/admin/leads",
    label: "Leads",
    description: "Inbound requests",
    icon: icons.adminLeads,
  },
  {
    href: "/admin/locales",
    label: "Locales",
    description: "Translation workflow",
    icon: icons.adminLocales,
  },
];

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adminConfigured = isAdminAuthConfigured();
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-slate-100">
        <AdminAccessGate configured={adminConfigured} />
      </main>
    );
  }

  return (
    <div className="admin-shell min-h-screen bg-slate-100 text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="border-b border-white/8 bg-[linear-gradient(180deg,#111111_0%,#1a1a1a_100%)] text-white lg:border-b-0 lg:border-r lg:border-black/20">
          <div className="flex h-full flex-col p-5">
            <div className="rounded-2xl border border-white/8 bg-white/[0.05] px-4 py-5 shadow-[0_18px_40px_rgba(0,0,0,0.24)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                Skyworth Admin
              </p>
              <h1 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-white">
                CRUD Workspace
              </h1>
              <p className="mt-2 text-sm leading-6 text-white/66">
                Produk, media, leads, dan locale dalam satu panel yang lebih
                ringkas.
              </p>
            </div>

            <AdminSidebarNav items={adminMenu} />

            <div className="mt-6 grid gap-2 text-sm">
              <Link
                href="/"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/78 transition hover:bg-white/[0.08] hover:text-white"
              >
                Back to website
              </Link>
              <Link
                href="/products"
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white/78 transition hover:bg-white/[0.08] hover:text-white"
              >
                View catalog
              </Link>
            </div>

            <div className="mt-auto pt-6">
              <AdminLogoutButton variant="sidebar" />
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
            <AdminTopbar />
          </div>

          <main className="px-5 py-6 sm:px-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaIcon } from "@/components/fa-icon";
import { icons } from "@/lib/icons";
import { siteConfig } from "@/lib/site-config";

const pageLinks = [
  { href: "/", label: "Home" },
  { href: "/why-us", label: "About" },
  { href: "/case-studies", label: "Work" },
  { href: "/news", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const featuredPosts = [
  {
    href: "/news",
    title: "How EPC teams evaluate PV bankability",
    image:
      "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=600&q=80",
  },
  {
    href: "/case-studies",
    title: "Commercial rooftop PV system rollout",
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=600&q=80",
  },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Header({
  productLinks,
}: {
  productLinks: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  function closeMobileMenu() {
    setMobileOpen(false);
    setMobileProductsOpen(false);
  }

  function toggleMobileMenu() {
    setMobileOpen((value) => {
      if (value) {
        setMobileProductsOpen(false);
      }
      return !value;
    });
  }

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="fixed left-0 right-0 top-3 z-50 px-4 sm:px-6 lg:px-8">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="relative mx-auto max-w-[1028px]" ref={navRef}>
        <div className="flex items-center justify-between gap-3 bg-black/62 px-3 py-2 shadow-2xl backdrop-blur-md">
          <Link href="/" className="flex min-w-0 items-center px-2 py-1.5">
            <Image
              src="/skyworth-logo.svg"
              alt="Skyworth"
              width={116}
              height={16}
              priority
              className="h-3.5 w-auto"
            />
          </Link>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="site-mobile-menu"
              onClick={toggleMobileMenu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-white/18 bg-white/10 text-white transition hover:bg-white/16 md:hidden"
            >
              <span className="sr-only">Toggle navigation menu</span>
              <span className="relative block h-4 w-4">
                <span
                  className={`absolute left-0 top-0 block h-0.5 w-4 bg-current transition-all duration-300 ${
                    mobileOpen ? "top-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-[7px] block h-0.5 w-4 bg-current transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 top-[14px] block h-0.5 w-4 bg-current transition-all duration-300 ${
                    mobileOpen ? "top-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="site-mega-menu"
              onClick={() => setOpen((value) => !value)}
              className="hidden min-h-10 items-center gap-2 border border-black bg-white px-4 text-sm font-medium text-black transition hover:bg-slate-100 md:inline-flex"
            >
              Explore{" "}
              <FaIcon
                icon={icons.chevronDown}
                size={14}
                className={`transition ${open ? "rotate-180" : ""}`}
              />
            </button>
            <Link
              href="/contact"
              className="hidden min-h-10 items-center gap-2 bg-black px-4 text-sm font-medium text-white transition hover:bg-brand-blue sm:inline-flex"
            >
              Schedule <FaIcon icon={icons.arrowRight} size={16} />
            </Link>
          </div>
        </div>

        <div
          id="site-mobile-menu"
          className={`fixed inset-0 z-[70] md:hidden ${
            mobileOpen ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-slate-950/36 backdrop-blur-[2px] transition duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMobileMenu}
          />

          <div
            className={`absolute bottom-3 left-3 top-3 flex w-[min(410px,calc(100vw-24px))] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_28px_90px_rgba(15,23,42,0.28)] ring-1 ring-slate-200 transition-all duration-300 ${
              mobileOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-8 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-5">
              <Link
                href="/"
                className="flex min-w-0 items-center"
                onClick={() => setMobileOpen(false)}
              >
                <Image
                  src="/skyworth-logo.svg"
                  alt="Skyworth"
                  width={116}
                  height={16}
                  className="h-5 w-auto"
                />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={closeMobileMenu}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-950 transition hover:bg-slate-100"
              >
                <FaIcon icon={icons.close} size={22} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <div>
                <p className="text-[1.55rem] font-semibold tracking-[-0.04em] text-slate-950">
                  Pages
                </p>
                <div className="mt-5 border-t border-slate-200 pt-4">
                  {pageLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-4 text-[1.05rem] font-medium uppercase tracking-[0.02em] text-slate-700 transition hover:text-brand-blue"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-2 border-t border-slate-200 pt-2">
                <button
                  type="button"
                  onClick={() => setMobileProductsOpen((value) => !value)}
                  className="flex w-full items-center justify-between py-4 text-left text-[1.05rem] font-medium uppercase tracking-[0.02em] text-slate-700 transition hover:text-brand-blue"
                >
                  <span>Products</span>
                  <FaIcon
                    icon={icons.chevronDown}
                    size={16}
                    className={`transition ${mobileProductsOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <div
                  className={`grid overflow-hidden transition-all duration-300 ${
                    mobileProductsOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="min-h-0">
                    <Link
                      href="/products"
                      className="block py-3 text-[0.98rem] font-medium text-slate-600 transition hover:text-brand-blue"
                      onClick={closeMobileMenu}
                    >
                      Catalog
                    </Link>
                    <div className="grid gap-3 pb-2 pt-2 sm:grid-cols-2">
                      {productLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="rounded-[18px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium leading-5 text-slate-700 transition hover:border-brand-blue/25 hover:bg-brand-blue-soft hover:text-brand-blue"
                          onClick={closeMobileMenu}
                        >
                          <span className="line-clamp-3 block">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 px-5 py-5">
              <Link
                href="/contact"
                className="inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-[18px] bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-brand-blue"
                onClick={closeMobileMenu}
              >
                Schedule <FaIcon icon={icons.arrowRight} size={16} />
              </Link>
            </div>
          </div>
        </div>

        <div
          id="site-mega-menu"
          className={`mega-menu absolute left-0 right-0 top-[calc(100%+14px)] hidden bg-white p-5 shadow-2xl ring-1 ring-black/10 md:block ${
            open ? "mega-menu-open" : ""
          }`}
        >
          <div className="grid gap-5 md:grid-cols-[1fr_1fr_1.35fr]">
            <div className="border-r border-slate-200 pr-5">
              <p className="mb-4 text-lg font-light text-slate-400">Pages</p>
              <div className="grid gap-2.5">
                {pageLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-black transition hover:text-brand-blue"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="border-r border-slate-200 pr-5">
              <p className="mb-4 text-lg font-light text-slate-400">Products</p>
              <div className="grid gap-2.5">
                <Link
                  href="/products"
                  className="text-base font-medium text-black transition hover:text-brand-blue"
                  onClick={() => setOpen(false)}
                >
                  Catalog
                </Link>
                {productLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-base font-medium text-black transition hover:text-brand-blue"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {featuredPosts.map((post) => (
                <Link
                  key={post.title}
                  href={post.href}
                  className="group grid grid-cols-[112px_1fr] items-center gap-4"
                  onClick={() => setOpen(false)}
                >
                  <span className="relative h-20 overflow-hidden bg-slate-100">
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="120px"
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="text-lg font-semibold leading-tight text-black transition group-hover:text-brand-blue">
                    {post.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-ink px-4 py-20 text-white sm:px-6 sm:py-24 lg:px-8 lg:py-32">
      <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-[1.65fr_1fr_1.1fr] lg:gap-16">
        <div className="max-w-2xl">
          <Image
            src="/skyworth-logo.svg"
            alt="Skyworth"
            width={170}
            height={24}
            className="h-6 w-auto"
          />
          <p className="mt-6 max-w-xl text-sm leading-8 text-slate-300 sm:text-[0.98rem]">
            B2B photovoltaic modules, datasheets, certificates, and engineering
            support for EPCs, importers, and project developers.
          </p>
        </div>
        <div className="space-y-5 text-sm text-slate-300 sm:text-[0.98rem]">
          <p className="flex items-center gap-2">
            <FaIcon icon={icons.contactEmail} size={16} /> {siteConfig.contact.email}
          </p>
          <p className="flex items-center gap-2">
            <FaIcon icon={icons.contactPhone} size={16} /> {siteConfig.contact.phone}
          </p>
          <p className="flex items-center gap-2">
            <FaIcon icon={icons.contactLocation} size={16} /> {siteConfig.contact.location}
          </p>
        </div>
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-cyan-200/72">
            Quick Links
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm sm:justify-start sm:text-[0.98rem]">
            {[...pageLinks, ...legalLinks].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border border-white/15 px-4 py-2.5 text-slate-200 transition hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

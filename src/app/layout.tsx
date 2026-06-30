import type { Metadata } from "next";
import localFont from "next/font/local";
import { Geist_Mono } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { absoluteUrl, siteConfig } from "@/lib/site-config";
import "./globals.css";

config.autoAddCss = false;

const figtree = localFont({
  src: [
    {
      path: "../../public/Figtree/Figtree-VariableFont_wght.ttf",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../public/Figtree/Figtree-Italic-VariableFont_wght.ttf",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-figtree",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | B2B Solar Module Manufacturer`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | B2B Solar Module Manufacturer`,
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: absoluteUrl(siteConfig.socialImage),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} solar module solutions`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | B2B Solar Module Manufacturer`,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.socialImage)],
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${figtree.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-white font-sans text-brand-ink antialiased">
        {children}
      </body>
    </html>
  );
}

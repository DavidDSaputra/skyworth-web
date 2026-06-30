function normalizeBaseUrl(value: string | undefined) {
  const fallback = process.env.NODE_ENV === "production"
    ? "https://www.skyworth-pv.com"
    : "http://localhost:3000";
  const raw = value?.trim() || fallback;
  return raw.replace(/\/+$/, "");
}

function emailFromBaseUrl(baseUrl: string) {
  const hostname = new URL(baseUrl).hostname.replace(/^www\./, "");
  return `no-reply@${hostname}`;
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Skyworth PV",
  legalName:
    process.env.NEXT_PUBLIC_SITE_LEGAL_NAME ?? "Skyworth Photovoltaic",
  url: normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL),
  description:
    "B2B photovoltaic modules, datasheets, certificates, project cases, and RFQ lead capture for EPCs and solar procurement teams.",
  keywords: [
    "solar modules",
    "photovoltaic",
    "B2B solar",
    "solar manufacturer",
    "Skyworth PV",
    "solar procurement",
    "EPC solar",
    "commercial solar panels",
    "monocrystalline solar panels",
    "solar distribution"
  ],
  contact: {
    email: process.env.NEXT_PUBLIC_SALES_EMAIL ?? "sales@skyworth-pv.com",
    phone: process.env.NEXT_PUBLIC_SALES_PHONE ?? "+62 21 5550 0199",
    location: process.env.NEXT_PUBLIC_OFFICE_LOCATION ?? "Jakarta, Indonesia",
  },
  socialImage:
    process.env.NEXT_PUBLIC_SOCIAL_IMAGE ??
    "/hero_banner.png",
};

export function absoluteUrl(path = "/") {
  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function defaultFromEmail() {
  return emailFromBaseUrl(siteConfig.url);
}

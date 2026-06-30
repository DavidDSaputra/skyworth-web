export type Locale = "en" | "id";

export type ProductTranslation = {
  locale: Locale;
  name: string;
  shortDescription: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
};

export type Datasheet = {
  id: string;
  label: string;
  filename: string;
  storageUrl: string;
  fileSize: number;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  category: string;
  productLine: string;
  featured: boolean;
  powerW: number;
  efficiency: number;
  cells: string;
  warranty: string;
  thumbnail: string;
  heroImage: string;
  features: string[];
  certifications: string[];
  specs: Record<string, string | number>;
  gallery: { url: string; caption: string }[];
  datasheets: Datasheet[];
  translations: ProductTranslation[];
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  location: string;
  projectSize: string;
  productSku: string;
  lat: number;
  lng: number;
  summary: string;
  image: string;
};

export type Article = {
  id: string;
  type: "article" | "event";
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string;
};

export type LeadPayload = {
  type: "rfq" | "contact";
  productId?: string;
  productName?: string;
  productSku?: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  quantity?: string;
  projectType?: string;
  message: string;
  clientId?: string;
  website?: string;
};

export type LeadStatus = "new" | "contacted" | "archived";

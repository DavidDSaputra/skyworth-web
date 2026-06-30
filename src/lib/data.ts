import "server-only";
import type { Article, CaseStudy, Locale } from "./types";
import { formatBytes, getTranslation } from "./product-helpers";
export {
  createProduct,
  deleteProduct,
  getDatasheetById,
  getProductById,
  getProductBySlug,
  listProducts,
  updateProduct,
} from "./product-store";

export const locales: { code: Locale; name: string }[] = [
  { code: "en", name: "English" },
  { code: "id", name: "Indonesia" },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "case-java-utility",
    title: "32 MW utility solar farm",
    slug: "java-utility-solar-farm",
    location: "East Java, Indonesia",
    projectSize: "32 MW",
    productSku: "SKY-PV-550M",
    lat: -7.5361,
    lng: 112.2384,
    summary:
      "Repeatable module batches and documentation packs helped the EPC compress procurement review time.",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "case-rooftop",
    title: "Multi-site industrial rooftop rollout",
    slug: "industrial-rooftop-rollout",
    location: "Bekasi, Indonesia",
    projectSize: "4.8 MWp",
    productSku: "SKY-PV-430R",
    lat: -6.2383,
    lng: 107.0022,
    summary:
      "A compact rooftop module simplified logistics across six factories with constrained roof access.",
    image:
      "https://images.unsplash.com/photo-1592833159155-c62df1b65634?auto=format&fit=crop&w=1000&q=80",
  },
];

export const articles: Article[] = [
  {
    id: "article-quality",
    type: "article",
    title: "How EPC teams evaluate PV module bankability",
    slug: "pv-module-bankability",
    publishedAt: "2026-05-18",
    excerpt:
      "A technical checklist for certificates, batch traceability, warranty, and datasheet consistency.",
  },
  {
    id: "event-jakarta",
    type: "event",
    title: "Meet Skyworth at Solar & Storage Indonesia",
    slug: "solar-storage-indonesia",
    publishedAt: "2026-07-09",
    excerpt:
      "Book a meeting with our sales engineers to discuss modules, datasheets, and project requirements.",
  },
];

export { formatBytes, getTranslation };

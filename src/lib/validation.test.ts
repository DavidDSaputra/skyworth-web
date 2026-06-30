import { describe, expect, it } from "vitest";
import { leadSchema, productSchema } from "./validation";

const validProduct = {
  sku: "TEST-PV-001",
  slug: "test-pv-001",
  category: "PV Module",
  productLine: "QA Sandbox",
  featured: false,
  powerW: 575,
  efficiency: 22.4,
  cells: "144 half-cell N-type",
  warranty: "15-year product / 30-year output",
  thumbnail: "https://example.com/thumb.jpg",
  heroImage: "https://example.com/hero.jpg",
  features: ["High efficiency module"],
  certifications: ["IEC 61215"],
  specs: {
    "Maximum power": "575 W",
  },
  gallery: [
    {
      url: "https://example.com/gallery.jpg",
      caption: "Module field test",
    },
  ],
  datasheets: [
    {
      label: "Datasheet",
      filename: "datasheet.pdf",
      storageUrl: "https://example.com/datasheet.pdf",
      fileSize: 12345,
    },
  ],
  translations: [
    {
      locale: "en",
      name: "Test PV Module",
      shortDescription: "Valid English product summary.",
      description: "Valid English product description for testing payloads.",
      metaTitle: "Test PV Module",
      metaDescription: "Valid English meta description.",
    },
    {
      locale: "id",
      name: "Modul PV Test",
      shortDescription: "Ringkasan produk bahasa Indonesia yang valid.",
      description: "Deskripsi produk bahasa Indonesia yang valid untuk tes.",
      metaTitle: "Modul PV Test",
      metaDescription: "Meta description bahasa Indonesia yang valid.",
    },
  ],
};

describe("leadSchema", () => {
  it("accepts a valid RFQ lead", () => {
    const parsed = leadSchema.safeParse({
      type: "rfq",
      name: "Dina Solar",
      company: "Solar EPC",
      email: "dina@example.com",
      message: "Please send a module datasheet and price indication.",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid email addresses", () => {
    const parsed = leadSchema.safeParse({
      type: "contact",
      name: "Dina Solar",
      company: "Solar EPC",
      email: "not-an-email",
      message: "Please send a module datasheet and price indication.",
    });

    expect(parsed.success).toBe(false);
  });
});

describe("productSchema", () => {
  it("accepts a complete bilingual product payload", () => {
    const parsed = productSchema.safeParse(validProduct);

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid slugs", () => {
    const parsed = productSchema.safeParse({
      ...validProduct,
      slug: "Invalid Slug",
    });

    expect(parsed.success).toBe(false);
  });
});

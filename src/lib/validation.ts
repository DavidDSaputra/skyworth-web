import { z } from "zod";

export const leadSchema = z.object({
  type: z.enum(["rfq", "contact"]),
  productId: z.string().optional(),
  productName: z.string().optional(),
  productSku: z.string().optional(),
  name: z.string().min(2, "Name is required"),
  company: z.string().min(2, "Company is required"),
  email: z.email("A valid email is required"),
  phone: z.string().optional(),
  quantity: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  clientId: z.string().optional(),
  website: z.string().optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

const translationSchema = z.object({
  locale: z.enum(["en", "id"]),
  name: z.string().trim().min(2, "Product name is required"),
  shortDescription: z
    .string()
    .trim()
    .min(10, "Short description must be at least 10 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),
  metaTitle: z.string().trim().min(2, "Meta title is required"),
  metaDescription: z
    .string()
    .trim()
    .min(10, "Meta description must be at least 10 characters"),
});

const galleryItemSchema = z.object({
  url: z.url("Gallery image URL must be valid"),
  caption: z.string().trim().min(2, "Gallery caption is required"),
});

const datasheetSchema = z.object({
  id: z.string().trim().optional(),
  label: z.string().trim().min(2, "Datasheet label is required"),
  filename: z.string().trim().min(2, "Datasheet filename is required"),
  storageUrl: z.url("Datasheet URL must be valid"),
  fileSize: z.coerce.number().int().nonnegative("Datasheet file size is invalid"),
});

export const productSchema = z
  .object({
    sku: z.string().trim().min(3, "SKU is required"),
    slug: z
      .string()
      .trim()
      .min(3, "Slug is required")
      .regex(/^[a-z0-9-]+$/, "Slug must use lowercase letters, numbers, and hyphens"),
    category: z.string().trim().min(2, "Category is required"),
    productLine: z.string().trim().min(2, "Product line is required"),
    featured: z.boolean(),
    powerW: z.coerce.number().positive("Power must be greater than zero"),
    efficiency: z.coerce.number().positive("Efficiency must be greater than zero"),
    cells: z.string().trim().min(2, "Cell configuration is required"),
    warranty: z.string().trim().min(2, "Warranty is required"),
    thumbnail: z.url("Thumbnail URL must be valid"),
    heroImage: z.url("Hero image URL must be valid"),
    features: z
      .array(z.string().trim().min(2))
      .min(1, "At least one product feature is required"),
    certifications: z
      .array(z.string().trim().min(2))
      .min(1, "At least one certification is required"),
    specs: z
      .record(z.string().trim().min(1), z.union([z.string().trim().min(1), z.number()]))
      .refine((value) => Object.keys(value).length > 0, "At least one spec is required"),
    gallery: z.array(galleryItemSchema).min(1, "At least one gallery item is required"),
    datasheets: z.array(datasheetSchema).min(1, "At least one datasheet is required"),
    translations: z.array(translationSchema).superRefine((translations, ctx) => {
      const locales = new Set(translations.map((item) => item.locale));
      if (!locales.has("en") || !locales.has("id")) {
        ctx.addIssue({
          code: "custom",
          message: "Both English and Indonesian translations are required",
        });
      }
    }),
  })
  .transform((input) => ({
    ...input,
    features: input.features.map((item) => item.trim()),
    certifications: input.certifications.map((item) => item.trim()),
  }));

export type ProductInput = z.infer<typeof productSchema>;

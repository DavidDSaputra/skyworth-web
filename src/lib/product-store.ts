import { promises as fs } from "node:fs";
import path from "node:path";
import type { Product } from "./types";
import type { ProductInput } from "./validation";

const productsFilePath = path.join(process.cwd(), "src", "data", "products.json");

async function readProductsFile() {
  const raw = await fs.readFile(productsFilePath, "utf8");
  return JSON.parse(raw) as Product[];
}

async function writeProductsFile(products: Product[]) {
  await fs.writeFile(productsFilePath, `${JSON.stringify(products, null, 2)}\n`);
}

function buildDatasheetId(slug: string, index: number) {
  return `ds-${slug}-${index + 1}`;
}

function buildProductId(slug: string) {
  return `prod-${slug}`;
}

function normalizeProduct(input: ProductInput, productId: string): Product {
  return {
    ...input,
    id: productId,
    datasheets: input.datasheets.map((datasheet, index) => ({
      ...datasheet,
      id: datasheet.id?.trim() || buildDatasheetId(input.slug, index),
    })),
  };
}

export async function listProducts() {
  const products = await readProductsFile();
  return products.sort((a, b) => a.slug.localeCompare(b.slug));
}

export async function getProductBySlug(slug: string) {
  const products = await readProductsFile();
  return products.find((product) => product.slug === slug);
}

export async function getProductById(id: string) {
  const products = await readProductsFile();
  return products.find((product) => product.id === id);
}

export async function getDatasheetById(id: string) {
  const products = await readProductsFile();

  for (const product of products) {
    const datasheet = product.datasheets.find((item) => item.id === id);
    if (datasheet) {
      return { product, datasheet };
    }
  }

  return undefined;
}

export async function createProduct(input: ProductInput) {
  const products = await readProductsFile();

  if (products.some((product) => product.slug === input.slug)) {
    throw new Error("A product with this slug already exists.");
  }

  if (products.some((product) => product.sku === input.sku)) {
    throw new Error("A product with this SKU already exists.");
  }

  const baseId = buildProductId(input.slug);
  const productId = products.some((product) => product.id === baseId)
    ? `${baseId}-${crypto.randomUUID().slice(0, 6)}`
    : baseId;
  const product = normalizeProduct(input, productId);

  products.push(product);
  await writeProductsFile(products);

  return product;
}

export async function updateProduct(id: string, input: ProductInput) {
  const products = await readProductsFile();
  const productIndex = products.findIndex((product) => product.id === id);

  if (productIndex === -1) {
    throw new Error("Product not found.");
  }

  if (products.some((product) => product.id !== id && product.slug === input.slug)) {
    throw new Error("A product with this slug already exists.");
  }

  if (products.some((product) => product.id !== id && product.sku === input.sku)) {
    throw new Error("A product with this SKU already exists.");
  }

  const updated = normalizeProduct(input, id);
  products[productIndex] = updated;
  await writeProductsFile(products);

  return updated;
}

export async function deleteProduct(id: string) {
  const products = await readProductsFile();
  const nextProducts = products.filter((product) => product.id !== id);

  if (nextProducts.length === products.length) {
    throw new Error("Product not found.");
  }

  await writeProductsFile(nextProducts);
}

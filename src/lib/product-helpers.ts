import type { Locale, Product } from "./types";

export function getTranslation(product: Product, locale: Locale) {
  return (
    product.translations.find((translation) => translation.locale === locale) ??
    product.translations[0]
  );
}

export function formatBytes(bytes: number) {
  const megabytes = bytes / 1024 / 1024;
  return `${megabytes.toFixed(1)} MB`;
}

/**
 * Formats a number with thousand separators.
 * Example: 3456 -> "3,456"
 */
export function formatNumberWithCommas(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return new Intl.NumberFormat("en-GB").format(value);
}

/**
 * Formats a number as GBP currency.
 * Example: 1.44 -> "£1.44"
 */
export function formatCurrency(value: unknown): string | null {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

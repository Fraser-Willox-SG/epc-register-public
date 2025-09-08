/** Uppercase + trim, collapse inner spaces. */
export function normalizePostcode(input: string): string {
  return input.trim().toUpperCase().replace(/\s+/g, " ");
}

/** UK postcode (GB+specials). Accepts optional space. */
export function isValidUKPostcode(raw: string): boolean {
  const s = normalizePostcode(raw).replace(/\s/g, "");
  // Common outward/inward formats incl. BFPO & GIR, not fully exhaustive but robust.
  const re = /^(GIR0AA|BFPO(?:C\/O)?\d{1,4}|[A-Z]{1,2}\d[A-Z\d]?\d[A-Z]{2})$/i;
  return re.test(s);
}

/** 16 digits, with or without hyphens/spaces (e.g. 1234-5678-9012-3456). */
export function normalizeRRN(input: string): string {
  return input.replace(/[^\d]/g, "");
}

export function isValidRRN(raw: string): boolean {
  return normalizeRRN(raw).length === 16;
}

/** Format RRN as 1234-5678-9012-3456 for display. */
export function formatRRN(raw: string): string {
  const d = normalizeRRN(raw);
  return d.replace(/(\d{4})(?=\d)/g, "$1-").replace(/-$/, "");
}

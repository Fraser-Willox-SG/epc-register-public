// /utils/epc.ts
import { RecommendedImprovement } from "@/types/epc-dom";

/** EPC A–G band (display-normalised elsewhere) */
export type Band = "A" | "B" | "C" | "D" | "E" | "F" | "G";
export const BANDS: readonly Band[] = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
] as const;

export const COLORS: Record<Band, string> = {
  A: "#0b7a3b",
  B: "#2a9d55",
  C: "#86b870",
  D: "#ffd83d",
  E: "#f4b942",
  F: "#de6d3b",
  G: "#d03434",
};

export const LANE: Record<Band, string> = {
  A: "#e9f4ec",
  B: "#ecf7ef",
  C: "#f1f7ee",
  D: "#fff9dc",
  E: "#fff2cf",
  F: "#fde7e0",
  G: "#fde2e0",
};

export const isBand = (v: unknown): v is Band =>
  typeof v === "string" && BANDS.includes(v.toUpperCase() as Band);

const NA_GREY = "#DDDDDD";
export const bandColor = (band?: Band | null) =>
  band ? COLORS[band] : NA_GREY;

export const bandTextColor = (b: Band) =>
  b === "C" || b === "D" || b === "E" ? "#374151" : "#ffffff";

/** Coerce raw API band (often lower/extra whitespace) to a strict Band */
export function toBand(v?: string | null): Band | undefined {
  if (!v) return undefined;
  const up = v.trim().toUpperCase();
  return isBand(up) ? (up as Band) : undefined;
}

/** Largest numeric 'typicalSaving' across improvements (string), else null */
export function getMaxTypicalSaving(
  imps?: RecommendedImprovement[] | null
): string | null {
  if (!imps?.length) return null;
  const max = imps.reduce((acc, i) => {
    const n = Number(String(i.typicalSaving ?? "").replace(/[^\d.]/g, ""));
    return Number.isFinite(n) ? Math.max(acc, n) : acc;
  }, 0);
  return max > 0 ? String(max) : null;
}

// Helper to format whole-pound GBP values like £1,275
export const formatGBP = (n: number | null | undefined) => {
  if (n === null || n === undefined || Number.isNaN(n)) return "—";
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(n);
};

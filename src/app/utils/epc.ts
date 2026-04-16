// /utils/epc.ts
import { RecommendedImprovement } from "@/types/epc-dom-hem";

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

/** CEPC band supports optional "+" */
export type CepcBand =
  | "A"
  | "A+"
  | "B"
  | "B+"
  | "C"
  | "C+"
  | "D"
  | "D+"
  | "E"
  | "E+"
  | "F"
  | "F+"
  | "G"
  | "G+";

/** Any band used in shared components */
export type AnyBand = Band | CepcBand;

export const COLORS: Record<Band, string> = {
  A: "#0b7a3b",
  B: "#2a9d55",
  C: "#86b870",
  D: "#ffd83d",
  E: "#f4b942",
  F: "#de6d3b",
  G: "#d03434",
};

export const COLORS_CO2: Record<Band, string> = {
  A: "#CDE2F5",
  B: "#97C0EE",
  C: "#73A1FF",
  D: "#4E84C4",
  E: "#A8A8A8",
  F: "#868686",
  G: "#686868",
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

export const LANE_CO2: Record<Band, string> = {
  A: "#EDF4FB",
  B: "#E6F0FA",
  C: "#E3ECF9",
  D: "#E1E8F3",
  E: "#F2F2F2",
  F: "#ECECEC",
  G: "#E6E6E6",
};

export const isBand = (v: unknown): v is Band =>
  typeof v === "string" && BANDS.includes(v.trim().toUpperCase() as Band);

export const isCepcBand = (v: unknown): v is CepcBand => {
  if (typeof v !== "string") return false;
  const up = v.trim().toUpperCase();
  return /^[A-G](\+)?$/.test(up);
};

/** Map "E+" -> "E" for lane colours & chart positioning */
export function toBaseBand(v?: string | null): Band | undefined {
  if (!v) return undefined;
  const up = v.trim().toUpperCase();
  const letter = up[0]; // A..G
  return isBand(letter) ? (letter as Band) : undefined;
}

const NA_GREY = "#DDDDDD";
export const bandColor = (band?: Band | null) =>
  band ? COLORS[band] : NA_GREY;

export const bandTextColor = (b: Band) =>
  b === "C" || b === "D" || b === "E" ? "#1a1a1a" : "#ffffff";

export const bandTextColor_CO2 = (b: Band) =>
  b === "A" || b === "B" || b === "C" || b === "E" || b === "F"
    ? "#1a1a1a"
    : "#ffffff";

/** Coerce raw API band (often lower/extra whitespace) to a strict Band */
export function toBand(v?: string | null): Band | undefined {
  if (!v) return undefined;
  const up = v.trim().toUpperCase();
  return isBand(up) ? (up as Band) : undefined;
}

/** Largest numeric 'typicalSaving' across improvements (string), else null */
export function getMaxTypicalSaving(
  imps?: RecommendedImprovement[] | null,
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

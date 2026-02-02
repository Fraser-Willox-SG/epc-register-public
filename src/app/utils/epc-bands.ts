export type EpcBand = "A" | "B" | "C" | "D" | "E" | "F" | "G";

/**
 * EPC band thresholds used for:
 * - Energy Efficiency Rating
 * - Environmental Impact (CO₂) Rating
 */
export function bandFromScore(
  score: number | null | undefined,
): EpcBand | null {
  if (score == null) return null;
  if (score >= 92) return "A";
  if (score >= 81) return "B";
  if (score >= 69) return "C";
  if (score >= 55) return "D";
  if (score >= 39) return "E";
  if (score >= 21) return "F";
  if (score >= 1) return "G";
  return null;
}

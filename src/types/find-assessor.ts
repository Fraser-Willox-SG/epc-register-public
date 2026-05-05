export type AdvisorType = "epc" | "section63" | "dec";

export interface UKGAssessor {
  schemeAssessorId: string;
  firstName?: string;
  lastName?: string;
  registeredBy?: { name?: string | null } | null;
  contactDetails?: {
    email?: string | null;
    telephoneNumber?: string | null;
  } | null;
  qualifications?: Record<string, "ACTIVE" | "INACTIVE" | string>;
  distanceFromPostcodeInMiles?: number | null;
  searchResultsComparisonPostcode?: string | null;
}

export interface UKGResponse {
  data?: { assessors?: UKGAssessor[] };
  meta?: { searchPostcode?: string };
}

/** Normalised shape we use in the app’s table */
export interface Assessor {
  schemeAssessorId: string;
  firstName: string;
  lastName: string;
  registeredBy?: { name?: string | null } | null;
  contactDetails?: {
    email?: string | null;
    telephoneNumber?: string | null;
  } | null;
  qualifications?: Record<string, "ACTIVE" | "INACTIVE" | string>;
  distanceFromPostcodeInMiles?: number | null;
  searchResultsComparisonPostcode?: string | null;
}

export function deriveAssessorTypes(
  quals?: Record<string, "ACTIVE" | "INACTIVE" | string>,
): string[] {
  const q = quals ?? {};
  const on = (k: string) => q[k] === "ACTIVE";

  const out: string[] = [];

  // Domestic / dwelling
  if (
    on("domesticRdSap") ||
    on("scotlandRdsap") ||
    on("scotlandSapExistingBuilding")
  ) {
    out.push("Existing dwelling");
  }

  if (on("domesticSap") || on("scotlandSapNewBuilding")) {
    out.push("New dwelling");
  }

  // Non-domestic EPC / building
  if (
    on("nonDomesticNos3") ||
    on("nonDomesticNos4") ||
    on("nonDomesticNos5") ||
    on("scotlandNondomesticExistingBuilding") ||
    on("scotlandNondomesticNewBuilding")
  ) {
    out.push("Non-domestic building");
  }

  // DEC / advisory report
  if (on("nonDomesticDec") || on("scotlandDecAndAr")) {
    out.push("DEC assessor");
  }

  // Section 63
  if (on("scotlandSection63")) {
    out.push("Section 63 advisor");
  }

  // Air conditioning inspection
  if (on("nonDomesticSp3")) out.push("Air conditioning inspection (L3)");
  if (on("nonDomesticCc4")) out.push("Air conditioning inspection (L4)");

  return Array.from(new Set(out));
}

/**
 * Search options presented to users.
 */
export const ADVISOR_TYPES = ["epc", "section63", "dec"] as const;

export type AdvisorType = (typeof ADVISOR_TYPES)[number];

/**
 * Values currently returned by UKG for qualification statuses.
 */
export type QualificationStatus = "ACTIVE" | "INACTIVE";

/**
 * Scottish qualification fields returned by UKG.
 *
 * These fields are the source of truth for the Scottish EPC website.
 * The similarly named domestic/nonDomestic fields are not used when
 * displaying Scottish assessor capabilities.
 */
export const SCOTTISH_QUALIFICATION_KEYS = [
  "scotlandRdsap",
  "scotlandSapExistingBuilding",
  "scotlandSapNewBuilding",
  "scotlandDecAndAr",
  "scotlandNondomesticExistingBuilding",
  "scotlandNondomesticNewBuilding",
  "scotlandSection63",
] as const;

export type ScottishQualificationKey =
  (typeof SCOTTISH_QUALIFICATION_KEYS)[number];

/**
 * Qualifications returned by UKG.
 *
 * The index signature allows UKG to add fields without immediately breaking
 * this application. Known fields are included explicitly for discoverability
 * and editor autocomplete.
 */
export interface UKGQualifications {
  [key: string]: string | undefined;

  /*
   * Non-Scottish qualification fields.
   *
   * These are present in the API response, but deliberately not used to
   * determine what a Scottish assessor can do.
   */
  domesticSap?: QualificationStatus;
  domesticRdSap?: QualificationStatus;
  nonDomesticSp3?: QualificationStatus;
  nonDomesticCc4?: QualificationStatus;
  nonDomesticDec?: QualificationStatus;
  nonDomesticNos3?: QualificationStatus;
  nonDomesticNos4?: QualificationStatus;
  nonDomesticNos5?: QualificationStatus;
  gda?: QualificationStatus;

  /*
   * Scottish qualification fields.
   */
  scotlandRdsap?: QualificationStatus;
  scotlandSapExistingBuilding?: QualificationStatus;
  scotlandSapNewBuilding?: QualificationStatus;
  scotlandDecAndAr?: QualificationStatus;
  scotlandNondomesticExistingBuilding?: QualificationStatus;
  scotlandNondomesticNewBuilding?: QualificationStatus;
  scotlandSection63?: QualificationStatus;
}

/**
 * Maps each user-facing search option to the UKG qualification fields that
 * should be queried.
 *
 * Keeping this mapping in the same file as the display mapping reduces the
 * risk of search results and displayed qualifications getting out of sync.
 */
const SEARCH_QUALIFICATIONS: Record<
  AdvisorType,
  readonly ScottishQualificationKey[]
> = {
  epc: [
    "scotlandRdsap",
    "scotlandSapExistingBuilding",
    "scotlandSapNewBuilding",
    "scotlandNondomesticExistingBuilding",
    "scotlandNondomesticNewBuilding",
  ],
  dec: ["scotlandDecAndAr"],
  section63: ["scotlandSection63"],
};

/**
 * Labels used when describing the selected search options.
 */
export const ADVISOR_TYPE_LABELS: Record<AdvisorType, string> = {
  epc: "Energy Performance Certificate (EPC) Assessors",
  section63: "Section 63 Advisors",
  dec: "Display Energy Certificate (DEC) Assessors",
};

export function isAdvisorType(value: string): value is AdvisorType {
  return (ADVISOR_TYPES as readonly string[]).includes(value);
}

export function qualificationsForAdvisorType(
  type: AdvisorType,
): readonly ScottishQualificationKey[] {
  return SEARCH_QUALIFICATIONS[type];
}

/**
 * Tests whether a Scottish qualification is active.
 *
 * Status matching is intentionally strict because UKG currently returns
 * uppercase ACTIVE and INACTIVE values.
 */
export function isQualificationActive(
  qualifications: UKGQualifications | undefined,
  qualification: ScottishQualificationKey,
): boolean {
  return qualifications?.[qualification] === "ACTIVE";
}

export interface UKGAssessor {
  schemeAssessorId: string;
  firstName?: string;
  lastName?: string;

  registeredBy?: {
    name?: string | null;
    schemeId?: number | null;
  } | null;

  contactDetails?: {
    email?: string | null;
    telephoneNumber?: string | null;
  } | null;

  qualifications?: UKGQualifications;

  distanceFromPostcodeInMiles?: number | null;
  searchResultsComparisonPostcode?: string | null;
}

export interface UKGResponse {
  data?: {
    assessors?: UKGAssessor[];
  };

  meta?: {
    searchPostcode?: string;
  };
}

/**
 * Normalised assessor shape used by the application.
 *
 * Values that may be absent in the UKG response are normalised so components
 * do not need to repeatedly distinguish between undefined and null.
 */
export interface Assessor {
  schemeAssessorId: string;
  firstName: string;
  lastName: string;

  registeredBy: {
    name?: string | null;
    schemeId?: number | null;
  } | null;

  contactDetails: {
    email?: string | null;
    telephoneNumber?: string | null;
  } | null;

  qualifications: UKGQualifications;

  distanceFromPostcodeInMiles: number | null;
  searchResultsComparisonPostcode: string | null;
}

/**
 * User-facing capability rules.
 *
 * Multiple UKG qualifications can map to the same plain-English label.
 * For example, both Scottish RdSAP and Scottish SAP existing-building
 * qualifications are presented as "Existing dwelling".
 */
const ASSESSOR_TYPE_RULES: ReadonlyArray<{
  label: string;
  qualifications: readonly ScottishQualificationKey[];
}> = [
  {
    label: "Existing dwelling",
    qualifications: ["scotlandRdsap", "scotlandSapExistingBuilding"],
  },
  {
    label: "New dwelling",
    qualifications: ["scotlandSapNewBuilding"],
  },
  {
    label: "Non-domestic building",
    qualifications: [
      "scotlandNondomesticExistingBuilding",
      "scotlandNondomesticNewBuilding",
    ],
  },
  {
    label: "DEC assessor",
    qualifications: ["scotlandDecAndAr"],
  },
  {
    label: "Section 63 advisor",
    qualifications: ["scotlandSection63"],
  },
];

/**
 * Derives the capabilities displayed in the results table.
 *
 * Important:
 * This function deliberately ignores the non-Scottish domesticSap,
 * domesticRdSap, nonDomesticDec, nonDomesticNos*, nonDomesticSp3 and
 * nonDomesticCc4 fields.
 *
 * Air-conditioning L3/L4 labels are therefore no longer displayed because
 * UKG has not provided equivalent Scottish qualification fields for them.
 */
export function deriveAssessorTypes(
  qualifications?: UKGQualifications,
): string[] {
  return ASSESSOR_TYPE_RULES.filter((rule) =>
    rule.qualifications.some((qualification) =>
      isQualificationActive(qualifications, qualification),
    ),
  ).map((rule) => rule.label);
}

// --- shared sub-types -----------------------------------

/**
 * Scottish Government API responses are wrapped in a { data, meta } envelope.
 */
export interface ApiEnvelope<T> {
  data: T;
  meta: Record<string, unknown>;
}

export interface Address {
  addressId: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  town: string;
  postcode: string;
}

export interface CompanyDetails {
  name: string;
  address: string;
}

export interface ContactDetails {
  email: string | null;
  telephoneNumber: string | null;
}

export interface RegisteredBy {
  name: string;
  schemeId: number;
}

export interface Assessor {
  schemeAssessorId: string;
  companyDetails: CompanyDetails;
  contactDetails: ContactDetails;
  firstName: string;
  lastName: string;
  registeredBy: RegisteredBy;
}

export interface RelatedAssessment {
  assessmentId: string;
  assessmentStatus: string;
  assessmentType: string;
  assessmentExpiryDate: string;
  optOut: boolean;
}

// --- DEC specific ---------------------------------------

export interface DecAssessmentHistory {
  date: string | null;
  energyEfficiencyRating: number | null;
  energyEfficiencyBand: string | null;
  heatingCo2: number | null;
  electricityCo2: number | null;
  renewablesCo2: number | null;
}

export interface DecTechnicalInformation {
  mainHeatingFuel: string | null;
  buildingEnvironment: string | null;
  floorArea: number | null;
  occupier: string | null;
  assetRating: number | null;
  annualEnergyUseFuelThermal: number | null;
  annualEnergyUseElectrical: number | null;
  typicalThermalUse: number | null;
  typicalElectricalUse: number | null;
  renewablesFuelThermal: number | null;
  renewablesElectrical: number | null;
}

export interface DecAdministrativeInformation {
  issueDate: string | null;
  calculationTool: string | null;
  relatedPartyDisclosure: string | null;
  relatedRrn: string | null;
}

export interface DecSummary {
  typeOfAssessment: "DEC";
  assessmentId: string;
  dateOfAssessment: string;
  dateOfExpiry: string;
  dateOfRegistration: string;
  address: Address;
  schemaVersion: string; // e.g. "7.0"
  reportType: string; // "1"
  currentAssessment: DecAssessmentHistory;
  year1Assessment: DecAssessmentHistory | null;
  year2Assessment: DecAssessmentHistory | null;
  technicalInformation: DecTechnicalInformation;
  assessor: Assessor;
  administrativeInformation: DecAdministrativeInformation;
  addressId: string;
  optOut: boolean;
  supersededBy: string | null;
  relatedAssessments: RelatedAssessment[];
  countryName?: string | null;
}

// --- AR / DEC-AR specific ------------------------------

export interface Recommendation {
  code: string;
  text: string;
  cO2Impact: string;
}

export interface ArAdministrativeInformation {
  issueDate: string | null;
  calculationTool: string | null;
  relatedRrn: string | null;
}

export interface ArTechnicalInformation {
  buildingEnvironment: string | null;
  floorArea: number | null;
  occupier: string | null;
  propertyType: string | null;
  renewableSources: string | null;
  discountedEnergy: string | null;
  inspectionType: string | null;
}

export interface SiteService {
  description: string;
  quantity: number;
}

export interface ArSummary {
  typeOfAssessment: "DEC-AR";
  assessmentId: string;
  reportType: string;
  dateOfAssessment: string;
  dateOfRegistration: string;
  dateOfExpiry: string;

  address: Address;
  assessor: Assessor;

  shortPaybackRecommendations: Recommendation[];
  mediumPaybackRecommendations: Recommendation[];
  longPaybackRecommendations: Recommendation[];

  // NEW NAME (from Postman)
  otherPaybackRecommendations: Recommendation[];

  technicalInformation: ArTechnicalInformation;
  administrativeInformation: ArAdministrativeInformation;

  siteServiceOne: SiteService;
  siteServiceTwo: SiteService;
  siteServiceThree: SiteService;

  addressId: string;
  optOut: boolean;
  supersededBy: string | null;
  relatedAssessments: RelatedAssessment[];

  countryName?: string | null;

  // Optional — only if your own API injects this
  energyBandFromRelatedCertificate?: string | null;
}

/**
 * Combined view model for pages/components that present DEC + DEC-AR together.
 * (Not returned by the SG API; it is a UI-friendly composed shape.)
 */
export interface CombinedDecarSummary {
  typeOfAssessment: "DEC+DEC-AR";
  dec: DecSummary;
  decAr: ArSummary;
}

// API-returned union ONLY
export type DecarSummary = DecSummary | ArSummary;

// Optional: if some code truly accepts either API or combined
export type AnyDecarSummary = DecarSummary | CombinedDecarSummary;

// API envelopes (what you actually get back over HTTP)
export type DecResponse = ApiEnvelope<DecSummary>;
export type DecArResponse = ApiEnvelope<ArSummary>;

export function isDecAr(summary: DecarSummary): summary is ArSummary {
  return summary.typeOfAssessment === "DEC-AR";
}

export function isDec(summary: DecarSummary): summary is DecSummary {
  return summary.typeOfAssessment === "DEC";
}

export function isCombinedDecar(
  summary: AnyDecarSummary,
): summary is CombinedDecarSummary {
  return summary.typeOfAssessment === "DEC+DEC-AR";
}

export function getAssessorDisplayName(assessor: Assessor): string {
  return `${assessor.firstName} ${assessor.lastName}`.trim();
}

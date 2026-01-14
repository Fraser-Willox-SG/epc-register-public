export type EpcBandLetter = "a" | "b" | "c" | "d" | "e" | "f" | "g";

export interface EpcNonDomCepcAddress {
  addressId?: string;
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  town?: string;
  postcode?: string;
}

export interface CepcRegisteredBy {
  name?: string;
  schemeId?: number;
}

export interface CepcCompanyDetails {
  name?: string;
  address?: string;
}

export interface CepcContactDetails {
  email?: string;
  telephone?: string;
}

export interface CepcAssessor {
  schemeAssessorId?: string;
  name?: string;
  companyDetails?: CepcCompanyDetails;
  contactDetails?: CepcContactDetails;
  registeredBy?: CepcRegisteredBy;
}

export interface CepcTechnicalInformation {
  mainHeatingFuel?: string;
  buildingEnvironment?: string; // e.g. "Air Conditioning"
  floorArea?: string;
  buildingLevel?: number;
  [k: string]: unknown;
}

export interface CepcBase {
  assessmentId: string;
  dateOfAssessment?: string;
  dateOfExpiry?: string;
  dateOfRegistration?: string;

  reportType?: string;

  address?: EpcNonDomCepcAddress;
  addressId?: string;

  assessor?: CepcAssessor;

  relatedPartyDisclosure?: string;
  buildingComplexity?: number;

  optOut?: boolean;
  supersededBy?: string | null;
  relatedAssessments?: unknown;
}

export interface CepcCertificate extends CepcBase {
  typeOfAssessment: "CEPC";

  technicalInformation?: CepcTechnicalInformation;

  buildingEmissionRate?: string;
  primaryEnergyUse?: string;

  // Ratings / bands
  currentEnergyEfficiencyBand?: EpcBandLetter;
  currentEnergyEfficiencyRating?: number;
  energyEfficiencyRating?: number;

  // Existing/new build ratings
  existingBuildRating?: number;
  existingBuildBand?: EpcBandLetter;
  newBuildRating?: number;
  newBuildBand?: EpcBandLetter;

  propertyType?: string;

  // Link to related recommendation report
  relatedRrn?: string; // CEPC-RR RRN
}

export interface CepcRecommendationReport extends CepcBase {
  typeOfAssessment: "CEPC-RR";

  relatedCertificate?: string; // CEPC RRN
  energyBandFromRelatedCertificate?: EpcBandLetter;

  shortPaybackRecommendations?: unknown[];
  mediumPaybackRecommendations?: unknown;
  longPaybackRecommendations?: unknown;
  otherRecommendations?: unknown;

  technicalInformation?: unknown;
}

export type EpcNonDomCepcDocument = CepcCertificate | CepcRecommendationReport;

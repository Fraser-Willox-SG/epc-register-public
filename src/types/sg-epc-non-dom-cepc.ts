export type SgApiEnvelope<TData> = {
  data: TData;
  meta: Record<string, unknown>;
};

export type SgCepcAddress = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string | null;
  town: string;
  postcode: string;
};

export type SgCepcAssessorContactDetails = {
  email: string;
  tradingAddress: string;
  telephoneNumber: string;
};

export type SgCepcAssessorRegisteredBy = {
  name: string;
  schemeId: number;
};

export type SgCepcAssessor = {
  schemeAssessorId: string;
  contactDetails: SgCepcAssessorContactDetails;

  companyName: string;
  insurer: string;
  policyNo: string;
  insurerEffectiveDate: string; // YYYY-MM-DD
  insurerExpiryDate: string; // YYYY-MM-DD
  insurerPiLimit: string;

  firstName: string;
  lastName: string;

  registeredBy: SgCepcAssessorRegisteredBy;
};

export type SgCepcTechnicalInformation = {
  mainHeatingFuel: string;
  buildingEnvironment: string;
  floorArea: number;
};

export type SgCepcRecommendationCo2Impact = "LOW" | "MEDIUM" | "HIGH" | string; // forward-compatible

export type SgCepcPaybackRecommendation = {
  code: string;
  text: string;
  cO2Impact: SgCepcRecommendationCo2Impact;
};

export type SgCepcPropertyType = {
  propertyTypeLongDescription: string;
  propertyTypeShortDescription: string;
};

export type SgNonDomesticCepcCertificateSummary = {
  typeOfAssessment: "CEPC" | string;
  assessmentId: string;

  dateOfExpiry: string; // YYYY-MM-DD
  reportType: string; // e.g. "3"
  dateOfAssessment: string; // YYYY-MM-DD
  dateOfRegistration: string; // YYYY-MM-DD

  address: SgCepcAddress;
  assessor: SgCepcAssessor;

  technicalInformation: SgCepcTechnicalInformation;

  currentEnergyEfficiencyRating: number;
  potentialEnergyEfficiencyRating: number;

  currentEnergyEfficiencyBand: string; // e.g. "E+"
  potentialEnergyEfficiencyBand: string;

  newBuildBenchmarkRating: number;
  newBuildBenchmarkBand: string; // e.g. "B+"

  comparativeAssetRating: number;
  epcRatingBer: number;
  approximateEnergyUse: number;

  propertyType: SgCepcPropertyType;

  compliant2002: string; // "Y"/"N"
  renewableEnergySources: string[];
  electricitySources: string[];

  primaryEnergyIndicator: number;
  calculationTool: string;
  ter2002: number;
  ter: number;

  shortPaybackRecommendations: SgCepcPaybackRecommendation[];
  mediumPaybackRecommendations: SgCepcPaybackRecommendation[];
  longPaybackRecommendations: SgCepcPaybackRecommendation[];
  otherPaybackRecommendations: SgCepcPaybackRecommendation[];

  addressId: string;
  optOut: boolean;
  relatedAssessments: unknown[];
  supersededBy: string | null;
  countryName: string;
};

export type SgNonDomesticCepcCertificateSummaryResponse =
  SgApiEnvelope<SgNonDomesticCepcCertificateSummary>;

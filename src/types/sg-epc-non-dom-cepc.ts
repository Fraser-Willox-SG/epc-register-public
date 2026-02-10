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
  floorArea: string; // comes as string in payload
};

export type SgCepcRecommendationPaybackType =
  | "short"
  | "medium"
  | "long"
  | string; // keep forward-compatible

export type SgCepcRecommendationCo2Impact = "LOW" | "MEDIUM" | "HIGH" | string; // keep forward-compatible

export type SgCepcRecommendation = {
  paybackType: SgCepcRecommendationPaybackType;
  recommendationCode: string;
  recommendation: string;
  cO2Impact: SgCepcRecommendationCo2Impact;
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
  potentialEnergyRating: string;
  currentEnergyEfficiencyBand: string; // e.g. "G"
  potentialEnergyBand: string;

  newBuildBenchmarkRating: string;
  newBuildBenchmarkBand: string;

  comparativeAssetRating: string;
  epcRatingBer: string;
  approximateEnergyUse: string;

  propertyType: string;
  propertyShortDescription: string;

  compliant2002: string; // "Y"/"N" observed
  renewableEnergySources: string[];
  electricitySources: string[];

  primaryEnergyIndicator: string;
  calculationTool: string;
  ter2002: string;
  ter: string;

  recommendations: SgCepcRecommendation[];

  addressId: string;
  optOut: boolean;
  relatedAssessments: unknown[];
  supersededBy: string | null;
  countryName: string;
};

export type SgNonDomesticCepcCertificateSummaryResponse =
  SgApiEnvelope<SgNonDomesticCepcCertificateSummary>;

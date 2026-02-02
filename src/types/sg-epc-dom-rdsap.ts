// src/types/sg/epc-dom-rdsap.ts

export type SgEpcBandLetter =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | string;

export type SgCertificateSummaryResponse = {
  data: SgDomesticEpcCertificateSummary;
  meta: Record<string, unknown>;
};

export type SgRecommendedImprovement = {
  sequence: number;
  improvementCode: string;
  improvementTitle: string;
  improvementDescription: string | null;
  indicativeCost: string;
  typicalSaving: string;
  energyPerformanceRatingImprovement?: number;
  environmentalImpactRatingImprovement?: number;
  energyPerformanceBandImprovement?: string;
  improvementCategory?: string;
  improvementType?: string;
  greenDealCategoryCode?: string;
};

export type SgDomesticEpcCertificateSummary = {
  typeOfAssessment: string; // e.g. "SAP" (could also be "RdSAP")
  assessmentId: string; // RRN
  dateOfExpiry: string; // YYYY-MM-DD
  dateOfAssessment: string; // YYYY-MM-DD
  dateOfRegistration: string; // YYYY-MM-DD

  address: SgDomesticEpcAddress;

  assessor: SgAssessor;

  currentCarbonEmission: string; // numeric string e.g. "2.7"
  currentEnergyEfficiencyBand: SgEpcBandLetter; // e.g. "b"
  currentEnergyEfficiencyRating: number; // e.g. 90

  dwellingType: string;

  estimatedEnergyCost: string; // numeric string e.g. "1090.00"

  heatDemand: SgHeatDemand;

  heatingCostCurrent: string; // numeric string
  heatingCostPotential: string; // numeric string
  hotWaterCostCurrent: string; // numeric string
  hotWaterCostPotential: string; // numeric string
  lightingCostCurrent: string; // numeric string
  lightingCostPotential: string; // numeric string

  potentialCarbonEmission: string; // numeric string
  potentialEnergyEfficiencyBand: SgEpcBandLetter;
  potentialEnergyEfficiencyRating: number;
  potentialEnergySaving: string; // numeric string e.g. "0.00"

  propertySummary: SgPropertySummaryItem[];

  recommendedImprovements: SgRecommendedImprovement[];

  lzcEnergySources: number[];

  relatedPartyDisclosureNumber: number;
  relatedPartyDisclosureText: string | null;

  totalFloorArea: string; // numeric string e.g. "234.0"

  status: string; // e.g. "ENTERED"

  environmentalImpactCurrent: number;
  environmentalImpactPotential: number;

  primaryEnergyUse: string; // numeric string e.g. "64"

  addendum: unknown | null;

  gasSmartMeterPresent: boolean;
  electricitySmartMeterPresent: boolean;

  addressId: string;
  optOut: boolean;

  relatedAssessments: Array<Record<string, unknown>>;

  supersededBy: string | null;

  countryName: string;

  /**
   * Not currently provided in certificate-summary by UKG, but shown on live certificate.
   * Unit: kg CO2 per m² per year.
   */
  emissionsKgPerM2PerYear?: number | null;

  /**
   * Not currently provided in certificate-summary by UKG, but shown on live certificate.
   * Unit: tonnes CO2 per year (heating + lighting statement).
   */
  co2TonnesPerYearCurrent?: number | null;
};

export type SgDomesticEpcAddress = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string | null;
  town: string;
  postcode: string;
};

export type SgAssessor = {
  schemeAssessorId: string;

  contactDetails: {
    email: string;
    telephoneNumber: string;
  };

  firstName: string;
  lastName: string;

  registeredBy: {
    name: string;
    schemeId: number;
  };
};

export type SgHeatDemand = {
  currentSpaceHeatingDemand: number | null;
  currentWaterHeatingDemand: number | null;
};

export type SgPropertySummaryItem = {
  energyEfficiencyRating: number;
  environmentalEfficiencyRating: number;
  name: string; // e.g. "walls", "roof", "air_tightness"
  description: string;
};

import type { SgGreenDealCertificateFields } from "./sg-epc-green-deal";

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

export type SgSapCertificateSummaryResponse = {
  data: SgDomesticSapEpcCertificateSummary;
  meta: Record<string, unknown>;
};

export type SgSapRecommendedImprovement = {
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

export interface SgDomesticSapEpcCertificateSummary extends SgGreenDealCertificateFields {
  typeOfAssessment: "SAP" | string;
  assessmentId: string;
  dateOfExpiry: string; // YYYY-MM-DD
  dateOfAssessment: string; // YYYY-MM-DD
  dateOfRegistration: string; // YYYY-MM-DD

  address: SgDomesticSapEpcAddress;

  assessor: SgSapAssessor;

  currentCarbonEmission: number | null;
  carbonEmissionsCurrentPerFloorArea: number | null;

  currentEnergyEfficiencyBand: SgEpcBandLetter;
  currentEnergyEfficiencyRating: number;

  dwellingType: string;

  estimatedEnergyCost: string; // numeric string e.g. "917.00"

  heatDemand: SgSapHeatDemand;

  heatingCostCurrent: string;
  heatingCostPotential: string;
  hotWaterCostCurrent: string;
  hotWaterCostPotential: string;
  lightingCostCurrent: string;
  lightingCostPotential: string;

  potentialCarbonEmission: number | null;
  potentialEnergyEfficiencyBand: SgEpcBandLetter;
  potentialEnergyEfficiencyRating: number;
  potentialEnergySaving: string; // numeric string e.g. "0.00"

  propertySummary: SgSapPropertySummaryItem[];

  recommendedImprovements: SgSapRecommendedImprovement[];

  lzcEnergySources: number[];

  relatedPartyDisclosureNumber: number;
  relatedPartyDisclosureText: string | null;

  totalFloorArea: number;

  status: string;

  environmentalImpactCurrent: number;
  environmentalImpactPotential: number;

  primaryEnergyUse: number;

  addendum: unknown | null;

  gasSmartMeterPresent: boolean | null;
  electricitySmartMeterPresent: boolean | null;

  addressId: string;
  optOut: boolean;

  relatedAssessments: Array<Record<string, unknown>>;

  supersededBy: string | null;

  countryName: string;
}

export type SgDomesticSapEpcAddress = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string | null;
  town: string;
  postcode: string;
};

export type SgSapAssessor = {
  schemeAssessorId: string;
  companyName: string;
  contactDetails: {
    email: string;
    address: string;
    telephoneNumber: string;
  };
  firstName: string;
  lastName: string;
  registeredBy: {
    name: string;
    schemeId: number;
  };
};

export type SgSapHeatDemand = {
  currentSpaceHeatingDemand: number | null;
  currentWaterHeatingDemand: number | null;
};

export type SgSapPropertySummaryItem = {
  energyEfficiencyRating: number;
  environmentalEfficiencyRating: number;
  name: string;
  description: string;
};

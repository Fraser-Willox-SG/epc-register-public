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
  data: SgDomesticRdSapEpcCertificateSummary;
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

export type SgDomesticRdSapEpcCertificateSummary = {
  typeOfAssessment: "RdSAP" | string;
  assessmentId: string;
  dateOfExpiry: string;
  dateOfAssessment: string;
  dateOfRegistration: string;

  address: SgDomesticEpcAddress;
  assessor: SgAssessor;

  currentCarbonEmission: number | null;
  carbonEmissionsCurrentPerFloorArea: number | null;

  currentEnergyEfficiencyBand: SgEpcBandLetter;
  currentEnergyEfficiencyRating: number;

  dwellingType: string;
  estimatedEnergyCost: string;

  heatDemand: SgHeatDemand;

  heatingCostCurrent: string;
  heatingCostPotential: string;
  hotWaterCostCurrent: string;
  hotWaterCostPotential: string;
  lightingCostCurrent: string;
  lightingCostPotential: string;

  potentialCarbonEmission: number | null;
  potentialEnergyEfficiencyBand: SgEpcBandLetter;
  potentialEnergyEfficiencyRating: number;
  potentialEnergySaving: string;

  propertySummary: SgPropertySummaryItem[];
  recommendedImprovements: SgRecommendedImprovement[];

  lzcEnergySources: number[] | null;

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
  companyName: string;
  contactDetails: {
    address: string;
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

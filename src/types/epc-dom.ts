// /types/epc-dom.ts

export interface EpcDomSummary {
  typeOfAssessment: "SAP" | "RdSAP" | string;
  assessmentId: string;

  dateOfAssessment?: string;
  dateOfRegistration?: string;
  dateOfExpiry?: string;

  addressLine1: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  town?: string;
  postcode: string;

  dwellingType?: string;
  totalFloorArea?: string;

  currentEnergyEfficiencyRating?: number;
  currentEnergyEfficiencyBand?: string | null;
  potentialEnergyEfficiencyRating?: number;
  potentialEnergyEfficiencyBand?: string | null;

  propertySummary?: PropertySummaryItem[];
  recommendedImprovements?: RecommendedImprovement[];

  assessor?: Assessor;
}

export interface PropertySummaryItem {
  name: string;
  description: string | null;
  energyEfficiencyRating: number | null;
  environmentalEfficiencyRating?: number | null;
}

export interface RecommendedImprovement {
  sequence: number;
  improvementType?: string;
  improvementTitle?: string;
  improvementDescription?: string | null;
  indicativeCost?: string | null;
  typicalSaving?: string | null; // often numeric string (e.g. "348")
  energyPerformanceRatingImprovement?: number | null;
  energyPerformanceBandImprovement?: string | null;
}

export interface Assessor {
  firstName?: string;
  lastName?: string;
  schemeAssessorId?: string;
  registeredBy?: { name?: string };
  contactDetails?: { email?: string; telephoneNumber?: string };
}

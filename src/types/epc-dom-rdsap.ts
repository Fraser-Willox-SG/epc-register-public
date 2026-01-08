export type EpcBandLetter =
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

export interface EpcDomRdSapAddress {
  addressId?: string; // e.g. UPRN-...
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  town?: string;
  postcode?: string;
}

export interface RdSapRegisteredBy {
  name?: string; // e.g. "ECMK" / "Elmhurst"
  schemeId?: number;
}

export interface RdSapContactDetails {
  email?: string;
  telephoneNumber?: string;
}

export interface RdSapAssessorPostalAddress {
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  town?: string;
  postcode?: string;
}

export interface RdSapCompanyDetails {
  companyName?: string;
  companyRegNo?: string;

  companyAddressLine1?: string;
  companyAddressLine2?: string;
  companyAddressLine3?: string;
  companyTown?: string;
  companyPostcode?: string;

  companyWebsite?: string;
  companyTelephoneNumber?: string;
  companyEmail?: string;
}

export interface RdSapAssessor {
  firstName?: string;
  middleNames?: string;
  lastName?: string;

  schemeAssessorId?: string; // e.g. "ECMK302813"
  registeredBy?: RdSapRegisteredBy;

  contactDetails?: RdSapContactDetails;

  // sometimes present
  searchResultsComparisonPostcode?: string;

  address?: RdSapAssessorPostalAddress;
  companyDetails?: RdSapCompanyDetails;

  // these can be big / not needed yet
  qualifications?: unknown;
  dateOfBirth?: string;
}

export interface EpcDomRdSapSummary {
  // identity
  typeOfAssessment: "RdSAP" | string;
  assessmentId: string; // RRN

  // dates
  dateOfAssessment?: string;
  dateOfExpiry?: string;
  dateOfRegistration?: string;
  dateRegistered?: string;

  // address (some APIs provide both top-level and nested)
  addressLine1?: string;
  addressLine2?: string;
  addressLine3?: string;
  addressLine4?: string;
  town?: string;
  postcode?: string;

  address?: EpcDomRdSapAddress;
  addressId?: string; // UPRN-...

  // assessor
  assessor?: RdSapAssessor;

  // dwelling details
  dwellingType?: string;
  totalFloorArea?: string; // often numeric string like "77.0"
  propertyAgeBand?: string;

  // ratings (energy efficiency)
  currentEnergyEfficiencyRating?: number;
  currentEnergyEfficiencyBand?: EpcBandLetter;

  potentialEnergyEfficiencyRating?: number;
  potentialEnergyEfficiencyBand?: EpcBandLetter;

  // environmental impact ratings
  environmentalImpactCurrent?: number;
  environmentalImpactPotential?: number;

  // emissions
  currentCarbonEmission?: string; // e.g. "3.2"
  potentialCarbonEmission?: string; // e.g. "1.2"

  // costs
  estimatedEnergyCost?: string; // e.g. "731.00"
  potentialEnergySaving?: string; // e.g. "201.00"

  heatingCostCurrent?: string;
  heatingCostPotential?: string;

  hotWaterCostCurrent?: string;
  hotWaterCostPotential?: string;

  lightingCostCurrent?: string;
  lightingCostPotential?: string;

  // energy use
  primaryEnergyUse?: string; // kWh/m²/year e.g. "239"
  energyConsumptionPotential?: string; // e.g. "82"

  // coded enums (keep as string until you map)
  mainFuelType?: string; // e.g. "26"
  tenure?: string;
  transactionType?: string;

  // optional extras
  lzcEnergySources?: string[] | null;
  relatedPartyDisclosureNumber?: number;
  relatedPartyDisclosureText?: string | null;

  status?: string;
  countryCode?: string;
  countryName?: string;

  optOut?: boolean;
  supersededBy?: string | null;
  addendum?: unknown | null;

  gasSmartMeterPresent?: boolean | null;
  electricitySmartMeterPresent?: boolean | null;

  // heavy / not needed yet (safe placeholders)
  heatDemand?: unknown;
  propertySummary?: unknown;
  recommendedImprovements?: unknown;
  relatedAssessments?: unknown;
  greenDealPlan?: unknown;
}

export type RecommendationKey =
  | "floor_insulation_suspended"
  | "condensing_boiler"
  | "solar_water_heating"
  | "solar_pv"
  | "roof_insulation"
  | "internal_wall_insulation"
  | "flat_roof_or_sloping_ceiling_insulation"
  | "room_in_roof_insulation";

export type RecommendationCopy = {
  key: RecommendationKey;
  title: string;
  body: string[]; // paragraphs
  links?: Array<{ label: string; href: string }>;
  warnings?: string[];
};

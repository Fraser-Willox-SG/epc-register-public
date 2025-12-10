// --- shared sub-types -----------------------------------

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
  telephone: string | null;
}

export interface RegisteredBy {
  name: string;
  schemeId: number;
}

export interface Assessor {
  schemeAssessorId: string;
  name: string;
  companyDetails: CompanyDetails;
  contactDetails: ContactDetails;
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
  floorArea: string | null;
  occupier: string | null;
  assetRating: string | null;
  annualEnergyUseFuelThermal: string | null;
  annualEnergyUseElectrical: string | null;
  typicalThermalUse: string | null;
  typicalElectricalUse: string | null;
  renewablesFuelThermal: string | null;
  renewablesElectrical: string | null;
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
  schemaVersion: number;
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
}

// --- AR / DEC-RR specific ------------------------------

export interface Recommendation {
  code: string;
  text: string;
  cO2Impact: string; // "HIGH" | "MEDIUM" | "LOW" | "N/A" etc.
}

export interface ArTechnicalInformation {
  buildingEnvironment: string | null;
  floorArea: string | null;
  occupier: string | null;
  propertyType: string | null;
  renewableSources: string | null;
  discountedEnergy: string | null;
  dateOfIssue: string | null;
  calculationTool: string | null;
  inspectionType: string | null;
}

export interface SiteService {
  description: string;
  quantity: string;
}

export interface ArSummary {
  typeOfAssessment: "DEC-RR";
  assessmentId: string;
  reportType: string; // "2"
  dateOfAssessment: string;
  dateOfRegistration: string;
  dateOfExpiry: string;
  address: Address;
  assessor: Assessor;

  shortPaybackRecommendations: Recommendation[];
  mediumPaybackRecommendations: Recommendation[];
  longPaybackRecommendations: Recommendation[];
  otherRecommendations: Recommendation[];

  technicalInformation: ArTechnicalInformation;
  siteServiceOne: SiteService;
  siteServiceTwo: SiteService;
  siteServiceThree: SiteService;

  relatedRrn: string | null;
  addressId: string;
  optOut: boolean;
  supersededBy: string | null;
  relatedAssessments: RelatedAssessment[];

  // pulled from the associated DEC
  energyBandFromRelatedCertificate: string | null;
}

// Optional: union type if you ever need “either DEC or AR”
export type DecarSummary = DecSummary | ArSummary;

export function isDecRr(summary: DecarSummary): summary is ArSummary {
  return summary.typeOfAssessment === "DEC-RR";
}

export function isDec(summary: DecarSummary): summary is DecSummary {
  return summary.typeOfAssessment === "DEC";
}

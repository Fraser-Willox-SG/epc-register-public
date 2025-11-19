export type DecarKind = "DEC" | "DEC-RR";

export interface DecarOperationalSnapshot {
  date: string; // e.g. "2019-02-23"
  energyEfficiencyRating: number; // e.g. 92
  energyEfficiencyBand: string; // e.g. "d"
  heatingCo2: number; // tonnes per year
  electricityCo2: number; // tonnes per year
  renewablesCo2: number; // tonnes per year
}

export interface DecarAddress {
  addressId: string; // e.g. "RRN-..." or "UPRN-..."
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  town: string;
  postcode: string;
}

export interface DecarAssessor {
  schemeAssessorId: string; // e.g. "EES/015151"
  name: string;
  companyDetails?: {
    name?: string;
    address?: string;
  };
  contactDetails?: {
    email?: string;
    telephone?: string;
  };
  registeredBy?: {
    name?: string;
    schemeId?: number;
  };
}

export interface DecarTechnicalInformation {
  mainHeatingFuel?: string | null;
  buildingEnvironment?: string | null;
  floorArea?: string | null;
  occupier?: string | null;
  assetRating?: number | string | null;
  annualEnergyUseFuelThermal?: string | null;
  annualEnergyUseElectrical?: string | null;
  typicalThermalUse?: string | null;
  typicalElectricalUse?: string | null;
  renewablesFuelThermal?: string | null;
  renewablesElectrical?: string | null;
}

export interface DecarAdministrativeInformation {
  issueDate?: string | null; // ISO date
  calculationTool?: string | null;
  relatedPartyDisclosure?: string | null;
  relatedRrn?: string | null;
}

export interface DecarRelatedAssessment {
  assessmentId: string;
  assessmentStatus: "ENTERED" | "EXPIRED" | string;
  assessmentType: DecarKind | string;
  assessmentExpiryDate: string; // ISO date
  optOut: boolean;
}

export interface DecarSummary {
  assessmentId: string;
  dateOfAssessment: string; // ISO date
  dateOfExpiry: string; // ISO date
  dateOfRegistration: string; // ISO date

  address: DecarAddress;

  typeOfAssessment: DecarKind | string; // "DEC" or "DEC-RR" (but keep open for safety)
  schemaVersion: number; // e.g. 7.1
  reportType?: string | null; // e.g. "1"

  currentAssessment?: DecarOperationalSnapshot | null;
  year1Assessment?: DecarOperationalSnapshot | null;
  year2Assessment?: DecarOperationalSnapshot | null;

  technicalInformation?: DecarTechnicalInformation | null;
  assessor?: DecarAssessor | null;
  administrativeInformation?: DecarAdministrativeInformation | null;

  addressId?: string;
  optOut: boolean;

  supersededBy?: string | null;

  relatedAssessments?: DecarRelatedAssessment[] | null;
}

export function isDec(
  summary: DecarSummary
): summary is DecarSummary & { typeOfAssessment: "DEC" } {
  return summary.typeOfAssessment === "DEC";
}

export function isDecRr(
  summary: DecarSummary
): summary is DecarSummary & { typeOfAssessment: "DEC-RR" } {
  return summary.typeOfAssessment === "DEC-RR";
}

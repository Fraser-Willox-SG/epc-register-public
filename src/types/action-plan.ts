export type SgApiEnvelope<TData> = {
  data: TData;
  meta: Record<string, unknown>;
};

export type SgYesNo = "Y" | "N" | string;

export type SgIsoDate = string; // YYYY-MM-DD (treat as string at the boundary)

export type SgActionPlanResponse =
  SgApiEnvelope<SgActionPlanCertificateSummary>;

export type SgActionPlanCertificateSummary = {
  typeOfAssessment: string; // e.g. "CS63"
  assessmentId: string; // Action Plan RRN (e.g. "0016-....")
  epcAssessmentId: string; // EPC RRN (e.g. "2102-....")

  saleLeaseDate: SgIsoDate;
  reportType: string; // e.g. "9"
  dateOfAssessment: SgIsoDate;
  planReportDate: SgIsoDate;
  delegatedProtocolDate: SgIsoDate | null;

  address: SgActionPlanAddress;
  assessor: SgActionPlanAssessor;

  ownerCommissionReport: SgYesNo;
  delegatedPersonCommissionReport: SgYesNo;

  propertyType: SgActionPlanPropertyType;

  buildingImprovements: SgYesNo;
  operationalRatings: SgYesNo;
  dec: SgYesNo;

  plannedCompletionDate: SgIsoDate;
  actualCompletionDate: SgIsoDate | null;

  targetEmissionSavings: number; // as per payload (e.g. 1.98)
  targetEnergySavings: number; // as per payload (e.g. 11.42)

  acceptPrescriptiveImprovements: SgYesNo;

  prescriptiveImprovements: SgActionPlanImprovementMeasure[];
  alternativeImprovements: SgActionPlanImprovementMeasure[];

  addressId: string; // e.g. "RRN-0016-..."
  optOut: boolean;

  relatedAssessments: unknown[]; // currently []
  supersededBy: string | null; // currently null
  countryName: string; // e.g. "Unknown"

  // Optional?: Will message UKG regarding this potentially missing field
  delegatedProtocolSetUp?: SgYesNo | null;
};

export type SgActionPlanAddress = {
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  town: string;
  postcode: string;
};

export type SgActionPlanAssessor = {
  schemeAssessorId: string;

  contactDetails: {
    email: string;
    tradingAddress: string;
    telephoneNumber: string;
  };

  companyName: string;
  status: string;

  firstName: string;
  lastName: string;

  registeredBy: {
    name: string;
    schemeId: number;
  };
};

export type SgActionPlanPropertyType = {
  propertyTypeLongDescription: string;
  propertyTypeShortDescription: string;
};

export type SgActionPlanImprovementMeasure = {
  measureDescriptionShort: string;
  measureDescriptionLong: string | null;
  measureValid: SgYesNo;
  measureType: string | null;
};

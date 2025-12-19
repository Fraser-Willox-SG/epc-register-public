export type ActionPlanSearchRow = {
  actionPlanRrn: string;
  status?: string;
  addressLine1?: string | null;
  addressLine2?: string | null;
  town?: string | null;
  postcode?: string | null;
  epcRrn?: string | null;
  assessmentDate?: string | null;
};

export type ActionPlanDocument = {
  header?: {
    title?: string;
    country?: string;
  };

  identifiers: {
    actionPlanRrn: string;
    epcRrn?: string | null;
    uprn?: string | null;
  };

  address: {
    addressLine1?: string | null;
    addressLine2?: string | null;
    addressLine3?: string | null;
    addressLine4?: string | null;
    town?: string | null;
    postcode?: string | null;
  };

  keyDates?: {
    dateOfSaleOrLease?: string | null;
    dateOfAssessment?: string | null;
    dateOfPlan?: string | null;
  };

  parties?: {
    ownerInvolved?: boolean;
    tenantOrDelegatedPersonInvolved?: boolean;
    assessorId?: string | null;
    delegatedProtocolSetUp?: boolean;
  };

  improvementType?: {
    buildingImprovements?: boolean;
    operationalRating?: boolean;
  };

  prescriptiveMeasures?: Array<{
    description: string;
    valid: boolean;
  }>;

  targets?: {
    co2KgPerM2PerYear?: number | null;
    energyKwhPerM2PerYear?: number | null;
  };

  acceptPrescriptiveImprovements?: boolean;

  operationalRatingSystem?: {
    displayEnergyCertificateLodged?: boolean;
    note?: string | null;
  };

  completion?: {
    plannedDate?: string | null;
    actualDate?: string | null;
  };

  footerNote?: string | null;
};

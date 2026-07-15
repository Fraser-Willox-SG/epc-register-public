export type SgGreenDealProviderDetails = {
  name: string | null;
  telephone: string | null;
  email: string | null;
};

export type SgGreenDealInterest = {
  rate: string | null;
  fixed: boolean | null;
};

export type SgGreenDealChargeUplift = {
  amount: string | null;
  date: string | null;
};

export type SgGreenDealMeasure = {
  product: string | null;
  repaidDate: string | null;
};

export type SgGreenDealCharge = {
  startDate: string | null;
  endDate: string | null;
  dailyCharge: number | null;
};

export type SgGreenDealSaving = {
  fuelCode: string | null;
  fuelSaving: number | null;
  standingChargeFraction: number | null;
};

export type SgGreenDealPlan = {
  greenDealPlanId: string | null;
  startDate: string | null;
  endDate: string | null;

  providerDetails: SgGreenDealProviderDetails | null;
  interest: SgGreenDealInterest | null;
  chargeUplift: SgGreenDealChargeUplift | null;

  ccaRegulated: boolean | null;
  structureChanged: boolean | null;
  measuresRemoved: boolean | null;

  measures: SgGreenDealMeasure[];
  charges: SgGreenDealCharge[];
  savings: SgGreenDealSaving[];

  estimatedSavings: number | null;
};

export type SgGreenDealCertificateFields = {
  greenDealPlan?: SgGreenDealPlan[] | null;
};

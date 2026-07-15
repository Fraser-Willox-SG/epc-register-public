import type { SgDomesticRdSapEpcCertificateSummary } from "@/types/sg-epc-dom-rdsap";
import type { SgDomesticSapEpcCertificateSummary } from "@/types/sg-epc-dom-sap";
import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

export type DomesticCertificateData =
  | SgDomesticRdSapEpcCertificateSummary
  | SgDomesticSapEpcCertificateSummary;

export type DomesticCertificateWithGreenDeal = DomesticCertificateData & {
  greenDealPlan: SgGreenDealPlan[];
};

export function isSapCertificate(
  data: DomesticCertificateData,
): data is SgDomesticSapEpcCertificateSummary {
  return data.typeOfAssessment?.toLowerCase() === "sap";
}

export function isRdSapCertificate(
  data: DomesticCertificateData,
): data is SgDomesticRdSapEpcCertificateSummary {
  return data.typeOfAssessment?.toLowerCase() === "rdsap";
}

export function hasGreenDealPlan(
  data: DomesticCertificateData,
): data is DomesticCertificateWithGreenDeal {
  return Array.isArray(data.greenDealPlan) && data.greenDealPlan.length > 0;
}

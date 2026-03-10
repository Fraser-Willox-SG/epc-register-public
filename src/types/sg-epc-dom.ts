import type { SgDomesticRdSapEpcCertificateSummary } from "@/types/sg-epc-dom-rdsap";
import type { SgDomesticSapEpcCertificateSummary } from "@/types/sg-epc-dom-sap";

export type DomesticCertificateData =
  | SgDomesticRdSapEpcCertificateSummary
  | SgDomesticSapEpcCertificateSummary;

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

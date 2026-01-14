import Header from "@/app/components/certificate/CertificateHeader";
import type { EpcNonDomCepcDocument } from "@/types/epc-non-dom-cepc";

export default function RdSapEpcDocument({
  data,
}: {
  data: EpcNonDomCepcDocument;
}) {
  const { assessmentId: rrn, dateOfExpiry, address } = data;

  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = address ?? {};

  const currentBand =
    data.typeOfAssessment === "CEPC"
      ? data.currentEnergyEfficiencyBand
      : data.energyBandFromRelatedCertificate;

  return (
    <>
      <div id="overview">
        <Header
          addressLine1={addressLine1}
          addressLine2={addressLine2}
          addressLine3={addressLine3}
          addressLine4={addressLine4}
          postcode={postcode}
          town={town}
          rrn={rrn}
          dateOfExpiry={dateOfExpiry}
          currentBand={currentBand}
          printTitle="Energy Performance Certificate"
        />
      </div>
    </>
  );
}

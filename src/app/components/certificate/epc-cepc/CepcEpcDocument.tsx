import Header from "@/app/components/certificate/CertificateHeader";
import type { EpcNonDomCepcDocument } from "@/types/epc-non-dom-cepc";
import CepcCertificateSummary from "./certificate/CepcCertificateSummary";
import CepcRecommendationsIntroduction from "./recommendations/CepcRecommendationsIntroduction";
import CepcRecommendationsTables from "./recommendations/CepcRecommendationsTables";
import CepcPaybackAndSavingsExplained from "./recommendations/CepcPaybackAndSavingsExplained";
import CepcAboutThisReport from "./recommendations/CepcAboutThisReport";

export default function CepcEpcDocument({
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

  const hasRecommendations = data.typeOfAssessment === "CEPC-RR";

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

      {/* Non Domestic - Commercial EPC */}
      <CepcCertificateSummary data={data} />

      {/* Non Domestic - Recommendations Report */}
      {hasRecommendations && (
        <>
          <CepcRecommendationsIntroduction />
          <CepcRecommendationsTables data={data} />
          <CepcPaybackAndSavingsExplained />
          <CepcAboutThisReport data={data} />
        </>
      )}
    </>
  );
}

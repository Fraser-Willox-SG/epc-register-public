import Header from "@/app/components/certificate/CertificateHeader";
import type { SgNonDomesticCepcCertificateSummary } from "@/types/sg-epc-non-dom-cepc";

import CepcCertificateSummary from "./certificate/CepcCertificateSummary";
import CepcRecommendationsIntroduction from "./recommendations/CepcRecommendationsIntroduction";
import CepcRecommendationsTables from "./recommendations/CepcRecommendationsTables";
import CepcPaybackAndSavingsExplained from "./recommendations/CepcPaybackAndSavingsExplained";
import CepcAboutThisReport from "./recommendations/CepcAboutThisReport";

export default function CepcEpcDocument({
  data,
}: {
  data: SgNonDomesticCepcCertificateSummary;
}) {
  const { assessmentId: rrn, dateOfExpiry, address } = data;

  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = address;

  const currentBand = data.currentEnergyEfficiencyBand;

  const hasRecommendations =
    (Array.isArray(data.shortPaybackRecommendations) &&
      data.shortPaybackRecommendations.length > 0) ||
    (Array.isArray(data.mediumPaybackRecommendations) &&
      data.mediumPaybackRecommendations.length > 0) ||
    (Array.isArray(data.longPaybackRecommendations) &&
      data.longPaybackRecommendations.length > 0) ||
    (Array.isArray(data.otherPaybackRecommendations) &&
      data.otherPaybackRecommendations.length > 0);

  return (
    <>
      <div id="certificate-content">
        <div id="overview">
          <Header
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            addressLine3={addressLine3}
            addressLine4={addressLine4 ?? undefined}
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
            <CepcRecommendationsIntroduction data={data} />
            <CepcRecommendationsTables data={data} />
            <CepcPaybackAndSavingsExplained data={data} />
            <CepcAboutThisReport data={data} />
          </>
        )}
      </div>
    </>
  );
}

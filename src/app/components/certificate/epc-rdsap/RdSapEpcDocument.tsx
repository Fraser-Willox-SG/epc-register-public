import type { EpcDomRdSapSummary } from "@/types/epc-dom-rdsap";
import Header from "@/app/components/certificate/CertificateHeader";
import CertificateOverview from "./certificate/CertificateOverview";
import PerformanceFeaturesAndContext from "./certificate/PerformanceFeaturesAndContext";
import CostsAndRecommendationsTable from "./certificate/CostsAndRecommendationsTable";
import MeasuresAdviceAndHeatDemand from "./certificate/MeasuresAdviceAndHeatDemand";
import AboutThisDocument from "./certificate/AboutThisDocument";
import AdviceAndSupport from "./certificate/AdviceAndSupport";

export default function RdSapEpcDocument({
  data,
}: {
  data: EpcDomRdSapSummary;
}) {
  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
    assessmentId: rrn,
    dateOfExpiry,
    currentEnergyEfficiencyBand: currentBand,
  } = data;

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

      <CertificateOverview data={data} />
      <PerformanceFeaturesAndContext />
      <CostsAndRecommendationsTable />
      <MeasuresAdviceAndHeatDemand data={data} />
      <AboutThisDocument data={data} />
      <AdviceAndSupport />
    </>
  );
}

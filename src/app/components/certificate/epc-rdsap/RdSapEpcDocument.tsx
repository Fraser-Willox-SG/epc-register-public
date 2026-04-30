import type { DomesticCertificateData } from "@/types/sg-epc-dom";
import Header from "@/app/components/certificate/CertificateHeader";
import CertificateOverview from "./certificate/CertificateOverview";
import PerformanceFeaturesAndContext from "./certificate/PerformanceFeaturesAndContext";
import CostsAndRecommendationsTable from "./certificate/CostsAndRecommendationsTable";
import MeasuresAdviceAndHeatDemand from "./certificate/MeasuresAdviceAndHeatDemand";
import AboutThisDocument from "./certificate/AboutThisDocument";

export default function RdSapEpcDocument({
  data,
}: {
  data: DomesticCertificateData;
}) {
  const {
    assessmentId: rrn,
    dateOfExpiry,
    currentEnergyEfficiencyBand: currentBand,
  } = data;

  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = data.address;

  return (
    <>
      <div id="certificate-content">
        <div id="overview">
          <Header
            addressLine1={addressLine1}
            addressLine2={addressLine2}
            addressLine3={addressLine3}
            addressLine4={addressLine4 ?? ""} // Header expects string; SG has string|null
            postcode={postcode}
            town={town}
            rrn={rrn}
            dateOfExpiry={dateOfExpiry}
            currentBand={currentBand}
            printTitle="Energy Performance Certificate"
          />
        </div>

        <CertificateOverview data={data} />
        <PerformanceFeaturesAndContext data={data} />
        <CostsAndRecommendationsTable data={data} />
        <MeasuresAdviceAndHeatDemand data={data} />
        <AboutThisDocument data={data} />
      </div>
    </>
  );
}

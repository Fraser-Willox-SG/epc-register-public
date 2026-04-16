import type { EpcDomSummary } from "@/types/epc-dom-hem";

import EpcCertificate from "@/app/components/certificate/epc-hem/EpcCertificate";
import BrIntro from "@/app/components/certificate/epc-hem/BrIntro";
import BrEstimatedEnergyCosts from "@/app/components/certificate/epc-hem/BrEstimatedEnergyCosts";
import BrHeatRetentionSummary from "@/app/components/certificate/epc-hem/BrHeatRetentionSummary";
import BrHeatRetentionImprovements from "@/app/components/certificate/epc-hem/BrHeatRetentionImprovements";
import BrHeatingSystemInformation from "@/app/components/certificate/epc-hem/BrHeatingSystemInformation";
import BrPotentialImprovements from "@/app/components/certificate/epc-hem/BrPotentialImprovements";
import BrAboutThisDocument from "@/app/components/certificate/epc-hem/BrAboutThisDocument";

export default function HemEpcDocument({ data }: { data: EpcDomSummary }) {
  return (
    <>
      <div id="overview">
        <EpcCertificate
          address={[data.addressLine1, data.town, data.postcode]
            .filter(Boolean)
            .join(", ")}
          addressLine1={data.addressLine1}
          addressLine2={data.addressLine2}
          addressLine3={data.addressLine3}
          addressLine4={data.addressLine4}
          town={data.town}
          postcode={data.postcode}
          dwellingType={data.dwellingType}
          totalFloorArea={data.totalFloorArea}
          dateOfAssessment={data.dateOfAssessment}
          rrn={data.assessmentId}
          dateOfExpiry={data.dateOfExpiry}
          current={data.currentEnergyEfficiencyRating}
          currentBand={data.currentEnergyEfficiencyBand}
          potential={data.potentialEnergyEfficiencyRating}
          potentialBand={data.potentialEnergyEfficiencyBand}
        />
      </div>

      <BrIntro />
      <BrEstimatedEnergyCosts />
      <BrHeatRetentionSummary />
      <BrHeatRetentionImprovements />
      <BrHeatingSystemInformation />
      <BrPotentialImprovements />
      <BrAboutThisDocument />
    </>
  );
}

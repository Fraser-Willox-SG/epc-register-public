import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

import GreenDealIntroduction from "./GreenDealIntroduction";
import GreenDealPaymentDetails from "./GreenDealPaymentDetails";
import GreenDealProviderDetails from "./GreenDealProviderDetails";
import GreenDealMeasuresAndSavings from "./GreenDealMeasuresAndSavings";
import GreenDealImportantInformation from "./GreenDealImportantInformation";

type GreenDealPlanProps = {
  plan: SgGreenDealPlan;
  planIndex: number;
  planCount: number;
};

export default function GreenDealPlan({
  plan,
  planIndex,
  planCount,
}: GreenDealPlanProps) {
  const sectionNumber = planIndex + 1;
  const headingId = `green-deal-plan-${sectionNumber}`;

  return (
    <section className="green-deal-plan" aria-labelledby={headingId}>
      {planCount > 1 && (
        <div className="cert-section bg-grey print-no-break">
          <h3 id={headingId}>Green Deal plan {sectionNumber}</h3>
        </div>
      )}

      <GreenDealIntroduction plan={plan} />

      <GreenDealPaymentDetails plan={plan} />

      <GreenDealProviderDetails plan={plan} />

      <GreenDealMeasuresAndSavings plan={plan} planNumber={sectionNumber} />

      <GreenDealImportantInformation plan={plan} planNumber={sectionNumber} />
    </section>
  );
}

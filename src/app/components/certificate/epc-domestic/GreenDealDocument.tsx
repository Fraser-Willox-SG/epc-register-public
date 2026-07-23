import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

import GreenDealHeader from "./certificate/green-deal/GreenDealHeader";
import GreenDealPlan from "./certificate/green-deal/GreenDealPlan";

type GreenDealDocumentProps = {
  assessmentId: string;
  plans: SgGreenDealPlan[];
};

export default function GreenDealDocument({
  assessmentId,
  plans,
}: GreenDealDocumentProps) {
  return (
    <section
      id="green-deal"
      aria-labelledby="green-deal-title"
      className="green-deal-document"
    >
      <GreenDealHeader assessmentId={assessmentId} />

      {plans.map((plan, index) => (
        <GreenDealPlan
          key={plan.greenDealPlanId ?? `green-deal-plan-${index}`}
          plan={plan}
          planIndex={index}
          planCount={plans.length}
        />
      ))}
    </section>
  );
}

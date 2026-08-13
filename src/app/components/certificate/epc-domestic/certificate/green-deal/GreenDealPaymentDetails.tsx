import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

import MissingData from "@/app/components/MissingData";
import { formatIsoDateLong } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/number";

type GreenDealPaymentDetailsProps = {
  plan: SgGreenDealPlan;
};

function formatInterest(plan: SgGreenDealPlan): string | null {
  const rate = plan.interest?.rate?.trim();

  if (!rate) return null;

  if (plan.interest?.fixed === true) {
    return `Fixed at ${rate}% APR`;
  }

  if (plan.interest?.fixed === false) {
    return `Variable rate, currently ${rate}% APR`;
  }

  return `${rate}% APR`;
}

export default function GreenDealPaymentDetails({
  plan,
}: GreenDealPaymentDetailsProps) {
  const currentCharge = plan.charges.at(-1);

  const upliftAmount = Number(plan.chargeUplift?.amount);
  const hasChargeUplift = Number.isFinite(upliftAmount) && upliftAmount !== 0;

  return (
    <section className="cert-section">
      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>Current charge amount</dt>
          <dd>
            {currentCharge?.dailyCharge !== null &&
            currentCharge?.dailyCharge !== undefined ? (
              <>{formatCurrency(currentCharge.dailyCharge)} per day</>
            ) : (
              <MissingData />
            )}
          </dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>Payment period start</dt>
          <dd>
            {currentCharge?.startDate ? (
              formatIsoDateLong(currentCharge.startDate)
            ) : (
              <MissingData />
            )}
          </dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>Payment period end</dt>
          <dd>
            {currentCharge?.endDate ? (
              formatIsoDateLong(currentCharge.endDate)
            ) : (
              <MissingData />
            )}
          </dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>Interest rate payable</dt>
          <dd>{formatInterest(plan) ?? <MissingData />}</dd>
        </div>
      </dl>

      <p>
        This is the current charge amount, but there can be subsequent charging
        periods with different charge amounts depending on the detail of the
        Plan.
      </p>

      <p className="mb-0">Plan charges:</p>

      <ul>
        <li>are payable as part of the electricity bill</li>
        {hasChargeUplift && (
          <li>
            increase by {plan.chargeUplift?.amount}% each year
            {plan.chargeUplift?.date
              ? ` from ${formatIsoDateLong(plan.chargeUplift.date)}`
              : ""}
          </li>
        )}

        <li>reduce as each improvement is paid off</li>
      </ul>
    </section>
  );
}

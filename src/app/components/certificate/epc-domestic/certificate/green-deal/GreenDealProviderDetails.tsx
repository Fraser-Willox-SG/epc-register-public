import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

import MissingData from "@/app/components/MissingData";
import { formatIsoDateLong, addDays } from "@/app/utils/date";

type GreenDealProviderDetailsProps = {
  plan: SgGreenDealPlan;
};

export default function GreenDealProviderDetails({
  plan,
}: GreenDealProviderDetailsProps) {
  const provider = plan.providerDetails;

  return (
    <section className="cert-section print-no-break">
      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>GD Plan number</dt>
          <dd>{plan.greenDealPlanId ?? <MissingData />}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>Green Deal provider</dt>
          <dd>{provider?.name ?? <MissingData />}</dd>
        </div>

        {provider?.telephone && (
          <div className="row-2col border-b-grey">
            <dt>Telephone</dt>
            <dd>{provider.telephone}</dd>
          </div>
        )}

        {provider?.email && (
          <div className="row-2col border-b-grey">
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${provider.email}`}>{provider.email}</a>
            </dd>
          </div>
        )}
      </dl>

      <p>
        This EPC can only be used to disclose the Green Deal Plan until{" "}
        <strong>
          {plan.endDate ? formatIsoDateLong(plan.endDate) : <MissingData />}
        </strong>
        . From{" "}
        <strong>
          {plan.endDate ? (
            formatIsoDateLong(addDays(plan.endDate, 1))
          ) : (
            <MissingData />
          )}
        </strong>{" "}
        a further version should be retrieved from{" "}
        <a href="https://energycertificate.service.gov.scot/">
          energycertificate.service.gov.scot
        </a>{" "}
        using the EPC Report Reference Number (RRN above)
      </p>
    </section>
  );
}

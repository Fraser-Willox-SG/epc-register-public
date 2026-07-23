import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

type GreenDealImportantInformationProps = {
  plan: SgGreenDealPlan;
  planNumber: number;
};

export default function GreenDealImportantInformation({
  plan,
  planNumber,
}: GreenDealImportantInformationProps) {
  return (
    <div className="cert-section bg-grey print-no-break">
      <section aria-labelledby={`green-deal-important-${planNumber}`}>
        <h3 id={`green-deal-important-${planNumber}`}>
          Other important information
        </h3>

        <div className="grid-2col">
          <div>
            {plan.ccaRegulated === true && (
              <p>
                <strong>
                  This Green Deal Plan is regulated by the Consumer Credit Act
                  1974.
                </strong>{" "}
                This provides certain protections to those paying the Plan
                instalments through their electricity bill.
              </p>
            )}

            {plan.ccaRegulated === false && (
              <p>
                <strong>
                  This Green Deal Plan is not regulated by the Consumer Credit
                  Act 1974.
                </strong>
              </p>
            )}

            <p>
              The improvements listed above were installed under this Green Deal
              Plan and are due to be paid off at the times specified. If an
              improvement listed above has not been paid off, you should check
              that:
            </p>

            <ul>
              <li>it is still in place;</li>
              <li>
                no alterations have been made to this property that would reduce
                its effectiveness;
              </li>
              <li>
                it has been maintained in line with guidance from the Green Deal
                Provider.
              </li>
            </ul>

            <p>
              If, after taking-on this property, you are considering or carrying
              out renovations that may impact on the improvements installed
              under this plan, or you notice that such changes have already been
              made, you must contact your Green Deal Provider.
            </p>
          </div>

          <div>
            <p>
              Mandatory product guarantees are supplied for at least five years.
              These may be subject to maintenance or servicing requirements and
              you should check these have been met.
            </p>

            {plan.ccaRegulated === true && (
              <p>
                Charges may apply if you decide to repay this Green Deal Plan
                early and these details are set out in the Plan.
              </p>
            )}

            {plan.ccaRegulated === false && (
              <p>
                This Green Deal Plan may or may not permit voluntary early
                repayment. Where voluntary early repayment is permitted charges
                may apply. Full details can be found in the Plan.
              </p>
            )}

            <p>
              If you take on this property, you may have to repay this Plan
              early if you want to demolish this property or permanently
              disconnect the electricity supply – contact your Green Deal
              Provider for further details.
            </p>

            <p>
              New bill payers are advised to contact their energy supplier when
              they take on a Green Deal property, particularly if the property
              has a pre-payment meter.
            </p>

            <p>
              <strong>
                Further information can be found on the Green Deal Plan, a copy
                of which can be obtained from the owner of the property, or from
                the Green Deal Provider with the owner&apos;s consent.
              </strong>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

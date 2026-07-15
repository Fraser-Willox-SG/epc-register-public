import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

type GreenDealIntroductionProps = {
  plan: SgGreenDealPlan;
};

export default function GreenDealIntroduction({
  plan,
}: GreenDealIntroductionProps) {
  return (
    <div className="cert-section print-no-break">
      <p>
        A Green Deal plan has paid to install energy efficiency improvements at
        this property. If you become responsible for paying the electricity
        bill, you will be required to pay the Green Deal charge set out below.
        You must also comply with the terms and conditions in the Green Deal
        plan. You should ask for a copy of the up-to-date Green Deal plan from
        the owner of the property or the landlord and familiarise yourself with
        the contents.
      </p>

      <p>
        {plan.ccaRegulated === true ? (
          <span>
            The Green Deal plan can be paid off early, although charges may
            apply. The Green Deal plan is an unsecured loan, which is regulated
            by the Consumer Credit Act 1974. It is designed to save you at least
            as much money as you will have to repay.
          </span>
        ) : (
          <span>
            The Green Deal plan is an unsecured loan. It is designed to save you
            at least as much money as you will have to repay.
          </span>
        )}

        <span>
          However, the actual level of your savings will depend on how much
          energy you use, for example to heat your property, and the future cost
          of energy.
        </span>
      </p>
    </div>
  );
}

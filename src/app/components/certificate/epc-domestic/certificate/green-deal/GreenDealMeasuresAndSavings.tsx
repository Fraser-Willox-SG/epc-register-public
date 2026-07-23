import type { SgGreenDealPlan } from "@/types/sg-epc-green-deal";

import MissingData from "@/app/components/MissingData";

import { formatIsoDateLong } from "@/app/utils/date";
import { formatCurrency } from "@/app/utils/number";

type GreenDealMeasuresAndSavingsProps = {
  plan: SgGreenDealPlan;
  planNumber: number;
};

export default function GreenDealMeasuresAndSavings({
  plan,
  planNumber,
}: GreenDealMeasuresAndSavingsProps) {
  const hasMeasures = plan.measures.length > 0;
  const hasSavings = plan.estimatedSavings != null || plan.savings.length > 0;

  if (!hasMeasures && !hasSavings) {
    return null;
  }

  return (
    <div className="grid-2col">
      <div className="cert-section print-no-break">
        {hasMeasures && (
          <section>
            <table className="ds_table">
              <thead>
                <tr>
                  <th scope="col">Improvements installed</th>
                  <th scope="col">Paid off in</th>
                </tr>
              </thead>

              <tbody>
                {plan.measures.map((measure, index) => (
                  <tr key={`${measure.product ?? "measure"}-${index}`}>
                    <td>{measure.product ?? <MissingData />}</td>

                    <td>
                      {measure.repaidDate ? (
                        formatIsoDateLong(measure.repaidDate)
                      ) : (
                        <MissingData />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>

      <div className="cert-section print-no-break">
        {hasSavings && (
          <section aria-labelledby={`green-deal-savings-${planNumber}`}>
            <h4 id={`green-deal-savings-${planNumber}`}>
              Estimates of how these improvements could reduce annual energy
              bills for a typical user
            </h4>

            <p>
              <strong>Total:</strong>{" "}
              {plan.estimatedSavings != null ? (
                <>{formatCurrency(plan.estimatedSavings)} p.a.</>
              ) : (
                <MissingData />
              )}{" "}
              <strong>Gas:</strong> <MissingData />{" "}
              <strong>Electricity:</strong> <MissingData />{" "}
              <strong>Other:</strong> <MissingData />
            </p>

            <p className="mb-0">
              Most improvements reduce the energy used for heating. These
              estimates are based on:
            </p>

            <ul>
              <li>the original Green Deal assessment</li>
              <li>the improvements installed by this Plan (opposite)</li>
              <li>
                typical energy use for this type of property, using current
                energy prices
              </li>
            </ul>

            <p>
              <strong>
                If you are a low user of energy you may not achieve these
                estimated savings.
              </strong>
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

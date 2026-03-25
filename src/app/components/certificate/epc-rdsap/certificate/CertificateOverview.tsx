import { formatIsoDateLong } from "@/app/utils/date";
import RdSapBandChart from "../../EpcBandChart";
import { bandFromScore } from "@/app/utils/epc-bands";
import improvements from "@/app/content/rdsap/improvements.json";
import RatingBadge from "@/app/components/certificate/RatingBadge";
import type { DomesticCertificateData } from "@/types/sg-epc-dom";

type ImprovementInfo = {
  heading: string;
  summary: string;
  description: string;
};

type ImprovementsJson = {
  countryCode: string;
  averageSapRating: number;
  averageEiRating: number;
  improvements: Record<string, ImprovementInfo>;
};

const improvementsJson = improvements as ImprovementsJson;
const improvementLookup = improvementsJson.improvements;

export default function CertificateOverview({
  data,
}: {
  data: DomesticCertificateData;
}) {
  const {
    dwellingType,
    dateOfAssessment,
    dateOfRegistration,
    totalFloorArea,
    primaryEnergyUse,
    typeOfAssessment,
    assessor,
  } = data;

  const typeOfAssessmentDisplay =
    typeOfAssessment?.toLowerCase() === "rdsap"
      ? "RdSAP, existing dwelling"
      : typeOfAssessment?.toLowerCase() === "sap"
        ? "SAP, new dwelling"
        : typeOfAssessment || "—";

  const approvedOrganisation = assessor?.registeredBy?.name || "—";

  const mainHeatingAndFuel =
    data.propertySummary?.find(
      (item) => item.name?.toLowerCase() === "main_heating",
    )?.description || "—";

  const totalFloorAreaDisplay =
    totalFloorArea !== null && totalFloorArea !== undefined
      ? `${totalFloorArea} m²`
      : "—";

  const primaryEnergyIndicatorDisplay =
    primaryEnergyUse !== null && primaryEnergyUse !== undefined
      ? `${primaryEnergyUse} kWh/m²/year`
      : "—";

  const estimatedEnergyCost3yr =
    data.estimatedEnergyCost && !Number.isNaN(Number(data.estimatedEnergyCost))
      ? Math.round(Number(data.estimatedEnergyCost) * 3)
      : null;

  const potentialSaving3yr =
    data.potentialEnergySaving &&
    !Number.isNaN(Number(data.potentialEnergySaving))
      ? Math.round(Number(data.potentialEnergySaving) * 3)
      : null;

  const envCurrentBand = bandFromScore(data.environmentalImpactCurrent);
  const envPotentialBand = bandFromScore(data.environmentalImpactPotential);

  const efficiencyCurrentBand = bandFromScore(
    data.currentEnergyEfficiencyRating,
  );
  const efficiencyPotentialBand = bandFromScore(
    data.potentialEnergyEfficiencyRating,
  );

  function formatPounds(amount: number): string {
    return `£${amount.toLocaleString("en-GB", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function getImprovementLabel(
    imp: DomesticCertificateData["recommendedImprovements"][number],
  ): string {
    const title = imp.improvementTitle.trim();
    if (title) return title;

    const code = imp.improvementCode.trim();
    const fromLookup = improvementLookup[code]?.heading;
    if (fromLookup) return fromLookup;

    const desc = imp.improvementDescription?.trim();
    if (desc) return desc;

    return "Recommended improvement";
  }

  return (
    <section id="epc-certificate-overview">
      <div className="cert-section">
        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Dwelling type:</strong>
            </dt>
            <dd>{dwellingType || "—"}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of assessment:</strong>
            </dt>
            <dd>
              {dateOfAssessment ? formatIsoDateLong(dateOfAssessment) : "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Type of assessment:</strong>
            </dt>
            <dd>{typeOfAssessmentDisplay}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of certificate:</strong>
            </dt>
            <dd>
              {dateOfRegistration ? formatIsoDateLong(dateOfRegistration) : "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Approved Organisation:</strong>
            </dt>
            <dd>{approvedOrganisation}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Total floor area:</strong>
            </dt>
            <dd>{totalFloorAreaDisplay}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Main heating and fuel:</strong>
            </dt>
            <dd>{mainHeatingAndFuel}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Primary Energy Indicator:</strong>
            </dt>
            <dd>{primaryEnergyIndicatorDisplay}</dd>
          </div>
        </dl>
      </div>

      <div className="cert-section bg-blue" id="epc-dom-document-usage">
        <p>You can use this document to:</p>
        <ul>
          <li>
            compare current ratings of properties to see which are more energy
            efficient and environmentally friendly
          </li>
          <li>
            find out how to save energy and money and also reduce CO2 emissions
            by improving your home
          </li>
        </ul>

        <table className="ds_table">
          <caption className="visually-hidden">
            Estimated current energy costs and potential savings over three
            years
          </caption>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Amount (£)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Estimated energy costs for your home for 3 years*</td>
              <td>
                {estimatedEnergyCost3yr !== null
                  ? `£${estimatedEnergyCost3yr}`
                  : "—"}
              </td>
            </tr>

            <tr>
              <td>Over 3 years you could save*</td>
              <td>
                {potentialSaving3yr !== null ? `£${potentialSaving3yr}` : "—"}
              </td>
            </tr>
          </tbody>
        </table>

        <ul>
          <li>
            see your{" "}
            <a href="#performance-features-and-context">
              recommendations report
            </a>{" "}
            for more information.
          </li>
        </ul>
        <p>
          *based upon the cost of energy for heating, hot water, lighting and
          ventilation, calculated using standard assumptions.
        </p>
      </div>

      <div className="cert-section print-no-break">
        <h3>Energy Efficiency Rating</h3>
        <p>
          This graph shows the current efficiency of your home, taking into
          account both energy efficiency and fuel costs. The higher this rating,
          the lower your fuel bills are likely to be.
        </p>
        <p>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>Your current band and rating is:</span>

            <RatingBadge
              variant="energy"
              band={data.currentEnergyEfficiencyBand.toUpperCase()}
              score={data.currentEnergyEfficiencyRating}
              aria-hidden="true"
            />
          </span>
        </p>

        <p>
          The potential rating shows the effect of undertaking all of the
          improvement measures listed within your recommendations report.
        </p>

        {efficiencyCurrentBand && efficiencyPotentialBand ? (
          <RdSapBandChart
            current={efficiencyCurrentBand}
            potential={efficiencyPotentialBand}
            topLabel="Very energy efficient - lower running costs"
            bottomLabel="Not energy efficient - higher running costs"
          />
        ) : (
          <p>—</p>
        )}
      </div>

      <div className="cert-section bg-grey print-no-break">
        <h3>Environmental Impact (CO2) Rating</h3>
        <p>
          This graph shows the effect of your home on the environment in terms
          of carbon dioxide (CO2) emissions. The higher the rating, the less
          impact it has on the environment.
        </p>
        <p>
          The potential rating shows the effect of undertaking all of the
          improvement measures listed within your recommendations report.
        </p>

        {envCurrentBand && envPotentialBand ? (
          <RdSapBandChart
            current={envCurrentBand}
            potential={envPotentialBand}
            isEnvironmental={true}
            topLabel="Very environmentally friendly - lower CO2 emissions"
            bottomLabel="Not environmentally friendly - higher CO2 emissions"
          />
        ) : (
          <p>—</p>
        )}
      </div>

      <div className="cert-section bg-blue print-no-break">
        <h3>
          Top actions you can take to save money and make your home more
          efficient
        </h3>

        {data.recommendedImprovements.length === 0 ? (
          <p>
            There are currently no improvement measures recommended for your
            home.
          </p>
        ) : (
          <>
            <table className="ds_table">
              <thead>
                <tr>
                  <th scope="col">Recommended Measures</th>
                  <th scope="col">Indicative Cost</th>
                  <th scope="col">Typical savings over 3 years</th>
                </tr>
              </thead>

              <tbody>
                {data.recommendedImprovements
                  .slice()
                  .sort((a, b) => a.sequence - b.sequence)
                  .slice(0, 3)
                  .map((imp) => {
                    const label = getImprovementLabel(imp);
                    const indicativeCost = imp.indicativeCost.trim() || "—";

                    const saving3yr =
                      imp.typicalSaving.trim().length > 0 &&
                      !Number.isNaN(Number(imp.typicalSaving))
                        ? formatPounds(Number(imp.typicalSaving) * 3)
                        : "—";

                    return (
                      <tr key={`${imp.sequence}-${imp.improvementCode}`}>
                        <td>
                          {imp.sequence}. {label}
                        </td>
                        <td>{indicativeCost}</td>
                        <td>{saving3yr}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <p>
              A full list of recommended improvement measures for your home,
              together with more information on potential cost and savings and
              advice to help you carry out improvements can be found in your
              recommendations report.
            </p>

            <p>
              This page is the Energy Performance Certificate which must be
              affixed to the dwelling and not be removed unless it is replaced
              with an updated certificate.
            </p>

            <p>
              To find out more about the recommended measures and other actions
              you could take today to stop wasting energy and money, visit{" "}
              <a
                href="http://greenerscotland.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                greenerscotland.org
              </a>{" "}
              or contact <strong>Home Energy Scotland</strong> on{" "}
              <a className="ds_link" href="tel:08088082282">
                0808 808 2282
              </a>
              .
            </p>
          </>
        )}
      </div>
    </section>
  );
}

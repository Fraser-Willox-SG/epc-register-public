import type { DomesticCertificateData } from "@/types/sg-epc-dom";
import { bandFromScore } from "@/app/utils/epc-bands";
import improvements from "@/app/content/rdsap/improvements.json";
import RatingBadge from "@/app/components/certificate/RatingBadge";
import MissingData from "@/app/components/MissingData";

type ImprovementInfo = {
  heading: string;
  summary?: string;
  description?: string;
};

type ImprovementsJson = {
  countryCode: string;
  averageSapRating: number;
  averageEiRating: number;
  improvements: Record<string, ImprovementInfo>;
};

const improvementsJson = improvements as ImprovementsJson;
const improvementLookup = improvementsJson.improvements;

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;

    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
  }

  return null;
}

function formatPounds(amount: number): string {
  return `£${amount.toLocaleString("en-GB")}`;
}

function formatPounds2dp(amount: number): string {
  return `£${amount.toLocaleString("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function over3Years(costPerYear: number): number {
  return Math.round(costPerYear * 3);
}

function getImprovementLabel(
  imp: DomesticCertificateData["recommendedImprovements"][number],
): string {
  const title =
    typeof imp.improvementTitle === "string" ? imp.improvementTitle.trim() : "";
  if (title) return title;

  const code =
    typeof imp.improvementCode === "string" ? imp.improvementCode.trim() : "";
  const fromLookup = code ? improvementLookup[code]?.heading : undefined;
  if (fromLookup) return fromLookup;

  const desc =
    typeof imp.improvementDescription === "string"
      ? imp.improvementDescription.trim()
      : "";
  if (desc) return desc;

  return "Recommended improvement";
}

export default function CostsAndRecommendationsTable({
  data,
}: {
  data: DomesticCertificateData;
}) {
  const heatingCurrent = toNumber(data.heatingCostCurrent);
  const heatingPotential = toNumber(data.heatingCostPotential);

  const hotWaterCurrent = toNumber(data.hotWaterCostCurrent);
  const hotWaterPotential = toNumber(data.hotWaterCostPotential);

  const lightingCurrent = toNumber(data.lightingCostCurrent);
  const lightingPotential = toNumber(data.lightingCostPotential);

  const totalsCurrent =
    heatingCurrent != null && hotWaterCurrent != null && lightingCurrent != null
      ? over3Years(heatingCurrent + hotWaterCurrent + lightingCurrent)
      : null;

  const totalsPotential =
    heatingPotential != null &&
    hotWaterPotential != null &&
    lightingPotential != null
      ? over3Years(heatingPotential + hotWaterPotential + lightingPotential)
      : null;

  const savingOver3Years =
    totalsCurrent != null && totalsPotential != null
      ? totalsCurrent - totalsPotential
      : null;

  const improvementsRows = data.recommendedImprovements
    .slice()
    .sort((a, b) => a.sequence - b.sequence);

  const hasImprovements = improvementsRows.length > 0;

  return (
    <section
      id="costs-and-recommendations"
      aria-labelledby="costs-and-recommendations-title"
    >
      <div className="cert-section print-no-break">
        <h2 id="costs-and-recommendations-title">Costs and recommendations</h2>

        <h3>Estimated energy costs for this home</h3>

        <table className="ds_table">
          <thead>
            <tr>
              <th scope="col">Energy use</th>
              <th scope="col">Current energy costs</th>
              <th scope="col">Potential energy costs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Heating</td>
              <td>
                {heatingCurrent != null ? (
                  `${formatPounds(over3Years(heatingCurrent))} over 3 years`
                ) : (
                  <MissingData />
                )}
              </td>
              <td>
                {heatingPotential != null ? (
                  `${formatPounds(over3Years(heatingPotential))} over 3 years`
                ) : (
                  <MissingData />
                )}
              </td>
            </tr>

            <tr>
              <td>Hot water</td>
              <td>
                {hotWaterCurrent != null ? (
                  `${formatPounds(over3Years(hotWaterCurrent))} over 3 years`
                ) : (
                  <MissingData />
                )}
              </td>
              <td>
                {hotWaterPotential != null ? (
                  `${formatPounds(over3Years(hotWaterPotential))} over 3 years`
                ) : (
                  <MissingData />
                )}
              </td>
            </tr>

            <tr>
              <td>Lighting</td>
              <td>
                {lightingCurrent != null ? (
                  `${formatPounds(over3Years(lightingCurrent))} over 3 years`
                ) : (
                  <MissingData />
                )}
              </td>
              <td>
                {lightingPotential != null ? (
                  `${formatPounds(over3Years(lightingPotential))} over 3 years`
                ) : (
                  <MissingData />
                )}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Totals</strong>
              </td>
              <td>
                <strong>
                  {totalsCurrent != null ? (
                    formatPounds(totalsCurrent)
                  ) : (
                    <MissingData />
                  )}
                </strong>
              </td>
              <td>
                <strong>
                  {totalsPotential != null ? (
                    formatPounds(totalsPotential)
                  ) : (
                    <MissingData />
                  )}
                </strong>
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>
            {savingOver3Years != null ? (
              `You could save ${formatPounds(savingOver3Years)} over 3 years.`
            ) : (
              <MissingData />
            )}
          </strong>
        </p>

        <p>
          These figures show how much the average household would spend in this
          property for heating, lighting and hot water. This excludes energy use
          for running appliances such as TVs, computers and cookers, and the
          benefits of any electricity generated by this home.
        </p>
        <p>
          The potential savings in energy costs show the effect of undertaking
          all of the recommended measures listed below.
        </p>
      </div>

      <div className="cert-section bg-blue print-no-break">
        <h3>Recommendations for improvement</h3>

        {hasImprovements ? (
          <>
            <p>
              The measures below will improve the energy and environmental
              performance of this dwelling. The performance ratings after
              improvements listed below are cumulative; that is, they assume the
              improvements have been installed in the order that they appear in
              the table.
            </p>
            <p>
              Before carrying out work, make sure that the appropriate
              permissions are obtained, where necessary. This may include
              permission from a landlord (if you are a tenant) or the need to
              get a Building Warrant for certain types of work.
            </p>

            <table className="ds_table">
              <thead>
                <tr>
                  <th scope="col">Recommended measures</th>
                  <th scope="col">Indicative cost</th>
                  <th scope="col">Typical saving per year</th>
                  <th scope="col">Rating after improvement: Energy</th>
                  <th scope="col">Rating after improvement: Environment</th>
                </tr>
              </thead>
              <tbody>
                {improvementsRows.map((imp) => {
                  const label = getImprovementLabel(imp);

                  const indicativeCost =
                    typeof imp.indicativeCost === "string" &&
                    imp.indicativeCost.trim()
                      ? imp.indicativeCost.trim()
                      : null;

                  const typicalSaving = toNumber(imp.typicalSaving);

                  const energyScore = toNumber(
                    imp.energyPerformanceRatingImprovement,
                  );
                  const envScore = toNumber(
                    imp.environmentalImpactRatingImprovement,
                  );

                  const energyBand =
                    typeof imp.energyPerformanceBandImprovement === "string" &&
                    imp.energyPerformanceBandImprovement.trim()
                      ? imp.energyPerformanceBandImprovement
                          .trim()
                          .toUpperCase()
                      : null;

                  const envBand =
                    envScore != null ? bandFromScore(envScore) : null;

                  return (
                    <tr
                      key={`${imp.sequence}-${imp.improvementCode ?? "no-code"}`}
                    >
                      <td>
                        {imp.sequence}. {label}
                      </td>

                      <td>{indicativeCost ?? <MissingData />}</td>

                      <td>
                        {typicalSaving != null ? (
                          formatPounds2dp(typicalSaving)
                        ) : (
                          <MissingData />
                        )}
                      </td>

                      <td>
                        <span className="content-center">
                          {energyBand && energyScore != null ? (
                            <RatingBadge
                              variant="energy"
                              band={energyBand}
                              score={energyScore}
                            />
                          ) : (
                            <MissingData />
                          )}
                        </span>
                      </td>

                      <td>
                        <span className="content-center">
                          {envBand && envScore != null ? (
                            <RatingBadge
                              variant="environment"
                              band={envBand}
                              score={envScore}
                            />
                          ) : (
                            <MissingData />
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <p>None</p>
        )}
      </div>

      {hasImprovements && (
        <div className="cert-section bg-grey print-no-break">
          <h3>Choosing the right improvement package</h3>
          <p>
            For free and impartial advice on choosing suitable measures for your
            property, contact the Home Energy Scotland hotline on{" "}
            <a className="ds_link" href="tel:08088082282">
              0808 808 2282
            </a>{" "}
            or go to{" "}
            <a
              href="http://greenerscotland.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              greenerscotland.org
            </a>
          </p>
        </div>
      )}
    </section>
  );
}

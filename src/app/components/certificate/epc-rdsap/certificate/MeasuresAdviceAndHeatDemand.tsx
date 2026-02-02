import type { SgDomesticEpcCertificateSummary } from "@/types/sg-epc-dom-rdsap";
import MissingData from "@/app/components/MissingData";
import improvements from "@/app/content/rdsap/improvements.json";

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

function formatNumber(n: number): string {
  return n.toLocaleString("en-GB");
}

function getImprovementContent(
  imp: SgDomesticEpcCertificateSummary["recommendedImprovements"][number],
): { title: string; body: string } {
  const apiTitle = imp.improvementTitle.trim();
  const code = imp.improvementCode.trim();

  const fromLookup = code ? improvementLookup[code] : undefined;

  const title =
    apiTitle ||
    fromLookup?.heading ||
    imp.improvementDescription?.trim() ||
    "Recommended improvement";

  const body =
    fromLookup?.description ||
    fromLookup?.summary ||
    imp.improvementDescription?.trim() ||
    "";

  return { title, body };
}

export default function MeasuresAdviceAndHeatDemand({
  data,
}: {
  data: SgDomesticEpcCertificateSummary;
}) {
  const hasImprovements = data.recommendedImprovements.length > 0;

  const lzc = data.lzcEnergySources;

  const spaceHeat = data.heatDemand.currentSpaceHeatingDemand;
  const waterHeat = data.heatDemand.currentWaterHeatingDemand;

  const impactLoftSpace: number | null = null;
  const impactCavitySpace: number | null = null;
  const impactSolidSpace: number | null = null;

  // Water heating impact columns appear blank on live certs.
  const waterImpactLoft: null = null;
  const waterImpactCavity: null = null;
  const waterImpactSolid: null = null;

  function formatHeatImpact(n: number | null): string {
    if (n == null) return "N/A";
    // Live cert shows negative values in brackets like (2,226)
    const abs = Math.abs(n).toLocaleString("en-GB");
    return n < 0 ? `(${abs})` : abs;
  }

  return (
    <section
      id="measures-advice-and-heat-demand"
      aria-labelledby="measures-advice-and-heat-demand-title"
    >
      <div className="cert-section">
        <h2 id="measures-advice-and-heat-demand-title">
          Measures advice and heat demand
        </h2>

        <h3>
          About the recommended measures to improve your home’s performance
          rating
        </h3>
        <p>
          This section offers additional information and advice on the
          recommended improvement measures for your home.
        </p>

        {hasImprovements ? (
          data.recommendedImprovements
            .slice()
            .sort((a, b) => a.sequence - b.sequence)
            .map((imp) => {
              const { title, body } = getImprovementContent(imp);

              return (
                <section
                  key={`${imp.sequence}-${imp.improvementCode}`}
                  aria-label={title}
                  className="performance-recommendation-section"
                >
                  <h3>
                    {imp.sequence}. {title}
                  </h3>

                  {/* Make missing lookup obvious */}
                  {imp.improvementTitle.trim() === "" &&
                  !improvementLookup[imp.improvementCode.trim()] ? (
                    <p>
                      <MissingData label="Missing improvement lookup for this improvementCode" />
                    </p>
                  ) : null}

                  {body ? (
                    <p>{body}</p>
                  ) : (
                    <p>
                      <MissingData label="Missing improvement description from API" />
                    </p>
                  )}
                </section>
              );
            })
        ) : (
          <p>There are no recommended measures for this home.</p>
        )}
      </div>

      <div className="cert-section bg-grey">
        <h3>Low and zero carbon energy sources</h3>
        <p>
          Low and zero carbon (LZC) energy sources are sources of energy that
          release either very little or no carbon dioxide into the atmosphere
          when they are used. Installing these sources may help reduce energy
          bills as well as cutting carbon.
        </p>

        <p>
          <strong>LZC energy sources present:</strong>{" "}
        </p>

        {Array.isArray(lzc) && lzc.length > 0 ? (
          <>
            <ul className="ds_list">
              {lzc.map((code) => (
                <li key={code}>
                  {/* API provides codes only in this payload */}
                  LZC source code {code}
                </li>
              ))}
            </ul>
            <p>
              <MissingData label="API provides LZC codes but not display labels in certificate-summary" />
            </p>
          </>
        ) : (
          <p>There are none provided for this home</p>
        )}
      </div>

      <div className="cert-section bg-blue">
        <h3>Your home&apos;s heat demand</h3>
        <p>
          In this section, you can see how much energy you might need to heat
          your home and provide hot water. These are estimates showing how an
          average household uses energy.
        </p>
        <p>
          The table below shows the potential benefit of having your loft and
          walls insulated.
        </p>

        <table className="ds_table">
          <thead>
            <tr>
              <th scope="col">Heat demand</th>
              <th scope="col">Existing dwelling</th>
              <th scope="col">Impact of loft insulation</th>
              <th scope="col">Impact of cavity wall insulation</th>
              <th scope="col">Impact of solid wall insulation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Space heating (kWh per year)</td>
              <td>
                {typeof spaceHeat === "number" ? (
                  formatNumber(spaceHeat)
                ) : (
                  <MissingData />
                )}
              </td>
              <td>{formatHeatImpact(impactLoftSpace)}</td>
              <td>{formatHeatImpact(impactCavitySpace)}</td>
              <td>{formatHeatImpact(impactSolidSpace)}</td>
            </tr>

            <tr>
              <td>Water heating (kWh per year)</td>
              <td>
                {typeof waterHeat === "number" ? (
                  formatNumber(waterHeat)
                ) : (
                  <MissingData />
                )}
              </td>
              <td>{waterImpactLoft ?? "—"}</td>
              <td>{waterImpactCavity ?? "—"}</td>
              <td>{waterImpactSolid ?? "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

import { EpcDomRdSapSummary } from "@/types/epc-dom-rdsap";
import { RECOMMENDATION_COPY } from "@/app/content/rdsap/recommendation-copy";

export default function MeasuresAdviceAndHeatDemand({
  data,
}: {
  data: EpcDomRdSapSummary;
}) {
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

        {Object.values(RECOMMENDATION_COPY).map((copy) => (
          <section
            key={copy.key}
            aria-label={copy.title}
            className="performance-recommendation-section"
          >
            <h3>{copy.title}</h3>

            {copy.body.map((p: string) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
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
        {data.lzcEnergySources && data.lzcEnergySources.length > 0 ? (
          <ul className="ds_list">
            {data.lzcEnergySources.map((s: string) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
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
              <td>12,483</td>
              <td aria-label="Not applicable">—</td>
              <td aria-label="Not applicable">—</td>
              <td aria-label="Not applicable">—</td>
            </tr>

            <tr>
              <td>Water heating (kWh per year)</td>
              <td>5,316</td>
              <td aria-label="Not applicable">—</td>
              <td aria-label="Not applicable">—</td>
              <td aria-label="Not applicable">—</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

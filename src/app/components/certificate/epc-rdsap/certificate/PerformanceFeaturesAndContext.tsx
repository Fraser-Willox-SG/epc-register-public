import type { SgDomesticEpcCertificateSummary } from "@/types/sg-epc-dom-rdsap";
import StarRating from "./components/StarRating";
import MissingData from "@/app/components/MissingData";

const ELEMENT_LABELS: Record<string, string> = {
  walls: "Walls",
  wall: "Walls",
  roof: "Roof",
  floor: "Floor",
  windows: "Windows",
  window: "Windows",
  main_heating: "Main heating",
  main_heating_controls: "Main heating controls",
  secondary_heating: "Secondary heating",
  hot_water: "Hot water",
  lighting: "Lighting",
  air_tightness: "Air tightness",
};

function normaliseElementKey(name: string): string {
  const k = name.trim().toLowerCase();
  // unify singular/plural variants
  if (k === "wall") return "walls";
  if (k === "window") return "windows";
  return k;
}

export default function PerformanceFeaturesAndContext({
  data,
}: {
  data: SgDomesticEpcCertificateSummary;
}) {
  const rows = data.propertySummary.slice().map((item) => {
    const key = normaliseElementKey(item.name);
    return {
      key,
      element: ELEMENT_LABELS[key] ?? item.name,
      description: item.description,
      energy: item.energyEfficiencyRating,
      env: item.environmentalEfficiencyRating,
    };
  });

  // Optional: stable ordering like the certificate
  const ORDER: string[] = [
    "walls",
    "roof",
    "floor",
    "windows",
    "main_heating",
    "main_heating_controls",
    "secondary_heating",
    "hot_water",
    "lighting",
    "air_tightness",
  ];

  rows.sort((a, b) => ORDER.indexOf(a.key) - ORDER.indexOf(b.key));

  const carbonEmissionsCurrentPerFloorArea =
    data.carbonEmissionsCurrentPerFloorArea;
  const currentCarbonEmission = data.currentCarbonEmission;

  return (
    <section
      id="performance-features-and-context"
      aria-labelledby="performance-features-and-context-title"
    >
      <div className="cert-section print-page-break">
        <h2 id="performance-features-and-context-title">
          Recommendations Report
        </h2>

        <h3>Summary of the energy performance related features of this home</h3>
        <p>
          This table sets out the results of the survey which lists the current
          energy-related features of this home. Each element is assessed by the
          national calculation methodology
        </p>

        <div>
          <p>
            <strong>Star ratings:</strong>
          </p>
          <ul className="ds_list ds_list--inline">
            <li>
              <StarRating value={1} /> very poor (least efficient)
            </li>
            <li>
              <StarRating value={2} /> poor
            </li>
            <li>
              <StarRating value={3} /> average
            </li>
            <li>
              <StarRating value={4} /> good
            </li>
            <li>
              <StarRating value={5} /> very good (most efficient)
            </li>
          </ul>
        </div>

        <p>
          The assessment does not take into consideration the condition of an
          element and how well it is working. ‘Assumed’ means that the
          insulation could not be inspected and an assumption has been made in
          the methodology, based on age and type of construction.
        </p>

        <table className="ds_table">
          <thead>
            <tr>
              <th scope="col">Element</th>
              <th scope="col">Description</th>
              <th scope="col">Energy efficiency</th>
              <th scope="col">Environmental impact</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={4}>—</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={`${r.key}-${r.description}`}>
                  <td scope="row">{r.element}</td>
                  <td>{r.description || "—"}</td>
                  <td>
                    <StarRating value={r.energy || null} />
                  </td>
                  <td>
                    <StarRating value={r.env || null} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="cert-section bg-grey">
        <h3>The energy efficiency rating of your home</h3>
        <p>
          Your Energy Efficiency Rating is calculated using the standard UK
          methodology, RdSAP. This calculates energy used for heating, hot
          water, lighting and ventilation and then applies fuel costs to that
          energy use to give an overall rating for your home. The rating is
          given on a scale of 1 to 100. Other than the cost of fuel for
          electrical appliances and for cooking, a building with a rating of 100
          would cost almost nothing to run.
        </p>

        <p>
          As we all use our homes in different ways, the energy rating is
          calculated using standard occupancy assumptions which may be different
          from the way you use it. The rating also uses national weather
          information to allow comparison between buildings in different parts
          of Scotland. However, to make information more relevant to your home,
          local weather data is used to calculate your energy use, CO
          <sub>2</sub> emissions, running costs and the savings possible from
          making improvements.
        </p>
      </div>
      <div className=" cert-section bg-blue">
        <h3>The impact of your home on the environment</h3>
        <p>
          One of the biggest contributors to global warming is carbon dioxide.
          The energy we use for heating, lighting and power in our homes
          produces over a quarter of the UK’s carbon dioxide emissions.
          Different fuels produce different amounts of carbon dioxide for every
          kilowatt hour (kWh) of energy used. The Environmental Impact Rating of
          your home is calculated by applying these &apos;carbon factors&apos;
          for the fuels you use to your overall energy use.
        </p>

        <p>
          The calculated emissions for your home are{" "}
          <strong>
            {carbonEmissionsCurrentPerFloorArea ?? <MissingData />} kg CO
            <sub>2</sub>/m²/yr
          </strong>
          .
        </p>

        <p>
          The average Scottish household produces about 6 tonnes of carbon
          dioxide every year. Based on this assessment, heating and lighting
          this home currently produces approximately{" "}
          <strong>{currentCarbonEmission ?? <MissingData />} tonnes</strong> of
          carbon dioxide every year. You could reduce emissions by switching to
          renewable energy sources.
        </p>
      </div>
    </section>
  );
}

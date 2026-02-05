import React from "react";
import BandBadge from "../BandBadge";
import BandLegend from "./BandLegend";
import HeatingSystemsAlternativesTable from "./HeatingSystemsAlternativesTable";

export default function BrHeatingSystemInformation() {
  return (
    <div id="br-heating-system-information" className="cert-section">
      <h3>Heating System Information</h3>
      <section aria-labelledby="heat-sys-title" className="br-heat-sys">
        <p>
          The way we heat our homes, workplaces and other buildings is the
          third-largest cause of greenhouse gas emissions in Scotland. This is
          because the heating systems most of us use produce emissions when we
          use them.
        </p>

        <table className="ds_table" style={{ marginBottom: "40px" }}>
          <thead>
            <tr>
              <th scope="col">Your main heating system</th>
              <th scope="col">Heat retention rating</th>
              <th scope="col">Estimated emissions</th>
              <th scope="col">Estimated installation costs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Fossil fuel boiler</td>
              <td>
                <BandBadge band="E" />
              </td>
              <td>51 kg C02/m2/year</td>
              <td>N/A (Already in Place)</td>
            </tr>
          </tbody>
        </table>

        <BandLegend className="hem-epc-band-legend-print-2col" />

        <HeatingSystemsAlternativesTable
          rows={[
            {
              system: "Heat pump",
              band: "A",
              emissions: "Zero",
              installCost: 7000,
              runningCost: 7000,
            },
            {
              system: "Direct electric",
              band: "B",
              emissions: "Zero",
              installCost: 5000,
              runningCost: 14000,
            },
            {
              system: "Hybrid heat pump (connected to biomass fuel supply)",
              band: "C",
              emissions: "Zero",
              installCost: 5000,
              runningCost: 5000,
            },
          ]}
        />
      </section>
    </div>
  );
}

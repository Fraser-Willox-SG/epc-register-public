import React from "react";

export default function BrPotentialImprovements() {
  return (
    <div
      id="br-potential-improvements"
      style={{ background: "#DAEEF7", padding: "16px" }}
    >
      <h3>Other energy efficiency improvements</h3>
      <p className="text-sm text-muted-foreground mb-4">
        The measures below can also improve the overall energy efficiency of
        your property and reduce emissions.
      </p>

      <div className="overflow-hidden">
        <table className="ds_table">
          <thead>
            <tr>
              <th>Potential improvement</th>
              <th>Estimated Installation Costs</th>
              <th>Estimated Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Low energy lighting for all fixed outlets</td>
              <td>£25 – £58</td>
              <td>£174</td>
            </tr>
            <tr>
              <td>Solar water heating</td>
              <td>£4,000 – £6,000</td>
              <td>£99</td>
            </tr>
            <tr>
              <td>Solar photovoltaic panels, 2.5 kWp</td>
              <td>£3,500 – £5,500</td>
              <td>£622</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Secondary ratings */}
      <h3>Secondary ratings</h3>

      <div className="overflow-hidden">
        <table className="ds_table">
          <thead>
            <tr>
              <th>Indicator</th>
              <th>Metric</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span>Emissions indicator</span>
                <p>
                  This indicates the total direct emissions (e.g. from a heating
                  system) and indirect emissions (e.g. from generation of
                  electricity used in the building).
                </p>
              </td>
              <td>12345.67 kgCO₂e/m²/year</td>
            </tr>
            <tr>
              <td>
                <span>Energy use indicator</span>
                <p>
                  The total energy used from heating, cooling, ventilation and
                  lighting.
                </p>
              </td>
              <td>12345.67 kWh/m²/year</td>
            </tr>
            <tr>
              <td>
                <span>Primary energy use</span>
                <p>
                  This is the energy use multiplied by a primary energy factor
                  to represent transmission losses.
                </p>
              </td>
              <td className="border px-4 py-2 font-mono">
                12345.67 kWh/m²/year
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

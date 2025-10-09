import React from "react";

export default function BrHeatingSystemInformation() {
  return (
    <div id="br-heating-system-information" style={{ padding: "16px" }}>
      <h3>Heating System Information</h3>
      <section aria-labelledby="heat-sys-title" className="br-heat-sys">
        <p>
          The way we heat our homes, workplaces and other buildings is the
          third-largest cause of greenhouse gas emissions in Scotland. This is
          because the heating systems most of us use produce emissions when we
          use them.
        </p>

        <table className="ds_table" style={{ margin: 0 }}>
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
              <td>E</td>
              <td>51 kg C02/m2/year</td>
              <td>N/A (Already in Place)</td>
            </tr>
          </tbody>
        </table>

        {/* <Legend /> */}
        <h4 className="ds_h4" style={{ marginTop: 16 }}>
          Efficiency rating scale
        </h4>
        <ul>
          <li>A - Very good (most efficient)</li>
          <li>B - Good</li>
          <li>C - Good</li>
          <li>D - Average</li>
          <li>E - Poor</li>
          <li>F - Poor</li>
          <li>G - Very poor (least efficient)</li>
          <li>N/A - Does not apply</li>
        </ul>

        {/* Alternatives table */}
        <h4 className="ds_h4" style={{ marginTop: 20 }}>
          Heating system alternatives
        </h4>
        <table className="ds_table">
          <thead>
            <tr>
              <th scope="col">Alternative heating system</th>
              <th scope="col">Heat system rating</th>
              <th scope="col">Estimated Emissions</th>
              <th scope="col">Estimated Installation Costs</th>
              <th scope="col">Estimated running Costs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Heat Pump</td>
              <td>A</td>
              <td>Zero</td>
              <td>£7,000</td>
              <td>£7,000</td>
            </tr>
            <tr>
              <td scope="row">Direct Electric</td>
              <td>B</td>
              <td>Zero</td>
              <td>£5,000</td>
              <td>£14,000</td>
            </tr>
            <tr>
              <td scope="row">
                Hybrid heat pump (connected to biomass fuel supply)
              </td>
              <td>C</td>
              <td>Zero</td>
              <td>£5,000</td>
              <td>£5,000</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}

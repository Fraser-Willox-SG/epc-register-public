import React from "react";

type Props = {
  address: string;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  addressLine3: string | undefined;
  addressLine4: string | undefined;
  town: string | undefined;
  postcode: string | undefined;
  dwellingType?: string | null;
  totalFloorArea?: string | null;
  typicalSaving?: string | null;
  dateOfAssessment?: string | null;
  dateOfRegistration?: string | null;
  dateOfExpiry?: string | undefined;
  typeOfAssessment?: string | null;
  primaryEnergyUse?: string | null;
  assessor?: Assessor | null;
  rrn: string;
  current?: number | null;
  currentBand?: string | null;
  potential?: number | null;
  potentialBand?: string | null;
};

export default function BrHeatingSystemEmissions({
  addressLine1,
  addressLine2,
  addressLine3,
  addressLine4,
  town,
  postcode,
  typicalSaving,
  dwellingType,
  totalFloorArea,
  dateOfAssessment,
  dateOfRegistration,
  dateOfExpiry,
  typeOfAssessment,
  currentBand,
  primaryEnergyUse,
  rrn,
  assessor,
}: Props) {
  return (
    <div id="br-heating-system-emissions" style={{ padding: "16px" }}>
      <div>
        <h3>Heating system emissions</h3>
        <table>
          <caption>Current: Gas boiler</caption>
          <thead>
            <tr>
              <th scope="col">System</th>
              <th scope="col">Details</th>
              <th scope="col">Efficiency</th>
              <th scope="col">Running Costs</th>
              <th scope="col">Emissions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Polluting heating</td>
              <td>
                Systems that produce harmful gases into the atmosphere at the
                point of use within the building.
              </td>
              <td>D</td>
              <td>High</td>
              <td>51 kg CO₂/m²/year (High)</td>
            </tr>
          </tbody>
        </table>

        <table>
          <caption>Alternative heating system</caption>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">Description</th>
              <th scope="col">Estimated Efficiency</th>
              <th scope="col">Estimated Running Costs</th>
              <th scope="col">Estimated Installation Costs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Clean heating</td>
              <td>
                Systems such as heat pumps, connection to a heat network, or
                electric systems such as storage heaters.
              </td>
              <td>A</td>
              <td>Medium</td>
              <td>£7,000</td>
            </tr>
            <tr>
              <td>Renewable</td>
              <td>
                Systems fuelled by bioenergy, which is a renewable source of
                energy. Emissions are balanced against carbon dioxide that was
                absorbed by the fuel as it was grown.
              </td>
              <td>B</td>
              <td>Low</td>
              <td>£15,000</td>
            </tr>
            <tr>
              <td>Hybrid</td>
              <td>
                Systems that combine a polluting heating or bioenergy heating
                source with a clean heat source, such as hybrid heat pumps.
                These can have lower emissions than polluting heating systems.
              </td>
              <td>C</td>
              <td>Low</td>
              <td>£10,000</td>
            </tr>
          </tbody>
        </table>

        <table>
          <caption>Other options</caption>
          <thead>
            <tr>
              <th scope="col">Option</th>
              <th scope="col">Description</th>
              <th scope="col">Estimated Running Costs</th>
              <th scope="col">Estimated Installation Costs</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Heat networks</td>
              <td>
                Heat networks distribute heat or cooling from a central source
                or sources, and deliver it to a variety of different customers.
              </td>
              <td>Low</td>
              <td>£1,234</td>
            </tr>
          </tbody>
        </table>
        <div style={{ background: "#ECECEC" }}>
          <p>
            The way we heat our homes, workplaces and other buildings is the
            third-largest cause of greenhouse gas emissions in Scotland. This is
            because the heating systems most of us use produce emissions when we
            use them. Polluting, Renewable and Hybrid systems all release
            harmful gases into the atmosphere at the point of use within the
            building. Clean Heating systems release no harmful gases into the
            atmosphere at the point of use within the building.
          </p>
          <p>Get help at: https://scot.gov/12345</p>
        </div>
      </div>
    </div>
  );
}

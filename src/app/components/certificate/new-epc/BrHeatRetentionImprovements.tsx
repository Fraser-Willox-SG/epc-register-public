import React from "react";
import HouseDiagram from "@/app/components/certificate/HouseDiagram";
import { formatGBP } from "@/app/utils/epc";
import type { Band } from "@/types/epc-dom";
import {
  BANDS,
  COLORS,
  LANE_COLORS as LANE,
  isBand,
  bandColor,
} from "@/app/utils/epc";

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

export default function BrHeatRetentionImprovements({
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
    <div id="br-energy-loss" style={{ background: "#DAEEF7", padding: "16px" }}>
      <h3>Potential Heat Retention Improvements</h3>
      <p>
        This drawing illustrates the distribution of energy loss in your
        property.
      </p>
      <p>
        It highlights the key areas where energy escapes, including the roof,
        walls, windows, and floor. Understanding these figures can help you
        identify the most effective ways to improve energy efficiency and reduce
        heating costs.
      </p>
      <HouseDiagram />

      <table className="ds_table" style={{ marginTop: "1rem" }}>
        <caption className="ds_visually-hidden">-</caption>
        <thead>
          <tr>
            <th scope="col">Potential Improvement</th>
            <th scope="col">Estimated instalation cost</th>
            <th scope="col">Estimated annual energy saving cost</th>
            <th scope="col">Potential heat-retention rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="row">Loft insulation</td>
            <td>
              {formatGBP(500)} - {formatGBP(1500)}
            </td>
            <td>5000 kWh</td>
            <td>D</td>
          </tr>
          <tr>
            <td scope="row">Cavity insulation</td>
            <td>
              {formatGBP(1500)} - {formatGBP(2500)}
            </td>
            <td>5000 kWh</td>
            <td>C</td>
          </tr>
          <tr>
            <td scope="row">Suspended floor insulation</td>
            <td>
              {formatGBP(2000)} - {formatGBP(3000)}
            </td>
            <td>500 kWh</td>
            <td>C</td>
          </tr>
        </tbody>
      </table>

      <section aria-labelledby="pi-title">
        <h3 id="pi-title" className="ds_h3">
          Potential improvements explained
        </h3>

        <p>
          Before carrying out work, make sure that the appropriate permissions
          are obtained, such as permission from a landlord (if you are a
          tenant).
        </p>

        <p>
          <strong>*</strong> Building regulations may apply to home energy
          efficiency and heating improvements and sometimes require a building
          warrant. It is best to check with your local authority building
          standards department or contact a qualified professional.
        </p>

        <ul>
          <li>
            <p>
              <strong>Loft insulation</strong>
              <br />
              Installing loft insulation to a depth of at least 270&nbsp;mm in
              the loft space or between roof rafters will significantly reduce
              heat loss through the roof; this will improve levels of comfort,
              reduce energy use and lower energy bills. There must be adequate
              ventilation in the loft space to prevent dampness; seek
              professional advice about this if you’re unsure.
            </p>
          </li>
          <li>
            <p>
              <strong>
                Cavity wall insulation <sup>*</sup>
              </strong>
              <br />
              Cavity wall insulation is insulation material that fills the gap
              between the inner and outer layers of external walls to reduce
              heat loss through the walls; this will improve levels of comfort,
              reduce energy use and lower energy bills. The insulation material
              is pumped into the gap through small holes that are drilled into
              the outer walls, and the holes are made good afterwards. As
              specialist machinery is used to fill the cavity, a professional
              installation company should carry out this work.
            </p>
          </li>
          <li>
            <p>
              <strong>Floor insulation (suspended floor)</strong>
              <br />
              Insulating a floor will significantly reduce heat loss; this will
              improve levels of comfort, reduce energy use and lower energy
              bills. Suspended floors can often be insulated from below but must
              have adequate ventilation to prevent dampness; seek advice about
              this if you’re unsure.
            </p>
          </li>
        </ul>

        <h3 className="ds_h3">Funding, advice and support</h3>
        <p>
          <a
            href="https://www.homeenergyscotland.org"
            target="_blank"
            rel="noreferrer"
          >
            Home Energy Scotland
          </a>{" "}
          may be able to provide funding for these recommended measures and can
          also offer{" "}
          <a
            href="https://www.homeenergyscotland.org"
            target="_blank"
            rel="noreferrer"
          >
            free advice and support
          </a>{" "}
          to help you make your home warmer, reduce energy bills, and contribute
          to a greener, more sustainable future.
        </p>
        <p>
          Please visit{" "}
          <a
            href="https://www.homeenergyscotland.org"
            target="_blank"
            rel="noreferrer"
          >
            www.homeenergyscotland.org
          </a>{" "}
          or call <a href="tel:08088082282">0808 808 2282</a>.
        </p>
      </section>
    </div>
  );
}

import React from "react";
import HouseDiagramSVG from "@/app/components/certificate/HouseDiagramSVG.svg";
import Image from "next/image";
import { formatGBP } from "@/app/utils/epc";
import PotentialImprovementsTable from "./PotentialImprovementsTable";

export default function BrHeatRetentionImprovements() {
  return (
    <div id="br-energy-loss" className="cert-section bg-blue print-no-break">
      <h3>Potential Heat Retention Improvements</h3>
      <p>
        The measures below aim to improve the heat retention and reduce the
        emissions of this property.
      </p>
      <p>
        The &quot;Potential improvement&quot; are suggested first steps,
        starting with low-cost options that provide good value, followed by
        higher-cost improvements with long-term benefits.
      </p>
      <p>
        Performance ratings are cumulative, assuming the measures are
        implemented in the order listed.
      </p>
      <div style={{ display: "grid", placeItems: "center" }}>
        <Image
          src={HouseDiagramSVG}
          alt="Heat retention house diagram"
          width={420}
          height={408}
          style={{
            maxWidth: 420,
            width: "min(70vw, 100%)",
            height: "auto",
            marginBottom: "30px",
          }}
          priority
        />
      </div>

      <PotentialImprovementsTable
        formatGBP={formatGBP}
        rows={[
          {
            improvement: "Loft insulation",
            costFrom: 500,
            costTo: 1500,
            savingKwh: 5000,
            potentialBand: "D",
          },
          {
            improvement: "Cavity insulation",
            costFrom: 1500,
            costTo: 2500,
            savingKwh: 5000,
            potentialBand: "C",
          },
          {
            improvement: "Suspended floor insulation",
            costFrom: 2000,
            costTo: 3000,
            savingKwh: 500,
            potentialBand: "C",
          },
        ]}
      />

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

        <ul id="br-potential-improvements-list">
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

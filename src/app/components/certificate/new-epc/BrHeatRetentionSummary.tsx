import React from "react";
import HouseDiagram from "@/app/components/certificate/HouseDiagram";

import { bandColor } from "@/app/utils/epc";

export default function BrHeatRetentionSummary() {
  return (
    <div id="br-heat-retention-summary" style={{ padding: "16px" }}>
      <h3>Heat Retention summary of this home</h3>
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

      <div className="bands">
        <ul>
          <li>
            <span className="badge" style={{ background: bandColor("A") }}>
              A
            </span>{" "}
            Very good (most efficient)
          </li>
          <li>
            <span className="badge" style={{ background: bandColor("B") }}>
              B
            </span>{" "}
            Good
          </li>
          <li>
            <span className="badge" style={{ background: bandColor("C") }}>
              C
            </span>{" "}
            Good
          </li>
          <li>
            <span className="badge" style={{ background: bandColor("D") }}>
              D
            </span>{" "}
            Average
          </li>
          <li>
            <span className="badge" style={{ background: bandColor("E") }}>
              E
            </span>{" "}
            Poor
          </li>
          <li>
            <span className="badge" style={{ background: bandColor("F") }}>
              F
            </span>{" "}
            Poor
          </li>
          <li>
            <span className="badge" style={{ background: bandColor("G") }}>
              G
            </span>{" "}
            Very poor (least efficient)
          </li>
          <li>
            <span className="badge na">●</span> Does not apply
          </li>
        </ul>
      </div>
      <p className="ds_hint-text" style={{ marginBottom: 0 }}>
        Assumed means that the insulation could not be inspoected and a
        determination has been made based on age and type on construction.
      </p>
    </div>
  );
}

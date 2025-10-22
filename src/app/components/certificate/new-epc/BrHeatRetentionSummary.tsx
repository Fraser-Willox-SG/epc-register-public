import React from "react";
import HouseDiagram from "@/app/components/certificate/HouseDiagram";

import BandLegend from "./BandLegend";
import ElementBandList from "./ElementBandList";

export default function BrHeatRetentionSummary() {
  return (
    <div id="br-heat-retention-summary" style={{ padding: "16px" }}>
      <h3>Heat Retention summary of this home</h3>
      <p>
        This drawing illustrates the distribution of heat lost in your property.
        It highlights the key areas where heat escapes, including the roof,
        walls, windows, and floor. Understanding these figures can help you
        identify the most effective ways to improve energy efficiency and retain
        heat and reduce heating costs.
      </p>
      <HouseDiagram
        roof={{
          title: "Roof",
          value: "42%",
          improve: "15% after improvements",
        }}
        windows={{
          title: "Windows",
          value: "22%",
          improve: "5% after improvements",
        }}
        walls={{
          title: "Walls",
          value: "24%",
          improve: "15% after improvements",
        }}
        floor={{
          title: "Floor",
          value: "12%",
          improve: "5% after improvements",
        }}
        diagramMaxWidth={360}
        stackClassName="heatloss-stack"
      />
      <p>How to interpret the ratings:</p>
      <div className="row-2col" style={{ marginBottom: "20px" }}>
        <ElementBandList
          items={[
            {
              index: 1,
              title: "Walls",
              band: "D",
              details: ["Solid brick, as built, no insulation (assumed*)"],
            },
            {
              index: 2,
              title: "Roof",
              band: "F",
              details: [
                "Pitched, 200 mm loft insulation",
                "Pitched, no insulation (assumed*)",
              ],
            },
            {
              index: 3,
              title: "Floor",
              band: "B",
              details: ["Suspended, no insulation (assumed*)"],
            },
            {
              index: 4,
              title: "Windows",
              band: "C",
              details: ["Fully double glazed"],
            },
          ]}
        />
        <BandLegend />
      </div>
      <p className="ds_hint-text" style={{ marginBottom: 0 }}>
        * Assumed means that the insulation could not be inspoected and a
        determination has been made based on age and type on construction.
      </p>
    </div>
  );
}

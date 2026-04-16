import React from "react";

export default function ArGlossary() {
  return (
    <section className="cert-section bg-white print-no-break" id="ar-glossary">
      <h2 className="mb-0">Glossary</h2>

      {/* a) Payback */}
      <h3 style={{ fontSize: "1rem" }}>a) Payback</h3>
      <p>
        The payback periods are based on data provided by Good Practice Guides
        and Carbon Trust energy survey reports and are average figures
        calculated using a simple payback method. It is assumed that the source
        data is correct and accurate using up-to-date information.
      </p>
      <p>
        The figures have been calculated as an average across a range of
        buildings and may differ from the actual payback period for the building
        being assessed. Therefore, it is recommended that each suggested measure
        be further investigated before reaching any decision on how to improve
        the energy efficiency of the building.
      </p>

      {/* b) Carbon impact */}
      <h3 style={{ fontSize: "1rem" }}>b) Carbon impact</h3>
      <p>
        The High / Medium / Low carbon impact indicators against each
        recommendation are provided to distinguish, between the suggested
        recommendations, those that would most effectively reduce carbon
        emissions from the building. The carbon impact indicators are determined
        by the energy assessor based on their knowledge of the building. In most
        instances, the carbon impact is estimated and has not been calculated
        accurately.
      </p>

      {/* c) Valid report */}
      <h3 style={{ fontSize: "1rem" }}>c) Valid report</h3>
      <p>
        A valid existing report is defined at the energy assessor&apos;s
        discretion.
      </p>
    </section>
  );
}

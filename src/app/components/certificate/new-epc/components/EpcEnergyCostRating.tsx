import React from "react";
import Link from "next/link";
import EPCBandChart from "@/app/components/certificate/new-epc/EPCBandChart";

import { toBand } from "@/app/utils/epc";

const ScottishAverageHeatRetentionRating = "E";

type Props = {
  /** Raw band values coming from your data source, e.g. "E", "A", etc. */
  currentBand?: string | null;
  potentialBand?: string | null;
};

export default function EpcEnergyCostRating({
  currentBand,
  potentialBand,
}: Props) {
  const current = toBand(currentBand);
  const potential = toBand(potentialBand);

  return (
    <div>
      <div style={{ padding: 16 }}>
        <h2 style={{ marginBottom: 0 }}>
          Energy Performance Certificate (EPC)
        </h2>
      </div>

      <section style={{ background: "#DAEEF7", padding: 16 }}>
        <h3>Energy Cost Rating</h3>
        <p>
          This rating shows the energy efficiency and energy costs of this home.
        </p>

        <div>
          {/* Responsive chart; EPCBandChart should accept Band | null/undefined */}
          <EPCBandChart
            current={current}
            potential={potential}
            markerPlacement="right"
          />
        </div>
      </section>

      <section style={{ background: "#2267B2", color: "white", padding: 16 }}>
        Your energy cost rating is calculated from your heating system and your
        heat-retention rating.
      </section>

      <div style={{ gap: 2 }}>
        <div style={{ background: "#ECECEC", padding: 16 }}>
          <h3>
            <strong>Heating system rating</strong>
          </h3>
          <p>
            This rating shows the combined direct emissions and efficiency of
            the heating system currently installed.
          </p>
          <p>
            Your heating system is {current}. The potential rating is based on
            installing all measures highlighted in{" "}
            <Link href="#">Heating system alternatives</Link> section.
          </p>
          <div>
            <EPCBandChart current={current} potential={potential} />
          </div>
        </div>

        <div style={{ padding: 16 }}>
          <h3>
            <strong>Heat-retention rating</strong>
          </h3>
          <p>
            This rating shows how well your property is insulated to keep warmth
            in.
          </p>
          <p>
            Your Rating of {current} is lower than the Scottish Average of{" "}
            {ScottishAverageHeatRetentionRating}. The potential rating is based
            on installing all measures highlighted in Potential heat retention
            improvements section.
          </p>
          <div>
            <EPCBandChart current={current} potential={potential} />
          </div>
        </div>
      </div>
    </div>
  );
}

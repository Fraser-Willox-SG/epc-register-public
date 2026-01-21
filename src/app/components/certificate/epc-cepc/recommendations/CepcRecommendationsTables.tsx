// app/components/certificate/epc-cepc/recommendations/CepcRecommendationsTables.tsx
import EpcPill from "@/app/components/certificate/EpcPill";

import type { EpcNonDomCepcDocument } from "@/types/epc-non-dom-cepc";

type Props = {
  data?: EpcNonDomCepcDocument; // optional for now; wire later
};

type Impact = "LOW" | "MEDIUM" | "HIGH" | "VERY HIGH" | string;

type RecommendationRow = {
  recommendation: string;
  potentialImpact: Impact;
};

function RecommendationsTable({
  caption,
  rows,
}: {
  caption: string;
  rows: RecommendationRow[];
}) {
  return (
    <table className="ds_table">
      <caption className="sr-only">{caption}</caption>
      <thead>
        <tr>
          <th scope="col">Recommendations</th>
          <th scope="col" style={{ width: "12ch" }}>
            Potential impact
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={2}>—</td>
          </tr>
        ) : (
          rows.map((r, idx) => (
            <tr key={`${caption}-${idx}`}>
              <td>{r.recommendation}</td>
              <td style={{ whiteSpace: "nowrap" }}>
                <EpcPill value={r.potentialImpact} />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default function CepcRecommendationsTables({ data }: Props) {
  const otherMeasuresRows: RecommendationRow[] = [
    { recommendation: "Consider installing PV.", potentialImpact: "MEDIUM" },
    {
      recommendation: "Replace lighting systems with LEDs of at least 110lm/W.",
      potentialImpact: "HIGH",
    },
    {
      recommendation: "Install ASHP to supply existing radiators.",
      potentialImpact: "HIGH",
    },
    {
      recommendation: "Replace glazing with new double glazed units",
      potentialImpact: "MEDIUM",
    },
  ];

  const shortPaybackRows: RecommendationRow[] = [];
  const mediumPaybackRows: RecommendationRow[] = [];
  const longPaybackRows: RecommendationRow[] = [];

  return (
    <section
      id="report-recommendations"
      className="cert-section print-page-break"
    >
      <h2>Recommended improvement measures</h2>

      <h3>
        Recommended measures with a short payback period (less than 3 years)
      </h3>
      <RecommendationsTable
        caption="Recommendations (short payback)"
        rows={shortPaybackRows}
      />

      <h3>Recommended measures with a medium payback period (3 to 7 years)</h3>
      <RecommendationsTable
        caption="Recommendations (medium payback)"
        rows={mediumPaybackRows}
      />

      <h3>
        Recommended measures with a long payback period (more than 7 years)
      </h3>
      <RecommendationsTable
        caption="Recommendations (long payback)"
        rows={longPaybackRows}
      />

      <h3>Other measures</h3>
      <p>
        This section lists other measures selected by your assessor based upon
        an understanding of the building and/or a valid existing Recommendations
        Report.
      </p>
      <RecommendationsTable
        caption="Recommendations (other)"
        rows={otherMeasuresRows}
      />
    </section>
  );
}

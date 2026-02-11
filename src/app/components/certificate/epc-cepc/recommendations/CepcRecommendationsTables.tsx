import EpcPill from "@/app/components/certificate/EpcPill";
import type { SgNonDomesticCepcCertificateSummary } from "@/types/sg-epc-non-dom-cepc";

type Props = {
  data?: SgNonDomesticCepcCertificateSummary;
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

function toRow(rec: {
  recommendation: string;
  cO2Impact: string;
}): RecommendationRow {
  return {
    recommendation: rec.recommendation.trim(),
    potentialImpact: rec.cO2Impact,
  };
}

export default function CepcRecommendationsTables({ data }: Props) {
  const recommendations = Array.isArray(data?.recommendations)
    ? data.recommendations
    : [];

  const shortPaybackRows: RecommendationRow[] = recommendations
    .filter((r) => r.paybackType === "short")
    .map(toRow);

  const mediumPaybackRows: RecommendationRow[] = recommendations
    .filter((r) => r.paybackType === "medium")
    .map(toRow);

  const longPaybackRows: RecommendationRow[] = recommendations
    .filter((r) => r.paybackType === "long")
    .map(toRow);

  const otherMeasuresRows: RecommendationRow[] = recommendations
    .filter(
      (r) =>
        r.paybackType !== "short" &&
        r.paybackType !== "medium" &&
        r.paybackType !== "long",
    )
    .map(toRow);

  return (
    <section
      id="report-recommendations"
      className="cert-section print-page-break"
    >
      <h2>Recommended improvement measures</h2>
      <div className="print-no-break">
        <h3>
          Recommended measures with a short payback period (less than 3 years)
        </h3>
        <RecommendationsTable
          caption="Recommendations (short payback)"
          rows={shortPaybackRows}
        />
      </div>
      <div className="print-no-break">
        <h3>
          Recommended measures with a medium payback period (3 to 7 years)
        </h3>
        <RecommendationsTable
          caption="Recommendations (medium payback)"
          rows={mediumPaybackRows}
        />
      </div>
      <div className="print-no-break">
        <h3>
          Recommended measures with a long payback period (more than 7 years)
        </h3>
        <RecommendationsTable
          caption="Recommendations (long payback)"
          rows={longPaybackRows}
        />
      </div>
      <div className="print-no-break">
        <h3>Other measures</h3>
        <p>
          This section lists other measures selected by your assessor based upon
          an understanding of the building and/or a valid existing
          Recommendations Report.
        </p>
        <RecommendationsTable
          caption="Recommendations (other)"
          rows={otherMeasuresRows}
        />
      </div>
    </section>
  );
}

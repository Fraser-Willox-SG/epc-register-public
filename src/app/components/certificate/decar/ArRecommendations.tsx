import React from "react";
import type { ArSummary, Recommendation } from "@/types/decar";
import EpcPill from "@/app/components/certificate/EpcPill";

type Props = {
  data: ArSummary;
};

function RecommendationsTable({
  title,
  caption,
  items,
}: {
  title: string;
  caption: string;
  items?: Recommendation[] | null;
}) {
  const nonEmpty = items?.filter((r) => (r.text ?? "").trim().length > 0) ?? [];

  if (nonEmpty.length === 0) return null;

  return (
    <section className="ar-recommendations-table print-no-break">
      <h3 className="mb-0">{title}</h3>
      <p className="text-small">{caption}</p>

      <table className="ds_table">
        <thead>
          <tr>
            <th scope="col">Recommendation</th>
            <th scope="col">Potential impact</th>
          </tr>
        </thead>
        <tbody>
          {nonEmpty.map((rec, idx) => (
            <tr key={`${rec.code}-${idx}`}>
              <td>{rec.text}</td>
              <td>
                <EpcPill value={rec.cO2Impact} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default function ArRecommendations({ data }: Props) {
  const {
    shortPaybackRecommendations = [],
    mediumPaybackRecommendations = [],
    longPaybackRecommendations = [],
    otherPaybackRecommendations = [],
  } = data;

  const hasAny =
    shortPaybackRecommendations.length > 0 ||
    mediumPaybackRecommendations.length > 0 ||
    longPaybackRecommendations.length > 0 ||
    otherPaybackRecommendations.length > 0;

  return (
    <section
      className="cert-section bg-white print-no-break"
      id="ar-recommendations"
    >
      <h2 className="mb-0">Recommendations</h2>

      <p className="text-small">
        The following sections list recommendations selected by the energy
        assessor for improving the energy performance of the building. They are
        grouped by indicative payback period and by other additional measures.
      </p>

      {hasAny ? (
        <>
          <RecommendationsTable
            title="a) Recommendations with a short payback"
            caption="This section lists recommendations with a payback of less than 3 years."
            items={shortPaybackRecommendations}
          />

          <RecommendationsTable
            title="b) Recommendations with a medium payback"
            caption="This section lists recommendations with a payback of between 3 and 7 years."
            items={mediumPaybackRecommendations}
          />

          <RecommendationsTable
            title="c) Recommendations with a long payback"
            caption="This section lists recommendations with a payback of more than 7 years."
            items={longPaybackRecommendations}
          />

          <RecommendationsTable
            title="d) Other recommendations"
            caption="This section lists other recommendations selected by the energy assessor, based on their understanding of the building and/or any existing reports."
            items={otherPaybackRecommendations}
          />
        </>
      ) : (
        <p>No specific recommendations were provided for this building.</p>
      )}
    </section>
  );
}

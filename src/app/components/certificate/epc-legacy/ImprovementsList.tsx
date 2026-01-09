import React from "react";

export type Improvement = {
  sequence: number;
  improvementTitle?: string;
  improvementDescription?: string | null;
  indicativeCost?: string | null;
  typicalSaving?: string | null;
  energyPerformanceRatingImprovement?: number | null;
  energyPerformanceBandImprovement?: string | null;
};

export default function ImprovementsList({ items }: { items: Improvement[] }) {
  if (!items?.length) return <p>No recommended improvements recorded.</p>;

  return (
    <ol className="ds_list ds_list--number">
      {items
        .sort((a, b) => (a.sequence ?? 0) - (b.sequence ?? 0))
        .map((imp) => (
          <li key={imp.sequence} className="ds_mb-2">
            <div className="ds_stack">
              <strong>{imp.improvementTitle || "Improvement"}</strong>
              {imp.improvementDescription && (
                <span>{imp.improvementDescription}</span>
              )}
              <span className="ds_hint-text">
                Typical saving:{" "}
                {imp.typicalSaving ? `£${imp.typicalSaving}` : "—"}{" "}
                &nbsp;|&nbsp; Cost: {imp.indicativeCost ?? "—"} &nbsp;|&nbsp;
                Estimated new rating:{" "}
                {imp.energyPerformanceRatingImprovement ?? "—"}
                {imp.energyPerformanceBandImprovement
                  ? ` (${imp.energyPerformanceBandImprovement.toUpperCase()})`
                  : ""}
              </span>
            </div>
          </li>
        ))}
    </ol>
  );
}

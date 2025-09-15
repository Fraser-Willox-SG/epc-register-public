import React from "react";

export type SummaryItem = {
  name: string;
  description: string | null;
  energyEfficiencyRating: number | null;
};

function startCase(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

export default function PropertySummaryTable({
  items,
}: {
  items: SummaryItem[];
}) {
  if (!items?.length)
    return <p>No property summary available for this certificate.</p>;

  return (
    <table className="ds_table">
      <thead>
        <tr>
          <th scope="col">Element</th>
          <th scope="col">Description</th>
          <th scope="col">Energy rating</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={`${item.name}-${i}`}>
            <th scope="row" className="ds_w-30">
              {startCase(item.name)}
            </th>
            <td>{item.description ?? "—"}</td>
            <td>{item.energyEfficiencyRating ?? "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

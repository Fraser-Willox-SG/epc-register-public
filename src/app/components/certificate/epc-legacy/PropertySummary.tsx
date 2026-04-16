import React from "react";

export type SummaryItem = {
  name: string;
  description: string | null;
  energyEfficiencyRating: number | null;
  environmentalEfficiencyRating?: number | null | undefined;
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
    <div>
      <div>Summary of the Energy performance related features of this home</div>
      <div>
        <p>
          This table summarises the survey results for the home’s current
          energy-related features. Each element is assessed using the national
          calculation methodology.
        </p>
        <ol>
          <li>
            Rating scale:
            <ol>
              <li>1 star = very poor (least efficient)</li>
              <li>2 stars = poor</li>
              <li>3 stars = average</li>
              <li>4 stars = good</li>
              <li>5 stars = very good (most efficient)</li>
            </ol>
          </li>
          <li>
            The assessment does not consider the condition of an element or how
            well it is working.
          </li>
          <li>
            “Assumed” means the insulation could not be inspected and an
            assumption was made in the methodology based on the property’s age
            and construction type.
          </li>
        </ol>
      </div>
      <table className="ds_table">
        <thead>
          <tr>
            <th scope="col">Element</th>
            <th scope="col">Description</th>
            <th scope="col">Energy efficiency</th>
            <th scope="col">Environmental</th>
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
              <td>{item.environmentalEfficiencyRating ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div></div>
    </div>
  );
}

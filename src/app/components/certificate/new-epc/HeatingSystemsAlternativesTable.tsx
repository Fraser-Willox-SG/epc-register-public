import * as React from "react";
import BandBadge from "@/app/components/certificate/new-epc/BandBadge";
import { type Band } from "@/app/utils/epc";
import { formatGBP } from "@/app/utils/epc";

export type HeatingAltRow = {
  system: string; // "Heat pump"
  band: Band; // "A" | "B" | ...
  emissions: string; // "Zero" | "51 kgco2/m2/year" etc.
  installCost: number;
  runningCost: number;
};

export default function HeatingSystemsAlternativesTable({
  rows,
  className,
}: {
  rows: HeatingAltRow[];
  className?: string;
}) {
  return (
    <table
      className={`ds_table ${className ?? ""}`}
      style={{ width: "100%", marginTop: "1rem" }}
    >
      <thead>
        <tr>
          <th scope="col">Alternative heating system</th>
          <th scope="col">Heat system rating</th>
          <th scope="col">Estimated Emissions</th>
          <th scope="col">Estimated Installation Costs</th>
          <th scope="col">Estimated running Costs</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.system}>
            <th scope="row" style={{ fontWeight: 600 }}>
              {r.system}
            </th>
            <td style={{ textAlign: "center" }}>
              <BandBadge band={r.band} title={`Band ${r.band}`} />
            </td>
            <td>{r.emissions}</td>
            <td>{formatGBP(r.installCost)}</td>
            <td>{formatGBP(r.runningCost)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

import * as React from "react";
import BandBadge from "@/app/components/certificate/BandBadge";
import NumberBullet from "@/app/components/certificate/epc-hem/NumberBullet";
import { type Band } from "@/app/utils/epc";

type Row = {
  improvement: string;
  costFrom: number;
  costTo: number;
  savingKwh: number;
  potentialBand: Band;
};

export default function PotentialImprovementsTable({
  rows,
  formatGBP,
}: {
  rows: Row[];
  formatGBP: (n: number) => string;
}) {
  return (
    <table
      className="ds_table"
      style={{ marginTop: "1rem", marginBottom: "40px", width: "100%" }}
    >
      <thead>
        <tr>
          <th scope="col" style={{ width: 40 }} aria-label="Row number"></th>
          <th scope="col">Potential improvement</th>
          <th scope="col">Estimated installation cost</th>
          <th scope="col">Estimated annual energy saving</th>
          <th scope="col">Potential heat-retention rating</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.improvement}>
            <td>
              <NumberBullet n={i + 1} />
            </td>
            <td scope="row" style={{ fontWeight: 600 }}>
              {r.improvement}
            </td>
            <td>
              {formatGBP(r.costFrom)} – {formatGBP(r.costTo)}
            </td>
            <td>{r.savingKwh.toLocaleString()} kWh</td>
            <td>
              <BandBadge band={r.potentialBand} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

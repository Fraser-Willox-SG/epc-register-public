// EPCBandChart.tsx (responsive + null-safe)
import React from "react";
import { Band, BANDS, COLORS, LANE, isBand } from "@/app/utils/epc";

// import type { Band } from "@/types/epc-dom";

type Props = {
  current?: Band | null;
  potential?: Band | null;
  maxWidth?: string | number;
};

// const BANDS: Band[] = ["A", "B", "C", "D", "E", "F", "G"];

// const COLORS: Record<Band, string> = {
//   A: "#0b7a3b",
//   B: "#2a9d55",
//   C: "#86b870",
//   D: "#ffd83d",
//   E: "#f4b942",
//   F: "#de6d3b",
//   G: "#d03434",
// };

// const LANE: Record<Band, string> = {
//   A: "#e9f4ec",
//   B: "#ecf7ef",
//   C: "#f1f7ee",
//   D: "#fff9dc",
//   E: "#fff2cf",
//   F: "#fde7e0",
//   G: "#fde2e0",
// };

// const isBand = (v: unknown): v is Band =>
//   typeof v === "string" && (BANDS as readonly string[]).includes(v);

export default function EPCBandChart({
  current,
  potential,
  maxWidth = "100%",
}: Props) {
  const baseW = 880;
  const baseH = 350;

  const pad = 20;
  const labelW = 24;
  const barStartX = pad + labelW + 8;
  const barEndX = baseW - pad;
  const barW = barEndX - barStartX;
  const bandH = 24;
  const bandGap = 8;
  const topY = 80;

  const yForBand = (b: Band) =>
    topY + BANDS.indexOf(b) * (bandH + bandGap) + bandH / 2;
  const xForMarker = (b: Band) => {
    const i = BANDS.indexOf(b);
    const t = (i + 0.5) / BANDS.length;
    return barStartX + t * barW;
  };

  const Marker = ({
    x,
    y,
    label,
    tag,
  }: {
    x: number;
    y: number;
    label: Band;
    tag: "Current" | "Potential";
  }) => (
    <>
      <line
        x1={x}
        y1={topY - 10}
        x2={x}
        y2={y - 18}
        stroke="#6b7280"
        strokeWidth={2}
      />
      <text
        x={x}
        y={topY - 16}
        textAnchor="middle"
        fontSize="14"
        fill="#374151"
      >
        {tag}
      </text>
      <circle
        cx={x}
        cy={y}
        r={18}
        fill="white"
        stroke="#374151"
        strokeWidth={2}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fontWeight={700}
        fontSize="16"
        fill="#374151"
      >
        {label}
      </text>
    </>
  );

  const hasCurrent = isBand(current);
  const hasPotential = isBand(potential);

  return (
    <div style={{ width: "100%", maxWidth }}>
      <svg
        viewBox={`0 0 ${baseW} ${baseH}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMinYMin meet"
        role="img"
        aria-label={`Energy cost rating${
          hasCurrent ? `: current ${current}` : ""
        }${hasPotential ? `, potential ${potential}` : ""}`}
      >
        <text x={pad} y={topY - 28} fontSize="14" fill="#374151">
          Lower running costs
        </text>
        <text
          x={pad}
          y={topY + 8 * (bandH + bandGap)}
          fontSize="14"
          fill="#374151"
        >
          Higher running costs
        </text>

        {BANDS.map((b, idx) => {
          const y = topY + idx * (bandH + bandGap);
          return (
            <g key={b}>
              <text
                x={pad + 4}
                y={y + bandH - 8}
                fontSize="16"
                fontWeight={700}
                fill="#0f172a"
              >
                {b}
              </text>
              <rect
                x={barStartX}
                y={y}
                width={barW}
                height={bandH}
                rx={12}
                fill={LANE[b]}
              />
              <rect
                x={barStartX}
                y={y}
                width={barW * 0.6}
                height={bandH}
                rx={12}
                fill={COLORS[b]}
              />
            </g>
          );
        })}

        {hasCurrent && (
          <>
            <text
              x={xForMarker(current)}
              y={topY - 36}
              textAnchor="middle"
              fontSize="16"
              fill="#374151"
            >
              Current
            </text>
            <Marker
              x={xForMarker(current)}
              y={yForBand(current)}
              label={current}
              tag="Current"
            />
          </>
        )}

        {hasPotential && (
          <>
            <text
              x={xForMarker(potential)}
              y={topY - 36}
              textAnchor="middle"
              fontSize="16"
              fill="#374151"
            >
              Potential
            </text>
            <Marker
              x={xForMarker(potential)}
              y={yForBand(potential)}
              label={potential}
              tag="Potential"
            />
          </>
        )}
      </svg>
    </div>
  );
}

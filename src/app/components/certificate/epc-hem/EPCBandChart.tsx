import React from "react";
import {
  Band,
  BANDS,
  COLORS,
  LANE,
  isBand,
  bandTextColor,
} from "@/app/utils/epc";

type Props = {
  current?: Band | null;
  potential?: Band | null;
  maxWidth?: string | number;
  markerPlacement?: "right" | "band";
};

// Fractions of the full lane width per band
const FILL_FRACTION: Record<Band, number> = {
  A: 0.2,
  B: 0.25,
  C: 0.3,
  D: 0.35,
  E: 0.4,
  F: 0.45,
  G: 0.5,
};

export default function EPCBandChart({
  current,
  potential,
  maxWidth = "100%",
  markerPlacement = "right",
}: Props) {
  const baseW = 880;
  const baseH = 450;

  const pad = 20;
  // const labelW = 24;
  const barStartX = 0;
  //  const barStartX = pad + labelW + 8;
  const barEndX = baseW - pad;
  const barW = barEndX - barStartX;
  const bandH = 36;
  // const bandH = 24;
  const bandGap = 8;
  const topY = 80;

  const yForBand = (b: Band) =>
    topY + BANDS.indexOf(b) * (bandH + bandGap) + bandH / 2;

  // Old positioning (kept for backwards compatibility)
  const xForBandCenter = (b: Band) => {
    const i = BANDS.indexOf(b);
    const t = (i + 0.5) / BANDS.length;
    return barStartX + t * barW;
  };

  // New preferred positioning – push markers to the right hand side.
  // Slightly separate Current and Potential so they don’t overlap.
  const xRightCurrent = barEndX - 330;
  const xRightPotential = barEndX - 140;

  const xForCurrent =
    markerPlacement === "band" && current
      ? xForBandCenter(current)
      : xRightCurrent;
  const xForPotential =
    markerPlacement === "band" && potential
      ? xForBandCenter(potential)
      : xRightPotential;

  const Marker = ({
    x,
    y,
    label,
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
      <circle
        cx={x}
        cy={y}
        r={24}
        fill={COLORS[label]}
        stroke="#374151"
        strokeWidth={2}
      />
      <text
        x={x}
        y={y + 11}
        textAnchor="middle"
        fontWeight={700}
        fontSize="32"
        fill={bandTextColor(label)}
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
        <text
          // x={pad}
          y={topY - 28}
          fontSize="14"
          fill="#374151"
        >
          Lower running costs
        </text>
        <text
          // x={pad}
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
                width={barW * FILL_FRACTION[b]}
                height={bandH}
                rx={12}
                fill={COLORS[b]}
              ></rect>
              <text
                x={barStartX + pad}
                // x={pad + 4}
                y={y + bandH - 8}
                fontSize="28"
                fontWeight={700}
                fill={bandTextColor(b)}
              >
                {b}
              </text>
            </g>
          );
        })}

        {hasCurrent && (
          <>
            <text
              x={xForCurrent}
              y={topY - 36}
              textAnchor="middle"
              fontSize="20"
              fontWeight={800}
              fill="#374151"
            >
              Current
            </text>
            <Marker
              x={xForCurrent}
              y={yForBand(current)}
              label={current}
              tag="Current"
            />
          </>
        )}

        {hasPotential && (
          <>
            <text
              x={xForPotential}
              y={topY - 36}
              textAnchor="middle"
              fontSize="20"
              fontWeight={800}
              fill="#374151"
            >
              Potential
            </text>
            <Marker
              x={xForPotential}
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

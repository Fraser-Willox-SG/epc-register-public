import React from "react";
import {
  type Band,
  COLORS,
  COLORS_CO2,
  LANE,
  LANE_CO2,
  isBand,
} from "@/app/utils/epc";

type Props = {
  band?: Band | string | null;
  score?: number | string | null;
  variant: "energy" | "environment";
  size?: number; // circle diameter-ish
};

export default function RatingBadge({
  band,
  score,
  variant,
  size = 34,
}: Props) {
  const b = typeof band === "string" ? band.toUpperCase() : band;
  if (!isBand(b)) return <span>—</span>;

  const circleFill = variant === "environment" ? COLORS_CO2[b] : COLORS[b];
  const pillFill = variant === "environment" ? LANE_CO2[b] : LANE[b];

  const scoreText =
    score === null || score === undefined || score === "" ? "—" : String(score);

  const w = 88;
  const h = size + 10;
  const r = size / 2;
  const pad = 2; // enough for 1.5px stroke
  const vbW = w + pad * 2;
  const vbH = h + pad * 2;

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 8px",
      }}
    >
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${vbW} ${vbH}`}
        role="img"
        aria-label={`${
          variant === "environment" ? "Environment" : "Energy"
        } rating ${b} ${scoreText}`}
      >
        {/* Background pill */}
        <rect
          x={pad}
          y={pad + 4}
          width={w}
          height={h - 8}
          rx={(h - 8) / 2}
          fill={pillFill}
          stroke="#1a1a1a"
          strokeWidth={1.5}
        />

        {/* Band circle */}
        <circle
          cx={pad + r}
          cy={pad + h / 2}
          r={r}
          fill={circleFill}
          stroke="#1a1a1a"
          strokeWidth={1.5}
        />

        {/* Band letter */}
        <text
          x={pad + r}
          y={pad + h / 2 + 6}
          textAnchor="middle"
          fontWeight={400}
          fontSize={18}
          fill="#ffffff"
          stroke="#111827"
          strokeWidth={4}
          paintOrder="stroke"
        >
          {b}
        </text>

        {/* Score */}
        <text
          x={pad + w - 20}
          y={pad + h / 2 + 6}
          textAnchor="end"
          fontWeight={900}
          fontSize={17}
          fill="#111827"
        >
          {scoreText}
        </text>
      </svg>
    </span>
  );
}

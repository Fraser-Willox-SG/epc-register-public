import React from "react";
import {
  type AnyBand,
  type Band,
  COLORS,
  COLORS_CO2,
  LANE,
  LANE_CO2,
  toBaseBand,
} from "@/app/utils/epc";

type Props = {
  band?: AnyBand | string | null;
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
  const label =
    typeof band === "string" ? band.trim().toUpperCase() : (band ?? "");
  const base: Band | undefined = toBaseBand(
    typeof label === "string" ? label : String(label),
  );

  if (!base) return <span>—</span>;

  const circleFill =
    variant === "environment" ? COLORS_CO2[base] : COLORS[base];
  const pillFill = variant === "environment" ? LANE_CO2[base] : LANE[base];

  const scoreText =
    score === null || score === undefined || score === "" ? "—" : String(score);

  const isPlus = typeof label === "string" && label.includes("+");

  const w = 88;
  const h = size + 10;

  const r = (isPlus ? size + 6 : size) / 2;
  const pad = 2;
  const vbW = w + pad * 2;
  const vbH = h + pad * 2;

  // Slightly reduce band font size for '+' so it stays comfortably inside the circle
  const bandFontSize = isPlus ? 16 : 18;

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
        } rating ${label} ${scoreText}`}
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

        {/* Band letter (or E+) */}
        <text
          x={pad + r}
          y={pad + h / 2 + 6}
          textAnchor="middle"
          fontWeight={400}
          fontSize={bandFontSize}
          fill="#ffffff"
          stroke="#111827"
          strokeWidth={4}
          paintOrder="stroke"
        >
          {label}
        </text>

        {/* Score */}
        <text
          x={pad + w - 15}
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

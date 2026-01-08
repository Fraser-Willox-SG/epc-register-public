import React from "react";
import {
  type Band,
  COLORS,
  COLORS_CO2,
  bandTextColor,
  isBand,
} from "@/app/utils/epc";

type Props = {
  band?: Band | string | null;
  score?: number | string | null;
  variant: "energy" | "environment";
  size?: number; // px
};

export default function RatingBadge({
  band,
  score,
  variant,
  size = 28,
}: Props) {
  const b = typeof band === "string" ? band.toUpperCase() : band;

  if (!isBand(b)) return <span>—</span>;

  const fill = variant === "environment" ? COLORS_CO2[b] : COLORS[b];
  const textFill = bandTextColor(b);

  const scoreText =
    score === null || score === undefined || score === "" ? "—" : String(score);

  const w = 74;
  const h = size + 8;
  const r = size / 2;

  return (
    <span style={{ display: "inline-block", lineHeight: 0 }}>
      <svg
        width={w}
        height={h}
        viewBox={`0 0 ${w} ${h}`}
        role="img"
        aria-label={`${
          variant === "environment" ? "Environment" : "Energy"
        } rating ${b} ${scoreText}`}
      >
        {/* Background pill */}
        <rect
          x={0}
          y={4}
          width={w}
          height={h - 8}
          rx={(h - 8) / 2}
          fill={fill}
          stroke="#1a1a1a"
          strokeWidth={1.5}
        />

        {/* Band circle */}
        <circle
          cx={r + 6}
          cy={h / 2}
          r={r}
          fill={fill}
          stroke="#1a1a1a"
          strokeWidth={1.5}
        />

        {/* Band letter */}
        <text
          x={r + 6}
          y={h / 2 + 6}
          textAnchor="middle"
          fontWeight={800}
          fontSize={16}
          fill={textFill}
        >
          {b}
        </text>

        {/* Score */}
        <text
          x={w - 12}
          y={h / 2 + 6}
          textAnchor="end"
          fontWeight={800}
          fontSize={16}
          fill="#111827"
        >
          {scoreText}
        </text>
      </svg>
    </span>
  );
}

import * as React from "react";
import { type AnyBand, type Band, COLORS, toBaseBand } from "@/app/utils/epc";

export default function BandBadge({
  band,
  size = 36,
  title,
  className,
}: {
  band: AnyBand;
  size?: number;
  title?: string;
  className?: string;
}) {
  const text = String(band).trim().toUpperCase();
  const isPlus = text.includes("+");
  const effectiveSize = isPlus ? Math.max(size, 38) : size;
  const base: Band | undefined = toBaseBand(text);

  const background = base ? COLORS[base] : "#DDDDDD";
  const stroke = "#374151";
  const textStroke = "#111827";

  const fontSize = isPlus ? effectiveSize * 0.52 : effectiveSize * 0.6;
  const cyAdjust = isPlus ? effectiveSize * 0.06 : effectiveSize * 0.07;

  return (
    <span
      className={className}
      aria-hidden="true"
      title={title}
      style={{
        display: "inline-flex",
        width: effectiveSize,
        height: effectiveSize,
        verticalAlign: "middle",
      }}
    >
      <svg
        width={effectiveSize}
        height={effectiveSize}
        viewBox={`0 0 ${effectiveSize} ${effectiveSize}`}
        role="img"
        aria-label={title ?? `EPC band ${text}`}
      >
        <circle
          cx={effectiveSize / 2}
          cy={effectiveSize / 2}
          r={effectiveSize / 2 - 2}
          fill={background}
          stroke={stroke}
          strokeWidth={2}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          dy={cyAdjust}
          fontWeight={400}
          fontSize={fontSize}
          fill="#ffffff"
          stroke={textStroke}
          strokeWidth={isPlus ? 4 : 4}
          paintOrder="stroke"
        >
          {text}
        </text>
      </svg>
    </span>
  );
}

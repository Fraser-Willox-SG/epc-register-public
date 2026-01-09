import React from "react";

type Props = {
  current?: number | null; // 1–100
  potential?: number | null; // 1–100
  className?: string;
};

const BANDS = [
  { label: "A", min: 92, max: 100 },
  { label: "B", min: 81, max: 91 },
  { label: "C", min: 69, max: 80 },
  { label: "D", min: 55, max: 68 },
  { label: "E", min: 39, max: 54 },
  { label: "F", min: 21, max: 38 },
  { label: "G", min: 1, max: 20 },
] as const;

function xForRating(r: number, width: number) {
  // Map 1..100 onto 0..width (clamped)
  const clamped = Math.max(1, Math.min(100, r));
  return ((clamped - 1) / 99) * width;
}

export default function EpcScale({ current, potential, className }: Props) {
  const width = 560;
  const height = 160;
  const barH = 18;
  const gap = 8;
  const left = 110; // leave room for band labels
  const right = 12;
  const w = width - left - right;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Energy Performance scale A to G with current and potential ratings"
    >
      <title>EPC scale</title>
      <desc>
        Shows energy bands A to G, with markers for current and potential
        ratings.
      </desc>

      {BANDS.map((b, i) => {
        const y = 16 + i * (barH + gap);
        const bandWidth = w * ((b.max - b.min + 1) / 100);
        const x = left + w * ((b.min - 1) / 100);

        // simple band colors broadly matching EPC palette
        const fill =
          b.label === "A"
            ? "#3CB043"
            : b.label === "B"
            ? "#66B032"
            : b.label === "C"
            ? "#B2D235"
            : b.label === "D"
            ? "#FFD23F"
            : b.label === "E"
            ? "#F4A259"
            : b.label === "F"
            ? "#F19C65"
            : "#E15554";

        return (
          <g key={b.label}>
            <text x={8} y={y + barH - 3} fontSize="14" fontWeight="bold">
              {b.label}
            </text>
            <rect
              x={x}
              y={y}
              width={bandWidth}
              height={barH}
              rx="3"
              fill={fill}
              stroke="#222"
              strokeOpacity="0.15"
            />
          </g>
        );
      })}

      {/* axis */}
      <line
        x1={left}
        y1={height - 32}
        x2={width - right}
        y2={height - 32}
        stroke="#999"
        strokeWidth="1"
      />
      <text x={left} y={height - 12} fontSize="12">
        1
      </text>
      <text
        x={width - right - 12}
        y={height - 12}
        fontSize="12"
        textAnchor="end"
      >
        100
      </text>

      {/* markers */}
      {typeof current === "number" && (
        <g aria-label={`Current rating ${current}`}>
          <line
            x1={left + xForRating(current, w)}
            x2={left + xForRating(current, w)}
            y1={8}
            y2={height - 36}
            stroke="#222"
            strokeDasharray="4 3"
          />
          <circle
            cx={left + xForRating(current, w)}
            cy={height - 48}
            r="10"
            fill="white"
            stroke="#222"
          />
          <text
            x={left + xForRating(current, w)}
            y={height - 44}
            fontSize="12"
            textAnchor="middle"
          >
            Current
          </text>
        </g>
      )}
      {typeof potential === "number" && (
        <g aria-label={`Potential rating ${potential}`}>
          <line
            x1={left + xForRating(potential, w)}
            x2={left + xForRating(potential, w)}
            y1={8}
            y2={height - 36}
            stroke="#222"
            strokeDasharray="4 3"
          />
          <circle
            cx={left + xForRating(potential, w)}
            cy={height - 72}
            r="10"
            fill="white"
            stroke="#222"
          />
          <text
            x={left + xForRating(potential, w)}
            y={height - 68}
            fontSize="12"
            textAnchor="middle"
          >
            Potential
          </text>
        </g>
      )}
    </svg>
  );
}

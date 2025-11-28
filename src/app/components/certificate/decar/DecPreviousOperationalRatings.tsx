import React from "react";
import { formatDecLongDate } from "@/app/utils/date";
import { Band, COLORS } from "@/app/utils/epc";

type Period = {
  /** Label shown on the Y axis, e.g. "07-2022" */
  label: string;
  /** Operational rating value */
  rating: number;
};

type DecBand = {
  band: Band;
  min: number;
  max: number | null;
};

const DEC_BANDS: DecBand[] = [
  { band: "A", min: 0, max: 25 },
  { band: "B", min: 26, max: 50 },
  { band: "C", min: 51, max: 75 },
  { band: "D", min: 76, max: 100 },
  { band: "E", min: 101, max: 125 },
  { band: "F", min: 126, max: 150 },
  { band: "G", min: 151, max: null },
];

function getBandForRating(rating: number): Band {
  const match =
    DEC_BANDS.find((b) =>
      b.max == null ? rating >= b.min : rating >= b.min && rating <= b.max
    ) ?? DEC_BANDS[DEC_BANDS.length - 1];

  return match.band;
}

type Props = {
  periods: Period[]; // typically current, year1, year2
  maxValue?: number; // X-axis max, default 200
  maxWidth?: number | string; // CSS width constraint
};

const DecPreviousOperationalRatings: React.FC<Props> = ({
  periods,
  maxValue = 200,
  maxWidth = "100%",
}) => {
  if (!periods.length) return null;

  const w = 260;
  const rowHeight = 40;
  const topPad = 20;
  const bottomPad = 30;
  const h = topPad + periods.length * rowHeight + bottomPad;

  const axisLeft = 73;
  const axisBottom = h - bottomPad;
  const axisRight = w - 10;

  const barX = axisLeft;
  const barMaxW = axisRight - barX;

  const labelGap = 14; // gap between date text and bar

  const clamp = (v: number) => Math.min(Math.max(v, 0), maxValue);
  const scale = (value: number) => (clamp(value) / maxValue) * barMaxW;

  const ticks = Array.from({ length: 5 }, (_, i) => (maxValue / 4) * i);

  const ariaLabel = `Previous operational ratings: ${periods
    .map((p) => `${p.label} ${p.rating}`)
    .join(", ")}`;

  return (
    <div style={{ width: "100%", maxWidth }}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${w} ${h}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMinYMin meet"
      >
        {/* X-axis */}
        <line
          x1={axisLeft}
          y1={axisBottom}
          x2={axisRight}
          y2={axisBottom}
          stroke="#000"
          strokeWidth={1}
        />

        {/* Ticks + labels */}
        {ticks.map((t) => {
          const x = axisLeft + (t / maxValue) * (axisRight - axisLeft);
          return (
            <g key={t}>
              <line
                x1={x}
                y1={axisBottom}
                x2={x}
                y2={axisBottom + 4}
                stroke="#000"
                strokeWidth={1}
              />
              <text
                x={x}
                y={axisBottom + 14}
                fontSize="8"
                textAnchor="middle"
                fill="#000"
              >
                {t}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {periods.map((p, index) => {
          const yCenter = topPad + index * rowHeight + rowHeight / 2;
          const barHeight = 24;
          const barWidth = scale(p.rating);
          const band = getBandForRating(p.rating);
          const fill = COLORS[band];

          return (
            <g key={`${p.label}-${p.rating}`}>
              {/* Y label */}
              <text
                x={axisLeft - labelGap}
                y={yCenter + 3}
                fontSize="9"
                textAnchor="end"
                fill="#000"
              >
                {formatDecLongDate(p.label)}
              </text>

              {/* Bar */}
              <rect
                x={barX}
                y={yCenter - barHeight / 2}
                width={barWidth}
                height={barHeight}
                fill={fill}
              />

              {/* Value text */}
              <text
                x={barX + 6}
                y={yCenter + 4.5}
                fontSize="14"
                fontWeight={700}
                fill="#fff"
                stroke="#000"
                strokeWidth={2}
                paintOrder="stroke"
              >
                {p.rating}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DecPreviousOperationalRatings;

import React from "react";
import { formatDecLongDate } from "@/app/utils/date";

type Props = {
  electricityCo2: number; // tonnes per year
  heatingCo2: number;
  renewablesCo2: number;
  /** x-axis label, e.g. "07-2022" */
  periodLabel: string;
  /**
   * Optional fixed max for y-axis. If omitted, the axis
   * will be dynamically chosen based on the data.
   */
  maxValue?: number;
  /** Optional width limit to fit your layout */
  maxWidth?: string | number;
};

// Choose an axis max from a set of "nice" values so that
// the bar usually reaches ~70–90% of the height.
function getAxisMax(total: number, override?: number): number {
  if (override !== undefined) return override;
  if (total <= 0) return 1;

  // Candidate tops, roughly matching DEC examples
  const candidates = [
    15, 20, 50, 60, 100, 150, 200, 250, 300, 400, 500, 600, 800, 1000, 1200,
  ];

  // Give ourselves a tiny bit of headroom
  const padded = total * 1.05;

  const found = candidates.find((c) => padded <= c);
  return found ?? padded;
}

export const DecCO2Emissions: React.FC<Props> = ({
  electricityCo2,
  heatingCo2,
  renewablesCo2,
  periodLabel,
  maxValue,
  maxWidth = "100%",
}) => {
  const total = electricityCo2 + heatingCo2 + renewablesCo2;

  const axisMax = getAxisMax(total, maxValue);

  // SVG layout
  const viewW = 220;
  const viewH = 260;

  const axisLeft = 30;
  const axisBottom = 220;
  const axisTop = 20;
  const axisHeight = axisBottom - axisTop;

  const barWidth = 60;
  const barX = axisLeft + 15;

  const scale = (value: number) => (value / axisMax) * axisHeight;

  // Heights for each segment
  const hElec = scale(electricityCo2);
  const hHeat = scale(heatingCo2);
  const hRen = scale(renewablesCo2);

  // Bottom-up stacking
  const yElec = axisBottom - hElec;
  const yHeat = yElec - hHeat;
  const yRen = yHeat - hRen;

  const ariaLabel =
    total > 0
      ? `Total CO2 emissions for ${periodLabel}: ${Math.round(
          total
        )} tonnes per year (${Math.round(
          electricityCo2
        )} electricity, ${Math.round(heatingCo2)} heating, ${Math.round(
          renewablesCo2
        )} renewables).`
      : `Total CO2 emissions chart for ${periodLabel}: no data`;

  // Dynamic ticks from 0..axisMax (7 ticks, like before)
  const tickStep = axisMax / 6;
  const ticks = Array.from({ length: 7 }, (_, i) => Math.round(i * tickStep));

  return (
    <div style={{ width: "100%", maxWidth }}>
      <svg
        viewBox={`0 0 ${viewW} ${viewH}`}
        width="100%"
        height="auto"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Y-axis */}
        <line
          x1={axisLeft}
          y1={axisTop}
          x2={axisLeft}
          y2={axisBottom}
          stroke="#000"
          strokeWidth={1}
        />

        {/* Y-axis ticks & labels */}
        {ticks.map((tick) => {
          const y = axisBottom - scale(tick);
          return (
            <g key={tick}>
              <line
                x1={axisLeft - 3}
                y1={y}
                x2={axisLeft}
                y2={y}
                stroke="#000"
                strokeWidth={1}
              />
              <text
                x={axisLeft - 6}
                y={y + 3}
                fontSize="8"
                textAnchor="end"
                fill="#000"
              >
                {tick}
              </text>
            </g>
          );
        })}

        {/* X-axis label */}
        <text
          x={barX + barWidth / 2}
          y={axisBottom + 14}
          fontSize="9"
          textAnchor="middle"
        >
          {formatDecLongDate(periodLabel)}
        </text>

        {/* Stacked bar */}
        {total > 0 && (
          <>
            {/* Electricity (bottom, light blue) */}
            <rect
              x={barX}
              y={yElec}
              width={barWidth}
              height={hElec}
              fill="#7EC8F5"
              stroke="#000"
              strokeWidth={1}
            />
            {/* Heating (middle, darker blue) */}
            <rect
              x={barX}
              y={yHeat}
              width={barWidth}
              height={hHeat}
              fill="#0072C6"
              stroke="#000"
              strokeWidth={1}
            />
            {/* Renewables (top, grey) */}
            <rect
              x={barX}
              y={yRen}
              width={barWidth}
              height={hRen}
              fill="#A0A0A0"
              stroke="#000"
              strokeWidth={1}
            />
          </>
        )}

        {/* Legend */}
        <g aria-hidden="true">
          <rect
            x={barX + barWidth + 20}
            y={axisTop + 4}
            width={12}
            height={12}
            fill="#A0A0A0"
          />
          <text
            x={barX + barWidth + 36}
            y={axisTop + 14}
            fontSize="9"
            alignmentBaseline="middle"
          >
            Renewables
          </text>

          <rect
            x={barX + barWidth + 20}
            y={axisTop + 22}
            width={12}
            height={12}
            fill="#0072C6"
          />
          <text
            x={barX + barWidth + 36}
            y={axisTop + 32}
            fontSize="9"
            alignmentBaseline="middle"
          >
            Heating
          </text>

          <rect
            x={barX + barWidth + 20}
            y={axisTop + 40}
            width={12}
            height={12}
            fill="#7EC8F5"
          />
          <text
            x={barX + barWidth + 36}
            y={axisTop + 50}
            fontSize="9"
            alignmentBaseline="middle"
          >
            Electricity
          </text>
        </g>
      </svg>
    </div>
  );
};

export default DecCO2Emissions;

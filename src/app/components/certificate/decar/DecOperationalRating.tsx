import React from "react";
import { Band, COLORS, bandTextColor } from "@/app/utils/epc";

type Props = {
  rating: number; // e.g. 96
  typicalValue?: number; // e.g. 100 (default)
  maxWidth?: string | number;
};

type DecBand = {
  band: Band;
  rangeLabel: string;
  min: number;
  max: number | null; // null = open-ended
};

const DEC_BANDS: DecBand[] = [
  { band: "A", rangeLabel: "0-25", min: 0, max: 25 },
  { band: "B", rangeLabel: "26-50", min: 26, max: 50 },
  { band: "C", rangeLabel: "51-75", min: 51, max: 75 },
  { band: "D", rangeLabel: "76-100", min: 76, max: 100 },
  { band: "E", rangeLabel: "101-125", min: 101, max: 125 },
  { band: "F", rangeLabel: "126-150", min: 126, max: 150 },
  { band: "G", rangeLabel: "Over 150", min: 151, max: null },
];

function getBandForRating(rating: number): DecBand {
  const match =
    DEC_BANDS.find((b) =>
      b.max == null ? rating >= b.min : rating >= b.min && rating <= b.max
    ) ?? DEC_BANDS[DEC_BANDS.length - 1];

  return match;
}

export default function DecOperationalRating({
  rating,
  typicalValue = 100,
  maxWidth = "100%", //320,
}: Props) {
  const band = getBandForRating(rating);
  const activeIndex = DEC_BANDS.indexOf(band);

  const baseW = 420;
  const baseH = 360;

  const padX = 0; //12
  const barX = padX;
  const barW = 220;
  const bandH = 32;
  const bandGap = 6;
  const topY = 60;

  const pointerX = barX + barW + 40;
  const valueX = pointerX + 32;

  const yForIndex = (idx: number) => topY + idx * (bandH + bandGap);

  const activeY = yForIndex(activeIndex) + bandH / 2;

  const typicalY = yForIndex(3) + bandH + bandGap / 2; // roughly under D band

  const ariaLabel = `Operational rating ${rating}, band ${band.band}`;

  return (
    <div style={{ width: "100%", maxWidth }}>
      <svg
        viewBox={`0 0 ${baseW} ${baseH}`}
        width="100%"
        height="auto"
        preserveAspectRatio="xMinYMin meet"
        role="img"
        aria-label={ariaLabel}
      >
        {/* Top label */}
        <text
          x={barX}
          y={topY - 20} //20
          fontSize="12"
          fontWeight={600}
          fill="#111827"
        >
          More energy efficient
        </text>
        {/* Bands */}
        {DEC_BANDS.map((b, idx) => {
          const y = yForIndex(idx);
          const isActive = idx === activeIndex;
          return (
            <g key={b.band}>
              {/* band bar */}
              <rect
                x={barX}
                y={y}
                width={barW}
                height={bandH}
                fill={COLORS[b.band]}
                stroke={isActive ? "#000" : "none"}
                strokeWidth={isActive ? 3 : 0}
              />
              {/* band letter */}
              <text
                x={barX + 10}
                y={y + bandH / 2 + 6}
                fontSize="18"
                fontWeight={700}
                fill={bandTextColor(b.band)}
              >
                {b.band}
              </text>
              {/* band range */}
              <text
                x={barX + 40}
                y={y + bandH / 2 + 5}
                fontSize="13"
                fill={bandTextColor(b.band)}
              >
                {b.rangeLabel}
              </text>
            </g>
          );
        })}
        {/* Pointer + rating value */}
        <g aria-hidden="true">
          {/* triangle pointer */}
          <polygon
            points={`${pointerX},${activeY} ${pointerX - 20},${activeY - 14} ${
              pointerX - 20
            },${activeY + 14}`}
            fill="#ffd700"
            stroke="#000"
            strokeWidth={2}
          />
          {/* numeric value */}
          <text
            x={valueX}
            y={activeY + 8}
            fontSize="32"
            fontWeight={700}
            fill="#ffd700"
          >
            {rating}
          </text>
        </g>
        {/* Typical value line */}
        <g aria-hidden="true">
          <line
            x1={barX}
            y1={typicalY}
            x2={valueX + 10}
            y2={typicalY}
            stroke="#005ea5"
            strokeWidth={1}
            strokeDasharray="4,2"
          />
          <text x={valueX + 12} y={typicalY - 2} fontSize="10" fill="#005ea5">
            {typicalValue} would be typical
          </text>
        </g>
        {/* Bottom label */}
        <text
          x={barX}
          y={topY + DEC_BANDS.length * (bandH + bandGap) + 24}
          fontSize="12"
          fontWeight={600}
          fill="#111827"
        >
          Less energy efficient
        </text>
        {/* Caption
        <foreignObject
          x={barX}
          y={baseH - 70}
          width={baseW - 2 * padX}
          height={60}
        >
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            style={{ fontSize: "11px", lineHeight: 1.3, color: "#111827" }}
          >
            This tells you how efficiently energy has been used in the building.
            The numbers do not represent actual units of energy consumed; they
            represent comparative energy efficiency. {typicalValue} would be
            typical for this kind of building.
          </div>
        </foreignObject> */}
      </svg>
    </div>
  );
}

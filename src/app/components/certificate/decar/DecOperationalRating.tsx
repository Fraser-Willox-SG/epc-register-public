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

// Fractions of the full bar width per band – shorter for A, longer towards G.
const DEC_FILL_FRACTION: Record<Band, number> = {
  A: 0.4,
  B: 0.5,
  C: 0.6,
  D: 0.7,
  E: 0.8,
  F: 0.9,
  G: 1.0,
};

function getBandForRating(rating: number): DecBand {
  const match =
    DEC_BANDS.find((b) =>
      b.max == null ? rating >= b.min : rating >= b.min && rating <= b.max,
    ) ?? DEC_BANDS[DEC_BANDS.length - 1];

  return match;
}

export default function DecOperationalRating({
  rating,
  typicalValue = 100,
  maxWidth = "100%",
}: Props) {
  const band = getBandForRating(rating);
  const bandColour = COLORS[band.band];
  const activeIndex = DEC_BANDS.indexOf(band);

  const baseW = 420;
  const baseH = 320;

  const padX = 0;
  const barX = padX;
  const barW = 220;
  const bandH = 28;
  const bandGap = 8;
  const topY = 30;

  const pointerX = barX + barW + 40;
  const valueX = pointerX + 32;

  const yForIndex = (idx: number) => topY + idx * (bandH + bandGap);

  const activeY = yForIndex(activeIndex) + bandH / 2;

  const typicalY = yForIndex(3) + bandH + bandGap / 2; // roughly under D band

  const ariaLabel = `Operational rating ${rating}, band ${band.band}`;

  return (
    <div className="dec-operational-rating" style={{ width: "100%", maxWidth }}>
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
          y={topY - 10}
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
          const width = barW * DEC_FILL_FRACTION[b.band];

          return (
            <g key={b.band}>
              {/* band bar */}
              <rect
                x={barX + 2}
                y={y}
                width={width}
                height={bandH}
                fill={COLORS[b.band]}
                stroke={isActive ? "#000" : COLORS[b.band]}
                strokeWidth={2}
              />
              {/* band letter */}
              <text
                x={barX + 10}
                y={y + bandH / 2 + 6}
                fontSize="18"
                fontWeight={700}
                fill="#ffffff"
                stroke="#111827"
                strokeWidth={4}
                paintOrder="stroke"
              >
                {b.band}
              </text>
              {/* band range */}
              <text
                x={barX + 40}
                y={y + bandH / 2 + 5}
                fontSize="13"
                fontWeight={600}
                fill="#ffffff"
                stroke="#111827"
                strokeWidth={2.25}
                paintOrder="stroke"
              >
                {b.rangeLabel}
              </text>
            </g>
          );
        })}

        {/* Pointer + rating value */}
        <g aria-hidden="true">
          <polygon
            points={`${pointerX},${activeY} ${pointerX - 20},${activeY - 14} ${
              pointerX - 20
            },${activeY + 14}`}
            fill={bandColour}
            stroke="#000"
            strokeWidth={2}
            transform={`rotate(180 ${pointerX} ${activeY})`}
          />
          <text
            x={valueX}
            y={activeY + 11}
            stroke="#000"
            strokeWidth={4}
            paintOrder="stroke"
            fontSize="32"
            fontWeight={700}
            fill={bandColour}
          >
            {rating}
          </text>
        </g>

        {/* Typical value line */}
        <g aria-hidden="true">
          <line
            x1={barX}
            y1={typicalY}
            x2={valueX - 10}
            y2={typicalY}
            stroke="#000000"
            strokeWidth={1}
            strokeDasharray="4,2"
          />
          <text x={valueX} y={typicalY + 3} fontSize="10" fill="#000">
            {typicalValue} would be typical
          </text>
        </g>

        {/* Bottom label */}
        <text
          x={barX}
          y={topY + DEC_BANDS.length * (bandH + bandGap) + 14}
          fontSize="12"
          fontWeight={600}
          fill="#111827"
        >
          Less energy efficient
        </text>
      </svg>
    </div>
  );
}

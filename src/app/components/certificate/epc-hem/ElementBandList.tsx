import * as React from "react";
import { type Band } from "@/app/utils/epc";
import BandBadge from "../BandBadge";

type Item = {
  /** 1-based position shown in the black circle */
  index: number;
  /** e.g. "Walls", "Roof" */
  title: string;
  /** EPC band shown as a coloured circle beside the title */
  band: Band;
  /** One or more lines shown under the title */
  details: string[]; // e.g. ["Solid brick, as built, no insulation (assumed*)"]
};

export type ElementBandListProps = {
  items: Item[];
  /** Size knobs (affects badges & spacing). Tweak if you need tighter layout. */
  numberSize?: number; // default 28
  bandSize?: number; // default 28
  gapY?: number; // vertical gap between rows (default 16)
  className?: string;
};

const Circle: React.FC<
  React.PropsWithChildren<{
    size: number;
    bg: string;
    color: string;
    border?: string;
  }>
> = ({ size, bg, color, border = "2px solid rgba(0,0,0,.15)", children }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: bg,
      color,
      border,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      lineHeight: 1,
      fontSize: Math.round(size * 0.6),
      flex: "0 0 auto",
    }}
  >
    {children}
  </span>
);

const ElementBandList: React.FC<ElementBandListProps> = ({
  items,
  numberSize = 28,
  gapY = 16,
  className,
}) => {
  return (
    <div className={className}>
      <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {items.map(({ index, title, band, details }) => (
          <li key={index} style={{ marginBottom: `${gapY}px 0` }}>
            {/* Row header: number • title • band badge */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "max-content 1fr", // number | title+badge group
                alignItems: "center",
                columnGap: 12,
              }}
            >
              <Circle
                size={numberSize}
                bg="#212121"
                color="#ffffff"
                border="none"
              >
                {index}
              </Circle>

              {/* title + band badge together */}
              <div
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
              >
                <div style={{ fontWeight: 800 }}>{title}</div>
                <BandBadge band={band} />
              </div>
            </div>

            {/* Details block */}
            <div
              style={{ marginLeft: numberSize + 12 /* align under title */ }}
            >
              {details.map((line, i) => (
                <div key={i} style={{ marginTop: i === 0 ? 6 : 2 }}>
                  {line}
                </div>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ElementBandList;

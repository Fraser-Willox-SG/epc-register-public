import * as React from "react";
import { type Band, COLORS, bandTextColor } from "@/app/utils/epc";

/** Circular coloured EPC band badge (A–G) */
export default function BandBadge({
  band,
  size = 32,
  title,
  className,
}: {
  band: Band;
  size?: number;
  title?: string;
  className?: string;
}) {
  return (
    <span
      className={`epc-badge ${className ?? ""}`.trim()}
      aria-hidden="true"
      title={title}
      style={
        {
          "--badge-size": `${size}px`,
          background: COLORS[band],
          color: bandTextColor(band),
        } as React.CSSProperties
      }
    >
      {band}
    </span>
  );
}

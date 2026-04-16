import * as React from "react";
import { type AnyBand, type Band, COLORS, toBaseBand } from "@/app/utils/epc";

/** Circular coloured EPC band badge */
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

  // Give '+' a bit more room, but not huge
  const effectiveSize = isPlus ? Math.max(size, 38) : size;

  const base: Band | undefined = toBaseBand(text);

  return (
    <span
      className={`epc-badge ${isPlus ? "epc-badge--plus" : ""} ${className ?? ""}`.trim()}
      aria-hidden="true"
      title={title}
      style={
        {
          "--badge-size": `${effectiveSize}px`,
          background: base ? COLORS[base] : "#DDDDDD",
        } as React.CSSProperties
      }
    >
      <span className="epc-badge__text">{text}</span>
    </span>
  );
}

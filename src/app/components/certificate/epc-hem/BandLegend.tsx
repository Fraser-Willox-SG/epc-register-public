import * as React from "react";
import { type Band } from "@/app/utils/epc";
import BandBadge from "../BandBadge";

const DEFAULT_ROWS: Array<{ band: Band; label: string }> = [
  { band: "A", label: "Very good (most efficient)" },
  { band: "B", label: "Good" },
  { band: "C", label: "Good" },
  { band: "D", label: "Average" },
  { band: "E", label: "Poor" },
  { band: "F", label: "Poor" },
  { band: "G", label: "Very poor (least efficient)" },
];

export type BandLegendProps = {
  rows?: Array<{ band: Band; label: string }>;
  size?: number;
  showNA?: boolean;
  className?: string;
};

const BandLegend: React.FC<BandLegendProps> = ({
  rows = DEFAULT_ROWS,
  size = 28,
  showNA = true,
  className,
}) => {
  const badgeBase: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: "50%",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 700,
    lineHeight: 1,
    fontSize: Math.round(size * 0.6),
    border: "2px solid rgba(0,0,0,0.15)",
    flex: "0 0 auto",
  };

  const srOnly: React.CSSProperties = {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: 0,
  };

  return (
    <div className={className}>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {rows.map(({ band, label }) => (
          <li
            key={band}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "10px 0",
            }}
          >
            <BandBadge band={band} />

            <span style={{ position: "relative" }}>
              <span style={srOnly}>{band} – </span>
              {label}
            </span>
          </li>
        ))}

        {showNA && (
          <li
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "10px 0",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                ...badgeBase,
                background: "#6b7280",
                color: "#ffffff",
                borderColor: "transparent",
              }}
            >
              <span style={{ fontSize: Math.round(size * 0.7) }}>–</span>
            </span>
            <span>Does not apply</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default BandLegend;

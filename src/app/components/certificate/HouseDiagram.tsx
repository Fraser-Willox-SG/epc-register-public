import * as React from "react";
import Image from "next/image";
import HouseDiagramSVG from "@/app/components/certificate/HouseDiagramSVG.svg";
import ArrowIcon from "@/app/components/certificate/ArrowIcon";

type Callout = {
  title: string; // e.g. "Roof"
  value: string; // e.g. "42%"
  improve: string; // e.g. "15% after improvements"
};

export type HouseDiagramProps = {
  roof: Callout;
  windows: Callout;
  walls: Callout;
  floor: Callout;
  diagramMaxWidth?: number;
  stackClassName?: string;
};

const Improve: React.FC<{ text: string }> = ({ text }) => (
  <span style={{ color: "#2E7D32" }}>
    <span aria-hidden="true" style={{ marginRight: 4 }}>
      ↓
    </span>
    {text}
  </span>
);

const CalloutBlock: React.FC<
  Callout & {
    dir: "up" | "down" | "left" | "right";
    align?: "left" | "center" | "right";
  }
> = ({ title, value, improve, dir, align = "left" }) => {
  const isLeft = dir === "left";
  const isUpOrDown = dir === "up" || dir === "down";

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
            ? "flex-end"
            : "flex-start",
        gap: 12,
        whiteSpace: "nowrap",
        fontSize: "clamp(12px, 1.6vw, 16px)",
      }}
    >
      {isLeft ? null : <ArrowIcon dir={dir} />}
      <div
        style={{ textAlign: isUpOrDown ? "center" : isLeft ? "right" : "left" }}
      >
        <div style={{ fontWeight: 700 }}>{title}</div>
        <div style={{ fontWeight: 800, color: "#D32205" }}>{value}</div>
        <div>
          <Improve text={improve} />
        </div>
      </div>
      {isLeft ? <ArrowIcon dir="left" /> : null}
    </div>
  );
};

export default function HouseDiagram({
  roof,
  windows,
  walls,
  floor,
  diagramMaxWidth = 420,
  stackClassName,
}: HouseDiagramProps) {
  return (
    <div style={{ width: "100%", marginBottom: "30px", marginTop: "30px" }}>
      {/* TOP ROW */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          placeItems: "center",
          marginBottom: 12,
        }}
      >
        <CalloutBlock {...roof} dir="up" align="center" />
      </div>

      <div
        className={stackClassName}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          columnGap: 16,
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <CalloutBlock {...windows} dir="left" align="right" />
        </div>

        <div style={{ display: "grid", placeItems: "center" }}>
          <Image
            src={HouseDiagramSVG}
            alt="Heat retention house diagram"
            width={diagramMaxWidth}
            height={(diagramMaxWidth * 505) / 520}
            style={{
              maxWidth: diagramMaxWidth,
              width: "min(70vw, 100%)",
              height: "auto",
            }}
            priority
          />
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CalloutBlock {...walls} dir="right" align="left" />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          placeItems: "center",
          marginTop: 12,
          marginBottom: 12,
        }}
      >
        <CalloutBlock {...floor} dir="down" align="center" />
      </div>
    </div>
  );
}

import React from "react";
import HouseDiagramSVG from "@/app/components/certificate/HouseDiagramSVG.svg";
import Image from "next/image";

export default function HouseDiagram() {
  return (
    <div>
      <div>
        <p>Roof 42% 15% after improvements </p>
      </div>
      <div>
        <p>Middle Row</p>
        <div>
          <p>Windows 22% 5% after improvements</p>
        </div>
        <Image
          src={HouseDiagramSVG}
          alt="Heat retention house diagram"
          width={238}
          height={231}
          // optional: make it responsive
          sizes="(max-width: 640px) 100vw, 640px"
          style={{ height: "auto", width: "100%" }}
          priority
        />
        <div>
          <p>Windows 22% 5% after improvements</p>
        </div>
      </div>
      <div>
        <p>Floor 12%, 5% after improvements</p>
      </div>
    </div>
  );
}

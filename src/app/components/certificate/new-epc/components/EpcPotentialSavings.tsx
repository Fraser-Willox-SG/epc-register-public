import React from "react";

const CircleBadge: React.FC<{ value: string; size?: number }> = ({
  value,
  size = 108,
}) => (
  <div
    aria-label={`${value} savings`}
    style={{
      width: size,
      height: size,
      borderRadius: "50%", // <- makes it a perfect circle
      background: "white",
      border: "2px solid white",
      color: "black",
      display: "flex", // center the text
      alignItems: "center",
      justifyContent: "center",
      fontSize: "2.5rem",
      fontWeight: 700,
      lineHeight: 1, // avoid vertical drift
      boxShadow: "0 1px 0 rgba(0,0,0,.15)", // optional: subtle depth
    }}
  >
    {value}
  </div>
);

export default function EpcPotentialSavings() {
  return (
    <div>
      <div style={{ background: "#2267B2", color: "white", padding: 16 }}>
        <h3>
          <strong>Potential improvements and savings</strong>
        </h3>
        <p>Improvements, such as:</p>
        <div className="row-2col">
          <div>
            <ul>
              <li>Loft insulation</li>
              <li>Cavity wall insulation</li>
              <li>Suspended floor insulation</li>
            </ul>
          </div>

          <div className="text-badge">
            <div style={{ textAlign: "end" }}>
              Could help reduce your annual bills by
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <CircleBadge value="15%" />
            </div>
          </div>
        </div>

        <p>
          Find out more about the potential improvements and alternative heating
          systems in the Property Report.
        </p>
      </div>
    </div>
  );
}

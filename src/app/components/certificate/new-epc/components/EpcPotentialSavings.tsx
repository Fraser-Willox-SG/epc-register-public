import React from "react";

export default function EpcPotentialSavings() {
  return (
    <div>
      <div style={{ background: "#2267B2", color: "white", padding: "16px" }}>
        <h3>
          <strong>Potential improvements and savings</strong>
        </h3>

        <div className="row-2col">
          <div>
            <p>Improvements, such as:</p>
            <ul>
              <li>Loft insulation</li>
              <li>Cavity wall insulation</li>
              <li>Floor insulation (suspended floor)</li>
            </ul>
          </div>

          <div className="row-2col">
            <div>Could help reduce your annual bills by</div>
            <div
              style={{
                background: "white",
                border: "2px solid white",
                borderRadius: "2rem",
                color: "black",
                padding: "16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  lineHeight: "2rem",
                }}
              >
                15%
                {/* {savingText} */}
              </span>
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

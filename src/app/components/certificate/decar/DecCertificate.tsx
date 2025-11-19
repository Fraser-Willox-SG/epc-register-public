import React from "react";

export default function DecCertificate() {
  return (
    <div>
      <div
        className="flex-between"
        style={{
          background: "black",
          color: "white",
          padding: "16px",
          marginBottom: "2px",
        }}
      >
        <div>
          <h2>Display Energy Certificate</h2>
          <span
            style={{ fontSize: "1rem", fontWeight: "bold", lineHeight: "1rem" }}
          >
            How efficiently is this building being used
          </span>
        </div>

        <div>
          <span
            style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: "2rem" }}
          >
            Scotland
          </span>
        </div>
      </div>
      <div
        className="flex-between"
        style={{
          //   background: "",
          //   color: "white",
          padding: "16px",
          marginBottom: "2px",
        }}
      >
        <div>
          <p style={{ marginBottom: "0" }}>addressLine1</p>
          <p style={{ marginBottom: "0" }}>addressLine2</p>
          <p style={{ marginBottom: "0" }}>addressLine3</p>
          <p style={{ marginBottom: "0" }}>addressLine4</p>
          <p style={{ marginBottom: "0" }}>town</p>
          <p style={{ marginBottom: "0" }}>postcode</p>
        </div>

        <div
          style={{
            // border: "2px solid white",
            // color: "white",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "0px" }}>Reference Number</p>
          <span
            style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: "2rem" }}
          >
            {/* {String(currentBand).toUpperCase()} */}01234 5678 9012 3456
          </span>
        </div>
      </div>
      <div
        className="row-2col"
        style={{ textAlign: "center", color: "white", gap: "2px" }}
      >
        <div style={{ background: "black", padding: "16px" }}>
          <p>
            <strong>Valid until</strong>
          </p>
          {/* {dateOfExpiry ? formatIsoDateLong(dateOfExpiry) : "—"} 7th November 2025 */}
        </div>
        <div style={{ background: "black", padding: "16px" }}>
          <p>
            <strong>Certificate number</strong>
          </p>
          {/* {rrn} 0123 4567 8910 1234 */}
        </div>
      </div>
      <hr></hr>
      <p>
        This certificate indicates how much energy is being used to operate this
        building. The operational rating is based on meter readings of all the
        energy actually used in the building. It is compared to a benchmark that
        represents performance indicative of all buildings of this type. There
        is more advice on how to interpret this information on the Scottish
        Government&apos;s website http://www.gov.scot/section63
      </p>
      <div
        className="flex-between"
        style={{
          padding: "16px",
          marginBottom: "2px",
        }}
      >
        <div>
          <div
            style={{
              background: "black",
              color: "white",
              padding: "16px",
              marginBottom: "2px",
            }}
          >
            <p> Energy Performance operational rating</p>
          </div>
          <div>Graph here A-G</div>
          <div>A - 0-25</div>
          <div>B - 0-25</div>
          <div>C - 0-25</div>
          <div>D - 0-25</div>
          <div>E - 0-25</div>
          <div>F - 0-25</div>
          <div>G - 0-25</div>
        </div>

        <div
          style={{
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "black",
              color: "white",
              padding: "16px",
              marginBottom: "2px",
            }}
          >
            <p> Total CO2 Emissions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

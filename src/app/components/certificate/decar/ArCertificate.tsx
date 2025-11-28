import React from "react";

export default function ArCertificate() {
  return (
    <div>
      <div
        className="cert-section flex-between"
        style={{
          background: "black",
          color: "white",
        }}
      >
        <div>
          <h2>Advisory Report</h2>
        </div>

        <div>
          <span
            style={{ fontSize: "2rem", fontWeight: "bold", lineHeight: "2rem" }}
          >
            Scotland
          </span>
        </div>
      </div>
      <p>Report Reference Number: 01234-5678-9012-3456</p>
      <div className="cert-section flex-between">
        <div>
          <p>Building Occupier</p>
          <p>DWP</p>
        </div>

        <div
          className="cert-section"
          style={{
            textAlign: "center",
          }}
        >
          <p className="mb-0">Address</p>

          <p>NORTH HOUSE HILL PARK</p>
          <p>STATION ROAD</p>
          <p>INVERESK</p>
          <p>Edinburgh</p>
          <p>EH21 7DD</p>
        </div>
      </div>
      <hr />
      <p>Building Type(s): General Office</p>
      <hr />

      <p>Administrive Information Table</p>
      <p>Section 63 Assessor Details</p>
    </div>
  );
}

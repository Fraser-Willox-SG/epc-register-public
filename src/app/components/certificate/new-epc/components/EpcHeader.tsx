import React from "react";
import { formatIsoDateLong } from "@/app/utils/date";

type Props = {
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  addressLine3: string | undefined;
  addressLine4: string | undefined;
  town: string | undefined;
  postcode: string | undefined;
  dateOfExpiry?: string | undefined;
  rrn: string;
  currentBand?: string | null;
};

export default function EpcHeader({
  addressLine1,
  addressLine2,
  addressLine3,
  addressLine4,
  town,
  postcode,
  dateOfExpiry,
  currentBand,
  rrn,
}: Props) {
  return (
    <div>
      <div
        className="flex-between"
        style={{
          background: "#0065BD",
          color: "white",
          padding: "16px",
          marginBottom: "2px",
        }}
      >
        <div>
          <p style={{ marginBottom: "0" }}>{addressLine1}</p>
          <p style={{ marginBottom: "0" }}>{addressLine2}</p>
          <p style={{ marginBottom: "0" }}>{addressLine3}</p>
          <p style={{ marginBottom: "0" }}>{addressLine4}</p>
          <p style={{ marginBottom: "0" }}>{town}</p>
          <p style={{ marginBottom: "0" }}>{postcode}</p>
        </div>

        <div
          style={{
            border: "2px solid white",
            color: "white",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <p style={{ marginBottom: "0px" }}>Energy Rating</p>
          <span
            style={{ fontSize: "6rem", fontWeight: "bold", lineHeight: "6rem" }}
          >
            {String(currentBand).toUpperCase()}
          </span>
        </div>
      </div>
      <div
        className="row-2col"
        style={{ textAlign: "center", color: "white", gap: "2px" }}
      >
        <div style={{ background: "#0065BD", padding: "16px" }}>
          <p>
            <strong>Valid until</strong>
          </p>
          {dateOfExpiry ? formatIsoDateLong(dateOfExpiry) : "—"}
        </div>
        <div style={{ background: "#0065BD", padding: "16px" }}>
          <p>
            <strong>Certificate number</strong>
          </p>
          {rrn}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { formatIsoDateLong } from "@/app/utils/date";
import ScottishGovernmentLogo from "@/app/components/certificate/ScottishGovernmentLogo";

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
  isEpc?: boolean;
  printTitle?: string | undefined;
};

export default function CertificateHeader({
  addressLine1,
  addressLine2,
  addressLine3,
  addressLine4,
  town,
  postcode,
  dateOfExpiry,
  currentBand,
  rrn,
  isEpc = true,
  printTitle,
}: Props) {
  const bandLabel =
    currentBand && currentBand.trim().length > 0
      ? currentBand.trim().toUpperCase()
      : "—";

  return (
    <div className="print-no-break print-page-break">
      <div className=" bg-dark-blue">
        {/* <div className="print-only">
          <div
            className="cert-section flex-between "
            style={{
              marginBottom: "2px",
            }}
          >
            <h2 className="mb-0">{printTitle}</h2>
            <img
              src="/logo.svg"
              alt="Scottish Government logo"
              width={80}
              height={50}
              style={{ display: "block" }}
            />
          </div>
        </div> */}

        <div className="flex-between cert-section">
          <div>
            <h2>{printTitle}</h2>
            <p className="mb-0">{addressLine1}</p>
            <p className="mb-0">{addressLine2}</p>
            <p className="mb-0">{addressLine3}</p>
            <p className="mb-0">{addressLine4}</p>
            <p className="mb-0">{town}</p>
            <p className="mb-0">{postcode}</p>
          </div>

          <div>
            {" "}
            <ScottishGovernmentLogo />
          </div>

          {/* I have kept the Energy Rating code so we can change back quickly after User Research, April 2026 */}
          {/* <div
            className="cert-section"
            style={{
              border: "2px solid white",
              color: "white",
              textAlign: "center",
            }}
          >
            <p className="mb-0">
              {isEpc ? "Energy Rating" : "Operational Rating"}
            </p>
            <span
              style={{
                fontSize: "6rem",
                fontWeight: "bold",
                lineHeight: "6rem",
              }}
            >
              {bandLabel}
            </span>
          </div> */}
        </div>
      </div>

      <div
        className="row-2col"
        style={{ textAlign: "center", color: "white", gap: "1px" }}
      >
        <div className="cert-section bg-dark-blue">
          <p>
            <strong>
              {dateOfExpiry && new Date(dateOfExpiry) < new Date()
                ? "This certificate expired on"
                : "Valid until"}
            </strong>
          </p>
          {dateOfExpiry ? formatIsoDateLong(dateOfExpiry) : "—"}
        </div>
        <div className="cert-section bg-dark-blue">
          <p>
            <strong>Certificate number</strong>
          </p>
          {rrn}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { formatIsoDateLong, isExpiredDate } from "@/app/utils/date";
import ScottishGovernmentLogo from "@/app/components/certificate/ScottishGovernmentLogo";

type EpcBuildingType = "domestic" | "non-domestic";

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
  buildingType?: EpcBuildingType;
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
  buildingType,
  printTitle,
}: Props) {
  const bandLabel =
    currentBand && currentBand.trim().length > 0
      ? currentBand.trim().toUpperCase()
      : "—";

  const isExpired = isExpiredDate(dateOfExpiry);

  const buildingTypeLabel =
    buildingType === "domestic"
      ? "Domestic building"
      : buildingType === "non-domestic"
        ? "Non-domestic building"
        : undefined;

  return (
    <div className="print-no-break print-page-break">
      <div className="bg-dark-blue">
        <div className="flex-between cert-section">
          <div>
            <h2 className={buildingTypeLabel ? "mb-0" : undefined}>
              {printTitle}
            </h2>

            {buildingTypeLabel && (
              <h3 className={buildingTypeLabel ? "mt-0" : undefined}>
                {buildingTypeLabel}
              </h3>
            )}

            <p className="mb-0">{addressLine1}</p>
            <p className="mb-0">{addressLine2}</p>
            <p className="mb-0">{addressLine3}</p>
            <p className="mb-0">{addressLine4}</p>
            <p className="mb-0">{town}</p>
            <p className="mb-0">{postcode}</p>
          </div>

          <div>
            <ScottishGovernmentLogo />
          </div>
        </div>
      </div>

      <div
        className="row-2col"
        style={{ textAlign: "center", color: "white", gap: "1px" }}
      >
        <div
          className={`cert-section ${
            isExpired ? "bg-dark-red" : "bg-dark-blue"
          }`}
        >
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

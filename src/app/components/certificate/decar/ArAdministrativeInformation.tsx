import React from "react";
import { formatIsoDateLong } from "@/app/utils/date";
import type { ArSummary } from "@/types/decar";
import { getAssessorDisplayName } from "@/types/decar";

type Props = {
  data: ArSummary;
};

function formatNumber(value: number | null | undefined): string {
  return typeof value === "number" && Number.isFinite(value)
    ? value.toLocaleString("en-GB")
    : "";
}

export default function ArAdministrativeInformation({ data }: Props) {
  const {
    dateOfExpiry,
    technicalInformation,
    administrativeInformation,
    assessor,
    addressId,
  } = data;

  const buildingOccupier = (technicalInformation?.occupier ?? "").trim();
  const buildingType = (technicalInformation?.propertyType ?? "").trim();
  const floorArea = formatNumber(technicalInformation?.floorArea);
  const calcTool = (administrativeInformation?.calculationTool ?? "").trim();
  const inspectionType = (technicalInformation?.inspectionType ?? "").trim();
  const uprn = (addressId ?? "").trim();

  const assessorName = assessor ? getAssessorDisplayName(assessor) : "";

  return (
    <div className="cert-section bg-white print-no-break">
      {/* Building Occupier + Type */}
      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>
            <strong>Building occupier:</strong>
          </dt>
          <dd>{buildingOccupier || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Building type(s):</strong>
          </dt>
          <dd>{buildingType || "—"}</dd>
        </div>
      </dl>

      {/* Administrative information */}
      <h3 className="mb-0" style={{ marginTop: 24 }}>
        Administrative information
      </h3>

      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>
            <strong>Issue date:</strong>
          </dt>
          <dd>
            {administrativeInformation?.issueDate
              ? formatIsoDateLong(administrativeInformation.issueDate)
              : "—"}
          </dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Valid until:</strong>
          </dt>
          <dd>{dateOfExpiry ? formatIsoDateLong(dateOfExpiry) : "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Total useful floor area (m²):</strong>
          </dt>
          <dd>{floorArea || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Assessment software:</strong>
          </dt>
          <dd>{calcTool || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Unique Property Reference Number:</strong>
          </dt>
          <dd>{uprn || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Type of inspection:</strong>
          </dt>
          <dd>{inspectionType || "—"}</dd>
        </div>
      </dl>

      {/* Section 63 Assessor details */}
      <h3 className="mb-0">
        <u>Section 63 Assessor details</u>
      </h3>

      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>
            <strong>S63 assessor name:</strong>
          </dt>
          <dd>{assessorName || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Company name/Trading name:</strong>
          </dt>
          <dd>{assessor?.companyDetails?.name || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Address:</strong>
          </dt>
          <dd>{assessor?.companyDetails?.address || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>S63 assessor membership number:</strong>
          </dt>
          <dd>{assessor?.schemeAssessorId || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Approved Organisation:</strong>
          </dt>
          <dd>{assessor?.registeredBy?.name || "—"}</dd>
        </div>
      </dl>
    </div>
  );
}

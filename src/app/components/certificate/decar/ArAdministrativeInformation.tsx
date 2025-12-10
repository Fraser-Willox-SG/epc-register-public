import React from "react";
import { formatIsoDateLong } from "@/app/utils/date";
import type { ArSummary } from "@/types/decar";

type Props = {
  data: ArSummary;
};

export default function ArAdministrativeInformation({ data }: Props) {
  const { dateOfExpiry, technicalInformation, assessor, addressId } = data;

  const buildingOccupier = (technicalInformation?.occupier ?? "").trim();
  const buildingType = (technicalInformation?.propertyType ?? "").trim();
  const floorArea = (technicalInformation?.floorArea ?? "").trim();
  const calcTool = (technicalInformation?.calculationTool ?? "").trim();
  const inspectionType = (technicalInformation?.inspectionType ?? "").trim();
  const uprn = (addressId ?? "").trim();

  return (
    <div className="cert-section bg-white">
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
            {technicalInformation?.dateOfIssue
              ? formatIsoDateLong(technicalInformation.dateOfIssue)
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
            <strong>S63 Assessor name:</strong>
          </dt>
          <dd>{assessor?.name || "—"}</dd>
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
            <strong>S63 Assessor membership number:</strong>
          </dt>
          <dd>{assessor?.schemeAssessorId || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Approved organisation:</strong>
          </dt>
          <dd>{assessor?.registeredBy?.name || "—"}</dd>
        </div>
      </dl>
    </div>
  );
}

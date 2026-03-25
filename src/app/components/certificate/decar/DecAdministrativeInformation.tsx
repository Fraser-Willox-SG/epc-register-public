import React from "react";
import type { DecAdministrativeInformation, Assessor } from "@/types/decar";
import { getAssessorDisplayName } from "@/types/decar";
import { formatDecDate } from "@/app/utils/date";

type Props = {
  administrative?: DecAdministrativeInformation | null;
  assessor?: Assessor | null;
  addressId?: string | null;
  nominateDate?: string | null;
  validUntil?: string | null;
};

const formatValue = (v?: string | null) => (v ?? "").trim() || "—";

const DecAdministrativeInformation: React.FC<Props> = ({
  administrative,
  assessor,
  addressId,
  nominateDate,
  validUntil,
}) => {
  const assessorName = assessor ? getAssessorDisplayName(assessor).trim() : "";

  return (
    <section>
      <h3>Administrative Information</h3>

      <p>
        This is a Display Energy Certificate as defined under the Assessment of
        Energy Performance in Non-Domestic Buildings (Scotland) Regulations
        2016. When produced in response to that legislation, a valid certificate
        should be displayed in a prominent position within the building.
      </p>

      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>
            <strong>Assessment software:</strong>
          </dt>
          <dd>{formatValue(administrative?.calculationTool)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Unique Property Reference Number:</strong>
          </dt>
          <dd>{formatValue(addressId)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>S63 assessor name:</strong>
          </dt>
          <dd>{assessorName || "—"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>S63 assessor membership number:</strong>
          </dt>
          <dd>{formatValue(assessor?.schemeAssessorId)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Approved Organisation:</strong>
          </dt>
          <dd>{formatValue(assessor?.registeredBy?.name)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Company name/Trading name:</strong>
          </dt>
          <dd>{formatValue(assessor?.companyDetails?.name)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Address:</strong>
          </dt>
          <dd>{formatValue(assessor?.companyDetails?.address)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Issue date:</strong>
          </dt>
          <dd>{formatDecDate(administrative?.issueDate)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Nominate date:</strong>
          </dt>
          <dd>{formatDecDate(nominateDate)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Valid until:</strong>
          </dt>
          <dd>{formatDecDate(validUntil)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Related Party disclosure:</strong>
          </dt>
          <dd>{formatValue(administrative?.relatedPartyDisclosure)}</dd>
        </div>
      </dl>

      <p className="text-small">
        If there is an Advisory Report this will contain recommendations for
        improving the energy efficiency of the building.
      </p>
    </section>
  );
};

export default DecAdministrativeInformation;

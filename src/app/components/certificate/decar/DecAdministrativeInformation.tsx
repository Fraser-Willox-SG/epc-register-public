import React from "react";
import type {
  DecarAdministrativeInformation,
  DecarAssessor,
} from "@/types/decar";

import { formatDecDate } from "@/app/utils/date";

type Props = {
  administrative?: DecarAdministrativeInformation | null;
  assessor?: DecarAssessor | null;
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
  return (
    <section id="dec-administrative-information">
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
            <strong>Assessment Software:</strong>
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
            <strong>SG3 Assessor Name:</strong>
          </dt>
          <dd>{formatValue(assessor?.name)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>SG3 Assessor Membership Number:</strong>
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
            <strong>Company Name/Trading Name:</strong>
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
            <strong>Issue Date:</strong>
          </dt>
          <dd>{formatDecDate(administrative?.issueDate)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Nominate Date:</strong>
          </dt>
          <dd>{formatDecDate(nominateDate)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Valid Until:</strong>
          </dt>
          <dd>{formatDecDate(validUntil)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Related Party Disclosure:</strong>
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

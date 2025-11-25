import React from "react";
import type {
  DecarAdministrativeInformation,
  DecarAssessor,
} from "@/types/decar";

type Props = {
  administrative?: DecarAdministrativeInformation | null;
  assessor?: DecarAssessor | null;
  addressId?: string | null;
};

const formatValue = (value?: string | null) =>
  value && value.trim() !== "" ? value : "—";

const DecAdministrativeInformation: React.FC<Props> = ({
  administrative,
  assessor,
  addressId,
}) => {
  return (
    <section id="dec-administrative-information">
      <h3>Administrative Information</h3>

      <p style={{ fontSize: "0.9rem" }}>
        This is a Display Energy Certificate as defined under the Assessment of
        Energy Performance in Non-Domestic Buildings (Scotland) Regulations
        2016. When produced in response to that legislation, a valid certificate
        should be displayed in a prominent position within the building.
      </p>
      <div className="row-2col">
        <p>
          <strong>Assessment Software:</strong>
        </p>
        <p>{formatValue(administrative?.calculationTool)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>Unique Property Reference Number:</strong>
        </p>
        <p>{formatValue(addressId)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>SG3 Assessor Name:</strong>
        </p>
        <p>{formatValue(assessor?.name)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>SG3 Assessor Membership Number:</strong>
        </p>
        <p>{formatValue(assessor?.schemeAssessorId)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>Approved Organisation:</strong>
        </p>
        <p>{formatValue(assessor?.registeredBy?.name)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>Company Name/Trading Name:</strong>
        </p>
        <p>{formatValue(assessor?.companyDetails?.name)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>Address:</strong>
        </p>
        <p>{formatValue(assessor?.companyDetails?.address)}</p>
      </div>

      <div className="row-2col">
        <p>
          <strong>Issue Date:</strong>
        </p>
        <p>{formatValue(administrative?.issueDate)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>Nominate Date:</strong>
        </p>
        <p>{formatValue(administrative?.calculationDate)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>Valid Until:</strong>
        </p>
        <p>{formatValue(administrative?.expiryDate)}</p>
      </div>
      <div className="row-2col">
        <p>
          <strong>Related Party Disclosure:</strong>
        </p>
        <p>{formatValue(administrative?.relatedPartyDisclosure)}</p>
      </div>
      <p style={{ fontSize: "0.9rem" }}>
        If there is an Advisory Report this will contain recommendations for
        improving the energy efficiency of the building.
      </p>
    </section>
  );
};

export default DecAdministrativeInformation;

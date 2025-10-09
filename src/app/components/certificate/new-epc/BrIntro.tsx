import React from "react";

type Props = {
  address: string;
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  addressLine3: string | undefined;
  addressLine4: string | undefined;
  town: string | undefined;
  postcode: string | undefined;
  dwellingType?: string | null;
  totalFloorArea?: string | null;
  typicalSaving?: string | null;
  dateOfAssessment?: string | null;
  dateOfRegistration?: string | null;
  dateOfExpiry?: string | undefined;
  typeOfAssessment?: string | null;
  primaryEnergyUse?: string | null;
  assessor?: Assessor | null;
  rrn: string;
  current?: number | null;
  currentBand?: string | null;
  potential?: number | null;
  potentialBand?: string | null;
};

export default function BrIntro({
  addressLine1,
  addressLine2,
  addressLine3,
  addressLine4,
  town,
  postcode,
  typicalSaving,
  dwellingType,
  totalFloorArea,
  dateOfAssessment,
  dateOfRegistration,
  dateOfExpiry,
  typeOfAssessment,
  currentBand,
  primaryEnergyUse,
  rrn,
  assessor,
}: Props) {
  return (
    <div id="br-intro" style={{ padding: "16px" }}>
      <h3>Introduction</h3>
      <p>
        An EPC assessment is a survey that collects basic information about the
        property such as the type of building, size and age.
      </p>
      <p>
        This EPC and the building report explain the energy efficiency of the
        property and how to improve it. Improving your home’s heating and
        insulation could reduce energy costs, reduce emissions and make your
        home warmer.
      </p>
      <p>
        The EPC assessment uses both measurements and assumptions. The age of
        the building, and other factors, are used to determine some information
        about the house where this can’t be seen, such as insulation inside the
        walls. The condition of the property is not taken into account in the
        assessment. This information is used to calculate the EPC.
      </p>
    </div>
  );
}

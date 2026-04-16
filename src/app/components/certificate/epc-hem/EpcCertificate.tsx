import React from "react";
import Header from "@/app/components/certificate/CertificateHeader";
import EpcEnergyCostRating from "@/app/components/certificate/epc-hem/components/EpcEnergyCostRating";
import EpcPotentialSavings from "@/app/components/certificate/epc-hem/components/EpcPotentialSavings";

type RegisteredBy = {
  name: string;
  schemeId: number;
};

type ContactDetails = {
  email?: string;
  telephoneNumber?: string;
};

type Assessor = {
  firstName?: string;
  lastName?: string;
  registeredBy?: RegisteredBy;
  schemeAssessorId?: string;
  contactDetails?: ContactDetails;
};

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

export default function EpcCertificate({
  addressLine1,
  addressLine2,
  addressLine3,
  addressLine4,
  town,
  postcode,
  currentBand,
  potentialBand,
  rrn,
  dateOfExpiry,
}: Props) {
  return (
    <div>
      <Header
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        addressLine3={addressLine3}
        addressLine4={addressLine4}
        postcode={postcode}
        town={town}
        rrn={rrn}
        dateOfExpiry={dateOfExpiry}
        currentBand={currentBand}
        printTitle="Energy Performance Certificate"
      />
      <EpcEnergyCostRating
        currentBand={currentBand}
        potentialBand={potentialBand}
      />
      <EpcPotentialSavings />
    </div>
  );
}

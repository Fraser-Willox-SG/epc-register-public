import React from "react";
import CertificateHeader from "../CertificateHeader";
import ArBackground from "./ArBackground";
import ArIntroduction from "./ArIntroduction";
import ArRecommendations from "./ArRecommendations";
import ArNextSteps from "./ArNextSteps";
import ArGlossary from "./ArGlossary";

import type { ArSummary } from "@/types/decar";
import ArAdministrativeInformation from "./ArAdministrativeInformation";

type Props = {
  data: ArSummary;
};

export default function ArCertificate({ data }: Props) {
  const {
    assessmentId: rrn,
    dateOfExpiry,
    address,
    energyBandFromRelatedCertificate,
  } = data;

  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = address;

  // Band comes from the related DEC certificate
  const currentBand = energyBandFromRelatedCertificate
    ? energyBandFromRelatedCertificate.toUpperCase()
    : null;

  return (
    <div>
      <CertificateHeader
        addressLine1={addressLine1}
        addressLine2={addressLine2}
        addressLine3={addressLine3}
        addressLine4={addressLine4}
        postcode={postcode}
        town={town}
        rrn={rrn}
        dateOfExpiry={dateOfExpiry}
        currentBand={currentBand}
        isEpc={false}
        printTitle="Advisory Report"
      />

      <ArAdministrativeInformation data={data} />
      <ArBackground data={data} />
      <ArIntroduction data={data} />
      <ArRecommendations data={data} />
      <ArNextSteps />
      <ArGlossary />
    </div>
  );
}

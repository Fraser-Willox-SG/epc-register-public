import React from "react";
import CertificateHeader from "../CertificateHeader";

import type { DecSummary } from "@/types/decar";
import DecOperationalRating from "./DecOperationalRating";
import DecCO2Emissions from "./DecC02Emissions";
import DecPreviousOperationalRatings from "./DecPreviousOperationalRatings";
import DecTechnicalInformation from "./DecTechnicalInformation";
import DecAdministrativeInformation from "./DecAdministrativeInformation";

type Props = {
  data: DecSummary;
};

export default function DecCertificate({ data }: Props) {
  const { assessmentId: rrn, dateOfExpiry, address, currentAssessment } = data;
  const rating = data.currentAssessment?.energyEfficiencyRating;
  const current = data.currentAssessment;
  const year1 = data.year1Assessment;
  const year2 = data.year2Assessment;

  const periods: { label: string; rating: number }[] = [];

  if (current?.date && current.energyEfficiencyRating != null) {
    periods.push({
      label: current.date,
      rating: current.energyEfficiencyRating,
    });
  }

  if (year1?.date && year1.energyEfficiencyRating != null) {
    periods.push({
      label: year1.date,
      rating: year1.energyEfficiencyRating,
    });
  }

  if (year2?.date && year2.energyEfficiencyRating != null) {
    periods.push({
      label: year2.date,
      rating: year2.energyEfficiencyRating,
    });
  }

  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = address;

  const hasCo2Data =
    current &&
    current.electricityCo2 != null &&
    current.heatingCo2 != null &&
    current.renewablesCo2 != null;

  const currentBand = currentAssessment?.energyEfficiencyBand?.toUpperCase();

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
        printTitle="Display Energy Certificate"
      />

      <div className="cert-section">
        <p>
          This certificate indicates how much energy is being used to operate
          this building. The operational rating is based on meter readings of
          all the energy actually used in the building. It is compared to a
          benchmark that represents performance indicative of all buildings of
          this type. There is more advice on how to interpret this information
          on the Scottish Government&apos;s website {""}
          <a href="http://www.gov.scot/section63">
            http://www.gov.scot/section63
          </a>
          .
        </p>
      </div>

      <div className="cert-section bg-blue print-no-break">
        <h3 id="dec-operational-rating">
          Energy Performance Operational Rating
        </h3>
        <p>
          This tells you how efficiently energy has been used in the building.
          The numbers do not represent actual units of energy consumed; they
          represent comparative energy efficiency. 100 would be typical for this
          kind of building.
        </p>
        {typeof rating === "number" && (
          <DecOperationalRating rating={rating} typicalValue={100} />
        )}
      </div>

      <div className="print-only-row-2col print-no-break">
        {current && (
          <div id="dec-co2-emissions" className="cert-section">
            <h3>Total CO₂ Emissions</h3>
            <p>
              This tells you how much carbon dioxide the building emits. It
              shows tonnes per year of CO₂
            </p>
            {hasCo2Data ? (
              <div className="dec-co2-container">
                <DecCO2Emissions
                  electricityCo2={current.electricityCo2!}
                  heatingCo2={current.heatingCo2!}
                  renewablesCo2={current.renewablesCo2!}
                  periodLabel={current.date!}
                />
              </div>
            ) : (
              <p className="text-small text-grey">
                CO₂ emissions data is not available for this assessment.
              </p>
            )}
          </div>
        )}

        <div id="dec-previous-ratings" className="cert-section bg-blue">
          <h3>Previous Operational Ratings</h3>
          <p>
            This tells you how efficiently energy has been used in this building
            over the last three accounting periods.
          </p>
          <DecPreviousOperationalRatings periods={periods} />
        </div>
      </div>

      <div
        id="dec-technical-information"
        className="cert-section bg-white print-no-break"
      >
        <DecTechnicalInformation
          technical={data.technicalInformation ?? null}
        />
      </div>

      <div
        id="dec-administrative-information"
        className="cert-section bg-blue print-no-break"
      >
        <DecAdministrativeInformation
          administrative={data.administrativeInformation}
          assessor={data.assessor}
          addressId={data.addressId}
          nominateDate={data.dateOfAssessment}
          validUntil={data.dateOfExpiry}
        />
      </div>
    </div>
  );
}

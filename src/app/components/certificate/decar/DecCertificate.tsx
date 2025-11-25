import React from "react";
import CertificateHeader from "../CertificateHeader";

import type { DecarSummary } from "@/types/decar";
import DecOperationalRating from "./DecOperationalRating";
import DecCO2Emissions from "./DecC02Emissions";
import DecPreviousOperationalRatings from "./DecPreviousOperationalRatings";
import DecTechnicalInformation from "./DecTechnicalInformation";
import DecAdministrativeInformation from "./DecAdministrativeInformation";

type Props = {
  data: DecarSummary;
};

export default function DecCertificate({ data }: Props) {
  const { assessmentId: rrn, dateOfExpiry, address, currentAssessment } = data;
  const rating = data.currentAssessment?.energyEfficiencyRating;
  const current = data.currentAssessment;
  const year1 = data.year1Assessment;
  const year2 = data.year2Assessment;

  const periods = [
    current && {
      label: current.date, // e.g. "07-2022"
      rating: current.energyEfficiencyRating,
    },
    year1 && {
      label: year1.date,
      rating: year1.energyEfficiencyRating,
    },
    year2 && {
      label: year2.date,
      rating: year2.energyEfficiencyRating,
    },
  ].filter(Boolean) as { label: string; rating: number }[];

  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = address;

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
        isEpc={false}
      />

      {/* <hr></hr> */}
      <p
        style={{
          padding: "16px",
        }}
      >
        This certificate indicates how much energy is being used to operate this
        building. The operational rating is based on meter readings of all the
        energy actually used in the building. It is compared to a benchmark that
        represents performance indicative of all buildings of this type. There
        is more advice on how to interpret this information on the Scottish
        Government&apos;s website http://www.gov.scot/section63
      </p>

      <div
        style={{
          padding: "16px",
          background: "#DAEEF7",
        }}
      >
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

      {current && (
        <div
          style={{
            padding: "16px",
          }}
        >
          <h3 id="dec-co2-emissions">Total CO2 Emissions</h3>
          <p>
            Thsi tells you how much carbon dioxide teh building emits. it shows
            tonnes per year of CO2
          </p>
          <DecCO2Emissions
            electricityCo2={current.electricityCo2}
            heatingCo2={current.heatingCo2}
            renewablesCo2={current.renewablesCo2}
            periodLabel={current.date}
            maxValue={1200}
          />
        </div>
      )}

      <div
        style={{
          padding: "16px",
          background: "#ECECEC",
        }}
      >
        <h3 id="dec-previous-ratings">Previous Operational Ratings</h3>
        <p>
          Thsi tells you how efficvient energy has been used in this building
          over the last three accounting periods.
        </p>
        <DecPreviousOperationalRatings periods={periods} />
      </div>
      <div
        style={{
          padding: "16px",
          background: "#DAEEF7",
        }}
      >
        <DecTechnicalInformation
          technical={data.technicalInformation ?? null}
          floorArea={data.technicalInformation?.floorArea}
          assetRating={data.technicalInformation?.assetRating}
        />
      </div>
      <div
        style={{
          padding: "16px",
        }}
      >
        <DecAdministrativeInformation
          administrative={data.administrativeInformation}
          assessor={data.assessor}
          addressId={data.addressId}
        />
      </div>

      {/* <div
        className="flex-between"
        style={{
          padding: "16px",
          marginBottom: "2px",
        }}
      >
        <div>
          <div
            style={{
              background: "black",
              color: "white",
              padding: "16px",
              marginBottom: "2px",
            }}
          >
            <p> Energy Performance operational rating</p>
          </div>
          <div>Graph here A-G</div>
          <div>A - 0-25</div>
          <div>B - 0-25</div>
          <div>C - 0-25</div>
          <div>D - 0-25</div>
          <div>E - 0-25</div>
          <div>F - 0-25</div>
          <div>G - 0-25</div>
        </div>

        <div
          style={{
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              background: "black",
              color: "white",
              padding: "16px",
              marginBottom: "2px",
            }}
          >
            <p> Total CO2 Emissions</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

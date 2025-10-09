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

export default function BrInformationAboutTopRecommendations({
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
    <div
      id="br-information-about-top-reccomendations"
      style={{ padding: "16px" }}
    >
      <h3>Information about top recommendations</h3>
      <p>
        This section offers additional information and advice on the recommended
        improvement measures to improve your home’s performance rating.
      </p>
      <p>
        <strong>1 - Cavity wall insulation</strong>
      </p>
      <p>
        Cavity wall insulation is insulation material that fills the gap between
        the inner and outer layers of external walls to reduce heat loss through
        the walls; this will improve levels of comfort, reduce energy use and
        lower energy bills. The insulation material is pumped into the gap
        through small holes that are drilled into the outer walls, and the holes
        are made good afterwards. As specialist machinery is used to fill the
        cavity, a professional installation company should carry out this work.
      </p>
      <p>
        <strong>2 - Floor insulation (suspended floor)</strong>
      </p>
      <p>
        Insulating a floor will significantly reduce heat loss; this will
        improve levels of comfort, reduce energy use and lower energy bills.
        Suspended floors can often be insulated from below but must have
        adequate ventilation to prevent dampness; seek advice about this if
        you’re unsure.
      </p>
      <p>
        <strong>3 - Low energy lighting</strong>
      </p>
      <p>
        Replacing traditional light bulbs with energy saving bulbs will reduce
        lighting costs over the lifetime of the bulb, and they last many times
        longer than ordinary light bulbs. Low energy lamps and fittings are
        commonplace and readily available. Find out more from Energy Saving
        Trust (
        <a
          href="https://energysavingtrust.org.uk/home-energy-efficiency/lighting"
          target="_blank"
          rel="noreferrer"
        >
          energysavingtrust.org.uk/home-energy-efficiency/lighting
        </a>
        ).
      </p>

      <p>
        Before carrying out work, make sure that the appropriate permissions are
        obtained, such as permission from a landlord (if you are a tenant).
      </p>

      <p>
        {" "}
        * Building regulations may apply to home energy efficiency and heating
        improvements and sometimes require a building warrant. It is best to
        check with your local authority building standards department or contact
        a qualified professional.
      </p>

      <hr />

      <h3>Funding, advice and support</h3>

      <p>
        Home Energy Scotland may be able to provide funding for these
        recommended measures and can also offer free advice and support to help
        you make your home warmer, reduce energy bills, and contribute to a
        greener, more sustainable future. Please visit{" "}
        <a
          href="https://www.homeenergyscotland.org"
          target="_blank"
          rel="noreferrer"
        >
          www.homeenergyscotland.org
        </a>{" "}
        or call <a href="tel:08088082282">0808 808 2282</a>.
      </p>
    </div>
  );
}

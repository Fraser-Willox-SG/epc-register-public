import React from "react";

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
  dwellingType?: string | null;
  totalFloorArea?: string | null;
  dateOfAssessment?: string | null;
  dateOfRegistration?: string | null;
  typeOfAssessment?: string | null;
  primaryEnergyUse?: string | null;
  assessor?: Assessor | null;
  rrn: string;
  current?: number | null;
  currentBand?: string | null;
  potential?: number | null;
  potentialBand?: string | null;
};

export default function HeaderCard({
  address,
  dwellingType,
  totalFloorArea,
  dateOfAssessment,
  dateOfRegistration,
  typeOfAssessment,
  primaryEnergyUse,
  rrn,
  assessor,
}: Props) {
  return (
    <div>
      <div
        style={{ backgroundColor: "#007D9A", color: "white", padding: "16px" }}
      >
        <h2 style={{ marginBottom: "0px" }}>
          Energy Performance Certificate (EPC)
        </h2>
        <div
          className="
flex-between"
        >
          <span>Dwellings</span>
          <span>Scotland</span>
        </div>
      </div>

      <div style={{ padding: "16px" }}>
        <p>
          <strong>{address}</strong>
        </p>
        <div>
          <div className="row-2col">
            <div>
              <strong>Dwelling Type:</strong>
              <p>{dwellingType ?? "N/A"}</p>
            </div>
            <div>
              <strong>Reference number</strong>
              <p>{rrn ?? "N/A"}</p>
            </div>
          </div>
          <div className="row-2col">
            <div>
              <strong>Date of assessment:</strong>
              <p>{dateOfAssessment ?? "N/A"}</p>
            </div>
            <div>
              <strong>Type of assessment:</strong>
              <p>{typeOfAssessment ?? "N/A"}</p>
            </div>
          </div>
          <div className="row-2col">
            <div>
              <strong>Date of Registration:</strong>{" "}
              <p>{dateOfRegistration ?? "N/A"}</p>
            </div>
            <div>
              <strong>Approved Organisation:</strong>{" "}
              <p>{assessor?.registeredBy?.name ?? "N/A"}</p>
            </div>
          </div>
          <div className="row-2col">
            <div>
              <strong>Total floor area:</strong>
              <p>{totalFloorArea ?? "N/A"}</p>
            </div>
            <div>
              <strong>Primary Energy Indicator:?</strong>{" "}
              <p>{primaryEnergyUse ?? "N/A"}</p>
            </div>
          </div>
        </div>
        <strong>
          <p style={{ color: "#007D9A" }}>You can use this document to:</p>
        </strong>
        <ul>
          <li>
            Compare current ratings of properties to see which are more energy
            efficient and environmentally friendly
          </li>
          <li>
            Find out how to save ebergy and money and also reduce CO2 emissions
            by improving your home
          </li>
        </ul>
      </div>

      {/* <div className="flex-between">
        <div>
          <div
            style={{ background: "#BE1E2D", color: "white", padding: "16px" }}
          >
            <span>Estimated energy costs for your home for 3 years*:</span>
          </div>
          <div
            style={{ background: "#479523", color: "white", padding: "16px" }}
          >
            <span>Over 3 years you could save*:</span>
          </div>
        </div>

        <div>
          <div
            style={{
              background: "#BE1E2D",
              color: "white",
              padding: "16px",
              height: "100%",
            }}
          >
            £4,224
          </div>
          <div
            style={{ background: "#479523", color: "white", padding: "16px" }}
          >
            £1,524
          </div>
        </div>

        <div style={{ background: "#3BA6B8", color: "white", padding: "16px" }}>
          See your recommendations report for more information
        </div>
      </div> */}

      <div className="epc-old">
        <div className="container" role="group" aria-label="Estimated costs">
          {/* Row 1 */}
          <div className="cell red">
            <span className="label">
              Estimated energy costs for your home for 3 years*
            </span>
          </div>
          <div className="cell value red">£4,224</div>

          {/* Row 2 */}
          <div className="cell green">
            <span className="label">Over 3 years you could save*</span>
          </div>
          <div className="cell value green">£1,524</div>

          {/* Right column spanning both rows */}
          <a href="/recommendations" className="cell info teal">
            See your recommendations report for more information
          </a>
        </div>
      </div>

      <p>
        *Based upon the cost of energy for heating, hot waterm lightingm and
        ventilation, calculated using standard assumption.
      </p>
    </div>
  );
}

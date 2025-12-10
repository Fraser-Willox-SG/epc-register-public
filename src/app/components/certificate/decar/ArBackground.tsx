import React from "react";
import type { ArSummary } from "@/types/decar";

type Props = {
  data: ArSummary;
};

export default function ArBackground({ data }: Props) {
  const t = data.technicalInformation;

  const floorArea = (t?.floorArea ?? "").trim();
  const propertyType = (t?.propertyType ?? "").trim();
  const buildingEnv = (t?.buildingEnvironment ?? "").trim();
  const renewableSources = (t?.renewableSources ?? "").trim();
  const discountedEnergy = (t?.discountedEnergy ?? "").trim();

  const fuels = [
    data.siteServiceOne,
    data.siteServiceTwo,
    data.siteServiceThree,
  ].filter((f) => f && (f.description ?? "").trim().length > 0);

  return (
    <section className="cert-section bg-blue print-no-break" id="ar-background">
      <h2 className="mb-0">Background</h2>

      <p className="text-small">
        The Assessment of Energy Performance of Non-domestic Buildings
        (Scotland) Regulations 2016 are made in exercise of the powers conferred
        on Scottish Ministers by section 63 of the Climate Change (Scotland) Act
        2009. These regulations set out requirements for the assessment and
        improvement of existing non-domestic buildings. Production of an
        operational ratings assessment and the issue of an annual Display Energy
        Certificate (DEC) is an option under the regulations, enabling a
        building owner to defer completion of improvement works to meet energy
        performance and emissions reduction targets.
      </p>
      <p className="text-small">
        This Advisory Report which can accompany a DEC is not a requirement
        under these Regulations but where produced, will offer further
        recommendations for improving the energy efficiency of the building.
      </p>
      <p className="text-small">
        This section provides general information regarding the building:
      </p>

      <dl className="summary-list" style={{ marginTop: "1rem" }}>
        <div className="row-2col border-b-grey">
          <dt>
            <strong>Total useful floor area (m²):</strong>
          </dt>
          <dd>{floorArea || "N/A"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Building description:</strong>
          </dt>
          <dd>{propertyType || "N/A"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Building environment:</strong>
          </dt>
          <dd>{buildingEnv || "N/A"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>On-site renewable energy sources:</strong>
          </dt>
          <dd>{renewableSources || "None"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Separable energy uses discounted:</strong>
          </dt>
          <dd>{discountedEnergy || "None"}</dd>
        </div>
      </dl>

      {fuels.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h3 className="mb-0" style={{ fontSize: "1rem" }}>
            Fuel types and annual use
          </h3>
          <table className="ds_table" style={{ marginTop: "0.5rem" }}>
            <thead>
              <tr>
                <th scope="col">Fuel type</th>
                <th scope="col">Quantity used (kWh)</th>
              </tr>
            </thead>
            <tbody>
              {fuels.map((f, idx) => (
                <tr key={idx}>
                  <td>{f?.description ?? "N/A"}</td>
                  <td>{f?.quantity ?? "0"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

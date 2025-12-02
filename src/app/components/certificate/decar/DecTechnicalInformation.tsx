import React from "react";
import type { DecarTechnicalInformation } from "@/types/decar";

type Props = {
  technical?: DecarTechnicalInformation | null;
};

const formatValue = (value?: string | number | null) => {
  const v = (value ?? "").toString().trim();
  return v === "" ? "Not available" : v;
};

const DecTechnicalInformation: React.FC<Props> = ({ technical }) => {
  return (
    <section>
      <div>
        <h3>Technical Information</h3>
      </div>

      <p>
        This tells you technical information about how energy is used in this
        building. Consumption data based on actual meter readings.
      </p>
      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>
            <strong>Main heating fuel:</strong>
          </dt>
          <dd>{formatValue(technical?.mainHeatingFuel)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Building Environment:</strong>
          </dt>
          <dd>{formatValue(technical?.buildingEnvironment)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Total useful floor area (m²):</strong>
          </dt>
          <dd>{formatValue(technical?.floorArea)}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Asset Rating:</strong>
          </dt>
          <dd>{formatValue(technical?.assetRating)}</dd>
        </div>
      </dl>

      <table className="ds_table">
        <thead>
          <tr>
            <th scope="col">Energy use type</th>
            <th scope="col">Heating</th>
            <th scope="col">Electricity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Annual Energy Use (kWh/m²/year)</td>
            <td>{formatValue(technical?.annualEnergyUseFuelThermal)}</td>
            <td>{formatValue(technical?.annualEnergyUseElectrical)}</td>
          </tr>
          <tr>
            <td>Typical Energy Use (kWh/m²/year)</td>
            <td>{formatValue(technical?.typicalThermalUse)}</td>
            <td>{formatValue(technical?.typicalElectricalUse)}</td>
          </tr>
          <tr>
            <td>Energy from renewables</td>
            <td>{formatValue(technical?.renewablesFuelThermal)}</td>
            <td>{formatValue(technical?.renewablesElectrical)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default DecTechnicalInformation;

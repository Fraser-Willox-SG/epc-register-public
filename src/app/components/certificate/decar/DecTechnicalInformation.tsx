import React from "react";
import type { DecarTechnicalInformation } from "@/types/decar";

type Props = {
  technical?: DecarTechnicalInformation | null;
  floorArea?: string | number | null;
  assetRating?: string | number | null;
};

const formatValue = (value?: string | number | null) =>
  value === null || value === undefined || value === "" ? "—" : String(value);

const DecTechnicalInformation: React.FC<Props> = ({
  technical,
  floorArea,
  assetRating,
}) => {
  return (
    <section id="dec-technical-information">
      <div style={{}}>
        <h3>Technical Information</h3>
      </div>

      <p style={{ fontSize: "0.9rem" }}>
        This tells you technical information about how energy is used in this
        building. Consumption data based on actual meter readings.
      </p>
      <div className="row-2col">
        <p>
          <strong>Main heating fuel: </strong>
        </p>
        <p>{formatValue(technical?.mainHeatingFuel)}</p>
      </div>

      <div className="row-2col">
        <p>
          <strong>Building Environment: </strong>
        </p>
        <p>{formatValue(technical?.buildingEnvironment)}</p>
      </div>

      <div className="row-2col">
        <p>
          <strong>Total useful floor area (m²): </strong>
        </p>
        <p>{formatValue(floorArea ?? technical?.floorArea)}</p>
      </div>

      <div className="row-2col">
        <p style={{ marginBottom: "0.75rem" }}>
          <strong>Asset Rating: </strong>
        </p>
        <p>{formatValue(assetRating ?? technical?.assetRating)}</p>
      </div>

      <table className="ds_table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Heating</th>
            <th scope="col">Electricity</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Annual Energy Use (kWh/m²/year)</th>
            <td>{formatValue(technical?.annualEnergyUseFuelThermal)}</td>
            <td>{formatValue(technical?.annualEnergyUseElectrical)}</td>
          </tr>
          <tr>
            <th scope="row">Typical Energy Use (kWh/m²/year)</th>
            <td>{formatValue(technical?.typicalThermalUse)}</td>
            <td>{formatValue(technical?.typicalElectricalUse)}</td>
          </tr>
          <tr>
            <th scope="row">Energy from renewables</th>
            <td>{formatValue(technical?.renewablesFuelThermal)}</td>
            <td>{formatValue(technical?.renewablesElectrical)}</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default DecTechnicalInformation;

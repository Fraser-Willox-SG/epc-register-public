import type { EpcDomRdSapSummary } from "@/types/epc-dom-rdsap";
import { formatIsoDateLong } from "@/app/utils/date";
import RdSapBandChart from "../../EpcBandChart";

export default function CertificateOverview({
  data,
}: {
  data: EpcDomRdSapSummary;
}) {
  const {
    dwellingType,
    dateOfAssessment,
    dateOfRegistration,
    totalFloorArea,
    primaryEnergyUse,
    typeOfAssessment,
    assessor,
  } = data;

  const typeOfAssessmentDisplay =
    typeOfAssessment === "RdSAP"
      ? "RdSAP, existing dwelling"
      : typeOfAssessment || "—";

  const approvedOrganisation = assessor?.registeredBy?.name || "—";
  const mainHeatingAndFuel = "—";

  const totalFloorAreaDisplay = totalFloorArea ? `${totalFloorArea} m²` : "—";
  const primaryEnergyIndicatorDisplay = primaryEnergyUse
    ? `${primaryEnergyUse} kWh/m²/year`
    : "—";

  return (
    <section id="certificate-overview">
      <div className="cert-section">
        <dl className=" summary-list ">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Dwelling type:</strong>
            </dt>
            <dd>{dwellingType || "—"}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of assessment:</strong>
            </dt>
            <dd>
              {dateOfAssessment ? formatIsoDateLong(dateOfAssessment) : "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Type of assessment:</strong>
            </dt>
            <dd>{typeOfAssessmentDisplay}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of certificate:</strong>
            </dt>
            <dd>
              {dateOfRegistration ? formatIsoDateLong(dateOfRegistration) : "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Approved Organisation:</strong>
            </dt>
            <dd>{approvedOrganisation}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Total floor area:</strong>
            </dt>
            <dd>{totalFloorAreaDisplay}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Main heating and fuel:</strong>
            </dt>
            <dd>{mainHeatingAndFuel}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Primary Energy Indicator:</strong>
            </dt>
            <dd>{primaryEnergyIndicatorDisplay}</dd>
          </div>
        </dl>
      </div>
      <div className="cert-section bg-blue ">
        <p>You can use this document to:</p>
        <ul>
          <li>
            Compare current ratings of properties to see which are more energy
            efficient and environmentally friendly
          </li>
          <li>
            Find out how to save energy and money and also reduce CO2 emissions
            by improving your home
          </li>
        </ul>
        <table className="ds_table">
          <caption className="visually-hidden">
            Estimated current energy costs and potential savings over three
            years
          </caption>
          <thead>
            <tr>
              <th scope="col">Metric</th>
              <th scope="col">Amount (£)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Estimated energy costs for your home for 3 years*</td>
              <td>£4,224</td>
            </tr>

            <tr>
              <td>Over 3 years you could save*</td>
              <td>£1,524</td>
            </tr>
          </tbody>
        </table>
        <ul>
          <li>
            See your{" "}
            <a href="#performance-features-and-context">
              recommendations report
            </a>{" "}
            for more information.
          </li>
          <li>
            *Based upon the cost of energy for heating, hot water, lighting and
            ventilation, calculated using standard assumptions.
          </li>
        </ul>
      </div>
      <div className="cert-section">
        <h3>Energy Efficiency Rating</h3>
        <p>
          This graph shows the current efficiency of your home, taking into
          account both energy efficiency and fuel costs. The higher this rating,
          the lower your fuel bills are likely to be.
        </p>
        <p>
          Your current rating is <strong>band D (56)</strong>. The average
          rating for EPCs in Scotland is <strong>band D (61)</strong>.
        </p>

        <p>
          The potential rating shows the effect of undertaking all of the
          improvement measures listed within your recommendations report.
        </p>
        <RdSapBandChart
          current="E"
          potential="C"
          topLabel="Very energy efficient - lower running costs"
          bottomLabel="Not energy efficient - higher running costs"
        />
      </div>
      <div className="cert-section bg-grey">
        <h3>Environmental Impact (CO2) Rating</h3>
        <p>
          This graph shows the effect of your home on the environment in terms
          of carbon dioxide (CO2) emissions. The higher the rating, the less
          impact it has on the environment.
        </p>
        <p>
          The potential rating shows the effect of undertaking all of the
          improvement measures listed within your recommendations report.
        </p>
        <RdSapBandChart
          current="E"
          potential="C"
          isEnvironmental={true}
          topLabel="Very environmentally friendly - lower CO2 emmisions"
          bottomLabel="Not environmentally friendly - higher CO2 emmisions"
        />
      </div>
      <div className="cert-section bg-blue">
        <h3>
          Top actions you can take to save money and make your home more
          efficient
        </h3>
        <table className="ds_table">
          <thead>
            <tr>
              <th scope="col">Recommended Measures</th>
              <th scope="col">Indictive Cost</th>
              <th scope="col">Typical savings over 3 years</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1. Floor insulation</td>
              <td>£800 – £1,200</td>
              <td>£444.00</td>
            </tr>
            <tr>
              <td>2. Condensing boiler</td>
              <td>£2,200 – £3,000</td>
              <td>£915.00</td>
            </tr>
            <tr>
              <td>3. Solar water heating</td>
              <td>£4,000 – £6,000</td>
              <td>£165.00</td>
            </tr>
          </tbody>
        </table>
        <p>
          A full list of recommended improvement measures for your home,
          together with more information on potential cost and savings and
          advice to help you carry out improvements can be found in your
          recommendations report.
        </p>
        <p>
          This page is the Energy Performance Certificate which must be affixed
          to the dwelling and not be removed unless it is replaced with an
          updated certificate.
        </p>
        <p>
          To find out more about the recommended measures and other actions you
          could take today to stop wasting energy and money, visit{" "}
          <a
            href="http://greenerscotland.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            greenerscotland.org
          </a>{" "}
          or contact <strong>Home Energy Scotland</strong> on{" "}
          <a className="ds_link" href="tel:08088082282">
            0808 808 2282
          </a>
          .
        </p>
      </div>
    </section>
  );
}

import StarRating from "./components/StarRating";

export default function PerformanceFeaturesAndContext() {
  return (
    <section
      id="performance-features-and-context"
      aria-labelledby="performance-features-and-context-title"
    >
      <div className="cert-section">
        <h2 id="performance-features-and-context-title">
          Recommendations Report
        </h2>

        <h3>Summary of the energy performance related features of this home</h3>
        <p>
          This table sets out the results of the survey which lists the current
          energy-related features of this home. Each element is assessed by the
          national calculation methodology
        </p>

        <div>
          <p>
            <strong>Star ratings:</strong>
          </p>
          <ul className="ds_list ds_list--inline">
            <li>
              <StarRating value={1} /> very poor (least efficient)
            </li>
            <li>
              <StarRating value={2} /> poor
            </li>
            <li>
              <StarRating value={3} /> average
            </li>
            <li>
              <StarRating value={4} /> good
            </li>
            <li>
              <StarRating value={5} /> very good (most efficient)
            </li>
          </ul>
        </div>
        <p>
          The assessment does not take into consideration the condition of an
          element and how well it is working. ‘Assumed’ means that the
          insulation could not be inspected and an assumption has been made in
          the methodology, based on age and type of construction.
        </p>

        <table className="ds_table">
          <thead>
            <tr>
              <th scope="col">Element</th>
              <th scope="col">Description</th>
              <th scope="col">Energy efficiency</th>
              <th scope="col">Environmental impact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="row">Walls</td>
              <td>Cavity wall, filled cavity</td>
              <td>
                <StarRating value={4} />
              </td>
              <td>
                <StarRating value={4} />
              </td>
            </tr>

            <tr>
              <td scope="row">Roof</td>
              <td>Pitched, 250&nbsp;mm loft insulation</td>
              <td>
                <StarRating value={4} />
              </td>
              <td>
                <StarRating value={4} />
              </td>
            </tr>

            <tr>
              <td scope="row">Floor</td>
              <td>Suspended, no insulation (assumed)</td>
              <td>
                <StarRating value={null} />
              </td>
              <td>
                <StarRating value={null} />
              </td>
            </tr>

            <tr>
              <td scope="row">Windows</td>
              <td>Mostly double glazing</td>
              <td>
                <StarRating value={3} />
              </td>
              <td>
                <StarRating value={3} />
              </td>
            </tr>

            <tr>
              <td scope="row">Main heating</td>
              <td>Boiler and radiators, mains gas</td>
              <td>
                <StarRating value={4} />
              </td>
              <td>
                <StarRating value={4} />
              </td>
            </tr>

            <tr>
              <td scope="row">Main heating controls</td>
              <td>Programmer, TRVs and bypass</td>
              <td>
                <StarRating value={3} />
              </td>
              <td>
                <StarRating value={3} />
              </td>
            </tr>

            <tr>
              <td scope="row">Secondary heating</td>
              <td>None</td>
              <td>
                <StarRating value={null} />
              </td>
              <td>
                <StarRating value={null} />
              </td>
            </tr>

            <tr>
              <td scope="row">Hot water</td>
              <td>From main system, no cylinder thermostat</td>
              <td>
                <StarRating value={2} />
              </td>
              <td>
                <StarRating value={2} />
              </td>
            </tr>

            <tr>
              <td scope="row">Lighting</td>
              <td>Low energy lighting in all fixed outlets</td>
              <td>
                <StarRating value={5} />
              </td>
              <td>
                <StarRating value={5} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="cert-section bg-grey">
        <h3>The energy efficiency rating of your home</h3>
        <p>
          Your Energy Efficiency Rating is calculated using the standard UK
          methodology, RdSAP. This calculates energy used for heating, hot
          water, lighting and ventilation and then applies fuel costs to that
          energy use to give an overall rating for your home.
        </p>
        <p>
          As we all use our homes in different ways, the energy rating is
          calculated using standard occupancy assumptions which may be different
          from the way you use it. The rating also uses national weather
          information to allow comparison between buildings in different parts
          of Scotland.
        </p>
        <p>
          However, to make information more relevant to your home, local weather
          data is used to calculate your energy use, CO2 emissions, running
          costs and the savings possible from making improvements.
        </p>
      </div>
      <div className=" cert-section bg-blue">
        <h3>The impact of your home on the environment</h3>
        <p>
          One of the biggest contributors to global warming is carbon dioxide.
          The energy we use for heating, lighting and power in our homes
          produces over a quarter of the UK’s carbon dioxide emissions.
        </p>
        <p>
          Different fuels produce different amounts of carbon dioxide for every
          kilowatt hour (kWh) of energy used. The Environmental Impact Rating of
          your home is calculated by applying these &apos;carbon factors&apos;
          for the fuels you use to your overall energy use.
        </p>

        <p>
          The calculated emissions for your home are{" "}
          <strong>
            46 kg CO<sub>2</sub>/m²/yr
          </strong>
          .
        </p>

        <p>
          The average Scottish household produces about{" "}
          <strong>6 tonnes of carbon dioxide every year</strong>. Based on this
          assessment, the average Scottish household produces approximately{" "}
          <strong>5.7 tonnes of carbon dioxide per year</strong>. Adopting the
          recommendations in this report can reduce emissions and protect the
          environment. If you were to install all of these recommendations this
          could reduce emissions by <strong>2.2 tonnes per year</strong>. You
          could reduce emissions even more by switching to renewable energy
          sources.
        </p>
      </div>
    </section>
  );
}

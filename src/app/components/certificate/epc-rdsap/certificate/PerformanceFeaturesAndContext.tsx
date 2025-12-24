export default function PerformanceFeaturesAndContext() {
  return (
    <section
      id="performance-features-and-context"
      aria-labelledby="performance-features-and-context-title"
    >
      <h2 id="performance-features-and-context-title">
        Recommendations Report
      </h2>

      <h3>Summary of the energy performance related features of this home</h3>
      <p>
        This table sets out the results of the survey which lists the current
        energy-related features of this home. Each element is assessed by the
        national calculation methodology; 1 star = very poor (least efficient),
        2 stars = poor, 3 stars = average, 4 stars = good and 5 stars = very
        good (most efficient).
      </p>
      <p>
        The assessment does not take into consideration the condition of an
        element and how well it is working. ‘Assumed’ means that the insulation
        could not be inspected and an assumption has been made in the
        methodology, based on age and type of construction.
      </p>

      {/* Placeholder for features/stars table */}
      <p>[Features (stars) table goes here]</p>

      <h3>The energy efficiency rating of your home</h3>
      <p>
        Your Energy Efficiency Rating is calculated using the standard UK
        methodology, RdSAP. This calculates energy used for heating, hot water,
        lighting and ventilation and then applies fuel costs to that energy use
        to give an overall rating for your home.
      </p>
      <p>
        As we all use our homes in different ways, the energy rating is
        calculated using standard occupancy assumptions which may be different
        from the way you use it. The rating also uses national weather
        information to allow comparison between buildings in different parts of
        Scotland.
      </p>
      <p>
        However, to make information more relevant to your home, local weather
        data is used to calculate your energy use, CO2 emissions, running costs
        and the savings possible from making improvements.
      </p>

      <h3>The impact of your home on the environment</h3>
      <p>
        One of the biggest contributors to global warming is carbon dioxide. The
        energy we use for heating, lighting and power in our homes produces over
        a quarter of the UK’s carbon dioxide emissions.
      </p>
      <p>
        Different fuels produce different amounts of carbon dioxide for every
        kilowatt hour (kWh) of energy used. The Environmental Impact Rating of
        your home is calculated by applying these &apos;carbon factors&apos; for
        the fuels you use to your overall energy use.
      </p>

      {/* Placeholder for calculated emissions lines */}
      <p>[Calculated emissions summary goes here]</p>
    </section>
  );
}

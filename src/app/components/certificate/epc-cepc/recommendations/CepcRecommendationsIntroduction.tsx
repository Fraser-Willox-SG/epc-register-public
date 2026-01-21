// app/components/certificate/epc-cepc/recommendations/CepcRecommendationsIntroduction.tsx

export default function CepcRecommendationsIntroduction() {
  return (
    <section id="report-background" aria-label="Recommendations Report">
      <div className="cert-section">
        <h2>Recommendations Report</h2>

        <h3>Background</h3>

        <p>
          This section provides additional information regarding the building
          and your energy assessment.
        </p>

        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Building type</strong>
            </dt>
            <dd>—</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Total useful floor area</strong>
            </dt>
            <dd>—</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Main heating fuel</strong>
            </dt>
            <dd>—</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Building environment</strong>
            </dt>
            <dd>—</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Renewable energy source</strong>
            </dt>
            <dd>—</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Electricity</strong>
            </dt>
            <dd>—</dd>
          </div>
        </dl>
        <div className="print-no-break print-padding-top">
          <p>
            The Recommendations Report provides additional information in
            support of your Energy Performance Certificate. It was produced in
            line with the Government’s approved calculation methodology and is
            based upon output from IES Ltd, Virtual Environment, v7.0.22,
            ApacheSim, v7.0.22.
          </p>

          <p>
            This calculates energy used in the heating, hot water provision,
            lighting and ventilation of your building. Different fuels produce
            different amounts of carbon dioxide for every kilowatt hour (kWh) of
            energy used. The calculation methodology therefore applies fuel
            emission factors to energy use for each fuel used to give an overall
            rating for your building. This assessment covers all fixed building
            services but excludes energy used in portable appliances, office
            equipment and for industrial processes.
          </p>

          <p>
            As buildings can be used in different ways, energy use is calculated
            using standard occupancy assumptions which may be different from the
            way you use your building. The rating also uses national weather
            information to allow comparison between the performance of similar
            buildings in different parts of Scotland.
          </p>

          <p>
            Further information on the assessment process and approved software
            tools can be found online at{" "}
            <a href="https://www.scotland.gov.uk/epc">
              www.scotland.gov.uk/epc
            </a>
            .
          </p>
        </div>
      </div>
      <div className="cert-section bg-blue">
        <h3>Recommendations for improvement</h3>

        <p>
          This section lists the improvement measures recommended on your Energy
          Performance Certificate and further action you can take to improve the
          performance of your building. These measures have been checked by your
          assessor as being appropriate for your building and are listed under
          four headings: short payback period, medium payback period, long
          payback period and other improvement measures.
        </p>

        <p>
          The calculation tool has automatically produced a set of
          recommendations which are reviewed by your assessor to ensure that
          they are relevant to the building and its use. The assessor may add or
          remove recommendations and may also have commented on the
          recommendations based upon their professional knowledge and expertise.
          This may include inserting additional recommendations or measures
          under ‘other recommendations’.
        </p>

        <p>
          Note that these recommendations do not include advice on matters
          relating to the operation and maintenance of your building as such
          cannot be identified or represented within the calculation process.
        </p>

        <h3>Implementing improvements – legal disclaimer</h3>

        <p>
          The advice provided in this Recommendations Report is intended to be
          for information only. Recipients of this report are advised to seek
          further professional advice before making any decision on how to
          improve the energy performance of the building.
        </p>
      </div>
    </section>
  );
}

"use client";

export default function DataExtractsPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Data Extracts</h1>
      </div>
      {/* <div className="ds_leader"> */}
      <p>There are two data extracts available:</p>
      <p>
        <a
          href="https://statistics.gov.scot/data/domestic-energy-performance-certificates"
          target="_blank"
        >
          Domestic EPC data
        </a>
      </p>
      <p>
        <a
          href="https://statistics.gov.scot/data/non-domestic-energy-performance-certificates"
          target="_blank"
        >
          Non-Domestic EPC data
        </a>
        .
      </p>
      {/* </div> */}
      <p>
        Both datasets are updated quarterly and include all valid EPC records
        from the start of 2013 to the most recent year quarter. A publication
        note is included in each dataset describing the data elements present.
      </p>
    </div>
  );
}

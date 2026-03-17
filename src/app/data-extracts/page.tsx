"use client";

export default function DataExtractsPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Publicly available data extracts</h1>
      </div>

      <p>
        Data extracts are published on{" "}
        <a
          href="https://statistics.gov.scot/home"
          target="_blank"
          rel="noopener noreferrer"
        >
          statistics.gov.scot
        </a>
        .
      </p>

      <p>
        These extracts provide open data about domestic and non-domestic Energy
        Performance Certificates (EPCs). They are updated quarterly. A
        publication note is included with each dataset, providing more
        information about the data items.
      </p>

      <h2 className="ds_h3">Available datasets</h2>
      <ul className="ds_list ds_list--bulleted">
        <li>
          <a
            href="https://statistics.gov.scot/data/domestic-energy-performance-certificates"
            target="_blank"
            rel="noopener noreferrer"
          >
            Domestic EPCs (valid)
          </a>
        </li>
        <li>
          <a
            href="https://statistics.gov.scot/data/non-domestic-energy-performance-certificates"
            target="_blank"
            rel="noopener noreferrer"
          >
            Non-domestic EPCs (valid)
          </a>
        </li>
        <li>
          <a
            href="https://statistics.gov.scot/data/domestic-energy-performance-certificates--extended-historic-dataset"
            target="_blank"
            rel="noopener noreferrer"
          >
            Domestic EPCs (historic / extended)
          </a>
        </li>
        <li>
          <a
            href="https://statistics.gov.scot/data/non-domestic-energy-performance-certificates--extended-historic-dataset"
            target="_blank"
            rel="noopener noreferrer"
          >
            Non-domestic EPCs (historic / extended)
          </a>
        </li>
      </ul>
    </div>
  );
}

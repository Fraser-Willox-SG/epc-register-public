import React from "react";

export default function BrAboutThisDocument() {
  return (
    <div id="br-about-this-document" className="cert-section print-page-break">
      <h2>About this document</h2>

      {/* ---------------- CONTACTING THE ASSESSOR ---------------- */}
      <div className="print-no-break">
        <h3>Contacting the assessor</h3>
        <p>
          If you’re unhappy about your property’s energy assessment or
          certificate, you can complain to the assessor who created it.
        </p>

        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessor’s name:</strong>
            </dt>
            <dd>Mr. Christopher Hunter</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessor membership number:</strong>
            </dt>
            <dd>EES/016138</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Company name/trading name:</strong>
            </dt>
            <dd>Graham &amp; Sibbald</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Address:</strong>
            </dt>
            <dd>40 Torphichen Street, Edinburgh EH3 8JB</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Phone number:</strong>
            </dt>
            <dd>0131 225 1559</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Email address:</strong>
            </dt>
            <dd>
              <a href="mailto:edinburgh@g-s.co.uk">edinburgh@g-s.co.uk</a>
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Related party disclosure:</strong>
            </dt>
            <dd>No related party</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessment software:</strong>
            </dt>
            <dd>EPCgen, v5.6.b.0</dd>
          </div>
        </dl>
      </div>

      {/* ---------------- PROPERTY DETAILS ---------------- */}
      <div className="print-no-break">
        <h3>Property EPC details</h3>

        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Address:</strong>
            </dt>
            <dd>6 Grigor Drive, Craigleith, Edinburgh EH4 2PJ</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Dwelling type:</strong>
            </dt>
            <dd>End-terrace house</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Total floor area:</strong>
            </dt>
            <dd>86&nbsp;m²</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Primary energy indicator:</strong>
            </dt>
            <dd>297&nbsp;kWh/m²/year</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of assessment:</strong>
            </dt>
            <dd>19 July 2023</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of certificate:</strong>
            </dt>
            <dd>21 July 2023</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of expiry:</strong>
            </dt>
            <dd>21 July 20xx</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Reference number:</strong>
            </dt>
            <dd>2517-6223-6000-0341-2296</dd>
          </div>
        </dl>
      </div>

      {/* ---------------- OTHER CERTIFICATES ---------------- */}
      <div id="epc-other-property-certificates" className="print-no-break">
        <h3>Other certificates for this property</h3>
        <p>
          If you are aware of previous certificates for this property and they
          are not listed here, please contact us at{" "}
          <a href="mailto:scottishepchelpdesk@est.org.uk">
            scottishepchelpdesk@est.org.uk
          </a>
          .
        </p>

        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Certificate number:</strong>
            </dt>
            <dd>2188-5014-6259-5271-1030</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Expired on:</strong>
            </dt>
            <dd>27 January 2019</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

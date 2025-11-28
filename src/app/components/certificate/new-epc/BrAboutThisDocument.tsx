import React from "react";

export default function BrAboutThisDocument() {
  return (
    <div id="br-about-this-document" className="cert-section">
      <h2>About this document</h2>
      ----
      <div>
        <div>
          <h3>Contacting the assessor</h3>
          <p>
            If you’re unhappy about your property’s energy assessment or
            certificate, you can complain to the assessor who created it.
          </p>

          <dl>
            <dt>Assessor’s name</dt>
            <dd>Mr. Christopher Hunter</dd>

            <dt>Assessor membership number</dt>
            <dd>EES/016138</dd>

            <dt>Company name/trading name</dt>
            <dd>Graham &amp; Sibbald</dd>

            <dt>Address</dt>
            <dd>40 Torphichen Street, Edinburgh EH3 8JB</dd>

            <dt>Phone number</dt>
            <dd>0131 225 1559</dd>

            <dt>Email address</dt>
            <dd>
              <a href="mailto:edinburgh@g-s.co.uk">edinburgh@g-s.co.uk</a>
            </dd>

            <dt>Related party disclosure</dt>
            <dd>No related party</dd>

            <dt>Assessment Software</dt>
            <dd>EPCgen, v5.6.b.0</dd>
          </dl>
        </div>
        <div>
          <h3>Property EPC details</h3>
          <dl>
            <dt>Address</dt>
            <dd>6 Grigor Drive, Craigleith, Edinburgh EH4 2PJ</dd>

            <dt>Dwelling type</dt>
            <dd>End-terrace house</dd>

            <dt>Total floor area</dt>
            <dd>86&nbsp;m²</dd>

            <dt>Primary energy indicator</dt>
            <dd>297&nbsp;kWh/m²/year</dd>

            <dt>Date of assessment</dt>
            <dd>19 July 2023</dd>

            <dt>Date of certificate</dt>
            <dd>21 July 2023</dd>

            <dt>Date of expiry</dt>
            <dd>21 July 20xx</dd>

            <dt>Reference number</dt>
            <dd>2517-6223-6000-0341-2296</dd>
          </dl>
        </div>
      </div>
      <div>
        <h3>Other certificates for this property</h3>
        <p>
          If you are aware of previous certificates for this property and they
          are not listed here, please contact us at{" "}
          <a href="mailto:scottishepchelpdesk@est.org.uk">
            scottishepchelpdesk@est.org.uk
          </a>
          .
        </p>
        <dl>
          <dt>Certificate number</dt>
          <dd>2188-5014-6259-5271-1030</dd>

          <dt>Expired on</dt>
          <dd>27 January 2019</dd>
        </dl>
      </div>
    </div>
  );
}

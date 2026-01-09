import { EpcDomRdSapSummary } from "@/types/epc-dom-rdsap";

export default function AboutThisDocument({
  data,
}: {
  data: EpcDomRdSapSummary;
}) {
  const { assessor, relatedPartyDisclosureText } = data;

  const assessorName = assessor
    ? [assessor.firstName, assessor.middleNames, assessor.lastName]
        .filter(Boolean)
        .join(" ")
    : undefined;

  const assessorMembershipNumber = assessor?.schemeAssessorId;

  const companyName = assessor?.companyDetails?.companyName;

  const companyAddressLine1 = assessor?.companyDetails?.companyAddressLine1;
  const companyAddressLine2 = assessor?.companyDetails?.companyAddressLine2;
  const companyTown = assessor?.companyDetails?.companyTown;
  const companyPostcode = assessor?.companyDetails?.companyPostcode;

  const companyTelephoneNumber =
    assessor?.companyDetails?.companyTelephoneNumber;

  const companyEmail = assessor?.companyDetails?.companyEmail;

  return (
    <section
      id="about-this-document"
      aria-labelledby="about-this-document-title"
    >
      <div className="cert-section">
        <h2 id="about-this-document-title">About this document</h2>

        <p>
          This Recommendations Report and the accompanying Energy Performance
          Certificate are valid for a maximum of ten years. These documents
          cease to be valid where superseded by a more recent assessment of the
          same building carried out by a member of an Approved Organisation.
        </p>

        <p>
          The Energy Performance Certificate and this Recommendations Report for
          this building were produced following an energy assessment undertaken
          by an assessor accredited by an Approved Organisation appointed by
          Scottish Ministers.
        </p>

        <p>
          You can verify the validity of this document by visiting the Scottish
          EPC register and entering the report reference number (RRN) printed at
          the top of this page.
        </p>
      </div>

      <div className="cert-section bg-blue">
        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessor’s name:</strong>
            </dt>
            <dd>{assessorName || "—"}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessor membership number:</strong>
            </dt>
            <dd>{assessorMembershipNumber || "—"}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Company name/trading name:</strong>
            </dt>
            <dd>{companyName || "—"}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Address:</strong>
            </dt>
            <dd>
              {companyAddressLine1 && <div>{companyAddressLine1}</div>}
              {companyAddressLine2 && <div>{companyAddressLine2}</div>}
              {companyTown && <div>{companyTown}</div>}
              {companyPostcode && <div>{companyPostcode}</div>}
              {!companyAddressLine1 &&
                !companyAddressLine2 &&
                !companyTown &&
                !companyPostcode &&
                "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Phone number:</strong>
            </dt>
            <dd>
              {companyTelephoneNumber ? (
                <a
                  className="ds_link"
                  href={`tel:${companyTelephoneNumber.replace(/\s+/g, "")}`}
                >
                  {companyTelephoneNumber}
                </a>
              ) : (
                "—"
              )}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Email address:</strong>
            </dt>
            <dd>
              {companyEmail ? (
                <a className="ds_link" href={`mailto:${companyEmail}`}>
                  {companyEmail}
                </a>
              ) : (
                "—"
              )}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Related party disclosure:</strong>
            </dt>
            <dd>{relatedPartyDisclosureText || "No related party"}</dd>
          </div>
        </dl>
      </div>
      <div className="cert-section">
        <p>
          If you have any concerns regarding the content of this report or the
          service provided by your assessor you should in the first instance
          raise these matters with your assessor and with the Approved
          Organisation to which they belong.
        </p>
      </div>

      <div className="cert-section bg-grey">
        <h3>Use of this energy performance information</h3>
        <p>
          Once lodged by your EPC assessor, this Energy Performance Certificate
          and Recommendations Report are available to view online at the
          Scottish EPC register.
        </p>
        <p>
          The energy performance data in these documents, together with other
          building information gathered during the assessment is held on the
          Scottish EPC Register and is available to authorised recipients.
        </p>
      </div>
    </section>
  );
}

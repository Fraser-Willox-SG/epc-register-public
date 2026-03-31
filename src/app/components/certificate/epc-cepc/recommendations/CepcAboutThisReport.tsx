import type { SgNonDomesticCepcCertificateSummary } from "@/types/sg-epc-non-dom-cepc";
import { formatIsoDateLong } from "@/app/utils/date";

type Props = { data?: SgNonDomesticCepcCertificateSummary };

export default function CepcAboutThisReport({ data }: Props) {
  const assessor = data?.assessor;

  const assessorName =
    assessor && `${assessor.firstName ?? ""} ${assessor.lastName ?? ""}`.trim()
      ? `${assessor.firstName ?? ""} ${assessor.lastName ?? ""}`.trim()
      : "—";

  const membershipNumber = assessor?.schemeAssessorId ?? "—";

  const companyName = assessor?.companyName ?? "—";

  const companyAddress = assessor?.contactDetails?.tradingAddress ?? "—";
  const telephoneValue =
    assessor?.contactDetails?.telephoneNumber?.trim() || "";
  const emailValue = assessor?.contactDetails?.email?.trim() || "";

  return (
    <section id="report-about">
      <div className="cert-section print-no-break">
        <h2>About this document</h2>

        <p>
          This report and the accompanying Energy Performance Certificate are
          valid for a maximum of ten years. These documents cease to be valid
          where superseded by a more recent assessment of the same building
          carried out by a member of an Approved Organisation.
        </p>

        <p>
          Your Energy Performance Certificate and this Recommendations Report
          for this building were produced following an energy assessment
          undertaken by an assessor accredited by the Approved Organisation. The
          certificate has been produced under the Energy Performance of
          Buildings (Scotland) Regulations 2008 from data lodged to the Scottish
          EPC register. You can verify the validity of this document by visiting{" "}
          <a href="https://www.scottishepcregister.org.uk">
            www.scottishepcregister.org.uk
          </a>{" "}
          and entering the Report Reference Number (RRN) printed at the top of
          this page.
        </p>

        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of assessment:</strong>
            </dt>
            <dd>
              {data?.dateOfAssessment
                ? formatIsoDateLong(data.dateOfAssessment)
                : "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Report Reference Number (RRN):</strong>
            </dt>
            <dd>{data?.assessmentId ?? "—"}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessor’s name:</strong>
            </dt>
            <dd>{assessorName}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessor membership number:</strong>
            </dt>
            <dd>{membershipNumber}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Company name/trading name:</strong>
            </dt>
            <dd>{companyName}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Address:</strong>
            </dt>
            <dd>{companyAddress}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Phone number:</strong>
            </dt>
            <dd>
              {telephoneValue ? (
                <a
                  className="ds_link"
                  href={`tel:${telephoneValue.replace(/\s+/g, "")}`}
                >
                  {telephoneValue}
                </a>
              ) : (
                "—"
              )}
            </dd>
          </div>
          <div className="row-2col border-b-grey">
            <dt>
              <strong>E-mail address:</strong>
            </dt>
            <dd>
              {emailValue ? (
                <a className="ds_link" href={`mailto:${emailValue}`}>
                  {emailValue}
                </a>
              ) : (
                "—"
              )}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Approved Organisation:</strong>
            </dt>
            <dd>{assessor?.registeredBy?.name ?? "—"}</dd>
          </div>
        </dl>

        <p>
          If you have any concerns regarding the content of this report or the
          service provided by your assessor you should in the first instance
          raise these matters with your assessor and with the Approved
          Organisation to which they belong. All Approved Organisations are
          required to publish their complaints and disciplinary procedures and
          details can be found online at the web address given above.
        </p>
      </div>
      <div className="cert-section bg-blue print-no-break">
        <h3>Use of this energy performance information</h3>
        <p>
          Once lodged by your EPC assessor, this Energy Performance Certificate
          and Recommendations Report are available to view online at{" "}
          <a href="https://www.scottishepcregister.org.uk">
            www.scottishepcregister.org.uk
          </a>
          , with the facility to search for any single record by entering the
          property address. This gives everyone access to any current, valid EPC
          except where a property has a Green Deal Plan, in which case the
          Report Reference Number (RRN) must first be provided. The energy
          performance data in these documents, together with other building
          information gathered during the assessment is held on the Scottish EPC
          Register and is available to authorised recipients, including
          organisations delivering energy efficiency and carbon reduction
          initiatives on behalf of the Scottish and UK governments. A range of
          data from all assessments undertaken in Scotland is also published
          periodically by the Scottish Government. Further information on these
          matters and on Energy Performance Certificates in general, can be
          found at <a href="https://www.gov.scot/epc">www.gov.scot/epc</a>.
        </p>
      </div>
    </section>
  );
}

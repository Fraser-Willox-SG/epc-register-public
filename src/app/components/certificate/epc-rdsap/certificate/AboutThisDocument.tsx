import type { DomesticCertificateData } from "@/types/sg-epc-dom";
import MissingData from "@/app/components/MissingData";
import relatedPartyDisclosureJson from "@/app/content/domestic/related-party-disclosure.json";

type RelatedPartyDisclosureEntry = {
  en: string;
  cy?: string;
};

type RelatedPartyDisclosureJson = {
  relatedPartyDisclosure: Record<string, RelatedPartyDisclosureEntry>;
};

const disclosureLookup = (
  relatedPartyDisclosureJson as RelatedPartyDisclosureJson
).relatedPartyDisclosure;

function formatAssessorName(
  firstName?: string,
  lastName?: string,
): string | null {
  const full = `${firstName ?? ""} ${lastName ?? ""}`.trim();
  return full.length > 0 ? full : null;
}

function getRelatedPartyDisclosureText(
  code?: number | null,
  fallbackText?: string | null,
): string | null {
  const normalizedCode = typeof code === "number" ? String(code) : "";
  const fromLookup = normalizedCode
    ? disclosureLookup[normalizedCode]
    : undefined;

  if (fromLookup?.en?.trim()) {
    return fromLookup.en.trim();
  }

  const trimmedFallback = fallbackText?.trim();
  return trimmedFallback || null;
}

export default function AboutThisDocument({
  data,
}: {
  data: DomesticCertificateData;
}) {
  const assessorName = formatAssessorName(
    data.assessor.firstName,
    data.assessor.lastName,
  );

  const membershipNumber = data.assessor.schemeAssessorId?.trim() || null;
  const approvedOrganisation = data.assessor.registeredBy?.name?.trim() || null;

  const companyTradingName = data.assessor.companyName;
  const assessorAddress = data.assessor.contactDetails.address;

  const phone = data.assessor.contactDetails?.telephoneNumber?.trim() || null;
  const email = data.assessor.contactDetails?.email?.trim() || null;

  const relatedPartyDisclosure = getRelatedPartyDisclosureText(
    data.relatedPartyDisclosureNumber,
    data.relatedPartyDisclosureText,
  );

  return (
    <section id="about-this-document">
      <div className="cert-section print-no-break">
        <h2>About this document</h2>

        <p>
          This Recommendations Report and the accompanying Energy Performance
          Certificate are valid for a maximum of ten years. These documents
          cease to be valid where superseded by a more recent assessment of the
          same building carried out by a member of an Approved Organisation.
        </p>

        <p>
          The Energy Performance Certificate and this Recommendations Report for
          this building were produced following an energy assessment undertaken
          by an assessor accredited by {approvedOrganisation ?? <MissingData />}
          , an Approved Organisation appointed by Scottish Ministers. The
          certificate has been produced under the Energy Performance of
          Buildings (Scotland) Regulations 2008 from data lodged to the Scottish
          EPC register. You can verify the validity of this document by visiting{" "}
          <a href="https://energycertificate.service.gov.scot/">
            energycertificate.service.gov.scot
          </a>{" "}
          and entering the Report Reference Number (RRN) printed at the top of
          this page.
        </p>
      </div>

      <div className="cert-section bg-blue print-no-break">
        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>Assessor&apos;s name:</dt>
            <dd>{assessorName ?? <MissingData />}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>Assessor membership number:</dt>
            <dd>{membershipNumber ?? <MissingData />}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>Company name/trading name:</dt>
            <dd>{companyTradingName ?? <MissingData />}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>Address:</dt>
            <dd>{assessorAddress ?? <MissingData />}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>Phone number:</dt>
            <dd>{phone ?? <MissingData />}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>Email address:</dt>
            <dd>
              {email ? (
                <a className="ds_link" href={`mailto:${email}`}>
                  {email}
                </a>
              ) : (
                <MissingData />
              )}
            </dd>
          </div>

          <div className="row-2col">
            <dt>Related party disclosure:</dt>
            <dd>{relatedPartyDisclosure ?? <MissingData />}</dd>
          </div>
        </dl>
      </div>

      <div className="cert-section bg-grey print-no-break">
        <p>
          If you have any concerns regarding the content of this report or the
          service provided by your assessor you should in the first instance
          raise these matters with your assessor and with the Approved
          Organisation to which they belong. All Approved Organisations are
          required to publish their complaints and disciplinary procedures and
          details can be found online at the web address given above.
        </p>
      </div>

      <div className="cert-section print-no-break">
        <h3>Use of this energy performance information</h3>

        <p>
          Once lodged by your EPC assessor, this Energy Performance Certificate
          and Recommendations Report are available to view online at{" "}
          <a href="https://energycertificate.service.gov.scot/">
            energycertificate.service.gov.scot
          </a>
          , with the facility to search for any single record by entering the
          property address. This gives everyone access to any current, valid EPC
          except where a property has a Green Deal Plan, in which case the
          Report Reference Number (RRN) must first be provided.
        </p>

        <p>
          The energy performance data in these documents, together with other
          building information gathered during the assessment is held on the
          Scottish EPC Register and is available to authorised recipients,
          including organisations delivering energy efficiency and carbon
          reduction initiatives on behalf of the Scottish and UK governments. A
          range of data from all assessments undertaken in Scotland is also
          published periodically by the Scottish Government.
        </p>

        <p>
          Further information on these matters and on Energy Performance
          Certificates in general, can be found at{" "}
          <a
            href="https://www.gov.scot/epc"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.gov.scot/epc
          </a>
          .
        </p>
      </div>
    </section>
  );
}

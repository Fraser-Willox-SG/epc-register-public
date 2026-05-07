import ActionPlanHeader from "@/app/components/certificate/action-plan/ActionPlanHeader";
import MissingData from "@/app/components/MissingData";
import { formatIsoDateLong } from "@/app/utils/date";
import type { SgActionPlanCertificateSummary } from "@/types/action-plan";
import Link from "next/link";

const PLACEHOLDER = "—";

// Small, local helpers (keep page resilient)
function isBlank(value: unknown): boolean {
  return value == null || (typeof value === "string" && value.trim() === "");
}

function displayText(value: unknown, fallback = PLACEHOLDER) {
  return isBlank(value) ? fallback : String(value);
}

function ynToYesNo(value: unknown): "Yes" | "No" | "—" {
  if (value === "Y" || value === true) return "Yes";
  if (value === "N" || value === false) return "No";
  return "—";
}

export default function ActionPlanDocument({
  data,
}: {
  data: SgActionPlanCertificateSummary;
}) {
  const rrn = data.assessmentId;
  const epcRrn = data.epcAssessmentId;

  const saleLeaseDate = data.saleLeaseDate;
  const dateOfAssessment = data.dateOfAssessment;
  const dateOfPlan = data.planReportDate;

  const address = data.address;

  const assessor = data.assessor;
  const assessorId = assessor?.schemeAssessorId;

  const owner = ynToYesNo(data.ownerCommissionReport);
  const tenantOrDelegated = ynToYesNo(data.delegatedPersonCommissionReport);

  const delegatedProtocolSetUp = data.delegatedProtocolSetUp;
  const delegatedProtocolDate = data.delegatedProtocolDate;
  const hasDelegatedProtocolDateField = "delegatedProtocolDate" in data;

  const buildingImprovements = ynToYesNo(data.buildingImprovements);
  const operationalRating = ynToYesNo(data.operationalRatings);

  const prescriptiveMeasures = Array.isArray(data.prescriptiveImprovements)
    ? data.prescriptiveImprovements
    : [];

  const alternativeMeasures = Array.isArray(data.alternativeImprovements)
    ? data.alternativeImprovements
    : [];

  const targetEmissionSavings = data.targetEmissionSavings;
  const targetEnergySavings = data.targetEnergySavings;

  const acceptPrescriptive = ynToYesNo(data.acceptPrescriptiveImprovements);

  const decDisplayed = ynToYesNo(data.dec);

  const plannedCompletionDate = data.plannedCompletionDate;
  const actualCompletionDate = data.actualCompletionDate;

  const {
    addressLine1,
    addressLine2,
    addressLine3,
    addressLine4,
    town,
    postcode,
  } = address ?? {};

  return (
    <>
      <div id="certificate-content">
        <div id="overview">
          <ActionPlanHeader
            addressLine1={addressLine1 ?? ""}
            addressLine2={addressLine2 ?? ""}
            addressLine3={addressLine3 ?? ""}
            addressLine4={addressLine4 ?? undefined}
            postcode={postcode ?? ""}
            town={town ?? ""}
            rrn={rrn}
            dateofPlan={dateOfPlan}
            printTitle="Action Plan"
          />
        </div>

        <section
          className="cert-section print-no-break"
          aria-labelledby="action-plan-details"
        >
          {/* <h2 id="action-plan-details" className="ds_h3">
          Action plan details
        </h2> */}
          <dl className="summary-list">
            <div className="row-2col border-b-grey">
              <dt>
                <strong>Date of sale/lease</strong>
              </dt>
              <dd>{saleLeaseDate ? formatIsoDateLong(saleLeaseDate) : "—"}</dd>
            </div>

            <div className="row-2col border-b-grey">
              <dt>
                <strong>Date of assessment</strong>
              </dt>
              <dd>
                {dateOfAssessment ? formatIsoDateLong(dateOfAssessment) : "—"}
              </dd>
            </div>

            <div className="row-2col border-b-grey">
              <dt>
                <strong>EPC RRN</strong>
              </dt>
              <dd>
                {epcRrn ? (
                  <Link
                    href={`/domestic/certificate/` + epcRrn}
                    className="ds_link"
                  >
                    {epcRrn}
                  </Link>
                ) : (
                  <span className="ds_hint-text">—</span>
                )}
              </dd>
            </div>
          </dl>
        </section>

        {/* Parties involved */}
        <section
          className="cert-section print-no-break bg-blue"
          aria-labelledby="parties"
        >
          <h2 id="parties-involved" className="ds_h3">
            Parties involved in production of the action plan
          </h2>

          <table className="ds_table">
            {/* <caption className="ds_visually-hidden">
            Parties involved in production of the action plan
          </caption> */}
            <thead>
              <tr>
                <th scope="col">Party</th>
                <th scope="col">Involved</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Owner</td>
                <td>{owner}</td>
              </tr>
              <tr>
                <td>Tenant or delegated person</td>
                <td>{tenantOrDelegated}</td>
              </tr>
              <tr>
                <td>Assessor ID</td>
                <td>{displayText(assessorId)}</td>
              </tr>
              <tr>
                <td>Delegated protocol set up</td>
                <td>{ynToYesNo(delegatedProtocolSetUp)}</td>
              </tr>
              <tr>
                <td>Date</td>
                <td>
                  {hasDelegatedProtocolDateField ? (
                    delegatedProtocolDate ? (
                      formatIsoDateLong(delegatedProtocolDate)
                    ) : (
                      PLACEHOLDER
                    )
                  ) : (
                    <MissingData />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Improvement type */}
        <section
          className="cert-section print-no-break"
          id="improvement-type"
          aria-labelledby="improvement-type"
        >
          <h2 className="ds_h3">Improvement type</h2>

          <table className="ds_table">
            {/* <caption className="ds_visually-hidden">
            Parties involved in production of the action plan
          </caption> */}
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Building improvements</td>
                <td>{buildingImprovements}</td>
              </tr>
              <tr>
                <td>Operational rating</td>
                <td>{operationalRating}</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Prescriptive improvement measures */}
        <section
          className="cert-section print-no-break bg-blue"
          id="prescriptive-measures"
          aria-labelledby="prescriptive-measures"
        >
          <h2 className="ds_h3">Prescriptive improvement measures</h2>

          {prescriptiveMeasures.length === 0 ? (
            <p className="ds_hint-text">No prescriptive measures available.</p>
          ) : (
            <table className="ds_table">
              <caption className="ds_visually-hidden">
                Prescriptive improvement measures and whether each measure is
                valid
              </caption>
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Valid</th>
                </tr>
              </thead>
              <tbody>
                {prescriptiveMeasures.map((m, idx) => {
                  const description =
                    (typeof m.measureDescriptionShort === "string" &&
                      m.measureDescriptionShort.trim()) ||
                    (typeof m.measureDescriptionLong === "string" &&
                      m.measureDescriptionLong.trim()) ||
                    "Not available";

                  return (
                    <tr key={`${description}-${idx}`}>
                      <td>{description}</td>
                      <td>{ynToYesNo(m.measureValid)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          <table className="ds_table">
            <caption className="ds_visually-hidden">
              Prescriptive improvement targets and acceptance
            </caption>
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Target emission savings (kgCO₂/m²·year)</td>
                <td>
                  {targetEmissionSavings != null ? (
                    targetEmissionSavings
                  ) : (
                    <MissingData />
                  )}
                </td>
              </tr>

              <tr>
                <td>Target energy savings (kWh/m²·year)</td>
                <td>
                  {targetEnergySavings != null ? (
                    targetEnergySavings
                  ) : (
                    <MissingData />
                  )}
                </td>
              </tr>

              <tr>
                <td>Accept prescriptive improvements</td>
                <td>{acceptPrescriptive ?? "Not available"}</td>
              </tr>

              <tr>
                <td>If no, go to alternative improvements</td>
                <td>
                  {acceptPrescriptive === "No"
                    ? "Yes"
                    : acceptPrescriptive === "Yes"
                      ? "Not applicable"
                      : "Not available"}
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Alternative improvements (only if present) */}
        {alternativeMeasures.length > 0 && (
          <section
            className="cert-section print-no-break"
            id="alternative-measures"
            aria-labelledby="alternative-measures"
          >
            <h2 className="ds_h3">Alternative improvements</h2>

            <table className="ds_table">
              <caption className="ds_visually-hidden">
                Alternative improvements and whether each measure is valid
              </caption>
              <thead>
                <tr>
                  <th scope="col">Description</th>
                  <th scope="col">Valid</th>
                </tr>
              </thead>
              <tbody>
                {alternativeMeasures.map((m, idx) => {
                  const description =
                    (typeof m.measureDescriptionShort === "string" &&
                      m.measureDescriptionShort.trim()) ||
                    (typeof m.measureDescriptionLong === "string" &&
                      m.measureDescriptionLong.trim()) ||
                    "Not available";

                  return (
                    <tr key={`${description}-${idx}`}>
                      <td>{description}</td>
                      <td>{ynToYesNo(m.measureValid)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        )}

        {/* Operational rating system */}
        <section
          className="cert-section print-no-break"
          id="operational-rating-system"
          aria-labelledby="operational-rating-system"
        >
          <h2 className="ds_h3">Operational rating system</h2>

          <table className="ds_table">
            <caption className="ds_visually-hidden">
              Operational rating system information
            </caption>
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Valid</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  Display Energy Certificate lodged and displayed in building
                </td>
                <td>{decDisplayed ?? <MissingData />}</td>
              </tr>
            </tbody>
          </table>
          <p>
            Refer to the Display Energy Certificate to view operational rating
            and CO₂ emissions over the previous 3 years.
          </p>
        </section>

        {/* Completion */}
        <section
          className="cert-section print-no-break bg-blue"
          aria-labelledby="completion"
        >
          <h2 id="completion-of-improvements" className="ds_h3">
            Completion of improvements (prescriptive or alternative)
          </h2>

          <table className="ds_table">
            <caption className="ds_visually-hidden">
              Improvement completion dates
            </caption>
            <thead>
              <tr>
                <th scope="col">Description</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Planned completion date</td>
                <td>
                  {plannedCompletionDate ? (
                    formatIsoDateLong(plannedCompletionDate)
                  ) : (
                    <MissingData />
                  )}
                </td>
              </tr>
              <tr>
                <td>Actual completion date</td>
                <td>{actualCompletionDate ?? PLACEHOLDER}</td>
              </tr>
            </tbody>
          </table>

          <p>
            This action plan must be lodged in the national electronic register
            and must be updated when the improvements have been completed.
          </p>
        </section>
      </div>
    </>
  );
}

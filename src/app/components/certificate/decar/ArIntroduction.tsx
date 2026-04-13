import React from "react";
import type { ArSummary } from "@/types/decar";
import { formatIsoDateLong } from "@/app/utils/date";

type Props = {
  data: ArSummary;
};

export default function ArIntroduction({ data }: Props) {
  const t = data.technicalInformation;
  const admin = data.administrativeInformation;

  const rawCalcTool = admin?.calculationTool ?? "";
  const rawInspectionType = t?.inspectionType ?? "";
  const rawDateOfAssessment = data.dateOfAssessment ?? "";
  const rawDateOfIssue = admin?.issueDate ?? "";

  const calcTool = rawCalcTool.trim();
  const inspectionType = rawInspectionType.trim();
  const dateOfAssessment = rawDateOfAssessment.trim();
  const dateOfIssue = rawDateOfIssue.trim();

  const surveyDate =
    dateOfAssessment || dateOfIssue
      ? formatIsoDateLong(dateOfAssessment || dateOfIssue)
      : null;

  const isPhysicalInspection =
    inspectionType.toLowerCase() === "physical" && !!surveyDate;

  return (
    <section className="cert-section bg-grey print-no-break">
      <h2>Introduction</h2>

      {/* Main policy-style paragraph */}
      <p>
        This Advisory Report has been produced in line with Scottish
        Ministers&apos; approved methodology and is based on the assessment
        software listed below.
      </p>

      {/* Summary list for key fields */}
      <dl className="summary-list">
        <div className="row-2col border-b-grey">
          <dt>
            <strong>Assessment software:</strong>
          </dt>
          <dd>{calcTool || "Not supplied by assessor"}</dd>
        </div>

        <div className="row-2col border-b-grey">
          <dt>
            <strong>Type of inspection:</strong>
          </dt>
          <dd>{inspectionType || "Not specified"}</dd>
        </div>

        {surveyDate && (
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Site survey date:</strong>
            </dt>
            <dd>{surveyDate}</dd>
          </div>
        )}
      </dl>

      {/* Paragraph about the physical / walk-around survey, only when appropriate */}
      {isPhysicalInspection && (
        <p className="text-small">
          In accordance with Scottish Ministers&apos; current guidance, the
          energy assessor undertook a walk-around survey of the building on{" "}
          {surveyDate} prior to producing this Advisory Report.
        </p>
      )}
    </section>
  );
}

import Link from "next/link";

import { formatIsoDateLong } from "@/app/utils/date";
import type { SgRelatedAssessment } from "@/types/sg-related-assessment";

type Props = {
  assessments: SgRelatedAssessment[];
  certificateType: "domestic" | "non-domestic";
};

export default function PreviousCertificatesForThisProperty({
  assessments,
  certificateType,
}: Props) {
  const visibleAssessments = assessments.filter(
    (assessment) =>
      assessment.assessmentStatus === "ENTERED" && !assessment.optOut,
  );

  if (visibleAssessments.length === 0) {
    return null;
  }

  const certificateBasePath =
    certificateType === "domestic"
      ? "/energy-performance-certificates/domestic/certificate"
      : "/energy-performance-certificates/non-domestic/certificate";

  return (
    <section id="previous-certificates" className="cert-section">
      <h3>Other certificates for this property</h3>

      <p>
        Please note that the EPC ratings can change over time. This could be due
        to:
      </p>
      <ul>
        <li>updates in how they are calculated,</li>
        <li>differences in the information available to the assessor, or</li>
        <li>changes made to the property.</li>
      </ul>

      <p>
        If you are aware of previous certificates for this property and they are
        not listed here, please{" "}
        <a href="mailto:epcenquiries@gov.scot" className="ds_link">
          email our team
        </a>
        .
      </p>

      <dl className="summary-list border-t-grey">
        {visibleAssessments.map((assessment) => (
          <div key={assessment.assessmentId}>
            <div className="row-2col">
              <dt>
                <strong>Certificate number</strong>
              </dt>

              <dd>
                <Link
                  href={`${certificateBasePath}/${encodeURIComponent(
                    assessment.assessmentId,
                  )}`}
                  className="ds_link"
                >
                  {assessment.assessmentId}
                </Link>
              </dd>
            </div>
            <div className="row-2col border-b-grey">
              <dt>
                <strong>Expired on</strong>
              </dt>

              <dd>{formatIsoDateLong(assessment.assessmentExpiryDate)}</dd>
            </div>
          </div>
        ))}
      </dl>
    </section>
  );
}

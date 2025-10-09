import { headers } from "next/headers";
import Link from "next/link";
import type { ReactNode } from "react";

import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

import HeaderCard from "@/app/components/certificate/old-epc/HeaderCard";
import EpcScale from "@/app/components/certificate/old-epc/EpcScale";
import PropertySummary from "@/app/components/certificate/old-epc/PropertySummary";
import ImprovementsList from "@/app/components/certificate/old-epc/ImprovementsList";
import PrintButton from "@/app/components/PrintButton";

// ---- Types for the API response (trimmed to what we use right now)
type Summary = {
  data: {
    typeOfAssessment: string;
    assessmentId: string;
    dateOfAssessment?: string;
    dateOfRegistration?: string;
    dateOfExpiry?: string;

    addressLine1: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    town?: string;
    postcode: string;

    dwellingType?: string;
    totalFloorArea?: string;
    currentEnergyEfficiencyRating?: number;
    currentEnergyEfficiencyBand?: string;
    potentialEnergyEfficiencyRating?: number;
    potentialEnergyEfficiencyBand?: string;

    propertySummary?: Array<{
      name: string;
      description: string | null;
      energyEfficiencyRating: number | null;
      environmentalEfficiencyRating?: number | null;
    }>;

    recommendedImprovements?: Array<{
      sequence: number;
      improvementType?: string;
      improvementTitle?: string;
      improvementDescription?: string | null;
      indicativeCost?: string | null;
      typicalSaving?: string | null;
      energyPerformanceRatingImprovement?: number | null;
      energyPerformanceBandImprovement?: string | null;
    }>;

    assessor?: {
      firstName?: string;
      lastName?: string;
      schemeAssessorId?: string;
      registeredBy?: { name?: string };
      contactDetails?: { email?: string; telephoneNumber?: string };
    };
  };
};

// ---- helpers
async function absoluteUrl(path: string) {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return `${proto}://${host}${path}`;
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="ds_section ds_mb-8">
      <h2 className="ds_h3 ds_mb-2">{title}</h2>
      <div className="ds_card ds_p-4">{children}</div>
    </section>
  );
}

// ---- page
export default async function DomesticCertificatePage({
  params,
}: {
  params: { rrn: string }; // <-- correct type (no Promise)
}) {
  const { rrn } = params;

  const apiUrl = await absoluteUrl(
    `/api/ukg/assessments/${encodeURIComponent(rrn)}/summary`
  );

  let data: Summary["data"] | null = null;
  let error: string | null = null;
  let detail: string | null = null;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    const text = await res.text();
    if (!res.ok) {
      error = `We couldn’t retrieve the certificate for ${rrn}.`;
      if (process.env.NODE_ENV !== "production") {
        detail = `Status ${res.status} — ${text.slice(0, 300)}`;
      }
    } else {
      const json = JSON.parse(text) as Summary;
      data = json.data ?? null;
      if (!data) error = "Certificate not found.";
    }
  } catch {
    error = "There was a problem contacting the service.";
  }

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Energy Performance Certificate</h1>
        <div className="sgds-header-row">
          <p className="ds_lede ds_!_margin-0">
            {[data?.addressLine1, data?.town, data?.postcode]
              .filter(Boolean)
              .join(", ")}
          </p>

          <PrintButton className="ds_button no-print" />
        </div>
      </div>

      {error ? (
        <>
          <p className="ds_error-message">{error}</p>
          {detail && <pre className="ds_inset-text">{detail}</pre>}
          <p className="ds_mt-4">
            <Link href="/domestic" className="ds_link">
              Back to search
            </Link>
          </p>
        </>
      ) : data ? (
        <div className="ds_layout ds_layout--search-results-with-sidebar">
          {/* Sidebar (SDS grid area) */}
          <aside
            className="ds_layout__sidebar"
            aria-label="Document navigation"
          >
            <ContentsNav
              title="Document navigation"
              ariaLabel="Document navigation"
            >
              <ContentsNav.Item href="#overview" current>
                Energy Performance Certificate
              </ContentsNav.Item>
              <ContentsNav.Item href="#energy-efficiency-rating">
                Energy Efficiency Rating
              </ContentsNav.Item>
              <ContentsNav.Item href="#property-summary-rp">
                Property report: Summary
              </ContentsNav.Item>
              <ContentsNav.Item href="#improvements">
                Property report: Potential improvements
              </ContentsNav.Item>
              <ContentsNav.Item href="#assessor">
                About this document
              </ContentsNav.Item>
            </ContentsNav>
          </aside>

          {/* Main content (SDS grid area) */}
          <main
            className="ds_layout__content"
            style={{ border: "1px solid grey" }}
          >
            <div id="overview">
              <HeaderCard
                address={[data.addressLine1, data.town, data.postcode]
                  .filter(Boolean)
                  .join(", ")}
                dwellingType={data.dwellingType}
                totalFloorArea={data.totalFloorArea}
                dateOfAssessment={data.dateOfAssessment}
                rrn={data.assessmentId}
                current={data.currentEnergyEfficiencyRating}
                currentBand={data.currentEnergyEfficiencyBand}
                potential={data.potentialEnergyEfficiencyRating}
                potentialBand={data.potentialEnergyEfficiencyBand}
              />
            </div>

            <Section
              id="energy-efficiency-rating"
              title="Heat-retention rating (EPC)"
            >
              <p className="ds_hint-text">
                This measures how well the property is insulated to keep warmth
                in.
              </p>
              <EpcScale
                current={data.currentEnergyEfficiencyRating ?? null}
                potential={data.potentialEnergyEfficiencyRating ?? null}
              />
            </Section>

            <div id="property-summary-rp">
              <PropertySummary items={data.propertySummary ?? []} />
            </div>

            <Section
              id="improvements"
              title="Property report: Potential improvements"
            >
              <ImprovementsList items={data.recommendedImprovements ?? []} />
            </Section>

            <Section id="assessor" title="About this document">
              <dl className="ds_key-details">
                <div className="ds_key-details__item">
                  <dt>Assessor</dt>
                  <dd>
                    {[data.assessor?.firstName, data.assessor?.lastName]
                      .filter(Boolean)
                      .join(" ") || "—"}
                  </dd>
                </div>
                <div className="ds_key-details__item">
                  <dt>Accreditation scheme</dt>
                  <dd>{data.assessor?.registeredBy?.name ?? "—"}</dd>
                </div>
                <div className="ds_key-details__item">
                  <dt>Scheme ID</dt>
                  <dd>{data.assessor?.schemeAssessorId ?? "—"}</dd>
                </div>
                <div className="ds_key-details__item">
                  <dt>Contact</dt>
                  <dd>
                    {data.assessor?.contactDetails?.email ||
                    data.assessor?.contactDetails?.telephoneNumber ? (
                      <>
                        {data.assessor?.contactDetails?.email ?? ""}
                        {data.assessor?.contactDetails?.email &&
                        data.assessor?.contactDetails?.telephoneNumber
                          ? " | "
                          : ""}
                        {data.assessor?.contactDetails?.telephoneNumber ?? ""}
                      </>
                    ) : (
                      "—"
                    )}
                  </dd>
                </div>
                <div className="ds_key-details__item">
                  <dt>Registration date</dt>
                  <dd>{data.dateOfRegistration ?? "—"}</dd>
                </div>
                <div className="ds_key-details__item">
                  <dt>Expiry date</dt>
                  <dd>{data.dateOfExpiry ?? "—"}</dd>
                </div>
              </dl>
            </Section>
          </main>
        </div>
      ) : null}
    </div>
  );
}

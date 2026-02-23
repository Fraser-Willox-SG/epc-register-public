import Link from "next/link";

import { selfUrl } from "@/app/utils/self-url";
import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";
import PrintButton from "@/app/components/PrintButton";

import type {
  SgActionPlanCertificateSummary,
  SgActionPlanResponse,
} from "@/types/action-plan";

import ActionPlanDocument from "@/app/components/certificate/action-plan/ActionPlanDocument";

export default async function DomesticCertificatePage({
  params,
}: {
  params: Promise<{ rrn: string }>;
}) {
  const { rrn } = await params;

  const apiUrl = selfUrl(
    `/api/sg/assessments/${encodeURIComponent(rrn)}/certificate-summary`,
  );

  let data: SgActionPlanResponse["data"] | null = null;
  let error: string | null = null;
  let detail: string | null = null;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });

    const bodyText = await res.text(); // read once
    if (!res.ok) {
      error = `We couldn’t retrieve the certificate for ${rrn}.`;
      if (process.env.NODE_ENV !== "production") {
        detail = `Status ${res.status} — ${bodyText.slice(0, 300)}`;
      }
      // log on server for EC2 debugging
      console.error("[SSR] certificate fetch failed", {
        url: apiUrl,
        status: res.status,
        snippet: bodyText.slice(0, 300),
      });
    } else {
      // parse safely
      try {
        const json = JSON.parse(bodyText) as SgActionPlanResponse;
        data = json.data ?? null;
        if (!data) {
          error = "Certificate not found.";
        }
      } catch (parseErr) {
        error = "Bad JSON from API route.";
        if (process.env.NODE_ENV !== "production") {
          detail = (parseErr as Error).message;
        }
        console.error("[SSR] JSON parse error", {
          url: apiUrl,
          body: bodyText.slice(0, 300),
        });
      }
    }
  } catch (e) {
    error = "There was a problem contacting the service.";
    if (process.env.NODE_ENV !== "production") {
      detail = (e as Error).message;
    }
    console.error("[SSR] certificate fetch failed", {
      url: apiUrl,
      err: (e as Error).message,
    });
  }

  const hasAlternativeImprovements =
    Array.isArray(data?.alternativeImprovements) &&
    data.alternativeImprovements.length > 0;

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header no-print">
        <h1>Action Plan</h1>
        <div className="sgds-header-row">
          <p className="ds_lede ds_!_margin-0">
            {[
              data?.address?.addressLine1,
              data?.address?.town,
              data?.address?.postcode,
            ]
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
            <Link href="/action-plan" className="ds_link">
              Back to search
            </Link>
          </p>
        </>
      ) : data ? (
        <div className="ds_layout ds_layout--search-results-with-sidebar">
          {/* Sidebar (SDS grid area) */}
          <aside
            className="ds_layout__sidebar no-print"
            aria-label="Document navigation"
          >
            <ContentsNav
              title="Document navigation"
              ariaLabel="Document navigation"
            >
              <ContentsNav.Item href="#overview">Action Plan</ContentsNav.Item>
              <ContentsNav.Item href="#parties-involved">
                Parties involved
              </ContentsNav.Item>
              <ContentsNav.Item href="#improvement-type">
                Improvement type
              </ContentsNav.Item>
              <ContentsNav.Item href="#prescriptive-measures">
                Prescriptive improvement measures
              </ContentsNav.Item>

              {/* Alternative improvements (only if present) */}
              {hasAlternativeImprovements && (
                <ContentsNav.Item href="#alternative-measures">
                  Alternative improvements
                </ContentsNav.Item>
              )}

              <ContentsNav.Item href="#operational-rating-system">
                Operational rating system
              </ContentsNav.Item>
              <ContentsNav.Item href="#completion-of-improvements">
                Completion of improvements
              </ContentsNav.Item>
            </ContentsNav>
          </aside>

          {/* Main content (SDS grid area) */}
          <main
            className="ds_layout__content"
            style={{ border: "1px solid grey" }}
          >
            <ActionPlanDocument data={data} />
          </main>
        </div>
      ) : null}
    </div>
  );
}

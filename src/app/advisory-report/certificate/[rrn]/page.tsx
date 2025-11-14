import Link from "next/link";

import { selfUrl } from "@/app/utils/self-url";
import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

import PrintButton from "@/app/components/PrintButton";

import type { DecarSummary } from "@/types/decar";
import { isDec, isDecRr } from "@/types/decar";

import DecCertificate from "@/app/components/certificate/decar/DecCertificate";
import ArCertificate from "@/app/components/certificate/decar/ArCertificate";

type SummaryResponse = { data: DecarSummary };

function getViewMode(summary: DecarSummary): "dec" | "ar" {
  if (isDecRr(summary)) return "ar";
  return "dec";
}

export default async function DecarCertificatePage({
  params,
}: {
  params: Promise<{ rrn: string }>;
}) {
  const { rrn } = await params;

  const apiUrl = selfUrl(
    `/api/ukg/assessments/${encodeURIComponent(rrn)}/summary`
  );

  let data: DecarSummary | null = null;
  let error: string | null = null;
  let detail: string | null = null;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    const bodyText = await res.text();

    if (!res.ok) {
      error = `We couldn’t retrieve the certificate for ${rrn}.`;
      if (process.env.NODE_ENV !== "production") {
        detail = `Status ${res.status} — ${bodyText.slice(0, 300)}`;
      }
      console.error("[SSR] DEC/AR certificate fetch failed", {
        url: apiUrl,
        status: res.status,
        snippet: bodyText.slice(0, 300),
      });
    } else {
      try {
        const json = JSON.parse(bodyText) as SummaryResponse;
        data = json.data ?? null;
        if (!data) {
          error = "Certificate not found.";
        }
      } catch (parseErr) {
        error = "Bad JSON from API route.";
        if (process.env.NODE_ENV !== "production") {
          detail = (parseErr as Error).message;
        }
        console.error("[SSR] DEC/AR JSON parse error", {
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
    console.error("[SSR] DEC/AR certificate fetch failed", {
      url: apiUrl,
      err: (e as Error).message,
    });
  }

  const addressSummary = data
    ? [data.address.addressLine1, data.address.town, data.address.postcode]
        .filter(Boolean)
        .join(", ")
    : "";

  const mode = data ? getViewMode(data) : "dec";

  const pageTitle =
    mode === "ar" ? "Advisory Report" : "Display Energy Certificate";

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>{pageTitle}</h1>
        {data && (
          <div className="sgds-header-row">
            <p className="ds_lede ds_!_margin-0">{addressSummary}</p>
            <PrintButton className="ds_button no-print" />
          </div>
        )}
      </div>

      {error ? (
        <>
          <p className="ds_error-message">{error}</p>
          {detail && <pre className="ds_inset-text">{detail}</pre>}
          <p className="ds_mt-4">
            <Link href="/advisory-report" className="ds_link">
              Back to search
            </Link>
          </p>
        </>
      ) : data ? (
        <div className="ds_layout ds_layout--search-results-with-sidebar">
          {/* Sidebar */}
          <aside
            className="ds_layout__sidebar"
            aria-label="Document navigation"
          >
            {mode === "dec" && (
              <ContentsNav
                title="Document navigation"
                ariaLabel="Display Energy Certificate navigation"
              >
                <ContentsNav.Item href="#dec-overview">
                  Display Energy Certificate
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-operational-rating">
                  Energy Performance Operational Rating
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-co2-emissions">
                  Total CO2 Emissions
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-previous-ratings">
                  Previous Operational Ratings
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-technical-information">
                  Technical Information
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-administrative-information">
                  Administrative Information
                </ContentsNav.Item>
              </ContentsNav>
            )}

            {mode === "ar" && (
              <ContentsNav
                title="Document navigation"
                ariaLabel="Advisory Report navigation"
              >
                <ContentsNav.Item href="#ar-overview">
                  Advisory Report
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-background">
                  Background
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-recommendations">
                  Recommendations
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-next-steps">
                  Next steps
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-glossary">
                  Glossary
                </ContentsNav.Item>
              </ContentsNav>
            )}
          </aside>

          <main
            className="ds_layout__content"
            style={{ border: "1px solid grey" }}
          >
            {mode === "dec" && (
              <section id="dec-overview">
                <DecCertificate />
              </section>
            )}

            {mode === "ar" && (
              <section id="ar-overview">
                <ArCertificate />
              </section>
            )}
          </main>
        </div>
      ) : null}
    </div>
  );
}

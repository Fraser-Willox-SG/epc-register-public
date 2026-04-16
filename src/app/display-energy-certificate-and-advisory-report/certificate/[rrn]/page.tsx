import Link from "next/link";

import { selfUrl } from "@/app/utils/self-url";
import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

import PrintButton from "@/app/components/PrintButton";

import type { ApiEnvelope, DecarSummary } from "@/types/decar";
import { isDecAr } from "@/types/decar";

import DecCertificate from "@/app/components/certificate/decar/DecCertificate";
import ArCertificate from "@/app/components/certificate/decar/ArCertificate";

type SummaryResponse = ApiEnvelope<DecarSummary>;

function getViewMode(summary: DecarSummary): "dec" | "ar" {
  return isDecAr(summary) ? "ar" : "dec";
}

export default async function DecarCertificatePage({
  params,
}: {
  params: Promise<{ rrn: string }>;
}) {
  const { rrn } = await params;

  const apiUrl = selfUrl(
    `/api/sg/assessments/${encodeURIComponent(rrn)}/certificate-summary`,
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
        if (!data) error = "Certificate not found.";
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
    ? [
        data.address.addressLine1,
        data.address.addressLine2,
        data.address.addressLine3,
        data.address.addressLine4,
        data.address.town,
        data.address.postcode,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  const mode = data ? getViewMode(data) : "dec";
  const pageTitle =
    mode === "ar" ? "Advisory Report" : "Display Energy Certificate";

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header no-print">
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
            <Link
              href="/display-energy-certificate-and-advisory-report"
              className="ds_link"
            >
              Back to search
            </Link>
          </p>
        </>
      ) : data ? (
        <div className="ds_layout ds_layout--search-results-with-sidebar">
          <aside
            className="ds_layout__sidebar no-print"
            aria-label="Document navigation"
          >
            {mode === "dec" && (
              <ContentsNav
                title="Document navigation"
                ariaLabel="Display Energy Certificate navigation"
              >
                <ContentsNav.Item href="#dec-overview">
                  <span aria-hidden="true">
                    <strong>DEC:</strong>{" "}
                  </span>
                  Display Energy Certificate
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-operational-rating">
                  <span aria-hidden="true">
                    <strong>DEC:</strong>{" "}
                  </span>
                  Energy Performance Operational Rating
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-co2-emissions">
                  <span aria-hidden="true">
                    <strong>DEC:</strong>{" "}
                  </span>
                  Total CO2 Emissions
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-previous-ratings">
                  <span aria-hidden="true">
                    <strong>DEC:</strong>{" "}
                  </span>
                  Previous Operational Ratings
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-technical-information">
                  <span aria-hidden="true">
                    <strong>DEC:</strong>{" "}
                  </span>
                  Technical Information
                </ContentsNav.Item>
                <ContentsNav.Item href="#dec-administrative-information">
                  <span aria-hidden="true">
                    <strong>DEC:</strong>{" "}
                  </span>
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
                  <span aria-hidden="true">
                    <strong>AR:</strong>{" "}
                  </span>
                  Advisory Report
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-background">
                  <span aria-hidden="true">
                    <strong>AR:</strong>{" "}
                  </span>
                  Background
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-recommendations">
                  <span aria-hidden="true">
                    <strong>AR:</strong>{" "}
                  </span>
                  Recommendations
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-next-steps">
                  <span aria-hidden="true">
                    <strong>AR:</strong>{" "}
                  </span>
                  Next steps
                </ContentsNav.Item>
                <ContentsNav.Item href="#ar-glossary">
                  <span aria-hidden="true">
                    <strong>AR:</strong>{" "}
                  </span>
                  Glossary
                </ContentsNav.Item>
              </ContentsNav>
            )}
          </aside>

          <main
            className="ds_layout__content"
            style={{ border: "1px solid grey" }}
          >
            {!isDecAr(data) && (
              <section id="dec-overview">
                <DecCertificate data={data} />
              </section>
            )}

            {isDecAr(data) && (
              <section id="ar-overview">
                <ArCertificate data={data} />
              </section>
            )}
          </main>
        </div>
      ) : null}
    </div>
  );
}

import Link from "next/link";
import { Metadata } from "next";

import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

import { selfUrl } from "@/app/utils/self-url";
import { formatIsoDateLong, isExpiredDate } from "@/app/utils/date";

import PrintButton from "@/app/components/PrintButton";
import DownloadButton from "@/app/components/DownloadButton";
import { NoCertificateResults } from "@/app/components/NoCertificateResults";

import type { ApiEnvelope, DecarSummary } from "@/types/decar";
import { isDec, isDecAr } from "@/types/decar";

import DecCertificate from "@/app/components/certificate/decar/DecCertificate";
import ArCertificate from "@/app/components/certificate/decar/ArCertificate";

export const metadata: Metadata = {
  title: "Display Energy Certificate and Advisory Report Combined Certificate",
};

type SummaryResponse = ApiEnvelope<DecarSummary>;

type FetchDecarSummaryResult = {
  data: DecarSummary | null;
  error: string | null;
  detail: string | null;
  notFound: boolean;
};

async function fetchDecarSummary(
  rrn: string,
): Promise<FetchDecarSummaryResult> {
  const apiUrl = selfUrl(
    `/api/sg/assessments/${encodeURIComponent(rrn)}/certificate-summary`,
  );

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    const bodyText = await res.text();

    if (!res.ok) {
      if (res.status === 404) {
        return {
          data: null,
          error: null,
          detail: null,
          notFound: true,
        };
      }

      console.error("[SSR] Combined DEC/AR fetch failed", {
        rrn,
        url: apiUrl,
        status: res.status,
        snippet: bodyText.slice(0, 300),
      });

      return {
        data: null,
        error: `Could not load certificate ${rrn}.`,
        detail:
          process.env.NODE_ENV !== "production"
            ? `Status ${res.status} — ${bodyText.slice(0, 300)}`
            : null,
        notFound: false,
      };
    }

    try {
      const json = JSON.parse(bodyText) as SummaryResponse;
      const data = json.data ?? null;

      if (!data) {
        return {
          data: null,
          error: null,
          detail: null,
          notFound: true,
        };
      }

      return {
        data,
        error: null,
        detail: null,
        notFound: false,
      };
    } catch (parseError) {
      console.error("[SSR] Combined DEC/AR JSON parse error", {
        rrn,
        url: apiUrl,
        body: bodyText.slice(0, 300),
      });

      return {
        data: null,
        error: `Invalid response for certificate ${rrn}.`,
        detail:
          process.env.NODE_ENV !== "production"
            ? parseError instanceof Error
              ? parseError.message
              : String(parseError)
            : null,
        notFound: false,
      };
    }
  } catch (error) {
    console.error("[SSR] Combined DEC/AR fetch failed", {
      rrn,
      url: apiUrl,
      err: error instanceof Error ? error.message : String(error),
    });

    return {
      data: null,
      error: `Could not load certificate ${rrn}.`,
      detail:
        process.env.NODE_ENV !== "production"
          ? error instanceof Error
            ? error.message
            : String(error)
          : null,
      notFound: false,
    };
  }
}

export default async function CombinedDecarCertificatePage({
  params,
}: {
  params: Promise<{ decRrn: string; arRrn: string }>;
}) {
  const { decRrn, arRrn } = await params;

  const [decResult, arResult] = await Promise.all([
    fetchDecarSummary(decRrn),
    fetchDecarSummary(arRrn),
  ]);

  const decSummary =
    decResult.data && isDec(decResult.data) ? decResult.data : null;

  const arSummary =
    arResult.data && isDecAr(arResult.data) ? arResult.data : null;

  const hasDec = Boolean(decSummary);
  const hasAr = Boolean(arSummary);

  const addressSource = decSummary ?? arSummary;

  const addressSummary = addressSource
    ? [
        addressSource.address.addressLine1,
        addressSource.address.addressLine2,
        addressSource.address.addressLine3,
        addressSource.address.addressLine4,
        addressSource.address.town,
        addressSource.address.postcode,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  const pageTitle = "Display Energy Certificate and Advisory Report";

  const hasTechnicalError = Boolean(decResult.error || arResult.error);
  const hasMissingCertificate = decResult.notFound || arResult.notFound;

  const bothMissing = !hasDec && !hasAr;

  const bothNotFound =
    bothMissing &&
    decResult.notFound &&
    arResult.notFound &&
    !hasTechnicalError;

  const isDecExpired = decSummary
    ? isExpiredDate(decSummary.dateOfExpiry)
    : false;

  const isArExpired = arSummary ? isExpiredDate(arSummary.dateOfExpiry) : false;

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header no-print">
        <h1>{pageTitle}</h1>

        {addressSource && (
          <div className="sgds-header-row">
            <p className="ds_lede ds_!_margin-0">{addressSummary}</p>

            <div className="ds_button-group ds_!_margin--0 no-print">
              <PrintButton className="ds_button ds_button--secondary" />

              <DownloadButton
                className="ds_button"
                filename={`DEC-and-AR-${decRrn}-${arRrn}.pdf`}
                pdfUrl={`/api/sg/assessments/combined/${encodeURIComponent(
                  decRrn,
                )}/${encodeURIComponent(arRrn)}/pdf-preview`}
              />
            </div>
          </div>
        )}

        {decSummary?.dateOfExpiry && isDecExpired && (
          <p className="attention-message ds_question__error-message ds_mt-1">
            This DEC expired on {formatIsoDateLong(decSummary.dateOfExpiry)} and
            is available for information only. A new certificate will be
            required for any official purposes.
          </p>
        )}

        {arSummary?.dateOfExpiry && isArExpired && (
          <p className="attention-message ds_question__error-message ds_mt-1">
            This Advisory Report expired on{" "}
            {formatIsoDateLong(arSummary.dateOfExpiry)} and is available for
            information only. A new report will be required for any official
            purposes.
          </p>
        )}
      </div>

      {bothNotFound ? (
        <NoCertificateResults
          rrn={`${decRrn} and ${arRrn}`}
          backHref="/display-energy-certificate-and-advisory-report"
        />
      ) : bothMissing ? (
        <>
          <p className="ds_error-message">
            We couldn’t retrieve the combined certificate for{" "}
            <code>{decRrn}</code> and <code>{arRrn}</code>.
          </p>

          {(decResult.error || arResult.error) && (
            <div className="ds_inset-text">
              <p className="ds_!-margin-bottom-0 ds_small">
                {decResult.error && <span>{decResult.error}</span>}

                {decResult.error && arResult.error && <br />}

                {arResult.error && <span>{arResult.error}</span>}
              </p>

              {(decResult.detail || arResult.detail) && (
                <pre className="ds_mt-2">
                  {[decResult.detail, arResult.detail]
                    .filter(Boolean)
                    .join("\n")}
                </pre>
              )}
            </div>
          )}

          <p className="ds_mt-4">
            <Link
              href="/display-energy-certificate-and-advisory-report"
              className="ds_link"
            >
              Back to search
            </Link>
          </p>
        </>
      ) : (
        <div className="ds_layout ds_layout--search-results-with-sidebar">
          <aside
            className="ds_layout__sidebar no-print"
            aria-label="Document navigation"
          >
            <ContentsNav
              title="Document navigation"
              ariaLabel="Display Energy Certificate and Advisory Report navigation"
            >
              {hasDec && (
                <>
                  <ContentsNav.Item href="#dec-overview">
                    DEC: Display Energy Certificate
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#dec-operational-rating">
                    DEC: Energy Performance Operational Rating
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#dec-co2-emissions">
                    DEC: Total CO2 Emissions
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#dec-previous-ratings">
                    DEC: Previous Operational Ratings
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#dec-technical-information">
                    DEC: Technical Information
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#dec-administrative-information">
                    DEC: Administrative Information
                  </ContentsNav.Item>
                </>
              )}

              {hasAr && (
                <>
                  <ContentsNav.Item href="#ar-overview">
                    AR: Advisory Report
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#ar-background">
                    AR: Background
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#ar-recommendations">
                    AR: Recommendations
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#ar-next-steps">
                    AR: Next steps
                  </ContentsNav.Item>

                  <ContentsNav.Item href="#ar-glossary">
                    AR: Glossary
                  </ContentsNav.Item>
                </>
              )}
            </ContentsNav>
          </aside>

          <main
            className="ds_layout__content"
            style={{ border: "1px solid grey" }}
          >
            <div id="certificate-content">
              {decSummary && (
                <section id="dec-overview">
                  <DecCertificate data={decSummary} />
                </section>
              )}

              {arSummary && (
                <section id="ar-overview">
                  <ArCertificate data={arSummary} />
                </section>
              )}

              {(hasTechnicalError || hasMissingCertificate) && (
                <div className="ds_inset-text ds_mt-4">
                  <p className="ds_small ds_!-margin-bottom-0">
                    Some related documents could not be loaded. You may still
                    print the certificates shown above.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  );
}

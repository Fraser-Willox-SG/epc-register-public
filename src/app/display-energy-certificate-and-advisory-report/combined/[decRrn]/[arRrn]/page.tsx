import Link from "next/link";
import { selfUrl } from "@/app/utils/self-url";
import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

import PrintButton from "@/app/components/PrintButton";

import type { ApiEnvelope, DecarSummary } from "@/types/decar";
import { isDec, isDecAr } from "@/types/decar";

import DecCertificate from "@/app/components/certificate/decar/DecCertificate";
import ArCertificate from "@/app/components/certificate/decar/ArCertificate";
import DownloadButton from "@/app/components/DownloadButton";

import { formatIsoDateLong, isExpiredDate } from "@/app/utils/date";

type SummaryResponse = ApiEnvelope<DecarSummary>;

// Small helper to fetch & parse a single summary
async function fetchDecarSummary(rrn: string) {
  const apiUrl = selfUrl(
    `/api/sg/assessments/${encodeURIComponent(rrn)}/certificate-summary`,
  );

  const res = await fetch(apiUrl, { cache: "no-store" });
  const bodyText = await res.text();

  if (!res.ok) {
    console.error("[SSR] Combined DEC/AR fetch failed", {
      rrn,
      url: apiUrl,
      status: res.status,
      snippet: bodyText.slice(0, 300),
    });
    return {
      data: null as DecarSummary | null,
      error: `Could not load certificate ${rrn}.`,
    };
  }

  try {
    const json = JSON.parse(bodyText) as SummaryResponse;
    return { data: json.data ?? null, error: null as string | null };
  } catch {
    console.error("[SSR] Combined DEC/AR JSON parse error", {
      rrn,
      url: apiUrl,
      body: bodyText.slice(0, 300),
    });
    return {
      data: null as DecarSummary | null,
      error: `Invalid response for certificate ${rrn}.`,
    };
  }
}

export default async function CombinedDecarCertificatePage({
  params,
}: {
  params: Promise<{ decRrn: string; arRrn: string }>;
}) {
  const { decRrn, arRrn } = await params;

  const [{ data: dec, error: decError }, { data: ar, error: arError }] =
    await Promise.all([fetchDecarSummary(decRrn), fetchDecarSummary(arRrn)]);

  const decSummary = dec && isDec(dec) ? dec : null;
  const arSummary = ar && isDecAr(ar) ? ar : null;

  const hasDec = !!decSummary;
  const hasAr = !!arSummary;

  // Choose a sensible header address – prefer DEC, then AR.
  const addressSource = hasDec ? decSummary : hasAr ? arSummary : null;
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

  const hasAnyError = !!(decError || arError);
  const bothMissing = !hasDec && !hasAr;

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
            {formatIsoDateLong(arSummary.dateOfExpiry)}
            and is available for information only. A new report will be required
            for any official purposes.
          </p>
        )}
      </div>

      {bothMissing ? (
        <>
          <p className="ds_error-message">
            We couldn’t retrieve the combined certificate for{" "}
            <code>{decRrn}</code> and <code>{arRrn}</code>.
          </p>

          {hasAnyError && (
            <div className="ds_inset-text">
              <p className="ds_!-margin-bottom-0 ds_small">
                {decError && <span>{decError}</span>}
                {decError && arError && <br />}
                {arError && <span>{arError}</span>}
              </p>
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
                    <strong>DEC:</strong> Display Energy Certificate
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#dec-operational-rating">
                    <strong>DEC:</strong> Energy Performance Operational Rating
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#dec-co2-emissions">
                    <strong>DEC:</strong> Total CO2 Emissions
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#dec-previous-ratings">
                    <strong>DEC:</strong> Previous Operational Ratings
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#dec-technical-information">
                    <strong>DEC:</strong> Technical Information
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#dec-administrative-information">
                    <strong>DEC:</strong> Administrative Information
                  </ContentsNav.Item>
                </>
              )}

              {hasAr && (
                <>
                  <ContentsNav.Item href="#ar-overview">
                    <strong>AR:</strong> Advisory Report
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#ar-background">
                    <strong>AR:</strong> Background
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#ar-recommendations">
                    <strong>AR:</strong> Recommendations
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#ar-next-steps">
                    <strong>AR:</strong> Next steps
                  </ContentsNav.Item>
                  <ContentsNav.Item href="#ar-glossary">
                    <strong>AR:</strong> Glossary
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

              {hasAnyError && (
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

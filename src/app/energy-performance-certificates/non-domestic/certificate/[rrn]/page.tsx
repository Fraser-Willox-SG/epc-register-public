import Link from "next/link";
import { Metadata } from "next";

import { selfUrl } from "@/app/utils/self-url";
import { formatIsoDateLong, isExpiredDate } from "@/app/utils/date";

import PrintButton from "@/app/components/PrintButton";
import DownloadButton from "@/app/components/DownloadButton";
import { NoCertificateResults } from "@/app/components/NoCertificateResults";

import ContentsNavNonDomRdSap from "@/app/components/certificate/epc-cepc/ContentsNavNonDomRdSap";
import CepcEpcDocument from "@/app/components/certificate/epc-cepc/CepcEpcDocument";

import type { SgNonDomesticCepcCertificateSummary } from "@/types/sg-epc-non-dom-cepc";

export const metadata: Metadata = {
  title: "Non-Domestic EPC Certificate",
};

type Summary = {
  data?: SgNonDomesticCepcCertificateSummary | null;
};

export default async function NonDomesticCertificatePage({
  params,
}: {
  params: Promise<{ rrn: string }>;
}) {
  const { rrn } = await params;

  // TEMP TEST (Not production environment)
  if (process.env.NODE_ENV !== "production" && rrn === "error-test") {
    throw new Error("Manual test error boundary");
  }

  const apiUrl = selfUrl(
    `/api/sg/assessments/${encodeURIComponent(rrn)}/certificate-summary`,
  );

  let data: SgNonDomesticCepcCertificateSummary | null = null;
  let error: string | null = null;
  let detail: string | null = null;
  let certificateNotFound = false;

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    const bodyText = await res.text();

    if (!res.ok) {
      if (res.status === 404) {
        certificateNotFound = true;
      } else {
        error = `We couldn’t retrieve the certificate for ${rrn}.`;

        if (process.env.NODE_ENV !== "production") {
          detail = `Status ${res.status} — ${bodyText.slice(0, 300)}`;
        }

        console.error("[SSR] certificate fetch failed", {
          url: apiUrl,
          status: res.status,
          snippet: bodyText.slice(0, 300),
        });
      }
    } else {
      try {
        const json = JSON.parse(bodyText) as Summary;
        data = json.data ?? null;

        if (!data) {
          certificateNotFound = true;
        }
      } catch (parseErr) {
        error = "Bad JSON from API route.";

        if (process.env.NODE_ENV !== "production") {
          detail =
            parseErr instanceof Error ? parseErr.message : String(parseErr);
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
      detail = e instanceof Error ? e.message : String(e);
    }

    console.error("[SSR] certificate fetch failed", {
      url: apiUrl,
      err: e instanceof Error ? e.message : String(e),
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
        .filter((value): value is string => Boolean(value))
        .join(", ")
    : "";

  const isExpired = data ? isExpiredDate(data.dateOfExpiry) : false;

  console.log("Non domestic epc =", data);

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header no-print">
        <h1>Energy Performance Certificate (EPC)</h1>

        {data && (
          <div className="sgds-header-row">
            <p className="ds_lede ds_!_margin-0">{addressSummary}</p>

            <div className="ds_button-group ds_!_margin--0 no-print">
              <PrintButton className="ds_button ds_button--secondary" />

              <DownloadButton
                className="ds_button"
                filename={`Non-Domestic-EPC-${rrn}.pdf`}
                pdfUrl={`/api/sg/assessments/${encodeURIComponent(
                  rrn,
                )}/non-domestic-pdf-preview`}
              />
            </div>
          </div>
        )}

        {data?.dateOfExpiry && isExpired && (
          <p className="attention-message ds_question__error-message ds_mt-1">
            This EPC expired on {formatIsoDateLong(data.dateOfExpiry)} and is
            available for information only. A new certificate will be required
            for any official purposes.
          </p>
        )}
      </div>

      {certificateNotFound ? (
        <NoCertificateResults
          rrn={rrn}
          backHref="/energy-performance-certificates/non-domestic"
        />
      ) : error ? (
        <>
          <p className="ds_error-message">{error}</p>

          {detail && <pre className="ds_inset-text">{detail}</pre>}

          <p className="ds_mt-4">
            <Link
              href="/energy-performance-certificates/non-domestic"
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
            <ContentsNavNonDomRdSap />
          </aside>

          <main
            className="ds_layout__content"
            style={{ border: "1px solid grey" }}
          >
            <CepcEpcDocument data={data} />
          </main>
        </div>
      ) : null}
    </div>
  );
}

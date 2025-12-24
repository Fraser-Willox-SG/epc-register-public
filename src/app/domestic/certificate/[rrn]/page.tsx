import Link from "next/link";

import { selfUrl } from "@/app/utils/self-url";
import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";
import PrintButton from "@/app/components/PrintButton";

import type { EpcDomSummary } from "@/types/epc-dom-hem";

import RdSapEpcDocument from "@/app/components/certificate/epc-rdsap/RdSapEpcDocument";
import HemEpcDocument from "@/app/components/certificate/epc-hem/HemEpcDocument";
import ContentsNavDomRdSap from "@/app/components/certificate/epc-rdsap/ContentsNavDomRdSap";
import ContentsNavDomHem from "@/app/components/certificate/epc-hem/ContentsNavDomHem";
import ContentsNavDomLegacy from "@/app/components/certificate/epc-legacy/ContentsNavDomLegacy";
import LegacyEpcDocument from "@/app/components/certificate/epc-legacy/LegacyEpcDocument";
// Future:
// import HemEpcDocument from "@/app/components/certificate/epc-hem/HemEpcDocument";
// import LegacyEpcDocument from "@/app/components/certificate/epc-legacy/LegacyEpcDocument";

type Summary = { data: EpcDomSummary };

// ---- page
export default async function DomesticCertificatePage({
  params,
}: {
  params: Promise<{ rrn: string }>;
}) {
  const { rrn } = await params;

  const apiUrl = selfUrl(
    `/api/ukg/assessments/${encodeURIComponent(rrn)}/summary`
  );

  let data: Summary["data"] | null = null;
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
      console.error("[SSR] certificate fetch failed", {
        url: apiUrl,
        status: res.status,
        snippet: bodyText.slice(0, 300),
      });
    } else {
      try {
        const json = JSON.parse(bodyText) as Summary;
        data = json.data ?? null;
        if (!data) error = "Certificate not found.";
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

  const addressSummary = data
    ? [data.addressLine1, data.town, data.postcode].filter(Boolean).join(", ")
    : "";

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header no-print">
        <h1>Energy Performance Certificate</h1>

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
            <Link href="/domestic" className="ds_link">
              Back to search
            </Link>
          </p>
        </>
      ) : data ? (
        <div className="ds_layout ds_layout--search-results-with-sidebar">
          {/* Sidebar */}
          <aside
            className="ds_layout__sidebar no-print"
            aria-label="Document navigation"
          >
            <ContentsNavDomRdSap />
            {/* <ContentsNavDomHem />
            <ContentsNavDomLegacy /> */}
          </aside>

          {/* Main content */}
          <main className="ds_layout__content">
            <RdSapEpcDocument data={data} />
            {/* <HemEpcDocument data={data} /> */}
            {/* <LegacyEpcDocument data={data} /> */}
          </main>
        </div>
      ) : null}
    </div>
  );
}

import Link from "next/link";

import { selfUrl } from "@/app/utils/self-url";

import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

import EpcCertificate from "@/app/components/certificate/new-epc/EpcCertificate";
import BrIntro from "@/app/components/certificate/new-epc/BrIntro";
import BrEstimatedEnergyCosts from "@/app/components/certificate/new-epc/BrEstimatedEnergyCosts";
import BrHeatRetentionSummary from "@/app/components/certificate/new-epc/BrHeatRetentionSummary";
import BrHeatRetentionImprovements from "@/app/components/certificate/new-epc/BrHeatRetentionImprovements";
import BrHeatingSystemInformation from "@/app/components/certificate/new-epc/BrHeatingSystemInformation";
import BrPotentialImprovements from "@/app/components/certificate/new-epc/BrPotentialImprovements";
import BrAboutThisDocument from "@/app/components/certificate/new-epc/BrAboutThisDocument";

import PrintButton from "@/app/components/PrintButton";

import type { EpcDomSummary } from "@/types/epc-dom";
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
        const json = JSON.parse(bodyText) as Summary;
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
    console.error("[SSR] postcode fetch failed", {
      url: apiUrl,
      err: (e as Error).message,
    });
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
              <ContentsNav.Item href="#overview">
                <strong>EPC:</strong>Energy Performance Certificate
              </ContentsNav.Item>
              <ContentsNav.Item href="#br-intro">
                <strong>Building Report:</strong> Introduction
              </ContentsNav.Item>
              <ContentsNav.Item href="#br-estimated-energy-costs">
                <strong>Building Report:</strong> Estimated Energy Costs
              </ContentsNav.Item>
              <ContentsNav.Item href="#br-heat-retention-summary">
                <strong>Building Report:</strong> Heat Retention Summary
              </ContentsNav.Item>
              {/* <ContentsNav.Item href="#br-heating-system-emissions">
                <strong>Building Report:</strong> Heating System Emissions
              </ContentsNav.Item> */}

              <ContentsNav.Item href="#br-heating-system-information">
                <strong>Building Report:</strong> Heating System Information
              </ContentsNav.Item>
              <ContentsNav.Item href="#br-potential-improvements">
                <strong>Building Report:</strong> Potential Improvements
              </ContentsNav.Item>
              <ContentsNav.Item href="#br-about-this-document">
                <strong>Building Report:</strong> About this document
              </ContentsNav.Item>
            </ContentsNav>
          </aside>

          {/* Main content (SDS grid area) */}
          <main
            className="ds_layout__content"
            style={{ border: "1px solid grey" }}
          >
            <div id="overview">
              <EpcCertificate
                address={[data.addressLine1, data.town, data.postcode]
                  .filter(Boolean)
                  .join(", ")}
                addressLine1={data.addressLine1}
                addressLine2={data.addressLine2}
                addressLine3={data.addressLine3}
                addressLine4={data.addressLine4}
                town={data.town}
                postcode={data.postcode}
                dwellingType={data.dwellingType}
                totalFloorArea={data.totalFloorArea}
                dateOfAssessment={data.dateOfAssessment}
                rrn={data.assessmentId}
                dateOfExpiry={data.dateOfExpiry}
                current={data.currentEnergyEfficiencyRating}
                currentBand={data.currentEnergyEfficiencyBand}
                potential={data.potentialEnergyEfficiencyRating}
                potentialBand={data.potentialEnergyEfficiencyBand}
              />
            </div>

            <BrIntro />
            <BrEstimatedEnergyCosts></BrEstimatedEnergyCosts>
            <BrHeatRetentionSummary></BrHeatRetentionSummary>
            <BrHeatRetentionImprovements></BrHeatRetentionImprovements>
            {/* <BrHeatingSystemEmissions></BrHeatingSystemEmissions> */}

            <BrHeatingSystemInformation></BrHeatingSystemInformation>
            <BrPotentialImprovements></BrPotentialImprovements>
            {/* <BrInformationAboutTopRecommendations></BrInformationAboutTopRecommendations> */}
            <BrAboutThisDocument></BrAboutThisDocument>
          </main>
        </div>
      ) : null}
    </div>
  );
}

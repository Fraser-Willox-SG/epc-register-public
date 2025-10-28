import Link from "next/link";
import AssessorResultsTable from "@/app/components/AssessorResultsTable";
import { selfUrl } from "@/app/utils/self-url";

import type { UKGResponse, Assessor, AdvisorType } from "@/types/find-assessor";

type SearchParams = {
  postcode?: string;
  types?: string;
  page?: string;
};

/** Mapping of UI type to UKG qualifications, until SG Qualification update **/
function qualificationsFor(t: AdvisorType): string[] {
  switch (t) {
    case "epc":
      return ["domesticRdSap"];
    case "dec":
      return ["nonDomesticDec"];
    case "section63":
      return [
        "nonDomesticNos3",
        "nonDomesticNos4",
        "nonDomesticNos5",
        "nonDomesticSp3",
        "nonDomesticCc4",
      ];
    default:
      return [];
  }
}

function parseTypes(input: string | undefined): AdvisorType[] {
  if (!input) return [];
  const valid: AdvisorType[] = ["epc", "section63", "dec"];
  return input
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter((s): s is AdvisorType => valid.includes(s as AdvisorType));
}

async function fetchAssessors(
  postcode: string,
  qualification: string
): Promise<Assessor[]> {
  const apiUrl = selfUrl(
    `/api/ukg/assessors?postcode=${encodeURIComponent(
      postcode
    )}&qualification=${encodeURIComponent(qualification)}`
  );

  console.info("[FindAdvisor] GET", apiUrl);

  const res = await fetch(apiUrl, { cache: "no-store" });
  const text = await res.text();

  if (!res.ok) {
    console.error("[FindAdvisor] Error", res.status, text);
    throw new Error(`Fetch failed: ${res.status}`);
  }

  const json = JSON.parse(text) as UKGResponse;
  const rows = json.data?.assessors ?? [];

  return rows.map((a) => ({
    schemeAssessorId: String(a.schemeAssessorId),
    firstName: a.firstName ?? "",
    lastName: a.lastName ?? "",
    registeredBy: a.registeredBy ?? null,
    contactDetails: a.contactDetails ?? null,
    qualifications: a.qualifications ?? {},
    distanceFromPostcodeInMiles:
      typeof a.distanceFromPostcodeInMiles === "number"
        ? a.distanceFromPostcodeInMiles
        : null,
    searchResultsComparisonPostcode: a.searchResultsComparisonPostcode ?? null,
  }));
}

export default async function FindAdvisorResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    postcode: rawPostcode,
    types: rawTypes,
    page: rawPage,
  } = await searchParams;
  const postcode = (rawPostcode ?? "").trim().toUpperCase();
  const types = parseTypes(rawTypes);
  const page = Math.max(parseInt(rawPage ?? "1", 10) || 1, 1);

  if (!postcode || types.length === 0) {
    return (
      <div className="ds_wrapper">
        <div className="ds_page-header">
          <h1>Find an assessor or advisor</h1>
        </div>

        <p className="ds_error-message">
          Postcode and at least one option are required.
        </p>

        <p className="ds_mt-4">
          <Link href="/find-advisor" className="ds_link">
            Back to search
          </Link>
        </p>
      </div>
    );
  }

  let rows: Assessor[] = [];
  let error: string | null = null;

  try {
    const quals = Array.from(new Set(types.flatMap(qualificationsFor)));
    const batches = await Promise.all(
      quals.map((q) => fetchAssessors(postcode, q))
    );

    // Deduplicate by schemeAssessorId, keeping the closest distance
    const dedup = new Map<string, Assessor>();
    for (const list of batches) {
      for (const a of list) {
        const existing = dedup.get(a.schemeAssessorId);
        if (!existing) {
          dedup.set(a.schemeAssessorId, a);
        } else {
          const d1 = existing.distanceFromPostcodeInMiles ?? Infinity;
          const d2 = a.distanceFromPostcodeInMiles ?? Infinity;
          if (d2 < d1) dedup.set(a.schemeAssessorId, a);
        }
      }
    }

    rows = Array.from(dedup.values()).sort((a, b) => {
      const da = a.distanceFromPostcodeInMiles ?? Infinity;
      const db = b.distanceFromPostcodeInMiles ?? Infinity;
      return da - db;
    });
  } catch {
    error = `There was a problem retrieving results for ${postcode}.`;
  }

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Assessors and advisors near {postcode}</h1>
      </div>

      <h2 className="ds_h3">
        {types
          .map((t) =>
            t === "epc"
              ? "EPC Assessors"
              : t === "section63"
              ? "Section 63 Advisors"
              : "DEC Assessors"
          )
          .join(", ")}
      </h2>

      {error ? (
        <>
          <p className="ds_error-message">{error}</p>
          <p className="ds_mt-4">
            <Link href="/find-advisor" className="ds_link">
              Back to search
            </Link>
          </p>
        </>
      ) : rows.length === 0 ? (
        <>
          <div className="ds_inset-text">
            <p>No results found for {postcode}.</p>
          </div>
          <p className="ds_mt-4">
            <Link href="/find-advisor" className="ds_link">
              Change search
            </Link>
          </p>
        </>
      ) : (
        <AssessorResultsTable
          postcode={postcode}
          rows={rows}
          page={page}
          pageSize={10}
        />
      )}
    </div>
  );
}

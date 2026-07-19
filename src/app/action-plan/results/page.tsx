import Link from "next/link";
import type { ActionPlanRow } from "@/app/components/ApResultsTable";
import { selfUrl } from "@/app/utils/self-url";
import ApResultsTable from "@/app/components/ApResultsTable";
import { Metadata } from "next";
import { NoPostcodeResults } from "@/app/components/NoPostcodeResults";

export const metadata: Metadata = {
  title: "Action Plan Postcode Results",
};

type SearchParams = { postcode?: string; page?: string };

export default async function ActionPlanResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { postcode: rawPostcode, page: rawPage } = await searchParams;
  const postcode = (rawPostcode ?? "").trim();

  if (!postcode) {
    return (
      <div className="ds_wrapper">
        <div className="ds_page-header">
          <h1>Action Plan</h1>
        </div>

        <h2 className="ds_h3">Postcode addresses</h2>
        <p className="ds_error-message">Postcode is required.</p>

        <p className="ds_mt-4">
          <Link href="/action-plan" className="ds_link">
            Back to search
          </Link>
        </p>
      </div>
    );
  }

  let rows: ActionPlanRow[] = [];
  let error: string | null = null;

  const apiUrl = selfUrl(
    `/api/sg/assessments/search?postcode=${encodeURIComponent(
      postcode,
    )}&assessmentTypes=CS63`,
  );

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    const text = await res.text();

    if (!res.ok) {
      error = `There was a problem retrieving results for ${postcode.toUpperCase()}.`;
    } else {
      const json = JSON.parse(text) as {
        data?: { assessments?: ActionPlanRow[] };
      };
      rows = json.data?.assessments ?? [];
    }
  } catch {
    error = `There was a problem contacting the service for ${postcode.toUpperCase()}.`;
  }

  const page = Math.max(parseInt(rawPage ?? "1", 10) || 1, 1);

  console.log("ActionPlan rows=", rows);

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Action Plan</h1>
      </div>

      <h2 className="ds_h3">Postcode addresses</h2>

      {error ? (
        <>
          <p className="ds_error-message">{error}</p>
          <p className="ds_mt-4">
            <Link href="/action-plan" className="ds_link">
              Back to search
            </Link>
          </p>
        </>
      ) : rows.length === 0 ? (
        <NoPostcodeResults postcode={postcode} backHref="/action-plan" />
      ) : (
        <ApResultsTable
          postcode={postcode}
          rows={rows}
          page={page}
          pageSize={7}
          resultsPath="/action-plan/results"
          certificateHref={(rrn) =>
            `/action-plan/certificate/${encodeURIComponent(rrn)}`
          }
          // epcHref={(rrn) =>
          //   `/non-domestic/certificate/${encodeURIComponent(rrn)}`
          // }
        />
      )}
    </div>
  );
}

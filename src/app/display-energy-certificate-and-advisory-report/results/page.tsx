import Link from "next/link";
import { selfUrl } from "@/app/utils/self-url";
import DecarResultsTable, {
  AssessmentRow,
} from "@/app/components/DecarResultsTable";

type SearchParams = { postcode?: string; page?: string };

export default async function AdvisoryReportsResultsPage({
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
          <h1>Energy Performance Certificate</h1>
        </div>

        <h2 className="ds_h3">Postcode addresses</h2>
        <p className="ds_error-message">Postcode is required.</p>

        <p className="ds_mt-4">
          <Link href="/domestic" className="ds_link">
            Back to search
          </Link>
        </p>
      </div>
    );
  }

  let rows: AssessmentRow[] = [];
  let error: string | null = null;

  const apiUrl = selfUrl(
    `/api/sg/assessments/search?postcode=${encodeURIComponent(
      postcode,
    )}&assessmentTypes=DEC,DEC-AR`,
  );

  try {
    const res = await fetch(apiUrl, { cache: "no-store" });
    const text = await res.text();
    if (!res.ok) {
      error = `There was a problem retrieving results for ${postcode.toUpperCase()}.`;
    } else {
      const json = JSON.parse(text) as {
        data?: { assessments?: AssessmentRow[] };
      };
      rows = json.data?.assessments ?? [];
    }
  } catch {
    error = `There was a problem contacting the service for ${postcode.toUpperCase()}.`;
  }

  const page = Math.max(parseInt(rawPage ?? "1", 10) || 1, 1);

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Display Energy Certificate (DEC) and Advisory Report (AR)</h1>
      </div>

      <h2 className="ds_h3">Energy usage for public buildings</h2>

      {error ? (
        <>
          <p className="ds_error-message">{error}</p>
          <p className="ds_mt-4">
            <Link
              href="/display-energy-certificate-and-advisory-report"
              className="ds_link"
            >
              Back to search
            </Link>
          </p>
        </>
      ) : rows.length === 0 ? (
        <>
          <div className="ds_inset-text">
            <p>No results found for {postcode.toUpperCase()}.</p>
          </div>
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
        <DecarResultsTable
          postcode={postcode}
          rows={rows}
          page={page}
          pageSize={7}
          resultsPath="/display-energy-certificate-and-advisory-report/results"
          certificateHref={(rrn) =>
            `/display-energy-certificate-and-advisory-report/certificate/${encodeURIComponent(
              rrn,
            )}`
          }
        />
      )}
    </div>
  );
}

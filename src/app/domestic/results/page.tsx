import Link from "next/link";
import { headers } from "next/headers";
import { formatAddress } from "@/lib/format";

async function absoluteUrl(path: string) {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host = h.get("x-forwarded-host") ?? h.get("host");
  return `${proto}://${host}${path}`;
}

type SearchParams = { postcode?: string };

type AssessmentRow = {
  assessmentId: string;
  status?: string;
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  town?: string | null;
  postcode?: string | null;
};

export default async function DomesticResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { postcode: rawPostcode } = await searchParams;
  const postcode = (rawPostcode ?? "").trim();

  const skeleton = (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Energy Performance Certificate</h1>
      </div>
      <h2 className="ds_h3">Postcode Addresses</h2>
      <p>
        Select an address to view the EPC
        {postcode ? (
          <>
            : <strong>{postcode.toUpperCase()}</strong>
          </>
        ) : null}
        .
      </p>
    </div>
  );

  if (!postcode) {
    return (
      <>
        {skeleton}
        <p className="ds_error-message">Postcode is required.</p>
        <p>
          <Link href="/domestic" className="ds_link">
            Back to search
          </Link>
        </p>
      </>
    );
  }

  const url = await absoluteUrl(
    `/api/ukg/search?postcode=${encodeURIComponent(postcode)}`
  );

  let rows: AssessmentRow[] = [];
  let fetchError: string | null = null;

  try {
    const res = await fetch(url, { cache: "no-store" });

    const text = await res.text();

    if (!res.ok) {
      fetchError = `There was a problem retrieving results for ${postcode.toUpperCase()}.`;
    } else {
      try {
        const json = JSON.parse(text) as {
          data?: { assessments?: AssessmentRow[] };
        };
        rows = json.data?.assessments ?? [];
        console.log("[DomesticResults] Parsed assessments:", rows);
      } catch (err) {
        console.error("[DomesticResults] Failed to parse JSON:", err);
        fetchError = `Invalid response from service for ${postcode.toUpperCase()}.`;
      }
    }
  } catch (err) {
    console.error("[DomesticResults] Network or fetch error:", err);
    fetchError = `There was a problem contacting the service for ${postcode.toUpperCase()}.`;
  }

  return (
    <>
      {skeleton}

      {fetchError && <p className="ds_error-message">{fetchError}</p>}

      {!fetchError && (
        <div className="ds_table">
          <table>
            <thead>
              <tr>
                <th scope="col">Property Address</th>
                <th scope="col">RRN</th>
                <th scope="col">View EPC Certificate</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={3}>No results found.</td>
                </tr>
              ) : (
                rows.map((r) => (
                  <tr
                    key={r.assessmentId}
                    className={
                      r.status === "EXPIRED" ? "ds_table__row--muted" : ""
                    }
                  >
                    <td>
                      {formatAddress({
                        addressLine1: r.addressLine1 ?? undefined,
                        addressLine2: r.addressLine2 ?? undefined,
                        addressLine3: r.addressLine3 ?? undefined,
                        addressLine4: r.addressLine4 ?? undefined,
                        town: r.town ?? undefined,
                        postcode: r.postcode ?? undefined,
                      })}
                    </td>
                    <td>{r.assessmentId}</td>
                    <td>
                      <Link
                        href={`/domestic/certificate/${encodeURIComponent(
                          r.assessmentId
                        )}`}
                        className="ds_link"
                      >
                        View EPC
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      <p className="ds_mt-4">
        <Link href="/domestic" className="ds_link">
          Back to search
        </Link>
      </p>
    </>
  );
}

import Link from "next/link";
import { formatAddress } from "@/lib/format";
import { formatIsoDateLong } from "../utils/date";

export type AssessmentRow = {
  assessmentId: string;
  status?: "ENTERED" | "EXPIRED" | string;
  currentEnergyEfficiencyRating?: number | null;
  currentEnergyEfficiencyBand?: string | null;
  dateOfExpiry?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  town?: string | null;
  postcode?: string | null;
};

type Props = {
  postcode: string;
  rows: AssessmentRow[];
  /** Current page (1-based) */
  page: number;
  /** Rows per page (default 5) */
  pageSize?: number;
  /** Path for pagination links, e.g. "/domestic/results" or "/non-domestic/results" */
  resultsPath: string;
  /** Build certificate link for a row (lets domestic/non-domestic differ) */
  certificateHref: (assessmentId: string) => string;
  /** Optional table caption (visually hidden) */
  caption?: string;
  ratingVariant: "energy" | "environment";
};

function makePageHref(resultsPath: string, postcode: string, page: number) {
  const p = new URLSearchParams();
  p.set("postcode", postcode);
  p.set("page", String(page));
  return `${resultsPath}?${p.toString()}`;
}

export default function EpcResultsTable({
  postcode,
  rows,
  page,
  pageSize = 5,
  resultsPath,
  certificateHref,
}: Props) {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page || 1, 1), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pageRows = rows.slice(startIndex, endIndex);

  const padding = 2;
  const from = Math.max(1, safePage - padding);
  const to = Math.min(totalPages, safePage + padding);
  const windowPages = Array.from({ length: to - from + 1 }, (_, i) => from + i);

  const showFirst = from > 1;
  const showLast = to < totalPages;

  const renderPager = () =>
    totalPages > 1 && (
      <nav
        className="ds_pagination"
        aria-label="Pagination"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <ul className="ds_pagination__list">
          <li className="ds_pagination__item">
            {safePage > 1 ? (
              <Link
                className="ds_pagination__link"
                href={makePageHref(resultsPath, postcode, safePage - 1)}
              >
                Previous
              </Link>
            ) : (
              <span className="ds_pagination__link ds_pagination__link--disabled">
                Previous
              </span>
            )}
          </li>

          {showFirst && (
            <>
              <li className="ds_pagination__item">
                <Link
                  className="ds_pagination__link"
                  href={makePageHref(resultsPath, postcode, 1)}
                >
                  1
                </Link>
              </li>
              {from > 2 && (
                <li className="ds_pagination__item">
                  <span className="ds_pagination__link" aria-hidden>
                    …
                  </span>
                </li>
              )}
            </>
          )}

          {windowPages.map((p) => (
            <li key={p} className="ds_pagination__item">
              {p === safePage ? (
                <span
                  className="ds_pagination__link ds_pagination__link--current"
                  aria-current="page"
                >
                  {p}
                </span>
              ) : (
                <Link
                  className="ds_pagination__link"
                  href={makePageHref(resultsPath, postcode, p)}
                >
                  {p}
                </Link>
              )}
            </li>
          ))}

          {showLast && (
            <>
              {to < totalPages - 1 && (
                <li className="ds_pagination__item">
                  <span className="ds_pagination__link" aria-hidden>
                    …
                  </span>
                </li>
              )}
              <li className="ds_pagination__item">
                <Link
                  className="ds_pagination__link"
                  href={makePageHref(resultsPath, postcode, totalPages)}
                >
                  {totalPages}
                </Link>
              </li>
            </>
          )}

          <li className="ds_pagination__item">
            {safePage < totalPages ? (
              <Link
                className="ds_pagination__link"
                href={makePageHref(resultsPath, postcode, safePage + 1)}
              >
                Next
              </Link>
            ) : (
              <span className="ds_pagination__link ds_pagination__link--disabled">
                Next
              </span>
            )}
          </li>
        </ul>
      </nav>
    );

  return (
    <>
      <p>
        Choose an address below to view the EPC:{" "}
        <strong>{postcode.toUpperCase()}</strong>
        {total > 0 && (
          <>
            {" "}
            —{" "}
            <span className="ds_hint-text">
              Showing <strong>{startIndex + 1}</strong>–
              <strong>{endIndex}</strong> of <strong>{total}</strong>
            </span>
          </>
        )}
        .
      </p>

      <table className="ds_table">
        <caption>List of addresses with an EPC</caption>
        <thead>
          <tr>
            <th scope="col">Property address</th>
            <th scope="col" className="table-cell-center">
              Valid Until
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((r) => {
            const isExpired = r.status === "EXPIRED";

            return (
              <tr
                key={r.assessmentId}
                className={isExpired ? "ds_table__row--muted" : undefined}
              >
                <td>
                  <div>
                    <Link
                      href={certificateHref(r.assessmentId)}
                      className="ds_link"
                    >
                      {formatAddress({
                        addressLine1: r.addressLine1 ?? undefined,
                        addressLine2: r.addressLine2 ?? undefined,
                        addressLine3: r.addressLine3 ?? undefined,
                        addressLine4: r.addressLine4 ?? undefined,
                        town: r.town ?? undefined,
                        postcode: r.postcode ?? undefined,
                      })}
                    </Link>
                  </div>
                  {isExpired && (
                    <div className="ds_hint-text">Expired certificate</div>
                  )}
                </td>
                <td className="table-cell-center">
                  {r.dateOfExpiry ? formatIsoDateLong(r.dateOfExpiry) : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {renderPager()}
    </>
  );
}

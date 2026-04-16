import Link from "next/link";
import { formatAddress } from "@/lib/format";
import { formatIsoDateLong } from "../utils/date";

export type ActionPlanRow = {
  assessmentId: string;
  typeOfAssessment?: "CS63" | string;
  status?: "ENTERED" | "EXPIRED" | "CANCELLED" | string;

  dateOfAssessment?: string | null;
  dateOfExpiry?: string | null;
  dateOfRegistration?: string | null;
  createdAt?: string | null;

  currentEnergyEfficiencyRating?: number | null;
  currentEnergyEfficiencyBand?: string | null;

  addressId?: string | null;
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  town?: string | null;
  postcode?: string | null;
};

type Props = {
  postcode: string;
  rows: ActionPlanRow[];
  page: number;
  pageSize?: number;
  /** Path for pagination links, e.g. "/action-plan/results" */
  resultsPath: string;
  /** Build certificate link for a row */
  certificateHref: (assessmentId: string) => string;
  caption?: string;
};

function makePageHref(resultsPath: string, postcode: string, page: number) {
  const p = new URLSearchParams();
  p.set("postcode", postcode);
  p.set("page", String(page));
  return `${resultsPath}?${p.toString()}`;
}

export default function ApResultsTable({
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
        Choose an address to view the Action Plan:{" "}
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
        <caption>List of addresses with an Action Plan</caption>
        <thead>
          <tr>
            <th scope="col">Property address</th>
            <th scope="col" className="table-cell-center">
              Assessment date
            </th>
            <th scope="col" className="table-cell-center">
              View Action Plan
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((r) => (
            <tr key={r.assessmentId}>
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

              <td className="table-cell-center">
                <span style={{ whiteSpace: "nowrap" }}>
                  {r.dateOfAssessment
                    ? formatIsoDateLong(r.dateOfAssessment)
                    : "—"}
                </span>
              </td>

              <td className="table-cell-center">
                <span style={{ whiteSpace: "nowrap" }}>
                  <Link
                    href={certificateHref(r.assessmentId)}
                    className="ds_link"
                  >
                    View Action Plan
                  </Link>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {renderPager()}
    </>
  );
}

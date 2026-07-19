import Link from "next/link";

import { deriveAssessorTypes, Assessor } from "@/types/find-assessor";

type Props = {
  postcode: string;
  types: string;
  rows: Assessor[];
  page: number;
  pageSize?: number;
};

function pageHref(
  basePath: string,
  postcode: string,
  types: string,
  page: number,
) {
  const p = new URLSearchParams();
  p.set("postcode", postcode);
  p.set("types", types);
  p.set("page", String(page));
  return `${basePath}?${p.toString()}`;
}

export default function AssessorResultsTable({
  postcode,
  types,
  rows,
  page,
  pageSize = 10,
}: Props) {
  const total = rows.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page || 1, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  const end = Math.min(start + pageSize, total);
  const pageRows = rows.slice(start, end);

  const renderPager = () =>
    totalPages > 1 && (
      <nav
        className="ds_pagination"
        aria-label="Pagination"
        style={{ marginTop: "1rem" }}
      >
        <ul className="ds_pagination__list">
          <li className="ds_pagination__item">
            {safePage > 1 ? (
              <Link
                className="ds_pagination__link"
                href={pageHref(
                  "/find-advisor/results",
                  postcode,
                  types,
                  safePage - 1,
                )}
              >
                Previous
              </Link>
            ) : (
              <span className="ds_pagination__link ds_pagination__link--disabled">
                Previous
              </span>
            )}
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
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
                  href={pageHref("/find-advisor/results", postcode, types, p)}
                >
                  {p}
                </Link>
              )}
            </li>
          ))}
          <li className="ds_pagination__item">
            {safePage < totalPages ? (
              <Link
                className="ds_pagination__link"
                href={pageHref(
                  "/find-advisor/results",
                  postcode,
                  types,
                  safePage + 1,
                )}
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
        View results for postcode: <strong>{postcode.toUpperCase()}</strong>
        {total > 0 && (
          <>
            {" "}
            —{" "}
            <span className="ds_hint-text">
              Showing <strong>{start + 1}</strong>–<strong>{end}</strong> of{" "}
              <strong>{total}</strong>
            </span>
          </>
        )}
        .
      </p>

      <table className="ds_table">
        <caption>
          List of assessors or advisors. Some assessors can do multiple types of
          assessments. The search results show all the types of assessment each
          assessor can do.
        </caption>
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Distance (miles)</th>
            <th scope="col">Assessor Type</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Postcode</th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((a) => {
            const name = `${a.firstName} ${a.lastName}`.trim();
            const email = a.contactDetails?.email ?? undefined;
            const tel = a.contactDetails?.telephoneNumber ?? undefined;
            const distance =
              typeof a.distanceFromPostcodeInMiles === "number"
                ? a.distanceFromPostcodeInMiles.toFixed(2)
                : undefined;
            const types = deriveAssessorTypes(a.qualifications).join(", ");
            const pc = a.searchResultsComparisonPostcode ?? "—";

            return (
              <tr key={a.schemeAssessorId}>
                <td>{name || "—"}</td>
                <td>{distance ? distance : "—"}</td>
                <td>{types || "—"}</td>
                <td>
                  {email ? (
                    <a className="ds_link" href={`mailto:${email}`}>
                      {email}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td>{tel ?? "—"}</td>
                <td>{pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {renderPager()}
    </>
  );
}

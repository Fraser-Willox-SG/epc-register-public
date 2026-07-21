import Link from "next/link";

import { deriveAssessorTypes } from "@/types/find-assessor";

import type { AdvisorType, Assessor } from "@/types/find-assessor";

type Props = {
  postcode: string;
  selectedTypes: readonly AdvisorType[];
  rows: Assessor[];
  page: number;
  pageSize?: number;
};

/**
 * Builds a pagination URL while retaining the current postcode and selected
 * search types.
 */
function pageHref(
  basePath: string,
  postcode: string,
  selectedTypes: readonly AdvisorType[],
  page: number,
): string {
  const searchParams = new URLSearchParams();

  searchParams.set("postcode", postcode);
  searchParams.set("types", selectedTypes.join(","));
  searchParams.set("page", String(page));

  return `${basePath}?${searchParams.toString()}`;
}

function formatEmailForDisplay(email: string) {
  const atIndex = email.lastIndexOf("@");

  // Return unchanged if the value does not resemble a normal email address.
  if (atIndex <= 0 || atIndex === email.length - 1) {
    return email;
  }

  return (
    <>
      {email.slice(0, atIndex + 1)}
      <wbr />
      {email.slice(atIndex + 1)}
    </>
  );
}

export default function AssessorResultsTable({
  postcode,
  selectedTypes,
  rows,
  page,
  pageSize = 10,
}: Props) {
  const totalResults = rows.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / pageSize));

  /*
   * Protect the table from invalid or out-of-range page query parameters.
   */
  const currentPage = Math.min(Math.max(page || 1, 1), totalPages);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalResults);
  const pageRows = rows.slice(startIndex, endIndex);

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    return (
      <nav
        className="ds_pagination"
        aria-label="Pagination"
        style={{ marginTop: "1rem" }}
      >
        <ul className="ds_pagination__list">
          <li className="ds_pagination__item">
            {currentPage > 1 ? (
              <Link
                className="ds_pagination__link"
                href={pageHref(
                  "/find-advisor/results",
                  postcode,
                  selectedTypes,
                  currentPage - 1,
                )}
              >
                Previous
              </Link>
            ) : (
              <span
                className="ds_pagination__link ds_pagination__link--disabled"
                aria-disabled="true"
              >
                Previous
              </span>
            )}
          </li>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <li key={pageNumber} className="ds_pagination__item">
                {pageNumber === currentPage ? (
                  <span
                    className="ds_pagination__link ds_pagination__link--current"
                    aria-current="page"
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    className="ds_pagination__link"
                    href={pageHref(
                      "/find-advisor/results",
                      postcode,
                      selectedTypes,
                      pageNumber,
                    )}
                  >
                    {pageNumber}
                  </Link>
                )}
              </li>
            ),
          )}

          <li className="ds_pagination__item">
            {currentPage < totalPages ? (
              <Link
                className="ds_pagination__link"
                href={pageHref(
                  "/find-advisor/results",
                  postcode,
                  selectedTypes,
                  currentPage + 1,
                )}
              >
                Next
              </Link>
            ) : (
              <span
                className="ds_pagination__link ds_pagination__link--disabled"
                aria-disabled="true"
              >
                Next
              </span>
            )}
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <>
      <p>
        View results for postcode: <strong>{postcode}</strong>
        {totalResults > 0 && (
          <>
            {" "}
            —{" "}
            <span className="ds_hint-text">
              Showing <strong>{startIndex + 1}</strong>–
              <strong>{endIndex}</strong> of <strong>{totalResults}</strong>
            </span>
          </>
        )}
        .
      </p>

      <table className="ds_table">
        <caption>
          List of assessors or advisors. Some assessors can carry out more than
          one type of assessment. Results show each assessor&apos;s active
          Scottish qualifications.
        </caption>

        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Distance (miles)</th>
            <th scope="col">Assessor type</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Postcode</th>
          </tr>
        </thead>

        <tbody>
          {pageRows.map((assessor) => {
            const name = `${assessor.firstName} ${assessor.lastName}`.trim();

            const email = assessor.contactDetails?.email?.trim() || undefined;

            const telephoneNumber =
              assessor.contactDetails?.telephoneNumber?.trim() || undefined;

            const distance =
              typeof assessor.distanceFromPostcodeInMiles === "number"
                ? assessor.distanceFromPostcodeInMiles.toFixed(2)
                : undefined;

            /*
             * deriveAssessorTypes only reads the Scottish qualification fields.
             * Non-Scottish UKG fields cannot affect this display.
             */
            const assessorTypes = deriveAssessorTypes(assessor.qualifications);

            const comparisonPostcode =
              assessor.searchResultsComparisonPostcode ?? "—";

            return (
              <tr key={assessor.schemeAssessorId}>
                <td>{name || "—"}</td>

                <td>{distance ?? "—"}</td>

                <td>
                  {assessorTypes.length > 0 ? (
                    <ul className="assessor-types">
                      {assessorTypes.map((assessorType) => (
                        <li key={assessorType}>{assessorType}</li>
                      ))}
                    </ul>
                  ) : (
                    "—"
                  )}
                </td>

                <td>
                  {email ? (
                    <a className="ds_link" href={`mailto:${email}`}>
                      {formatEmailForDisplay(email)}
                    </a>
                  ) : (
                    "—"
                  )}
                </td>

                <td>{telephoneNumber ?? "—"}</td>

                <td>{comparisonPostcode}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {renderPagination()}
    </>
  );
}

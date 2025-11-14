import Link from "next/link";

export type AssessmentRow = {
  assessmentId: string; // RRN
  typeOfAssessment: "DEC" | "DEC-RR" | string;
  dateOfRegistration?: string | null;
  dateOfAssessment?: string | null;
  createdAt?: string | null;
  addressId?: string | null; // may be UPRN-... or RRN-...
  addressLine1?: string | null;
  addressLine2?: string | null;
  addressLine3?: string | null;
  addressLine4?: string | null;
  town?: string | null;
  postcode?: string | null;
  status?: string | null;
};

type Props = {
  postcode: string;
  rows: AssessmentRow[];
  page: number;
  pageSize?: number;
  resultsPath: string;
  certificateHref: (rrn: string) => string;
};

function makePageHref(resultsPath: string, postcode: string, page: number) {
  const p = new URLSearchParams();
  p.set("postcode", postcode);
  p.set("page", String(page));
  return `${resultsPath}?${p.toString()}`;
}

function asDateStr(d?: string | null) {
  if (!d) return "";
  const ms = Date.parse(d);
  if (Number.isNaN(ms)) return "";
  return new Date(ms).toLocaleDateString("en-GB");
}

function bestDate(r?: AssessmentRow) {
  return r?.dateOfRegistration || r?.dateOfAssessment || r?.createdAt || null;
}

function parseUprn(addressId?: string | null) {
  if (!addressId) return undefined;
  const m = /^UPRN-(\d+)/i.exec(addressId);
  return m ? m[1] : undefined;
}

function joinNonEmpty(parts: (string | undefined | null)[], sep = ", ") {
  return parts
    .map((p) => (p ?? "").trim())
    .filter(Boolean)
    .join(sep);
}

type Grouped = {
  key: string;
  address: string;
  uprn?: string;
  dec?: AssessmentRow;
  ar?: AssessmentRow;
  createdDate?: string | null;
};

function groupByProperty(rows: AssessmentRow[]): Grouped[] {
  // Key by "addressLine1|postcode" as a stable fallback
  const map = new Map<string, Grouped>();

  const pickNewest = (a?: AssessmentRow, b?: AssessmentRow) => {
    if (!a) return b;
    if (!b) return a;
    const ta = Date.parse(bestDate(a) ?? "");
    const tb = Date.parse(bestDate(b) ?? "");
    return (Number.isNaN(tb) ? -1 : tb) >= (Number.isNaN(ta) ? -1 : ta) ? b : a;
  };

  for (const r of rows) {
    const key = `${(r.addressLine1 ?? "").trim()}|${(r.postcode ?? "").trim()}`;

    const address = joinNonEmpty(
      [
        r.addressLine1,
        r.addressLine2,
        r.addressLine3,
        r.addressLine4,
        r.town,
        r.postcode,
      ],
      ", "
    );

    const uprn = parseUprn(r.addressId);

    const g = map.get(key) ?? {
      key,
      address,
      uprn,
      dec: undefined as AssessmentRow | undefined,
      ar: undefined as AssessmentRow | undefined,
      createdDate: null as string | null,
    };

    if (r.typeOfAssessment === "DEC") g.dec = pickNewest(g.dec, r);
    if (r.typeOfAssessment === "DEC-RR") g.ar = pickNewest(g.ar, r);

    // Track newest overall date for the row
    g.createdDate = bestDate(pickNewest({ ...g.dec }, r));

    if (!g.uprn && uprn) g.uprn = uprn;

    map.set(key, g);
  }

  // Sort by address asc (change to createdDate desc if preferred)
  return Array.from(map.values()).sort((a, b) =>
    a.address.localeCompare(b.address)
  );
}

export default function DecarResultsTable({
  postcode,
  rows,
  page,
  pageSize = 7,
  resultsPath,
  certificateHref,
}: Props) {
  const grouped = groupByProperty(rows);

  const total = grouped.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page || 1, 1), totalPages);

  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, total);
  const pageRows = grouped.slice(startIndex, endIndex);

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
        style={{ margin: "1rem 0" }}
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
        Select a DEC to view a public building’s Energy Certificate, or select
        an AR to view a Public building’s Advisory Report.{" "}
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
        <thead>
          <tr>
            <th scope="col">Property Address</th>
            <th scope="col">DEC RRN</th>
            <th scope="col">AR RRN</th>
            <th scope="col">UPRN</th>
            <th scope="col">Created Date</th>
            <th scope="col">View DEC</th>
            <th scope="col">View AR</th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((g) => {
            const created = asDateStr(g.createdDate ?? undefined);
            const decRrn = g.dec?.assessmentId;
            const arRrn = g.ar?.assessmentId;

            return (
              <tr key={g.key}>
                <td>{g.address}</td>
                <td>
                  {decRrn ? (
                    <code>{decRrn}</code>
                  ) : (
                    <span className="ds_hint-text">—</span>
                  )}
                </td>
                <td>
                  {arRrn ? (
                    <code>{arRrn}</code>
                  ) : (
                    <span className="ds_hint-text">—</span>
                  )}
                </td>
                <td>{g.uprn ?? <span className="ds_hint-text">—</span>}</td>
                <td>{created || <span className="ds_hint-text">—</span>}</td>
                <td>
                  {decRrn ? (
                    <Link href={certificateHref(decRrn)} className="ds_link">
                      View DEC
                    </Link>
                  ) : (
                    <span className="ds_hint-text">—</span>
                  )}
                </td>
                <td>
                  {arRrn ? (
                    <Link href={certificateHref(arRrn)} className="ds_link">
                      View AR
                    </Link>
                  ) : (
                    <span className="ds_hint-text">—</span>
                  )}
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

import Link from "next/link";

export default function NonDomesticStartPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Non-domestic Energy Performance Certificate</h1>
      </div>

      <p>
        This section will let you search for non-domestic EPCs (CEPC) and
        related documents. We’re building this journey next.
      </p>

      <p className="ds_mt-2">
        For now, return to the{" "}
        <Link href="/" className="ds_link">
          homepage
        </Link>
        .
      </p>
    </div>
  );
}

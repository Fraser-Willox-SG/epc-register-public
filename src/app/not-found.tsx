import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <div className="ds_wrapper">
      <h1 className="ds_h1">404 - Not Found</h1>

      <p className="ds_lede">
        Sorry, but the page you were trying to view does not exist.
      </p>

      <p>This could be the result of either:</p>

      <ul>
        <li>a mistyped address</li>
        <li>an out of date link</li>
      </ul>
      <p className="ds_mt-4">
        <Link href="/" className="ds_link">
          Back to home page
        </Link>
      </p>
    </div>
  );
}

import Link from "next/link";

type NoResultsContentProps = {
  searchValue: string;
};

export function NoResultsContent({ searchValue }: NoResultsContentProps) {
  return (
    <div className="ds_inset-text">
      <p>
        No results found for <strong>{searchValue.toUpperCase()}</strong>.
      </p>

      <p>This could be because:</p>

      <ul>
        <li>The property or building may not have a certificate</li>
        <li>The certificate may have been cancelled or withdrawn.</li>
      </ul>

      <p>
        If you need to get a new certificate, please use this{" "}
        <Link href="/find-advisor" className="ds_link">
          ‘Find an assessor’
        </Link>{" "}
        link to find an assessor or advisor to help you.
      </p>

      <p>
        If you need any further help using this website, or what you expect to
        see does not appear then you can{" "}
        <a href="mailto:epcenquiries@gov.scot" className="ds_link">
          e-mail our team
        </a>
      </p>
    </div>
  );
}

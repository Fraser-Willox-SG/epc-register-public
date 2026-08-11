import Link from "next/link";

type NoPostcodeResultsContentProps = {
  postcode: string;
};

export function NoPostcodeResultsContent({
  postcode,
}: NoPostcodeResultsContentProps) {
  return (
    <div className="ds_inset-text">
      <p>
        No results found for <strong>{postcode.toUpperCase()}</strong>.
      </p>

      <p>This could be because the:</p>

      <ul>
        <li>property or building does not have a certificate</li>
        <li>certificate has been cancelled or withdrawn</li>
      </ul>

      <p>
        If you need a new certificate, go to our{" "}
        <Link href="/find-advisor" className="ds_link">
          Find an assessor or advisor
        </Link>{" "}
        section. Or{" "}
        <a href="mailto:epcenquiries@gov.scot" className="ds_link">
          email our team
        </a>{" "}
        if you need more help.
      </p>
    </div>
  );
}

import Link from "next/link";

type NoCertificateResultsContentProps = {
  rrn: string;
};

export function NoCertificateResultsContent({
  rrn,
}: NoCertificateResultsContentProps) {
  return (
    <div className="ds_inset-text">
      <p>
        No results found for <strong>{rrn.toUpperCase()}</strong>.
      </p>

      <p>
        This could be because the certificate has been cancelled or withdrawn.
      </p>

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

import Link from "next/link";
import { NoCertificateResultsContent } from "./NoCertificateResultsContent";

type NoCertificateResultsProps = {
  rrn: string;
  backHref: string;
};

export function NoCertificateResults({
  rrn,
  backHref,
}: NoCertificateResultsProps) {
  return (
    <>
      <NoCertificateResultsContent rrn={rrn} />

      <p className="ds_mt-4">
        <Link href={backHref} className="ds_link">
          Back to search
        </Link>
      </p>
    </>
  );
}

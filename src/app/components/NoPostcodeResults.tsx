import Link from "next/link";
import { NoPostcodeResultsContent } from "./NoPostcodeResultsContent";

type NoPostcodeResultsProps = {
  postcode: string;
  backHref: string;
};

export function NoPostcodeResults({
  postcode,
  backHref,
}: NoPostcodeResultsProps) {
  return (
    <>
      <NoPostcodeResultsContent postcode={postcode} />

      <p className="ds_mt-4">
        <Link href={backHref} className="ds_link">
          Back to search
        </Link>
      </p>
    </>
  );
}

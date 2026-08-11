"use client";

import ServiceError from "@/app/components/ServiceError";

export default function NonDomesticResultsError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const showDetail = process.env.NODE_ENV !== "production";

  return (
    <ServiceError
      title="We can’t display non-domestic search results right now"
      message="There’s a problem loading the results details. Please try again later."
      reference={error.digest}
      detail={showDetail ? error.message : undefined}
      backLinkHref="/energy-performance-certificates/non-domestic"
      backLinkText="Back to Non-domestic EPC search"
    />
  );
}

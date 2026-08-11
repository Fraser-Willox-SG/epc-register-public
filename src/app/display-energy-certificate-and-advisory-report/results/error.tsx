"use client";

import ServiceError from "@/app/components/ServiceError";

export default function DecArResultsError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const showDetail = process.env.NODE_ENV !== "production";

  return (
    <ServiceError
      title="We can’t display these search results right now"
      message="There’s a problem loading the search results. Please try again later."
      reference={error.digest}
      detail={showDetail ? error.message : undefined}
      backLinkHref="/display-energy-certificate-and-advisory-report"
      backLinkText="Back to search"
    />
  );
}

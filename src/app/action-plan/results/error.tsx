"use client";

import ServiceError from "@/app/components/ServiceError";

export default function ActionPlanResultsError({
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
      backLinkHref="/action-plan"
      backLinkText="Back to Action Plan search"
    />
  );
}

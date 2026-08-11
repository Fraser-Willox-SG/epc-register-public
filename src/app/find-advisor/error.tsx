"use client";

import ServiceError from "@/app/components/ServiceError";

export default function FindAdvisorError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const showDetail = process.env.NODE_ENV !== "production";

  return (
    <ServiceError
      title="We can’t display this Find Assessor or Advisor page right now"
      message="There’s a problem loading the page details. Please try again later."
      reference={error.digest}
      detail={showDetail ? error.message : undefined}
      backLinkHref="/"
      backLinkText="Back to home page"
    />
  );
}

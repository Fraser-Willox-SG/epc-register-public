"use client";

import ServiceError from "@/app/components/ServiceError";

export default function NonDomesticError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const showDetail = process.env.NODE_ENV !== "production";

  return (
    <ServiceError
      title="We can’t display this non-domestic page right now"
      message="There’s a problem loading the details. Please try again later."
      reference={error.digest}
      detail={showDetail ? error.message : undefined}
      backLinkHref="/"
      backLinkText="Back to home page"
    />
  );
}

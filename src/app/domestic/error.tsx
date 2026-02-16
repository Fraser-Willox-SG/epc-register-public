"use client";

import ServiceError from "@/app/components/ServiceError";

export default function DomesticError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const showDetail = process.env.NODE_ENV !== "production";

  return (
    <div className="ds_wrapper">
      <ServiceError
        title="We can’t display this domestic certificate right now"
        message="There’s a problem loading the certificate details. Please try again later."
        reference={error.digest}
        detail={showDetail ? error.message : undefined}
        onRetry={reset}
        backLinkHref="/domestic"
        backLinkText="Back to search"
      />
    </div>
  );
}

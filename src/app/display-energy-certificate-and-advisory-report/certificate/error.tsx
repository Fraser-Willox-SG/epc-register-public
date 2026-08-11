"use client";

import ServiceError from "@/app/components/ServiceError";

export default function DecOrArCertificateError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const showDetail = process.env.NODE_ENV !== "production";

  return (
    <ServiceError
      title="We can’t display this certificate right now"
      message="There’s a problem loading the certificate details. Please try again later."
      reference={error.digest}
      detail={showDetail ? error.message : undefined}
      backLinkHref="/display-energy-certificate-and-advisory-report"
      backLinkText="Back to search"
    />
  );
}

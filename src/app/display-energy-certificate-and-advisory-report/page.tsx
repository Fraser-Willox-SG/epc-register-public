import type { Metadata } from "next";
import DisplayEnergyCertificateAndAdvisoryReportSearchPageClient from "./DisplayEnergyCertificateAndAdvisoryReportSearchPageClient";

export const metadata: Metadata = {
  title: "Display Energy Certificate And Advisory Report Search",
};

export default function Page() {
  return <DisplayEnergyCertificateAndAdvisoryReportSearchPageClient />;
}

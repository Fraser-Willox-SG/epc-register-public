import type { Metadata } from "next";
import DomesticOrNonDomesticPageClient from "./DomesticOrNonDomesticPageClient";

export const metadata: Metadata = {
  title: "Domestic or Non-Domestic",
};

export default function Page() {
  return <DomesticOrNonDomesticPageClient />;
}

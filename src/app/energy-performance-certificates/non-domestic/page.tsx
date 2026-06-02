import type { Metadata } from "next";
import NonDomesticSearchPageClient from "./NonDomesticSearchPageClient";

export const metadata: Metadata = {
  title: "Non-Domestic EPC Search",
};

export default function Page() {
  return <NonDomesticSearchPageClient />;
}

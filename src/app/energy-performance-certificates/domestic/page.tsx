import type { Metadata } from "next";
import DomesticSearchPageClient from "./DomesticSearchPageClient";

export const metadata: Metadata = {
  title: "Domestic EPC Search",
};

export default function Page() {
  return <DomesticSearchPageClient />;
}

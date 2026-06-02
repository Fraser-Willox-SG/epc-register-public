import type { Metadata } from "next";
import FindAdvisorPageClient from "./FindAdvisorPageClient";

export const metadata: Metadata = {
  title: "Find Assessor or Advisor Search",
};

export default function Page() {
  return <FindAdvisorPageClient />;
}

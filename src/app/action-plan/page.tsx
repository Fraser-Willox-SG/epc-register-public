import type { Metadata } from "next";
import ActionPlanPageClient from "./ActionPlanPageClient";

export const metadata: Metadata = {
  title: "Action Plan Search",
};

export default function Page() {
  return <ActionPlanPageClient />;
}

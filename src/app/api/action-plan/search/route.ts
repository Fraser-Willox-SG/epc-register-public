import { NextResponse } from "next/server";
import postcodeData from "@/mocks/action-plan/postcodeData.json";
import type { ActionPlanRow } from "@/app/components/ApResultsTable";

function normalizePostcodeKey(raw: string) {
  const s = raw.trim().toUpperCase().replace(/\s+/g, "");
  if (s.length > 3) return `${s.slice(0, -3)} ${s.slice(-3)}`; // G21DU -> G2 1DU
  return s;
}

type MockAssessment = {
  actionPlanRrn: string;
  status?: string;
  uprn?: string;
  epcRrn?: string;
  assessmentDate?: string;
  address?: {
    addressLine1?: string | null;
    addressLine2?: string | null;
    addressLine3?: string | null;
    addressLine4?: string | null;
    town?: string | null;
    postcode?: string | null;
  };
};

type PostcodeBucket = { assessments: MockAssessment[] };
type PostcodeData = Record<string, PostcodeBucket>;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rawPostcode = url.searchParams.get("postcode")?.trim();

  if (!rawPostcode) {
    return NextResponse.json(
      { error: "bad_request", message: "postcode required" },
      { status: 400 }
    );
  }

  const key = normalizePostcodeKey(rawPostcode);

  const data = postcodeData as unknown as PostcodeData;
  const bucket = data[key];
  const rows = bucket?.assessments ?? [];

  const assessments: ActionPlanRow[] = rows.map(
    (r): ActionPlanRow => ({
      assessmentId: r.actionPlanRrn,
      status: r.status,

      addressLine1: r.address?.addressLine1 ?? null,
      addressLine2: r.address?.addressLine2 ?? null,
      addressLine3: r.address?.addressLine3 ?? null,
      addressLine4: r.address?.addressLine4 ?? null,
      town: r.address?.town ?? null,
      postcode: r.address?.postcode ?? key,

      // ✅ pass through to table
      epcRrn: r.epcRrn ?? null,
      assessmentDate: r.assessmentDate ?? null,
      uprn: r.uprn ?? null,
    })
  );

  return NextResponse.json({ data: { assessments } }, { status: 200 });
}

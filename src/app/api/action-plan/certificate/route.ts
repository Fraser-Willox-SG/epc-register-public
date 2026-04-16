import { NextResponse } from "next/server";
import rrnDocumentData from "@/mocks/action-plan/rrnDocumentData.json";

type ActionPlanDoc = Record<string, unknown>;
type RrnDocData = Record<string, ActionPlanDoc>;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const rrn = url.searchParams.get("rrn")?.trim();

  if (!rrn) {
    return NextResponse.json(
      { error: "bad_request", message: "rrn required" },
      { status: 400 }
    );
  }

  const data = rrnDocumentData as unknown as RrnDocData;
  const doc = data[rrn];

  if (!doc) {
    return NextResponse.json(
      { error: "not_found", message: `No Action Plan found for ${rrn}` },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: doc }, { status: 200 });
}

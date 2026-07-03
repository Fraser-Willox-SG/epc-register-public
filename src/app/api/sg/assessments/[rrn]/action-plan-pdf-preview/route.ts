import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ rrn: string }> },
) {
  const { rrn } = await ctx.params;

  const base64Url = new URL(
    `/api/sg/assessments/${encodeURIComponent(rrn)}/action-plan-pdf-base64`,
    req.url,
  );

  const res = await fetch(base64Url, { cache: "no-store" });
  const base64Pdf = await res.text();
  const pdfBuffer = Buffer.from(base64Pdf, "base64");

  return new NextResponse(pdfBuffer, {
    status: res.status,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length.toString(),
      "Content-Disposition": `inline; filename="Action-Plan-${rrn}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

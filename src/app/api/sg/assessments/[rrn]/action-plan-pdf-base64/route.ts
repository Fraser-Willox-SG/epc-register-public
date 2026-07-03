import { NextRequest, NextResponse } from "next/server";
import {
  normaliseInternalUrl,
  renderPdfFromUrl,
} from "@/app/api/sg/utils/render-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ rrn: string }> },
) {
  const { rrn } = await ctx.params;

  const pageUrl = new URL(
    `/action-plan/certificate/${encodeURIComponent(rrn)}`,
    req.url,
  );

  const pdfBuffer = await renderPdfFromUrl(normaliseInternalUrl(pageUrl));
  const base64Pdf = pdfBuffer.toString("base64");

  return new NextResponse(base64Pdf, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf; charset=iso-8859-1",
      "Content-Length": Buffer.byteLength(base64Pdf, "latin1").toString(),
      "Content-Disposition": `inline; filename="Action-Plan-${rrn}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

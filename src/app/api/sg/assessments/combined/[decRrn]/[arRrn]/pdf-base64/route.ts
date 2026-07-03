import { NextRequest, NextResponse } from "next/server";
import {
  normaliseInternalUrl,
  renderPdfFromUrl,
} from "@/app/api/sg/utils/render-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;

  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ decRrn: string; arRrn: string }> },
) {
  const { decRrn, arRrn } = await ctx.params;

  try {
    const pageUrl = new URL(
      `/display-energy-certificate-and-advisory-report/combined/${encodeURIComponent(
        decRrn,
      )}/${encodeURIComponent(arRrn)}`,
      req.url,
    );

    const pdfBuffer = await renderPdfFromUrl(normaliseInternalUrl(pageUrl));
    const base64Pdf = pdfBuffer.toString("base64");

    return new NextResponse(base64Pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf; charset=iso-8859-1",
        "Content-Length": Buffer.byteLength(base64Pdf, "latin1").toString(),
        "Content-Disposition": `inline; filename="DEC-and-AR-${decRrn}-${arRrn}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: unknown) {
    const msg = errMsg(e);

    console.error("[SG][combined-pdf-base64] route failure", {
      decRrn,
      arRrn,
      msg,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

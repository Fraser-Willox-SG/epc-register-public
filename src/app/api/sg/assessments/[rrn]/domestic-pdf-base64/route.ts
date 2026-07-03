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
  ctx: { params: Promise<{ rrn: string }> },
) {
  const { rrn } = await ctx.params;

  try {
    const certificateUrl = new URL(
      `/energy-performance-certificates/domestic/certificate/${encodeURIComponent(
        rrn,
      )}`,
      req.url,
    );

    const pdfBuffer = await renderPdfFromUrl(
      normaliseInternalUrl(certificateUrl),
    );
    const base64Pdf = pdfBuffer.toString("base64");

    return new NextResponse(base64Pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf; charset=iso-8859-1",
        "Content-Length": Buffer.byteLength(base64Pdf, "latin1").toString(),
        "Content-Disposition": `inline; filename="Domestic-EPC-${rrn}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (e: unknown) {
    const msg = errMsg(e);

    console.error("[SG][domestic-pdf-base64] route failure", {
      rrn,
      msg,
    });

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

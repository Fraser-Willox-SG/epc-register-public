import { NextRequest, NextResponse } from "next/server";

import {
  normaliseInternalUrl,
  renderPdfFromUrl,
} from "@/app/api/sg/utils/render-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.length.toString(),
        "Content-Disposition": `inline; filename="DEC-and-AR-${decRrn}-${arRrn}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("[SG][combined-pdf-preview] route failure", {
      decRrn,
      arRrn,
      message,
    });

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

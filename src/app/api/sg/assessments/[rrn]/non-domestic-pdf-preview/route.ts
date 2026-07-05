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

  try {
    const pageUrl = new URL(
      `/energy-performance-certificates/non-domestic/certificate/${encodeURIComponent(
        rrn,
      )}`,
      req.url,
    );

    const pdfBuffer = await renderPdfFromUrl(normaliseInternalUrl(pageUrl));

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.length.toString(),
        "Content-Disposition": `inline; filename="Non-Domestic-EPC-${rrn}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("[SG][non-domestic-pdf-preview] route failure", {
      rrn,
      message,
    });

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

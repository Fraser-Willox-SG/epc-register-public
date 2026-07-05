import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ rrn: string }> },
) {
  const { rrn } = await ctx.params;

  try {
    const base64Url = new URL(
      `/api/sg/assessments/${encodeURIComponent(rrn)}/domestic-pdf-base64`,
      req.url,
    );

    const base64Response = await fetch(base64Url, {
      cache: "no-store",
    });

    const base64Pdf = await base64Response.text();

    if (!base64Response.ok) {
      return new NextResponse(base64Pdf, {
        status: base64Response.status,
        headers: {
          "Content-Type": "text/plain",
          "Cache-Control": "no-store",
        },
      });
    }

    const pdfBuffer = Buffer.from(base64Pdf.trim(), "base64");

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.length.toString(),
        "Content-Disposition": `inline; filename="Domestic-EPC-${rrn}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    console.error("[SG][domestic-pdf-preview] route failure", {
      rrn,
      message,
    });

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

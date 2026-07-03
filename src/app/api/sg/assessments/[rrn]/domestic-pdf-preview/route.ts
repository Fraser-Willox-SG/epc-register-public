import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ rrn: string }> },
) {
  const { rrn } = await ctx.params;

  const base64Url = new URL(
    `/api/sg/assessments/${encodeURIComponent(rrn)}/domestic-pdf-base64`,
    req.url,
  );

  const base64Response = await fetch(base64Url, {
    cache: "no-store",
  });

  if (!base64Response.ok) {
    const errorText = await base64Response.text();

    return new NextResponse(errorText, {
      status: base64Response.status,
      headers: {
        "Content-Type":
          base64Response.headers.get("Content-Type") ?? "text/plain",
      },
    });
  }

  const base64Pdf = await base64Response.text();
  const pdfBuffer = Buffer.from(base64Pdf, "base64");

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length.toString(),
      "Content-Disposition": `inline; filename="Domestic-EPC-${rrn}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

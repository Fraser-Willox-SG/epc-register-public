import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ decRrn: string; arRrn: string }> },
) {
  const { decRrn, arRrn } = await ctx.params;

  const base64Url = new URL(
    `/api/sg/assessments/combined/${encodeURIComponent(
      decRrn,
    )}/${encodeURIComponent(arRrn)}/pdf-base64`,
    req.url,
  );

  const res = await fetch(base64Url, {
    cache: "no-store",
  });

  if (!res.ok) {
    const errorText = await res.text();

    return new NextResponse(errorText, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("Content-Type") ?? "text/plain",
      },
    });
  }

  const base64Pdf = await res.text();
  const pdfBuffer = Buffer.from(base64Pdf, "base64");

  return new NextResponse(pdfBuffer, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length.toString(),
      "Content-Disposition": `inline; filename="DEC-and-AR-${decRrn}-${arRrn}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}

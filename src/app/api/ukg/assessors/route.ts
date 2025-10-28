import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawPostcode = (searchParams.get("postcode") ?? "").toUpperCase();
  const postcode = rawPostcode.replace(/\s+/g, "");
  const qualification = searchParams.get("qualification") ?? "";

  if (!postcode || !qualification) {
    return NextResponse.json(
      { error: "postcode and qualification are required" },
      { status: 400 }
    );
  }

  const base =
    process.env.UKG_BASE?.replace(/\/$/, "") ??
    "https://api.epb-staging.digital.communities.gov.uk/api";

  // Build the exact upstream URL you tested in Postman
  const upstreamUrl = `${base}/assessors?postcode=${encodeURIComponent(
    postcode
  )}&qualification=${encodeURIComponent(qualification)}`;

  // Optional: OAuth client credentials, if staging requires it
  const tokenUrl = process.env.UKG_OAUTH_TOKEN_URL;
  const clientId = process.env.UKG_OAUTH_CLIENT_ID;
  const clientSecret = process.env.UKG_OAUTH_CLIENT_SECRET;

  let authHeader: string | undefined;
  if (tokenUrl && clientId && clientSecret) {
    try {
      const tokenRes = await fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
        cache: "no-store",
      });
      if (!tokenRes.ok) {
        const body = await tokenRes.text();
        console.error("[UKG OAuth] failed:", tokenRes.status, body);
      } else {
        const tokenJson = await tokenRes.json();
        authHeader = `Bearer ${tokenJson.access_token}`;
      }
    } catch (e) {
      console.error("[UKG OAuth] error:", e);
    }
  }

  console.info("[UKG] GET", upstreamUrl);

  const upstream = await fetch(upstreamUrl, {
    headers: authHeader ? { Authorization: authHeader } : undefined,
    cache: "no-store",
  });

  const text = await upstream.text(); // pass through as-is
  return new NextResponse(text, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
    },
  });
}

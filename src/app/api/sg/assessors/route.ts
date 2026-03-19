import { NextRequest, NextResponse } from "next/server";

const UKG_BASE = process.env.UKG_BASE!;
const TOKEN_URL = process.env.UKG_OAUTH_TOKEN_URL!;
const CLIENT_ID = process.env.UKG_OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.UKG_OAUTH_CLIENT_SECRET!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawPostcode = (searchParams.get("postcode") ?? "").toUpperCase();
  const postcode = rawPostcode.replace(/\s+/g, "");
  const qualification = (searchParams.get("qualification") ?? "").trim();

  if (!postcode || !qualification) {
    return NextResponse.json(
      { error: "postcode and qualification are required" },
      { status: 400 },
    );
  }

  const base = UKG_BASE.replace(/\/$/, "");
  const upstreamUrl = `${base}/scotland/assessors?postcode=${encodeURIComponent(
    postcode,
  )}&qualification=${encodeURIComponent(qualification)}`;

  let authHeader: string | undefined;

  try {
    const tokenRes = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      cache: "no-store",
    });

    if (!tokenRes.ok) {
      const body = await tokenRes.text();
      console.error("[SG OAuth] failed:", tokenRes.status, body);

      return NextResponse.json(
        { error: "Failed to authenticate with upstream service" },
        { status: 502 },
      );
    }

    const tokenJson = await tokenRes.json();
    authHeader = `Bearer ${tokenJson.access_token}`;
  } catch (e) {
    console.error("[SG OAuth] error:", e);

    return NextResponse.json(
      { error: "Error authenticating with upstream service" },
      { status: 502 },
    );
  }

  console.info("[SG] GET", upstreamUrl);

  try {
    const upstream = await fetch(upstreamUrl, {
      headers: authHeader ? { Authorization: authHeader } : undefined,
      cache: "no-store",
    });

    const text = await upstream.text();

    return new NextResponse(text, {
      status: upstream.status,
      headers: {
        "content-type":
          upstream.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (e) {
    console.error("[SG] upstream fetch error:", e);

    return NextResponse.json(
      { error: "Error retrieving assessor data from upstream service" },
      { status: 502 },
    );
  }
}

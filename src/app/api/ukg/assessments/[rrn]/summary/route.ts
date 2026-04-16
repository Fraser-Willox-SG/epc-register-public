// src/app/api/ukg/assessments/[rrn]/summary/route.ts
import { NextRequest, NextResponse } from "next/server";

const UKG_BASE = process.env.UKG_BASE!;
const TOKEN_URL = process.env.UKG_OAUTH_TOKEN_URL!;
const CLIENT_ID = process.env.UKG_OAUTH_CLIENT_ID!;
const CLIENT_SECRET = process.env.UKG_OAUTH_CLIENT_SECRET!;

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  try {
    return JSON.stringify(e);
  } catch {
    return String(e);
  }
}

async function getAccessToken(): Promise<string> {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64");
  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
    cache: "no-store",
  });

  const txt = await res.text();
  if (!res.ok) {
    console.error("[UKG][oauth] failed", {
      status: res.status,
      body: txt.slice(0, 600),
    });
    throw new Error(`OAuth error (${res.status})`);
  }
  const { access_token } = JSON.parse(txt) as { access_token: string };
  return access_token;
}

export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ rrn: string }> } // ← note Promise here
) {
  const { rrn } = await ctx.params;

  try {
    console.log("[UKG][summary] fetching", { rrn, base: UKG_BASE });

    const token = await getAccessToken();
    const upstream = await fetch(
      `${UKG_BASE}/assessments/${encodeURIComponent(rrn)}/summary`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        cache: "no-store",
      }
    );

    const txt = await upstream.text();

    if (!upstream.ok) {
      console.error("[UKG][summary] upstream error", {
        rrn,
        status: upstream.status,
        body: txt.slice(0, 800),
      });
      return NextResponse.json(
        {
          error: "Upstream error",
          status: upstream.status,
          body: txt.slice(0, 800),
        },
        { status: upstream.status }
      );
    }

    console.log("[UKG][summary] success", { rrn, bytes: txt.length });
    return new NextResponse(txt, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const msg = errMsg(e);
    console.error("[UKG][summary] route failure", { rrn, msg });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

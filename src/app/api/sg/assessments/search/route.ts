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

function hasListParam(q: string) {
  // Handles both encoded and unencoded forms:
  // ?List%5B%22SAP%22%5D
  // ?List["SAP"]
  return /\bList%5B.*?%5D\b/.test(q) || /\bList\[[^\]]+\]/.test(q);
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
    console.error("[SG][oauth] failed", {
      status: res.status,
      body: txt.slice(0, 600),
    });
    throw new Error(`OAuth error (${res.status})`);
  }

  const parsed = JSON.parse(txt) as { access_token?: unknown };

  if (
    typeof parsed.access_token !== "string" ||
    parsed.access_token.length === 0
  ) {
    console.error("[SG][oauth] missing access_token", {
      body: txt.slice(0, 600),
    });
    throw new Error("OAuth response missing access_token");
  }

  return parsed.access_token;
}

export async function GET(req: NextRequest) {
  try {
    const incoming = new URL(req.url);
    const postcode = incoming.searchParams.get("postcode")?.trim();

    if (!postcode) {
      return NextResponse.json(
        { error: "bad_request", message: "postcode required" },
        { status: 400 },
      );
    }

    const upstream = new URL(`${UKG_BASE}/scotland/assessments/search`);

    // Preserve incoming query exactly so List["..."] survives
    if (incoming.search && incoming.search !== "?") {
      upstream.search = incoming.search;
    } else {
      upstream.search = `?postcode=${encodeURIComponent(postcode)}`;
    }

    // Optional default if caller doesn't provide List[...]
    if (!hasListParam(upstream.search)) {
      const sep = upstream.search ? "&" : "?";
      upstream.search = `${upstream.search}${sep}${'List["RdSap","SAP"]'}`;
    }

    console.log("[SG][search] fetching", {
      postcode,
      upstream: upstream.toString(),
    });

    const token = await getAccessToken();

    const res = await fetch(upstream.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const txt = await res.text();

    if (!res.ok) {
      console.error("[SG][search] upstream error", {
        postcode,
        status: res.status,
        body: txt.slice(0, 800),
      });

      return NextResponse.json(
        {
          error: "Upstream error",
          status: res.status,
          body: txt.slice(0, 800),
        },
        { status: res.status },
      );
    }

    console.log("[SG][search] success", {
      postcode,
      bytes: txt.length,
    });

    return new NextResponse(txt, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e: unknown) {
    const msg = errMsg(e);
    console.error("[SG][search] route failure", { msg });
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getAccessToken, invalidateToken } from "@/server/ukgAuth";

function normalizeBase(raw?: string) {
  if (!raw) return null;
  let b = raw.trim();
  if (b.endsWith("/")) b = b.slice(0, -1);
  if (!/\/api$/.test(b)) b = `${b}/api`;
  return b;
}

function hasListParam(q: string) {
  // Handles both encoded (?List%5B%22SAP%22%5D) and unencoded (?List["SAP"])
  return /\bList%5B.*?%5D\b/.test(q) || /\bList\[[^\]]+\]/.test(q);
}

function safeJson(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  const raw = process.env.UKG_BASE; // read at request time
  if (!raw || raw.trim() === "") {
    console.error("[UKG] missing UKG_BASE at runtime");
    return NextResponse.json(
      { error: "server_misconfigured", message: "UKG_BASE env var missing" },
      { status: 500 }
    );
  }

  const UKG_BASE = normalizeBase(raw); // now it’s safe to normalize

  const incoming = new URL(req.url);
  const postcode = incoming.searchParams.get("postcode")?.trim();

  if (!postcode) {
    return NextResponse.json(
      { error: "bad_request", message: "postcode required" },
      { status: 400 }
    );
  }

  // Build upstream URL, preserve any caller query (so List["..."] survives)
  const upstream = new URL(`${UKG_BASE}/assessments/search`);
  if (incoming.search && incoming.search !== "?") {
    upstream.search = incoming.search;
  } else {
    upstream.search = `?postcode=${encodeURIComponent(postcode)}`;
  }
  // Default to domestic EPCs unless List[...] provided
  if (!hasListParam(upstream.search)) {
    const sep = upstream.search ? "&" : "?";
    upstream.search = `${upstream.search}${sep}${'List["SAP"]'}`;
  }

  async function callOnce() {
    const token = await getAccessToken();
    const res = await fetch(upstream.toString(), {
      headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const text = await res.text();
    return { res, text };
  }

  try {
    let { res, text } = await callOnce();

    if (res.status === 401) {
      console.warn(
        "[UKG proxy] 401 from upstream; refreshing token and retrying once…"
      );
      invalidateToken();
      ({ res, text } = await callOnce());
    }

    if (!res.ok) {
      console.error(
        "[UKG proxy] Upstream error",
        res.status,
        text.slice(0, 200)
      );
      return NextResponse.json(
        { error: "upstream_error", status: res.status, body: safeJson(text) },
        { status: res.status }
      );
    }

    return NextResponse.json(safeJson(text) ?? { data: { assessments: [] } }, {
      status: 200,
    });
  } catch (err) {
    console.error("[UKG proxy] Failure:", err);
    return NextResponse.json(
      { error: "network_error", message: String(err) },
      { status: 502 }
    );
  }
}

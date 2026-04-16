let cached: { accessToken: string; expiresAtSec: number } | null = null;

const nowSec = () => Math.floor(Date.now() / 1000);

function basicHeader(id: string, secret: string) {
  // Do not trim; some credentials can include whitespace.
  const raw = `${id}:${secret}`;
  const b64 = Buffer.from(raw, "utf8").toString("base64");
  return `Basic ${b64}`;
}

export async function getAccessToken(): Promise<string> {
  const TOKEN_URL = process.env.UKG_OAUTH_TOKEN_URL;
  const CLIENT_ID = process.env.UKG_OAUTH_CLIENT_ID;
  const CLIENT_SECRET = process.env.UKG_OAUTH_CLIENT_SECRET;

  if (!TOKEN_URL || !CLIENT_ID || !CLIENT_SECRET) {
    throw new Error(
      "Missing OAuth env vars: UKG_OAUTH_TOKEN_URL, UKG_OAUTH_CLIENT_ID, UKG_OAUTH_CLIENT_SECRET"
    );
  }

  // Reuse if >60s remaining
  if (cached && cached.expiresAtSec > nowSec() + 60) {
    return cached.accessToken;
  }

  const form = new URLSearchParams();
  form.set("grant_type", "client_credentials"); // scope omitted per guide

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: basicHeader(CLIENT_ID, CLIENT_SECRET),
    },
    body: form.toString(),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Token fetch failed ${res.status}: ${text}`);
  }

  const json = (await res.json()) as {
    access_token: string;
    expires_in?: number;
  };
  const ttl = typeof json.expires_in === "number" ? json.expires_in : 900; // default 15m
  cached = { accessToken: json.access_token, expiresAtSec: nowSec() + ttl };
  return json.access_token;
}

export function invalidateToken() {
  cached = null;
}

export function formatIsoDateLong(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso; // fallback
  const date = new Date(Date.UTC(y, m - 1, d)); // avoid TZ shifts
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type StarRatingProps = {
  value: number | null | undefined;
  outOf?: 5;
  naText?: string;
  colorize?: boolean;
  size?: number;
};

const STAR_LABELS = [
  "Very poor",
  "Poor",
  "Average",
  "Good",
  "Very good",
] as const;

const STAR_FILL_BY_RATING: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: "#e57373",
  2: "#f0a36b",
  3: "#f6cf6b",
  4: "#9fcb8f",
  5: "#4fa46f",
};

function Star({
  filled,
  fill,
  size,
}: {
  filled: boolean;
  fill: string;
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      style={{ display: "block" }}
    >
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill={filled ? fill : "transparent"}
        stroke="#111827"
        strokeWidth={1.75}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StarRating({
  value,
  outOf = 5,
  naText = "—",
  colorize = true,
  size = 24,
}: StarRatingProps) {
  if (value === null || value === undefined) {
    return <span>{naText}</span>;
  }

  const n = Math.max(0, Math.min(outOf, Math.round(value))) as
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5;

  const label = n >= 1 ? STAR_LABELS[n - 1] : "Not rated";

  const fill =
    colorize && n >= 1
      ? STAR_FILL_BY_RATING[n as 1 | 2 | 3 | 4 | 5]
      : "currentColor";

  const accessibleLabel = `${n} out of ${outOf} stars${n ? `, ${label}` : ""}`;

  return (
    <span
      role="img"
      aria-label={accessibleLabel}
      title={`${n}/${outOf}`}
      style={{ display: "inline-flex", gap: 2, verticalAlign: "middle" }}
    >
      {Array.from({ length: outOf }, (_, i) => (
        <Star key={i} filled={i < n} fill={fill} size={size} />
      ))}
    </span>
  );
}

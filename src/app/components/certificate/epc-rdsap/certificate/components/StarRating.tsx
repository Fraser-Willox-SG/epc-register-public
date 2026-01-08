type StarRatingProps = {
  value: number | null | undefined; // 0–5, null/undefined => —
  outOf?: 5;
  naText?: string; // default "—"
};

export default function StarRating({
  value,
  outOf = 5,
  naText = "—",
}: StarRatingProps) {
  if (value === null || value === undefined) return <span>{naText}</span>;

  const n = Math.max(0, Math.min(outOf, Math.round(value)));

  const filled = "★".repeat(n);
  const empty = "☆".repeat(outOf - n);
  const text = `${filled}${empty}`;

  return (
    <span aria-label={`${n} out of ${outOf} stars`} title={`${n}/${outOf}`}>
      {text}
    </span>
  );
}

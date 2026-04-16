type ImpactLevel = "LOW" | "MEDIUM" | "HIGH";

type Props = {
  value?: ImpactLevel | string | null;
};

const IMPACT_STYLES: Record<ImpactLevel, { background: string; text: string }> =
  {
    LOW: {
      background: "#0b6e3c",
      text: "#ffffff",
    },
    MEDIUM: {
      background: "#f5c542",
      text: "#ffffff",
    },
    HIGH: {
      background: "#d4351c",
      text: "#ffffff",
    },
  };

export default function EpcPill({ value }: Props) {
  if (!value) return <span>—</span>;

  const normalised = String(value).toUpperCase() as ImpactLevel;
  const style = IMPACT_STYLES[normalised];

  if (!style) {
    return <span>{value}</span>;
  }

  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 10px",
        borderRadius: "999px",
        fontWeight: 700,
        fontSize: "1rem",
        lineHeight: 1.4,
        backgroundColor: style.background,
        color: style.text,
        whiteSpace: "nowrap",

        /* SVG text stroke equivalent */
        textShadow: `
          -1px -1px 0 #111827,
          1px -1px 0 #111827,
          -1px  1px 0 #111827,
          1px  1px 0 #111827,
          0    0    2px #111827
        `,
      }}
      aria-label={`Potential impact ${normalised.toLowerCase()}`}
    >
      {normalised}
    </span>
  );
}

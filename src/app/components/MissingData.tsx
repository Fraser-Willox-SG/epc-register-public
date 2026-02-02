export default function MissingData({
  label = "MISSING DATA FROM API",
}: {
  label?: string;
}) {
  return <span style={{ color: "#d4351c", fontWeight: "bold" }}>{label}</span>;
}

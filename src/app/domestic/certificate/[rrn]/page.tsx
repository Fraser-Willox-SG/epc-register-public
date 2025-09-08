export default async function DomesticCertificatePlaceholder({
  params,
}: {
  params: Promise<{ rrn: string }>;
}) {
  const { rrn } = await params;

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Energy Performance Certificate</h1>
      </div>
      <p>Domestic certificate page coming soon.</p>
      <p>
        RRN: <strong>{rrn}</strong>
      </p>
    </div>
  );
}

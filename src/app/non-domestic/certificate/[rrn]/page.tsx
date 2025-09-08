export default async function NonDomesticCertificatePlaceholder({
  params,
}: {
  params: Promise<{ rrn: string }>;
}) {
  const { rrn } = await params;

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Non-domestic Energy Performance Certificate</h1>
      </div>
      <p>Non-domestic certificate page coming soon.</p>
      <p>
        RRN: <strong>{rrn}</strong>
      </p>
    </div>
  );
}

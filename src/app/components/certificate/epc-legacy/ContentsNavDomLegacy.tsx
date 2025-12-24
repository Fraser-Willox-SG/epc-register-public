import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomLegacy() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#summary">
        <strong>EPC:</strong> Certificate summary
      </ContentsNav.Item>
      <ContentsNav.Item href="#energy-report">
        <strong>Energy Report:</strong> Estimated costs &amp; emissions
      </ContentsNav.Item>
      <ContentsNav.Item href="#features">
        <strong>Energy Report:</strong> Summary of features
      </ContentsNav.Item>
      <ContentsNav.Item href="#recommendations">
        <strong>Energy Report:</strong> Recommendations
      </ContentsNav.Item>
    </ContentsNav>
  );
}

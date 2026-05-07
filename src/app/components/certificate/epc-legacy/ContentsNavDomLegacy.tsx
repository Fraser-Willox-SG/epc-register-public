import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomLegacy() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#summary">
        EPC: Certificate summary
      </ContentsNav.Item>
      <ContentsNav.Item href="#energy-report">
        Energy Report: Estimated costs &amp; emissions
      </ContentsNav.Item>
      <ContentsNav.Item href="#features">
        Energy Report: Summary of features
      </ContentsNav.Item>
      <ContentsNav.Item href="#recommendations">
        Energy Report: Recommendations
      </ContentsNav.Item>
    </ContentsNav>
  );
}

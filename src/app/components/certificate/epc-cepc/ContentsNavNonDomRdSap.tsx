import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomRdSap() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#certificate-overview">
        <strong>EPC:</strong> Energy Performance Certificate
      </ContentsNav.Item>

      <ContentsNav.Item href="#background">
        <strong>Report:</strong> Background
      </ContentsNav.Item>

      <ContentsNav.Item href="#recommendations">
        <strong>Report:</strong> Recommendations
      </ContentsNav.Item>

      <ContentsNav.Item href="#payback-period">
        <strong>Report:</strong> Payback Period
      </ContentsNav.Item>

      <ContentsNav.Item href="#about-this-document">
        <strong>Report:</strong> About this document
      </ContentsNav.Item>
    </ContentsNav>
  );
}

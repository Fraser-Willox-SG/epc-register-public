import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomRdSap() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#certificate-overview">
        <strong>EPC:</strong> Energy Performance Certificate
      </ContentsNav.Item>

      <ContentsNav.Item href="#performance-features-and-context">
        <strong>Report:</strong> Features and context
      </ContentsNav.Item>

      <ContentsNav.Item href="#costs-and-recommendations">
        <strong>Report:</strong> Costs and recommendations
      </ContentsNav.Item>

      <ContentsNav.Item href="#measures-advice-and-heat-demand">
        <strong>Report:</strong> Measures advice and heat demand
      </ContentsNav.Item>

      <ContentsNav.Item href="#about-this-document">
        <strong>Report:</strong> About this document
      </ContentsNav.Item>

      <ContentsNav.Item href="#advice-and-support">
        <strong>Report:</strong> Advice and support
      </ContentsNav.Item>
    </ContentsNav>
  );
}

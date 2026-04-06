import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomRdSap() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#overview">
        <span aria-hidden="true">
          <strong>EPC:</strong>{" "}
        </span>
        Energy Performance Certificate
      </ContentsNav.Item>

      <ContentsNav.Item href="#performance-features-and-context">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        Features and context
      </ContentsNav.Item>

      <ContentsNav.Item href="#costs-and-recommendations">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        Costs and recommendations
      </ContentsNav.Item>

      <ContentsNav.Item href="#measures-advice-and-heat-demand">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        Measures advice and heat demand
      </ContentsNav.Item>

      <ContentsNav.Item href="#about-this-document">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        About this document
      </ContentsNav.Item>
    </ContentsNav>
  );
}

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

      <ContentsNav.Item href="#report-background">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        Background
      </ContentsNav.Item>

      <ContentsNav.Item href="#report-recommendations">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        Recommendations
      </ContentsNav.Item>

      <ContentsNav.Item href="#report-payback">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        Payback Period
      </ContentsNav.Item>

      <ContentsNav.Item href="#report-about">
        <span aria-hidden="true">
          <strong>Report:</strong>{" "}
        </span>
        About this document
      </ContentsNav.Item>
    </ContentsNav>
  );
}

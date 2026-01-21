import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomRdSap() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#overview">
        <strong>EPC:</strong> Energy Performance Certificate
      </ContentsNav.Item>

      <ContentsNav.Item href="#report-background">
        <strong>Report:</strong> Background
      </ContentsNav.Item>

      <ContentsNav.Item href="#report-recommendations">
        <strong>Report:</strong> Recommendations
      </ContentsNav.Item>

      <ContentsNav.Item href="#report-payback">
        <strong>Report:</strong> Payback Period
      </ContentsNav.Item>

      <ContentsNav.Item href="#report-about">
        <strong>Report:</strong> About this document
      </ContentsNav.Item>
    </ContentsNav>
  );
}

import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomHem() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#overview">
        EPC: Energy Performance Certificate
      </ContentsNav.Item>
      <ContentsNav.Item href="#br-intro">
        Building Report: Introduction
      </ContentsNav.Item>

      {/* HEM-specific sections go here */}
      <ContentsNav.Item href="#br-hem-summary">
        Building Report: Heat &amp; Energy Model summary
      </ContentsNav.Item>

      <ContentsNav.Item href="#hem-br-potential-improvements">
        Building Report: Potential Improvements
      </ContentsNav.Item>
      <ContentsNav.Item href="#br-about-this-document">
        Building Report: About this document
      </ContentsNav.Item>
    </ContentsNav>
  );
}

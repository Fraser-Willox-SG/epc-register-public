import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

export default function ContentsNavDomHem() {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#overview">
        <strong>EPC:</strong> Energy Performance Certificate
      </ContentsNav.Item>
      <ContentsNav.Item href="#br-intro">
        <strong>Building Report:</strong> Introduction
      </ContentsNav.Item>

      {/* HEM-specific sections go here */}
      <ContentsNav.Item href="#br-hem-summary">
        <strong>Building Report:</strong> Heat &amp; Energy Model summary
      </ContentsNav.Item>

      <ContentsNav.Item href="#hem-br-potential-improvements">
        <strong>Building Report:</strong> Potential Improvements
      </ContentsNav.Item>
      <ContentsNav.Item href="#br-about-this-document">
        <strong>Building Report:</strong> About this document
      </ContentsNav.Item>
    </ContentsNav>
  );
}

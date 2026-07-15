import ContentsNav from "@scottish-government/designsystem-react/dist/components/ContentsNav/ContentsNav";

type Props = {
  showGreenDeal?: boolean;
};

export default function ContentsNavDomRdSap({ showGreenDeal = false }: Props) {
  return (
    <ContentsNav title="Document navigation" ariaLabel="Document navigation">
      <ContentsNav.Item href="#overview">
        <span aria-hidden="true">EPC: </span>
        Energy Performance Certificate
      </ContentsNav.Item>

      <ContentsNav.Item href="#summary-of-the-energy-performance">
        <span aria-hidden="true">Report: </span>
        Summary of the energy performance related features of this home
      </ContentsNav.Item>

      <ContentsNav.Item href="#costs-and-recommendations">
        <span aria-hidden="true">Report: </span>
        Costs and recommendations
      </ContentsNav.Item>

      <ContentsNav.Item href="#measures-advice-and-heat-demand">
        <span aria-hidden="true">Report: </span>
        Measures advice and heat demand
      </ContentsNav.Item>

      <ContentsNav.Item href="#about-this-document">
        <span aria-hidden="true">Report: </span>
        About this document
      </ContentsNav.Item>

      {showGreenDeal && (
        <ContentsNav.Item href="#green-deal">Green Deal Plan</ContentsNav.Item>
      )}
    </ContentsNav>
  );
}

import MissingData from "@/app/components/MissingData";
import BandBadge from "../../BandBadge";
import type { SgNonDomesticCepcCertificateSummary } from "@/types/sg-epc-non-dom-cepc";
import { Band } from "@/app/utils/epc";

type Props = {
  data?: SgNonDomesticCepcCertificateSummary;
};

export default function CepcPaybackAndSavingsExplained({ data }: Props) {
  return (
    <section id="report-payback">
      <div className="cert-section bg-grey print-no-break">
        <h2>Payback period</h2>

        <p>
          Payback periods are based upon data provided by Good Practice Guides
          and Carbon Trust energy survey reports and are average figures
          calculated using a simple payback method. It is assumed that the
          source data is correct and accurate, using up to date information.
        </p>

        <p>
          They should be considered indicative. The figures have been calculated
          as an average across a range of buildings and may therefore differ
          from the actual payback period for the building being assessed. It is
          recommended that the cost effectiveness and payback of each suggested
          measure be further investigated before making any decision on how to
          improve the energy efficiency of your building.
        </p>
      </div>
      <div className="cert-section print-no-break">
        <h2>Carbon Impact</h2>

        <p>
          Each measure is assigned a low, medium or high potential impact on the
          energy efficiency of your building. This relates to their potential to
          reduce carbon dioxide emissions arising from energy used in your
          building.
        </p>

        <p>
          For automatically generated recommendations, the carbon impact is
          determined by the approved software but may be adjusted by your
          assessor based upon their knowledge of the building. The impact of
          ‘other recommendations’ is determined by the assessor.
        </p>
      </div>
      <div className="cert-section bg-blue print-no-break">
        <h2>Comparative assessment – Feed-in Tariff</h2>

        <p>
          Eligibility for standard tariff for solar PV under the DECC Feed-in
          Tariff initiative is contingent on a minimum energy efficiency
          requirement being met. This requires a building to have an EPC band of
          D or better. Further information can be found at{" "}
          <a
            href="https://www.ofgem.gov.uk/environmental-and-social-schemes/feed-tariffs-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.ofgem.gov.uk/environmental-and-social-schemes/feed-tariffs-fit
          </a>
          . This requirement is based upon the means of determining EPC band
          which is used in England &amp; Wales.
        </p>

        <p>
          <strong>
            If calculated using this process, but using Scottish climate data,
            your building would currently have an EPC band{" "}
            {data?.currentEnergyEfficiencyBand &&
            data.currentEnergyEfficiencyRating != null ? (
              <>
                <BandBadge
                  band={data.currentEnergyEfficiencyBand.toUpperCase() as Band}
                  title={`EPC band ${data.currentEnergyEfficiencyBand.toUpperCase()}`}
                />{" "}
                (and a rating of {data.currentEnergyEfficiencyRating}).
              </>
            ) : (
              <MissingData />
            )}
          </strong>
        </p>
      </div>
      <div className="cert-section bg-grey print-no-break">
        <h2>
          Requirements under section 63 of the Climate Change (Scotland) Act
        </h2>

        <p>
          From 1 September 2016, regulations require the assessment and
          improvement of existing non-domestic buildings with an area of more
          than 1,000 m². See{" "}
          <a href="https://www.gov.scot/section63">www.gov.scot/section63</a>{" "}
          for information.
        </p>

        <p>
          This building is subject to these regulations as it exceeds 1,000 m²
          in area. However, buildings with energy performance equivalent to that
          set by the 2002 building regulations are exempt. This EPC assessment
          shows that your building meets the 2002 standard and no further action
          is needed to comply with these regulations.
        </p>
      </div>
    </section>
  );
}

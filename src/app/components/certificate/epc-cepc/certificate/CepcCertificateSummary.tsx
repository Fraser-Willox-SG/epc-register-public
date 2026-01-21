import type { EpcNonDomCepcDocument } from "@/types/epc-non-dom-cepc";
import { formatIsoDateLong } from "@/app/utils/date";
import EPCBandChart from "../../EpcBandChart";
import RatingBadge from "../../epc-rdsap/certificate/components/RatingBadge";
import type { Band } from "@/app/utils/epc";

export default function CepcCertificateSummary({
  data,
}: {
  data: EpcNonDomCepcDocument;
}) {
  const isCepc = data.typeOfAssessment === "CEPC";

  const dateOfAssessment = data.dateOfAssessment;
  const dateOfCertificate = data.dateOfRegistration;

  const buildingType = isCepc ? data.propertyType : undefined;

  const totalConditionedArea =
    isCepc && data.technicalInformation?.floorArea
      ? `${data.technicalInformation.floorArea} m²`
      : "—";

  const primaryEnergyIndicator =
    isCepc && data.primaryEnergyUse
      ? `${data.primaryEnergyUse} kWh/m²/year`
      : "—";

  const assessmentSoftware = "—";
  const approvedOrganisation = data.assessor?.registeredBy?.name ?? "—";

  const currentBand = isCepc
    ? data.currentEnergyEfficiencyBand
    : data.energyBandFromRelatedCertificate;

  // Benchmark shown on the legacy certificate page (value may not be available yet)
  const benchmarkRatingNumber =
    isCepc && typeof data.newBuildRating === "number"
      ? data.newBuildRating
      : undefined;
  const benchmarkBand = isCepc ? data.newBuildBand : undefined;

  const normalisedCurrentBand: Band | null = currentBand
    ? (String(currentBand).toUpperCase() as Band)
    : null;

  return (
    <section aria-label="Energy Performance Certificate">
      {/* Summary table */}
      <div className="cert-section">
        <dl className="summary-list">
          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of assessment</strong>
            </dt>
            <dd>
              {dateOfAssessment ? formatIsoDateLong(dateOfAssessment) : "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Date of certificate</strong>
            </dt>
            <dd>
              {dateOfCertificate ? formatIsoDateLong(dateOfCertificate) : "—"}
            </dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Total conditioned area</strong>
            </dt>
            <dd>{totalConditionedArea}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Primary energy indicator</strong>
            </dt>
            <dd>{primaryEnergyIndicator}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Building type</strong>
            </dt>
            <dd>{buildingType ?? "—"}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Assessment software</strong>
            </dt>
            <dd>{assessmentSoftware}</dd>
          </div>

          <div className="row-2col border-b-grey">
            <dt>
              <strong>Approved organisation</strong>
            </dt>
            <dd>{approvedOrganisation}</dd>
          </div>
        </dl>
      </div>

      {/* Rating explanation */}
      <div className="cert-section bg-blue">
        <h3>Building Energy Performance Rating</h3>

        <EPCBandChart
          current={normalisedCurrentBand}
          potential="A"
          topLabel="Excellent"
          bottomLabel="Very poor"
          markerPlacement="right"
        />

        <div className="print-no-break print-padding-top">
          <p>
            <strong>Approximate energy use:</strong> —
          </p>
          <p>
            <strong>Approximate carbon dioxide emissions:</strong> —
          </p>
          <p>
            The building energy performance rating is a measure of the effect of
            a building on the environment in terms of carbon dioxide (CO₂)
            emissions. The better the rating, the less impact on the
            environment. The current rating is based upon an assessor’s survey
            of the building. The potential rating shows the effect of
            undertaking all of the recommended measures listed below. The
            Recommendations Report which accompanies this certificate explains
            how this rating is calculated and gives further information on the
            performance of this building and how to improve it.
          </p>
        </div>
      </div>

      {/* Benchmark + top recommendations */}
      <div className="cert-section">
        <h3>Benchmark</h3>
        <div className="row-2col--value">
          <div>
            <p>
              A building of this type built to current building regulations at
              the date of issue of this certificate would have a building energy
              performance rating of:
            </p>
          </div>

          <div>
            <span className="visually-hidden">
              Benchmark rating {benchmarkRatingNumber ?? "not available"}{" "}
              {benchmarkBand
                ? `band ${String(benchmarkBand).toUpperCase()}`
                : ""}
            </span>
            <RatingBadge variant="energy" band="A" score={80} />
          </div>
        </div>
      </div>
      <div className="cert-section bg-grey">
        <h3>
          Recommendations for the cost-effective improvement of energy
          performance
        </h3>
        <ol>
          <li>Consider installing PV.</li>
          <li>Replace lighting systems with LEDs of at least 110 lm/W.</li>
          <li>Install ASHP to supply existing radiators.</li>
        </ol>

        <p>
          There are additional improvement measures applicable to this building.
          Refer to the Recommendations Report.
        </p>
      </div>
    </section>
  );
}

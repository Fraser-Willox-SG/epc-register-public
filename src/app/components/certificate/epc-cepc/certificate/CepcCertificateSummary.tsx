import { formatIsoDateLong } from "@/app/utils/date";
import EPCBandChart from "@/app/components/certificate/EpcBandChart";
import RatingBadge from "@/app/components/certificate/RatingBadge";
import MissingData from "@/app/components/MissingData";
import type { Band } from "@/app/utils/epc";
import type { SgNonDomesticCepcCertificateSummary } from "@/types/sg-epc-non-dom-cepc";

function normaliseBand(band: string | null | undefined): Band | null {
  const b = (band ?? "").trim().toUpperCase();
  return b ? (b as Band) : null;
}

function normaliseText(value: unknown): string | null {
  if (typeof value === "string") {
    const v = value.trim();
    return v.length > 0 ? v : null;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : null;
  }
  return null;
}

export default function CepcCertificateSummary({
  data,
}: {
  data: SgNonDomesticCepcCertificateSummary;
}) {
  const isCepc = data.typeOfAssessment === "CEPC";

  const dateOfAssessment = data.dateOfAssessment;
  const dateOfCertificate = data.dateOfRegistration;

  // Prefer the short, clean label for UI (propertyType includes newlines in SG payload)
  const buildingType = isCepc
    ? normaliseText(data.propertyType.propertyTypeShortDescription)
    : null;

  const totalConditionedArea =
    isCepc && data.technicalInformation?.floorArea
      ? `${data.technicalInformation.floorArea} m²`
      : "—";

  const primaryEnergyIndicator =
    isCepc && data.primaryEnergyIndicator != null
      ? `${data.primaryEnergyIndicator} kWh/m²/year`
      : "—";

  // SG provides calculationTool (avoid hardcoded dash)
  const assessmentSoftware = normaliseText(data.calculationTool) ?? "—";

  const approvedOrganisation = data.assessor?.registeredBy?.name ?? "—";

  const currentBand = data.currentEnergyEfficiencyBand;

  // ✅ updated field name
  const potentialBand = data.potentialEnergyEfficiencyBand;

  const normalisedCurrentBand = normaliseBand(currentBand);
  const normalisedPotentialBand = normaliseBand(potentialBand);

  const benchmarkRatingNumber = Number.isFinite(data.newBuildBenchmarkRating)
    ? data.newBuildBenchmarkRating
    : null;

  const benchmarkBand = normaliseBand(data.newBuildBenchmarkBand);

  // ✅ new recommendations are split into 4 arrays; combine + take top 3
  const allRecommendations = [
    ...(Array.isArray(data.shortPaybackRecommendations)
      ? data.shortPaybackRecommendations
      : []),
    ...(Array.isArray(data.mediumPaybackRecommendations)
      ? data.mediumPaybackRecommendations
      : []),
    ...(Array.isArray(data.longPaybackRecommendations)
      ? data.longPaybackRecommendations
      : []),
    ...(Array.isArray(data.otherPaybackRecommendations)
      ? data.otherPaybackRecommendations
      : []),
  ];

  const topRecommendations = allRecommendations.slice(0, 3);

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
          potential={normalisedPotentialBand}
          topLabel="Excellent"
          bottomLabel="Very poor"
          markerPlacement="right"
        />

        <div className="print-no-break print-padding-top">
          <p>
            <strong>Approximate energy use:</strong>{" "}
            {data.approximateEnergyUse != null
              ? `${data.approximateEnergyUse} kWh/m²/year`
              : "—"}
          </p>
          <p>
            <strong>Approximate carbon dioxide emissions:</strong>{" "}
            {data.epcRatingBer != null
              ? `${data.epcRatingBer} kgCO₂ per m²`
              : "—"}
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
      <div className="cert-section print-no-break">
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

            {benchmarkBand && benchmarkRatingNumber != null ? (
              <RatingBadge
                variant="energy"
                band={String(benchmarkBand).toUpperCase()}
                score={benchmarkRatingNumber}
              />
            ) : (
              <MissingData />
            )}
          </div>
        </div>
      </div>

      <div className="cert-section bg-grey print-no-break">
        <h3>
          Recommendations for the cost-effective improvement of energy
          performance
        </h3>

        <ol>
          {topRecommendations.length > 0 ? (
            topRecommendations.map((rec, idx) => (
              <li key={`${rec.code}-${idx}`}>{rec.text}</li>
            ))
          ) : (
            <li>
              <MissingData label="No recommendations returned from API" />
            </li>
          )}
        </ol>

        <p>
          There are additional improvement measures applicable to this building.
          Refer to the Recommendations Report.
        </p>
      </div>
    </section>
  );
}

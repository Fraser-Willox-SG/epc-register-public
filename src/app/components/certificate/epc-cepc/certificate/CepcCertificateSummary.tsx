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

function normaliseText(value: string | null | undefined): string | null {
  const v = (value ?? "").trim();
  return v.length > 0 ? v : null;
}

function parseNumber(value: string | number | null | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const n = Number(trimmed);
    return Number.isFinite(n) ? n : null;
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
    ? normaliseText(data.propertyShortDescription)
    : null;

  const totalConditionedArea =
    isCepc && data.technicalInformation?.floorArea
      ? `${data.technicalInformation.floorArea} m²`
      : "—";

  // SG field name
  const primaryEnergyIndicator =
    isCepc && data.primaryEnergyIndicator
      ? `${String(data.primaryEnergyIndicator).trim()} kWh/m²/year`
      : "—";

  // SG provides calculationTool (avoid hardcoded dash)
  const assessmentSoftware = normaliseText(data.calculationTool) ?? "—";

  const approvedOrganisation = data.assessor?.registeredBy?.name ?? "—";

  const currentBand = data.currentEnergyEfficiencyBand;

  const potentialBand = data.potentialEnergyBand;

  const normalisedCurrentBand = normaliseBand(currentBand);
  const normalisedPotentialBand = normaliseBand(potentialBand);

  const benchmarkRatingNumber = parseNumber(data.newBuildBenchmarkRating);
  const benchmarkBand = normaliseBand(data.newBuildBenchmarkBand);

  const topRecommendations = Array.isArray(data.recommendations)
    ? data.recommendations.slice(0, 3)
    : [];

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
            {normaliseText(data.approximateEnergyUse)
              ? `${String(data.approximateEnergyUse).trim()} kWh/m²/year`
              : "—"}
          </p>
          <p>
            <strong>Approximate carbon dioxide emissions:</strong>{" "}
            <MissingData />
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

      <div className="cert-section bg-grey">
        <h3>
          Recommendations for the cost-effective improvement of energy
          performance
        </h3>

        <ol>
          {topRecommendations.length > 0 ? (
            topRecommendations.map((rec) => (
              <li key={rec.recommendationCode}>{rec.recommendation}</li>
            ))
          ) : (
            <>
              <li>
                <MissingData label="No recommendations returned from API" />
              </li>
            </>
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

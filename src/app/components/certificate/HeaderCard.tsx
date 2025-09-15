import React from "react";

type Props = {
  address: string;
  dwellingType?: string | null;
  totalFloorArea?: string | null;
  dateOfAssessment?: string | null;
  rrn: string;
  current?: number | null;
  currentBand?: string | null;
  potential?: number | null;
  potentialBand?: string | null;
};

export default function HeaderCard({
  address,
  dwellingType,
  totalFloorArea,
  dateOfAssessment,
  rrn,
  current,
  currentBand,
  potential,
  potentialBand,
}: Props) {
  return (
    <div className="ds_card ds_p-4">
      <dl className="ds_key-details">
        <div className="ds_key-details__item">
          <dt>Address</dt>
          <dd>{address}</dd>
        </div>
        <div className="ds_key-details__item">
          <dt>Dwelling type</dt>
          <dd>{dwellingType ?? "—"}</dd>
        </div>
        <div className="ds_key-details__item">
          <dt>Total floor area</dt>
          <dd>{totalFloorArea ? `${totalFloorArea} m²` : "—"}</dd>
        </div>
        <div className="ds_key-details__item">
          <dt>Date of assessment</dt>
          <dd>{dateOfAssessment ?? "—"}</dd>
        </div>
        <div className="ds_key-details__item">
          <dt>RRN</dt>
          <dd>{rrn}</dd>
        </div>
      </dl>

      <p className="ds_lede ds_mt-3">
        Current rating: <strong>{current ?? "—"}</strong>
        {currentBand ? ` (${currentBand.toUpperCase()})` : ""} &nbsp;|&nbsp;
        Potential: <strong>{potential ?? "—"}</strong>
        {potentialBand ? ` (${potentialBand.toUpperCase()})` : ""}
      </p>
    </div>
  );
}

import React from "react";
import { formatIsoDateLong } from "@/app/utils/date";
import logo from "../../../../../public/logo.svg";

type Props = {
  addressLine1: string | undefined;
  addressLine2: string | undefined;
  addressLine3: string | undefined;
  addressLine4: string | undefined;
  town: string | undefined;
  postcode: string | undefined;
  dateofPlan?: string | undefined;
  rrn: string;
  currentBand?: string | null;
  printTitle?: string | undefined;
};

export default function ActionPlanHeader({
  addressLine1,
  addressLine2,
  addressLine3,
  addressLine4,
  town,
  postcode,
  rrn,
  dateofPlan,
  printTitle,
}: Props) {
  return (
    <div className="print-no-break print-page-break">
      <div className=" bg-dark-blue">
        <div className="flex-between cert-section">
          <div>
            <h2>{printTitle}</h2>
            <p className="mb-0">{addressLine1}</p>
            <p className="mb-0">{addressLine2}</p>
            <p className="mb-0">{addressLine3}</p>
            <p className="mb-0">{addressLine4}</p>
            <p className="mb-0">{town}</p>
            <p className="mb-0">{postcode}</p>
          </div>

          <div>
            {" "}
            <img
              src="/logo.svg"
              alt="Scottish Government logo"
              width={160}
              height={100}
              style={{ display: "block" }}
            />
          </div>
        </div>
      </div>

      <div
        className="row-2col"
        style={{ textAlign: "center", color: "white", gap: "1px" }}
      >
        <div className="cert-section bg-dark-blue">
          <p>
            <strong>Date of Plan</strong>
          </p>
          {dateofPlan ? formatIsoDateLong(dateofPlan) : "—"}
        </div>
        <div className="cert-section bg-dark-blue">
          <p>
            <strong>Certificate number</strong>
          </p>
          {rrn}
        </div>
      </div>
    </div>
  );
}

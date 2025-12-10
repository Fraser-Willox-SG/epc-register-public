import React from "react";

export default function ArNextSteps() {
  return (
    <section className="cert-section bg-blue print-no-break" id="ar-next-steps">
      <h2 className="mb-0">Next steps</h2>

      {/* a) Your Advisory Report */}
      <h3 style={{ fontSize: "1rem" }}>a) Your Advisory Report</h3>
      <p className="text-small">
        If you elected to have an Advisory Report then it is valid for a period
        of seven years beginning with the date it is issued.
      </p>
      <p className="text-small">
        This Advisory Report has been lodged on the Scottish EPC register.
        Access to the report and, where still valid, to previous similar
        documents relating to the same building can be obtained using either the
        report reference number or the address of the building.
      </p>
      <p className="text-small">
        If you wish to maintain a valid Advisory Report for the building, you
        should commission a new Advisory Report not more than seven years from
        the date this report was issued.
      </p>

      {/* b) Implementing recommendations */}
      <h3 style={{ fontSize: "1rem" }}>b) Implementing recommendations</h3>
      <p className="text-small">
        The recommendations provided within this Advisory Report have been
        selected by the energy assessor from a central list of recommendations,
        based on their knowledge of the building fabric, building services, the
        operation of plant and equipment within the curtilage of the building,
        and the general management of the building.
      </p>
      <p className="text-small">
        The energy assessor may have inserted additional measures in section 3
        (d) Other Recommendations. The recommendations are provided as an
        indication of opportunities that appear to exist to improve the energy
        efficiency of the building.
      </p>
      <p className="text-small">
        Building owners and occupiers must be cautious when attempting to
        implement the recommendations in this report. Some recommendations may
        be specific to building owners or to occupiers and may be implemented
        with little collaboration between the two parties. Others will require
        close collaboration between building owners and occupiers for successful
        implementation.
      </p>
      <p className="text-small">
        If you, as building occupier, are not also the building owner, it is
        recommended that you seek permission from the building owner before
        carrying out any improvement works.
      </p>

      {/* c) Legal disclaimer */}
      <h3 style={{ fontSize: "1rem" }}>c) Legal disclaimer</h3>
      <p className="text-small">
        The advice provided in this Advisory Report is intended to be for
        information only. Recipients of this Advisory Report are advised to seek
        further detailed professional advice before reaching any decision on how
        to improve the energy performance of the building.
      </p>

      {/* d) Complaints */}
      <h3 style={{ fontSize: "1rem" }}>d) Complaints</h3>
      <p className="text-small">
        Details of the energy assessor and the relevant Approved Organisation
        are shown on this report and on the associated Display Energy
        Certificate. Each Approved Organisation is required to publish details
        of its complaints and disciplinary procedures.
      </p>
      <p className="text-small">
        If the energy assessor is not able to resolve your complaint, you should
        then refer matters to their Approved Organisation. Contact details of
        the Approved Organisation are available from your energy assessor or
        from the Scottish Government website.
      </p>
    </section>
  );
}

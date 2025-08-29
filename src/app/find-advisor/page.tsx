"use client";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/src/components/Button/Button";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import CheckboxGroup from "@scottish-government/designsystem-react/dist/components/Checkbox/Checkbox";
import TextInput from "@scottish-government/designsystem-react/dist/components/TextInput/TextInput";

export default function FindAnAdvisorPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Find An Advisor Page</h1>
      </div>
      {/* <div className="ds_leader"> */}
      <h2 className="ds_h3">Search for an assessor or advisor</h2>
      {/* </div> */}
      <p>
        Enter the postcode and the distance to view a list of assessors and
        advisors in the area.
      </p>
      <Question
        // error="true"
        // errorMessage="You must select at least one option"
        hintText="Search by"
        legend="Find the property"
        tagName="fieldset"
      >
        <CheckboxGroup
          items={[
            {
              id: "epc-assessor",
              label: "EPC Assessor",
              // checked: true,
            },
            { id: "section-63-advisor", label: "Section 63 Advisor" },
            { id: "dec-assessor", label: "DEC Assessor" },
          ]}
        />
      </Question>
      <TextInput id="text-input" label="Postcode" />
      {/* <TextInput id="text-input" label="Distance (Miles)" /> */}
      <Button>Continue</Button>
    </div>
  );
}

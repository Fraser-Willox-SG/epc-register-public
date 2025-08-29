"use client";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/src/components/Button/Button";
import RadioGroup from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioButton";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import TextInput from "@scottish-government/designsystem-react/dist/components/TextInput/TextInput";

export default function ActionPlanPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Action Plan</h1>
      </div>
      {/* <div className="ds_leader"> */}
      <p>Energy Usage for Larger Commercial Buildings</p>
      {/* </div> */}
      <p>
        For larger commercial buildings (1000m²+), this shows energy improvement
        plans as required under Section 63 legislation. Search by postcode or
        RRN.
      </p>
      <Question
        // error="true"
        // errorMessage="You must select at least one option"
        hintText="Search by"
        legend="Find the property"
        tagName="fieldset"
      >
        <RadioGroup
          items={[
            {
              hintText: "Example: EH1 XXX",
              id: "domestic-property-radio",
              label: "Postcode",
              name: "item name 1",
            },
            {
              hintText: "Example: XXXX-XXXX-XXXX-XXXX",
              id: "non-domestic-property-radio",
              label: "Report Reference Number (RNN)",
              name: "item name 2",
            },
          ]}
          name="paymentType"
        />
      </Question>
      <TextInput id="text-input" label="Postcode" />
      <TextInput id="text-input" label="Report Reference Number (RNN)" />
      <Button>Continue</Button>
    </div>
  );
}

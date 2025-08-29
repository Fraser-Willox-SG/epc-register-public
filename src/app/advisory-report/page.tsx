"use client";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/src/components/Button/Button";
import RadioGroup from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioButton";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import TextInput from "@scottish-government/designsystem-react/dist/components/TextInput/TextInput";

export default function AdvisoryReportPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Display energy certificate / Advisory report</h1>
      </div>
      {/* <div className="ds_leader"> */}
      <p>Energy Usage for Public Buildings</p>
      {/* </div> */}
      <p>
        View the energy usage and efficiency advice for public buildings. Search
        by postcode or RRN to get a DEC or its associated AR
      </p>
      <Question
        // error="true"
        // errorMessage="You must select at least one option"
        // hintText="Select all that apply."
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

"use client";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
// import Button from "@scottish-government/designsystem-react/src/components/Button/Button";
import RadioGroup from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioButton";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";

export default function EPCPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Energy Performance Certificate</h1>
      </div>
      {/* <div className="ds_leader"> */}
      <p>Property type</p>
      {/* </div> */}
      <p>
        A domestic property like a house or flat, or a non-domestic property for
        example commercial , industrial or public building. Enter the report
        reference number (RRN) or the postcode to view the document
      </p>
      <Question
        // error="true"
        // errorMessage="You must select at least one option"
        // hintText="Select all that apply."
        legend="What type of property is the certificate for?"
        tagName="fieldset"
      >
        <RadioGroup
          items={[
            {
              hintText: "A house or flat",
              id: "domestic-property-radio",
              label: "Domestic property",
              name: "item name 1",
            },
            {
              hintText: "A commercial, industrial or public building",
              id: "non-domestic-property-radio",
              label: "Non-domestic property",
              name: "item name 2",
            },
          ]}
          name="paymentType"
        />
      </Question>
      <Button>Continue</Button>
    </div>
  );
}

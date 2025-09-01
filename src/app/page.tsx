"use client";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import RadioGroup from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioGroup";
import RadioButton from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioButton";

export default function EPCPage() {
  const groupName = "property-type";

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Energy Performance Certificate</h1>
      </div>

      <h2 className="ds_h3">Property type</h2>
      <p>
        A domestic property like a house or flat, or a non-domestic property for
        example commercial, industrial or public building. Enter the report
        reference number (RRN) or the postcode to view the document.
      </p>

      <form noValidate>
        <Question
          legend="What type of property is the certificate for?"
          tagName="fieldset"
        >
          <RadioGroup name={groupName}>
            <RadioButton
              id="domestic-property-radio"
              name={groupName}
              label="Domestic property"
              hintText="A house or flat"
            />
            <RadioButton
              id="non-domestic-property-radio"
              name={groupName}
              label="Non-domestic property"
              hintText="A commercial, industrial or public building"
            />
          </RadioGroup>
        </Question>

        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}

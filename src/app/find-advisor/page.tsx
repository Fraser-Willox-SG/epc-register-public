"use client";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import CheckboxGroup from "@scottish-government/designsystem-react/dist/components/Checkbox/CheckboxGroup";
import Checkbox from "@scottish-government/designsystem-react/dist/components/Checkbox/Checkbox";
import TextInput from "@scottish-government/designsystem-react/dist/components/TextInput/TextInput";

export default function FindAnAdvisorPage() {
  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Find an assessor or advisor</h1>
      </div>

      <h2 className="ds_h3">Search for an assessor or advisor</h2>
      <p>
        Enter the postcode and choose the type(s) of assessor or advisor to view
        results in the area.
      </p>

      <form noValidate>
        <Question legend="What are you looking for?" tagName="fieldset">
          <CheckboxGroup>
            <Checkbox id="epc-assessor" label="EPC Assessor" />
            <Checkbox id="section-63-advisor" label="Section 63 Advisor" />
            <Checkbox id="dec-assessor" label="DEC Assessor" />
            {/* If you want a 'none' option that deselects the others, uncomment:
            <Checkbox exclusive id="none" label="None of the above" />
            */}
          </CheckboxGroup>
        </Question>

        <TextInput
          id="postcode"
          label="Postcode"
          hintText="For example, EH1 1XX"
          width="fixed-20"
          autoComplete="postal-code"
        />

        <Button type="submit" className="ds_mt-4">
          Continue
        </Button>
      </form>
    </div>
  );
}

"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import RadioGroup from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioGroup";
import RadioButton from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioButton";

type PropertyType = "domestic" | "non-domestic";

export default function EPCPage() {
  const router = useRouter();
  const groupName = "property-type";

  // Default to "domestic"
  const [selection, setSelection] = useState<PropertyType>("domestic");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "domestic-property-radio") {
      setSelection("domestic");
    }
    if (e.target.id === "non-domestic-property-radio") {
      setSelection("non-domestic");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (selection === "domestic") {
      router.push("/domestic");
    } else {
      router.push("/non-domestic");
    }
  };

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Energy Performance Certificate (EPC)</h1>
      </div>

      {/* <h2 className="ds_h3">Property type</h2>
      <p>
        A domestic property like a house or flat, or a non-domestic property for
        example commercial, industrial or public building.
      </p> */}

      <form onSubmit={onSubmit} noValidate>
        <Question
          legend="What type of property is the certificate for?"
          tagName="fieldset"
        >
          <RadioGroup name={groupName} onChange={onChange}>
            <RadioButton
              id="domestic-property-radio"
              name={groupName}
              label="Domestic property"
              hintText="A house or flat"
              checked={selection === "domestic"}
            />
            <RadioButton
              id="non-domestic-property-radio"
              name={groupName}
              label="Non-domestic property"
              hintText="A commercial, industrial or public building"
              checked={selection === "non-domestic"}
            />
          </RadioGroup>
        </Question>

        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}

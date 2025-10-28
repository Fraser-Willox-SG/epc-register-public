"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import RadioGroup from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioGroup";
import RadioButton from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioButton";
import TextInput from "@scottish-government/designsystem-react/dist/components/TextInput/TextInput";

type SearchMode = "postcode" | "rrn";

export default function ActionPlanPage() {
  const [mode, setMode] = useState<SearchMode>("postcode");
  const [postcode, setPostcode] = useState("");
  const [rrn, setRRN] = useState("");

  const groupName = "search-mode";

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    if (id === "search-by-postcode") setMode("postcode");
    if (id === "search-by-rrn") setMode("rrn");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = (mode === "postcode" ? postcode : rrn).trim();
    if (!value) return;

    // TODO: replace with routing / API call
    // Example:
    // router.push(`/action-plan?${mode}=${encodeURIComponent(value)}`);
  };

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Action Plan</h1>
      </div>

      <h2 className="ds_h3">Energy Usage for Larger Commercial Buildings</h2>
      <p>
        For larger commercial buildings (1000m²+), this shows energy improvement
        plans as required under Section 63 legislation. Search by postcode or
        RRN.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <Question legend="Find the property" tagName="fieldset">
          <RadioGroup name={groupName} onChange={onRadioChange}>
            <RadioButton
              id="search-by-postcode"
              name={groupName}
              label="Postcode"
              hintText="Example: DA8 1FD"
              checked={mode === "postcode"}
            />
            <RadioButton
              id="search-by-rrn"
              name={groupName}
              label="Report Reference Number (RRN)"
              hintText="Example: 1234-5678-9012-3456"
              checked={mode === "rrn"}
            />
          </RadioGroup>
        </Question>

        {mode === "postcode" ? (
          <TextInput
            key="postcode"
            id="postcode-input"
            label="Postcode"
            hintText="Enter a full postcode"
            width="fixed-20"
            value={postcode}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPostcode(e.target.value)
            }
            autoComplete="postal-code"
          />
        ) : (
          <TextInput
            key="rrn"
            id="rrn-input"
            label="Report Reference Number (RRN)"
            hintText="Enter the 16-character RRN"
            width="fixed-20"
            value={rrn}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRRN(e.target.value)
            }
            inputMode="numeric"
          />
        )}

        <Button type="submit">Continue</Button>
      </form>
    </div>
  );
}

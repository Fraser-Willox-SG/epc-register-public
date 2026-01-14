"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import RadioGroup from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioGroup";
import RadioButton from "@scottish-government/designsystem-react/dist/components/RadioButton/RadioButton";
import TextInput from "@scottish-government/designsystem-react/dist/components/TextInput/TextInput";

import {
  isValidUKPostcode,
  normalizePostcode,
  isValidRRN,
  normalizeRRN,
} from "@/lib/validators";

type Mode = "postcode" | "rrn";

export default function NonDomesticSearchPage() {
  const [mode, setMode] = useState<Mode>("postcode");
  const [postcode, setPostcode] = useState("");
  const [rrn, setRRN] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const groupName = "non-domestic-search-mode";

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    setError(null);
    if (id === "search-by-postcode") setMode("postcode");
    if (id === "search-by-rrn") setMode("rrn");
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "postcode") {
      const pc = normalizePostcode(postcode);
      if (!isValidUKPostcode(pc)) {
        setError("Enter a valid UK postcode, for example EC2Y 5AS.");
        return;
      }
      router.push(`/non-domestic/results?postcode=${encodeURIComponent(pc)}`);
    } else {
      if (!isValidRRN(rrn)) {
        setError(
          "Enter a valid Report Reference Number (RRN). Example: 1234-5678-9012-3456-7890."
        );
        return;
      }
      const id = normalizeRRN(rrn); // normalises and formats groups
      router.push(`/non-domestic/certificate/${encodeURIComponent(id)}`);
    }
  };

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Energy Performance Certificate</h1>
      </div>

      <h2 className="ds_h3">Property search</h2>
      <p>
        Search to find and view a property’s Energy Performance Certificate.
        Search with either a postcode for the property, or the specific Report
        Reference Number (RRN).
      </p>

      <form onSubmit={onSubmit} noValidate>
        <Question legend="Find the property" tagName="fieldset">
          <p className="ds_question__hint">Search by</p>
          <RadioGroup name={groupName} onChange={onRadioChange}>
            <RadioButton
              id="search-by-postcode"
              name={groupName}
              label="Postcode"
              hintText="Example: EC2Y 5AS"
              checked={mode === "postcode"}
            />
            <RadioButton
              id="search-by-rrn"
              name={groupName}
              label="Report Reference Number (RRN)"
              hintText="Example: 1234-5678-9012-3456-7890"
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
            hintText="Enter the RRN (20 digits, with or without hyphens)"
            width="fixed-20"
            value={rrn}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRRN(e.target.value)
            }
            inputMode="numeric"
          />
        )}

        {error && <p className="ds_error-message ds_mt-2">{error}</p>}

        <Button type="submit" className="ds_mt-4">
          Continue
        </Button>
      </form>
    </div>
  );
}

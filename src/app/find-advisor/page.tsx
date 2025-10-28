"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";

import Button from "@scottish-government/designsystem-react/dist/components/Button/Button";
import Question from "@scottish-government/designsystem-react/dist/components/Question/Question";
import CheckboxGroup from "@scottish-government/designsystem-react/dist/components/Checkbox/CheckboxGroup";
import Checkbox from "@scottish-government/designsystem-react/dist/components/Checkbox/Checkbox";
import TextInput from "@scottish-government/designsystem-react/dist/components/TextInput/TextInput";

import { isValidUKPostcode, normalizePostcode } from "@/lib/validators";

type AdvisorType = "epc" | "section63" | "dec";

export default function FindAdvisorPage() {
  const router = useRouter();

  const [postcode, setPostcode] = useState("");
  const [types, setTypes] = useState<Record<AdvisorType, boolean>>({
    epc: false,
    section63: false,
    dec: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);

  function onCheckboxChange(key: AdvisorType) {
    setTypes((prev) => ({ ...prev, [key]: !prev[key] }));
    setTypeError(null);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setTypeError(null);

    const pc = normalizePostcode(postcode);
    if (!isValidUKPostcode(pc)) {
      setError("Enter a valid UK postcode, for example DA8 1FD.");
      return;
    }

    const selected = (Object.keys(types) as AdvisorType[]).filter(
      (k) => types[k]
    );
    if (selected.length === 0) {
      setTypeError("Select at least one option.");
      return;
    }

    const params = new URLSearchParams();
    params.set("postcode", pc);
    params.set("types", selected.join(","));
    router.push(`/find-advisor/results?${params.toString()}`);
  }

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

      <form onSubmit={onSubmit} noValidate>
        <Question
          legend="What are you looking for?"
          tagName="fieldset"
          hasError={!!typeError}
        >
          <CheckboxGroup>
            <Checkbox
              id="epc"
              label="EPC Assessor"
              checked={types.epc}
              onChange={() => onCheckboxChange("epc")}
            />
            <Checkbox
              id="section63"
              label="Section 63 Advisor"
              checked={types.section63}
              onChange={() => onCheckboxChange("section63")}
            />
            <Checkbox
              id="dec"
              label="DEC Assessor"
              checked={types.dec}
              onChange={() => onCheckboxChange("dec")}
            />
          </CheckboxGroup>

          {typeError && <p className="ds_error-message ds_mt-2">{typeError}</p>}
        </Question>

        <TextInput
          id="postcode"
          label="Postcode"
          hintText="For example, DA8 1FD"
          width="fixed-20"
          autoComplete="postal-code"
          value={postcode}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPostcode(e.target.value)
          }
          hasError={!!error}
        />
        {error && <p className="ds_error-message ds_mt-2">{error}</p>}

        <Button type="submit" className="ds_mt-4">
          Continue
        </Button>
      </form>
    </div>
  );
}

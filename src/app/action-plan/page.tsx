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

type SearchMode = "postcode" | "rrn";

export default function ActionPlanPage() {
  const [mode, setMode] = useState<SearchMode>("postcode");
  const [postcode, setPostcode] = useState("");
  const [rrn, setRRN] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const groupName = "search-mode";

  const activeErrorId = mode === "postcode" ? "postcode-error" : "rrn-error";

  const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    setError(null);

    if (id === "search-by-postcode") {
      setMode("postcode");
    }

    if (id === "search-by-rrn") {
      setMode("rrn");
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (mode === "postcode") {
      const pc = normalizePostcode(postcode);

      if (!isValidUKPostcode(pc)) {
        setError("Enter a valid Scottish postcode, for example G20 7YD.");
        return;
      }

      router.push(`/action-plan/results?postcode=${encodeURIComponent(pc)}`);
      return;
    }

    if (!isValidRRN(rrn)) {
      setError(
        "Enter a valid Report Reference Number (RRN), for example 0019-1950-9933-3640-6020.",
      );
      return;
    }

    const id = normalizeRRN(rrn);
    router.push(`/action-plan/certificate/${encodeURIComponent(id)}`);
  };

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Action Plan</h1>
      </div>

      <h2 className="ds_h3">Energy usage for larger commercial buildings</h2>
      <p>
        The Action Plan sets out energy improvement plans for larger commercial
        buildings with a floor area of more than 1,000m². These are needed under
        section 63 of The Climate Change (Scotland) Act 2009.
      </p>
      <p>Search by either the:</p>
      <ul>
        <li>postcode</li>
        <li>Report Reference Number (RNN)</li>
      </ul>

      <form onSubmit={onSubmit} noValidate>
        <Question legend="Find the property" tagName="fieldset">
          <RadioGroup name={groupName} onChange={onRadioChange}>
            <RadioButton
              id="search-by-postcode"
              name={groupName}
              label="Postcode"
              hintText="Example: G20 7YD"
              checked={mode === "postcode"}
            />
            <RadioButton
              id="search-by-rrn"
              name={groupName}
              label="Report Reference Number (RRN)"
              hintText="Example: 0019-1950-9933-3640-6020"
              checked={mode === "rrn"}
            />
          </RadioGroup>
        </Question>

        <div
          className={error ? "ds_question ds_question--error" : "ds_question"}
        >
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
              aria-describedby={error ? activeErrorId : undefined}
              className={error ? "ds_input--error" : undefined}
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
              aria-describedby={error ? activeErrorId : undefined}
              className={error ? "ds_input--error" : undefined}
            />
          )}

          {error && (
            <p
              id={activeErrorId}
              className="ds_question__error-message ds_mt-1"
            >
              <span className="visually-hidden">Error:</span> {error}
            </p>
          )}
        </div>

        <Button type="submit" className="ds_mt-4">
          Continue
        </Button>
      </form>
    </div>
  );
}

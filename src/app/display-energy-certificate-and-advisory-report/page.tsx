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

export default function AdvisoryReportPage() {
  const [mode, setMode] = useState<Mode>("postcode");
  const [postcode, setPostcode] = useState("");
  const [rrn, setRRN] = useState("");
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const groupName =
    "display-energy-certificate-and-advisory-report-search-mode";

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
        setError("Enter a valid Scottish postcode, for example ML5 4TF.");
        return;
      }

      router.push(
        `/display-energy-certificate-and-advisory-report/results?postcode=${encodeURIComponent(
          pc,
        )}`,
      );
      return;
    }

    if (!isValidRRN(rrn)) {
      setError(
        "Enter a valid Report Reference Number (RRN), for example 0001-3410-0212-0899-3692.",
      );
      return;
    }

    const id = normalizeRRN(rrn);
    router.push(
      `/display-energy-certificate-and-advisory-report/certificate/${encodeURIComponent(
        id,
      )}`,
    );
  };

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Display Energy Certificate (DEC) or Advisory Report (AR)</h1>
      </div>

      <h2 className="ds_h3">Energy usage for public buildings</h2>
      <p>
        Search by postcode or RRN to get a Display Energy Certificate or its
        associated Advisory Report.
      </p>

      <form onSubmit={onSubmit} noValidate>
        <Question legend="Find the property" tagName="fieldset">
          <p className="ds_question__hint">Search by</p>
          <RadioGroup name={groupName} onChange={onRadioChange}>
            <RadioButton
              id="search-by-postcode"
              name={groupName}
              label="Postcode"
              hintText="Example: ML5 4TF"
              checked={mode === "postcode"}
            />
            <RadioButton
              id="search-by-rrn"
              name={groupName}
              label="Report Reference Number (RRN)"
              hintText="Example: 0001-3410-0212-0899-3692"
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
              hintText="Enter the RRN (20 digits, with or without hyphens)"
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

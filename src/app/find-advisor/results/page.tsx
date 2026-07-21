import Link from "next/link";
import type { Metadata } from "next";

import AssessorResultsTable from "@/app/components/AssessorResultsTable";
import { selfUrl } from "@/app/utils/self-url";

import {
  ADVISOR_TYPE_LABELS,
  isAdvisorType,
  isQualificationActive,
  qualificationsForAdvisorType,
} from "@/types/find-assessor";

import type {
  AdvisorType,
  Assessor,
  ScottishQualificationKey,
  UKGAssessor,
  UKGResponse,
} from "@/types/find-assessor";

export const metadata: Metadata = {
  title: "Find Assessor or Advisor Results",
};

type SearchParams = {
  postcode?: string;
  types?: string;
  page?: string;
};

/**
 * Parses the comma-separated search type query parameter.
 *
 * Invalid values are ignored and duplicate values are removed.
 */
function parseTypes(input: string | undefined): AdvisorType[] {
  if (!input) {
    return [];
  }

  const parsedTypes = new Set<AdvisorType>();

  for (const value of input.split(",")) {
    const normalisedValue = value.trim().toLowerCase();

    if (isAdvisorType(normalisedValue)) {
      parsedTypes.add(normalisedValue);
    }
  }

  return Array.from(parsedTypes);
}

/**
 * Converts a raw UKG assessor into the consistent shape used by the UI.
 */
function normaliseAssessor(assessor: UKGAssessor): Assessor {
  return {
    schemeAssessorId: String(assessor.schemeAssessorId),
    firstName: assessor.firstName ?? "",
    lastName: assessor.lastName ?? "",
    registeredBy: assessor.registeredBy ?? null,
    contactDetails: assessor.contactDetails ?? null,
    qualifications: assessor.qualifications ?? {},
    distanceFromPostcodeInMiles:
      typeof assessor.distanceFromPostcodeInMiles === "number"
        ? assessor.distanceFromPostcodeInMiles
        : null,
    searchResultsComparisonPostcode:
      assessor.searchResultsComparisonPostcode ?? null,
  };
}

/**
 * Requests assessors for one Scottish qualification.
 *
 * UKG's assessor endpoint currently accepts one qualification per request,
 * so searches for several types are performed in parallel and then combined.
 */
async function fetchAssessors(
  postcode: string,
  qualification: ScottishQualificationKey,
): Promise<Assessor[]> {
  const query = new URLSearchParams({
    postcode,
    qualification,
  });

  const apiUrl = selfUrl(`/api/sg/assessors?${query.toString()}`);

  const response = await fetch(apiUrl, {
    cache: "no-store",
  });

  const responseText = await response.text();

  if (!response.ok) {
    /*
     * Avoid logging the full response body here. Assessor responses may
     * contain personal information such as email addresses and phone numbers.
     */
    console.error("[FindAdvisor] UKG request failed", {
      status: response.status,
      qualification,
    });

    throw new Error(`Assessor request failed with status ${response.status}`);
  }

  let json: UKGResponse;

  try {
    json = JSON.parse(responseText) as UKGResponse;
  } catch {
    console.error("[FindAdvisor] UKG returned invalid JSON", {
      qualification,
    });

    throw new Error("Assessor response was not valid JSON");
  }

  const assessors = Array.isArray(json.data?.assessors)
    ? json.data.assessors
    : [];

  return assessors.map(normaliseAssessor);
}

/**
 * Deduplicates assessors returned by several qualification searches.
 *
 * When the same assessor is returned more than once, the version with the
 * shortest distance is retained. In normal circumstances the distance and
 * qualification data should be identical in every response.
 */
function deduplicateAssessors(batches: Assessor[][]): Assessor[] {
  const assessorsById = new Map<string, Assessor>();

  for (const batch of batches) {
    for (const assessor of batch) {
      const existing = assessorsById.get(assessor.schemeAssessorId);

      if (!existing) {
        assessorsById.set(assessor.schemeAssessorId, assessor);
        continue;
      }

      const existingDistance =
        existing.distanceFromPostcodeInMiles ?? Number.POSITIVE_INFINITY;

      const candidateDistance =
        assessor.distanceFromPostcodeInMiles ?? Number.POSITIVE_INFINITY;

      if (candidateDistance < existingDistance) {
        assessorsById.set(assessor.schemeAssessorId, assessor);
      }
    }
  }

  return Array.from(assessorsById.values());
}

export default async function FindAdvisorResultsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const {
    postcode: rawPostcode,
    types: rawTypes,
    page: rawPage,
  } = await searchParams;

  const postcode = (rawPostcode ?? "").trim().toUpperCase();
  const selectedTypes = parseTypes(rawTypes);
  const page = Math.max(Number.parseInt(rawPage ?? "1", 10) || 1, 1);

  if (!postcode || selectedTypes.length === 0) {
    return (
      <div className="ds_wrapper">
        <div className="ds_page-header">
          <h1>Find an assessor or advisor</h1>
        </div>

        <p className="ds_error-message">
          Postcode and at least one option are required.
        </p>

        <p className="ds_mt-4">
          <Link href="/find-advisor" className="ds_link">
            Back to search
          </Link>
        </p>
      </div>
    );
  }

  let rows: Assessor[] = [];
  let error: string | null = null;

  try {
    /*
     * An EPC search can represent several Scottish qualifications.
     * Set removes duplicate qualification keys when multiple search types
     * happen to reference the same qualification.
     */
    const requestedQualifications: ScottishQualificationKey[] = Array.from(
      new Set(
        selectedTypes.flatMap((type) => [
          ...qualificationsForAdvisorType(type),
        ]),
      ),
    );

    const batches = await Promise.all(
      requestedQualifications.map((qualification) =>
        fetchAssessors(postcode, qualification),
      ),
    );

    rows = deduplicateAssessors(batches)
      /*
       * This is a defensive check.
       *
       * The UKG endpoint should already return only assessors matching the
       * requested qualification. Filtering again prevents an assessor from
       * appearing if an unexpected or inconsistent API record is returned.
       */
      .filter((assessor) =>
        requestedQualifications.some((qualification) =>
          isQualificationActive(assessor.qualifications, qualification),
        ),
      )
      .sort((assessorA, assessorB) => {
        const distanceA =
          assessorA.distanceFromPostcodeInMiles ?? Number.POSITIVE_INFINITY;

        const distanceB =
          assessorB.distanceFromPostcodeInMiles ?? Number.POSITIVE_INFINITY;

        return distanceA - distanceB;
      });
  } catch (cause) {
    console.error("[FindAdvisor] Unable to retrieve assessor results", cause);

    error = `There was a problem retrieving results for ${postcode}.`;
  }

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Find an assessor or advisor</h1>
      </div>

      <h2 className="ds_h3">
        Results include:{" "}
        {selectedTypes.map((type) => ADVISOR_TYPE_LABELS[type]).join(", ")}
      </h2>

      {error ? (
        <>
          <p className="ds_error-message">{error}</p>

          <p className="ds_mt-4">
            <Link href="/find-advisor" className="ds_link">
              Back to search
            </Link>
          </p>
        </>
      ) : rows.length === 0 ? (
        <>
          <div className="ds_inset-text">
            <p>
              No results found for <strong>{postcode}</strong>.
            </p>
          </div>

          <p className="ds_mt-4">
            <Link href="/find-advisor" className="ds_link">
              Change search
            </Link>
          </p>
        </>
      ) : (
        <AssessorResultsTable
          postcode={postcode}
          selectedTypes={selectedTypes}
          rows={rows}
          page={page}
          pageSize={10}
        />
      )}
    </div>
  );
}

import sapV15 from "@/app/content/domestic/lzc-energy-sources/sap/v15.json";
import sapV161 from "@/app/content/domestic/lzc-energy-sources/sap/v16.1.json";
import sapV17 from "@/app/content/domestic/lzc-energy-sources/sap/v17.json";
import sapV18 from "@/app/content/domestic/lzc-energy-sources/sap/v18.json";
import sapV19 from "@/app/content/domestic/lzc-energy-sources/sap/v19.json";

import rdsapV15 from "@/app/content/domestic/lzc-energy-sources/rdsap/v15.json";
import rdsapV161 from "@/app/content/domestic/lzc-energy-sources/rdsap/v16.1.json";
import rdsapV17 from "@/app/content/domestic/lzc-energy-sources/rdsap/v17.json";
import rdsapV18 from "@/app/content/domestic/lzc-energy-sources/rdsap/v18.json";
import rdsapV19 from "@/app/content/domestic/lzc-energy-sources/rdsap/v19.json";
import rdsapV21 from "@/app/content/domestic/lzc-energy-sources/rdsap/v21.json";

type DomesticAssessmentFamily = "sap" | "rdsap";

type LzcLookup = Record<string, string>;

const supportedSchemaVersions = ["15", "16.1", "17", "18", "19", "21"] as const;

type SupportedSchemaVersion = (typeof supportedSchemaVersions)[number];

export type LzcEnergySource = {
  code: number;
  label: string;
  found: boolean;
};

const lookupRegistry: Record<
  DomesticAssessmentFamily,
  Partial<Record<SupportedSchemaVersion, LzcLookup>>
> = {
  sap: {
    "15": sapV15,
    "16.1": sapV161,
    "17": sapV17,
    "18": sapV18,
    "19": sapV19,
  },

  rdsap: {
    "15": rdsapV15,
    "16.1": rdsapV161,
    "17": rdsapV17,
    "18": rdsapV18,
    "19": rdsapV19,
    "21": rdsapV21,
  },
};

function getAssessmentFamily(
  typeOfAssessment: string,
): DomesticAssessmentFamily | null {
  const normalisedType = typeOfAssessment.replace(/[^a-z]/gi, "").toLowerCase();

  if (normalisedType === "sap") {
    return "sap";
  }

  if (normalisedType === "rdsap") {
    return "rdsap";
  }

  return null;
}

function isSupportedSchemaVersion(
  version: string,
): version is SupportedSchemaVersion {
  return supportedSchemaVersions.some(
    (supportedVersion) => supportedVersion === version,
  );
}

function getSchemaVersion(schemaType: string): SupportedSchemaVersion | null {
  /*
   * Examples:
   *
   * SAP-Schema-S-19.0.0   -> 19
   * SAP-Schema-S-16.1.0   -> 16.1
   * RdSAP-Schema-R-21.0.0 -> 21
   */
  const versionMatch = schemaType.match(/(\d+)\.(\d+)\.\d+$/);

  if (!versionMatch) {
    return null;
  }

  const majorVersion = versionMatch[1];
  const minorVersion = versionMatch[2];

  const version =
    minorVersion === "0" ? majorVersion : `${majorVersion}.${minorVersion}`;

  return isSupportedSchemaVersion(version) ? version : null;
}

export function getLzcEnergySourceLabels({
  typeOfAssessment,
  schemaType,
  codes,
}: {
  typeOfAssessment: string;
  schemaType: string;
  codes: number[];
}): LzcEnergySource[] {
  const family = getAssessmentFamily(typeOfAssessment);
  const version = getSchemaVersion(schemaType);

  const lookup =
    family && version ? lookupRegistry[family][version] : undefined;

  return codes.map((code) => {
    const label = lookup?.[String(code)];

    return {
      code,
      label: label ?? `LZC source code ${code}`,
      found: typeof label === "string",
    };
  });
}

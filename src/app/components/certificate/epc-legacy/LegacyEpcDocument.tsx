import type { EpcDomSummary } from "@/types/epc-dom-hem";

/**
 * Placeholder for pre-2012 EPC layouts, if we ever need them.
 */
export default function LegacyEpcDocument({ data }: { data: EpcDomSummary }) {
  return (
    <section aria-label="Legacy EPC document">
      <p className="ds_inset-text">
        This certificate uses a legacy format that isn’t currently supported.
      </p>
      <p className="ds_body">
        RRN: <strong>{data.assessmentId}</strong>
      </p>
    </section>
  );
}

"use client";

import Button from "@scottish-government/designsystem-react/dist/components//Button/Button";

export default function PrintButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <Button type="button" className={className} onClick={() => window.print()}>
      Download / Print
    </Button>
  );
}

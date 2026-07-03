"use client";

import { useState } from "react";
import Button from "@scottish-government/designsystem-react/dist/components//Button/Button";

export default function DownloadButton({
  className = "",
  filename = "certificate.pdf",
  pdfUrl,
}: {
  className?: string;
  filename?: string;
  pdfUrl: string;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading) return;

    setIsDownloading(true);

    try {
      const res = await fetch(pdfUrl, { cache: "no-store" });

      if (!res.ok) {
        console.error("PDF download failed", res.status);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("PDF download failed", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      type="button"
      className={className}
      onClick={handleDownload}
      disabled={isDownloading}
      aria-busy={isDownloading}
    >
      {isDownloading ? "Preparing PDF…" : "Download"}
    </Button>
  );
}

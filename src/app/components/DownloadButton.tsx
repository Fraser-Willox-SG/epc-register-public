"use client";

import Button from "@scottish-government/designsystem-react/dist/components//Button/Button";

export default function DownloadButton({
  className = "",
  filename = "certificate.pdf",
}: {
  className?: string;
  filename?: string;
}) {
  const handleDownload = async () => {
    const element = document.getElementById("certificate-content");

    if (!element) {
      console.error("Certificate content not found");
      return;
    }

    const [{ jsPDF }, html2canvasModule] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);

    const html2canvas = html2canvasModule.default;

    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.72);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(
      imgData,
      "JPEG",
      0,
      position,
      imgWidth,
      imgHeight,
      undefined,
      "FAST",
    );
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        position,
        imgWidth,
        imgHeight,
        undefined,
        "FAST",
      );
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
  };

  return (
    <Button type="button" className={className} onClick={handleDownload}>
      Download
    </Button>
  );
}

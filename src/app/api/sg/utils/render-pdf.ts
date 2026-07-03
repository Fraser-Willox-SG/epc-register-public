import { chromium } from "playwright";

export function normaliseInternalUrl(url: URL): string {
  if (url.hostname === "0.0.0.0") {
    url.hostname = "localhost";
  }

  return url.toString();
}

export async function renderPdfFromUrl(url: string): Promise<Buffer> {
  const browser = await chromium.launch({ headless: true });

  try {
    const page = await browser.newPage({
      viewport: {
        width: 1024,
        height: 1448,
      },
      deviceScaleFactor: 1,
    });

    await page.goto(url, {
      waitUntil: "networkidle",
      timeout: 60_000,
    });

    await page.emulateMedia({ media: "print" });

    await page.waitForSelector("#certificate-content", {
      timeout: 60_000,
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
      // Matches browser print dialog "fit to page" output.
      scale: 0.8,
      margin: {
        top: "0mm",
        right: "0mm",
        bottom: "0mm",
        left: "0mm",
      },
    });

    return Buffer.from(pdfBuffer);
  } finally {
    await browser.close();
  }
}

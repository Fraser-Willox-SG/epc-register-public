import Link from "next/link";
import type { Metadata } from "next";

// Full title required as base page.tsx is a special case, and doesn't use metadata from layout.tsx
export const metadata: Metadata = {
  title: "Home - Energy Certificates",
};

type HubLink = {
  href: string;
  title: string;
  description: string;
};

const hubLinks: HubLink[] = [
  {
    href: "/energy-performance-certificates",
    title: "Energy Performance Certificates (EPCs)",
    description:
      "Existing or historical energy certificates for domestic and non-domestic properties.",
  },
  {
    href: "/display-energy-certificate-and-advisory-report",
    title: "Display Energy Certificates (DECs) and Advisory Reports (ARs)",
    description:
      "Existing or historical energy certificates and advisory reports for non-domestic buildings.",
  },
  {
    href: "/action-plan",
    title: "Action Plans",
    description:
      "Existing or historical energy improvement plans for large commercial buildings.",
  },
  {
    href: "/data-extracts",
    title: "Data Extracts",
    description: "Open data about domestic and non-domestic EPCs.",
  },
  {
    href: "/find-advisor",
    title: "Assessors and advisors",
    description:
      "If a property needs a new or updated EPC, then here you can find an assessor or advisor to help you.",
  },
];

export default function HomePage() {
  return (
    <main className="ds_wrapper">
      <header className="ds_page-header">
        <h1>Scottish EPC Register</h1>
      </header>

      <p>Use this site to find the following information.</p>

      <section aria-labelledby="services-heading">
        <ul className="ds_no-bullets">
          {hubLinks.map(({ href, title, description }) => (
            <li key={href} className="ds_!_margin-bottom--2">
              <h3 className="ds_h4 ds_!_margin-bottom--0">
                <Link href={href} className="ds_link">
                  {title}
                </Link>
              </h3>
              <p className="ds_!_margin-bottom--0">{description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="guidance-heading"
        className="ds_!_margin-top--6"
      >
        <h2 id="guidance-heading" className="ds_h3">
          Useful guidance
        </h2>

        <p>
          If information does not appear for the address you are looking for
          following a postcode search, then the property or building may not
          have a certificate.
        </p>

        <p>
          If a document is not found when searching using the Report Reference
          Number, this may mean that it has been cancelled or withdrawn. Please
          contact us if you require further information.
        </p>
      </section>

      <section aria-labelledby="contact-heading" className="ds_!_margin-top--6">
        <h2 id="contact-heading" className="ds_h3">
          Contact us
        </h2>

        <p>
          Our public facing website does not display Green Deal Advice Reports
          or Green Deal Improvement Packages. If you require information
          relating to this, please contact our team for assistance.
        </p>

        <p>
          If you need help using this website, or what you expect to see does
          not appear then you can{" "}
          <strong>
            <a href="mailto:epcenquiries@gov.scot" className="ds_link">
              e-mail our team
            </a>
          </strong>
          .
        </p>
      </section>
    </main>
  );
}

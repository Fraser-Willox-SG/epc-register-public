import Link from "next/link";

type HubLink = {
  href: string;
  title: string;
  description: string;
};

const hubLinks: HubLink[] = [
  {
    href: "/energy-performance-certificates",
    title: "Energy Performance Certificates (EPCs)",
    description: "Find EPCs for domestic and non-domestic properties.",
  },
  {
    href: "/display-energy-certificate-and-advisory-report",
    title: "Display Energy Certificates (DECs) and Advisory Reports (ARs)",
    description: "View energy usage information for non-domestic buildings.",
  },
  {
    href: "/action-plan",
    title: "Action Plans",
    description: "View action plans for larger commercial buildings.",
  },
  {
    href: "/find-advisor",
    title: "Find an assessor or advisor",
    description:
      "Find someone who can help if a property needs a new or updated EPC.",
  },
];

export default function HomePage() {
  return (
    <main className="ds_wrapper">
      <header className="ds_page-header">
        <h1>Scottish Energy Certificates</h1>
      </header>

      <p>
        Use this service to find energy performance information for properties
        and buildings in Scotland.
      </p>

      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className="ds_h3">
          Services
        </h2>

        <ul className="ds_no-bullets">
          {hubLinks.map(({ href, title, description }) => (
            <li key={href} className="ds_!_margin-bottom--2">
              <h3 className="ds_h4 ds_!_margin-bottom--1">
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
          after a postcode search, the property or building may not have an EPC,
          DEC, AR or Action Plan.
        </p>

        <p>
          If a document is not found using a specific Report Reference Number
          (RRN), it may have been cancelled or withdrawn.
        </p>
      </section>

      <section aria-labelledby="contact-heading" className="ds_!_margin-top--6">
        <h2 id="contact-heading" className="ds_h3">
          Contact us
        </h2>

        <p>
          This public website does not display information relating to Green
          Deal. For help with this, contact the team.
        </p>

        <p>
          If you need help using this website, or something you expected to see
          does not appear, email{" "}
          <a href="mailto:epcenquiries@gov.scot" className="ds_link">
            epcenquiries@gov.scot
          </a>
          .
        </p>
      </section>
    </main>
  );
}

import Link from "next/link";

type HubLink = {
  href: string;
  title: string;
  description: string;
};

const hubLinks: HubLink[] = [
  {
    href: "/energy-performance-certificates",
    title: "Energy Performance Certificate (EPC)",
    description:
      "Existing or historical energy certificate for domestic and non-domestic properties.",
  },
  {
    href: "/display-energy-certificate-and-advisory-report",
    title: "Display Energy Certificate (DEC) and Advisory Report (AR)",
    description:
      "Existing or historical energy certificate or advisory report for public buildings.",
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
    title: "Find an assessor or advisor",
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

      <p>
        You can use this Scottish EPC Register website to find the following:
      </p>

      <section aria-labelledby="services-heading">
        <h2 id="services-heading" className="ds_h3">
          Services
        </h2>

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
          have an EPC, DEC, AR or Action Plan.
        </p>

        <p>
          If a document is not found using a specific Report Reference Number
          (RRN), then this may mean this has been cancelled or withdrawn.
        </p>
      </section>

      <section aria-labelledby="contact-heading" className="ds_!_margin-top--6">
        <h2 id="contact-heading" className="ds_h3">
          Contact us
        </h2>

        <p>
          Our public facing website does not display any information relating to
          Green Deal. If you require information relating to this, please
          contact our team for assistance.
        </p>

        <p>
          If you need help using this website, or what you expect to see does
          not appear then you can e-mail our team at{" "}
          <a href="mailto:epcenquiries@gov.scot" className="ds_link">
            epcenquiries@gov.scot
          </a>
          .
        </p>
      </section>
    </main>
  );
}

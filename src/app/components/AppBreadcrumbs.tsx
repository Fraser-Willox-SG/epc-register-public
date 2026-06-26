"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Crumb = {
  label: string;
  href?: string;
};

const labels: Record<string, string> = {
  "energy-performance-certificates": "Energy Performance Certificates",
  domestic: "Domestic EPC",
  results: "Search results",
  "display-energy-certificate-and-advisory-report":
    "Display Energy Certificate and Advisory Report",
  "data-extracts": "Data Extracts",
  "find-advisor": "Find an assessor or advisor",
  "action-plan": "Action Plan",
};

function getBreadcrumbs(pathname: string): Crumb[] {
  if (pathname === "/") {
    return [];
  }

  if (
    pathname.startsWith(
      "/energy-performance-certificates/domestic/certificate/",
    )
  ) {
    return [
      { label: "Home", href: "/" },
      {
        label: "Energy Performance Certificates",
        href: "/energy-performance-certificates",
      },
      {
        label: "Domestic EPC",
        href: "/energy-performance-certificates/domestic",
      },
      { label: "Certificate" },
    ];
  }

  if (
    pathname.startsWith(
      "/energy-performance-certificates/non-domestic/certificate/",
    )
  ) {
    return [
      { label: "Home", href: "/" },
      {
        label: "Energy Performance Certificates",
        href: "/energy-performance-certificates",
      },
      {
        label: "Non-domestic EPC",
        href: "/energy-performance-certificates/non-domestic",
      },
      { label: "Certificate" },
    ];
  }

  if (
    pathname.startsWith(
      "/display-energy-certificate-and-advisory-report/certificate/",
    )
  ) {
    return [
      { label: "Home", href: "/" },
      {
        label: "Display Energy Certificate and Advisory Report",
        href: "/display-energy-certificate-and-advisory-report",
      },
      { label: "Certificate" },
    ];
  }

  if (
    pathname.startsWith(
      "/display-energy-certificate-and-advisory-report/combined/",
    )
  ) {
    return [
      { label: "Home", href: "/" },
      {
        label: "Display Energy Certificate and Advisory Report",
        href: "/display-energy-certificate-and-advisory-report",
      },
      { label: "Certificate" },
    ];
  }

  if (pathname.startsWith("/action-plan/certificate/")) {
    return [
      { label: "Home", href: "/" },
      {
        label: "Action Plan",
        href: "/action-plan",
      },
      { label: "Certificate" },
    ];
  }

  const segments = pathname.split("/").filter(Boolean);

  return [
    { label: "Home", href: "/" },
    ...segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const isLast = index === segments.length - 1;

      return {
        label: labels[segment] ?? segment.replaceAll("-", " "),
        href: isLast ? undefined : href,
      };
    }),
  ];
}

export default function AppBreadcrumbs() {
  const pathname = usePathname();
  const crumbs = getBreadcrumbs(pathname);

  if (crumbs.length === 0) {
    return null;
  }

  return (
    <div className="ds_wrapper app_breadcrumbs no-print">
      <nav aria-label="Breadcrumb">
        <ol className="ds_breadcrumbs">
          {crumbs.map(({ label, href }) => (
            <li className="ds_breadcrumbs__item" key={`${href ?? label}`}>
              {href ? (
                <Link href={href} className="ds_breadcrumbs__link">
                  {label}
                </Link>
              ) : (
                label
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

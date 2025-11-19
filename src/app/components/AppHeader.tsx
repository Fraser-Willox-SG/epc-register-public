"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SiteHeader from "@scottish-government/designsystem-react/dist/components/SiteHeader/SiteHeader";
import SiteNavigation from "@scottish-government/designsystem-react/dist/components/SiteNavigation/SiteNavigation";

type NavItem = { href: string; label: string };
type NavItemWithCurrent = NavItem & { current: boolean };

/** Minimal shape to satisfy SiteHeader's required `navigationItems` prop */
type DSNavigationItem = {
  href: string;
  title: string;
  current?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Energy performance certificate" },
  {
    href: "/display-energy-certificate-and-advisory-report",
    label: "Display energy certificate / Advisory report",
  },
  { href: "/action-plan", label: "Action plan" },
  { href: "/data-extracts", label: "Data extracts" },
  { href: "/find-advisor", label: "Find an assessor or advisor" },
];

export default function AppHeader() {
  const pathname = usePathname();

  const computed: NavItemWithCurrent[] = NAV_ITEMS.map((i) => ({
    ...i,
    current:
      pathname === i.href || (i.href !== "/" && pathname.startsWith(i.href)),
  }));

  const navigationItemsForType: DSNavigationItem[] = computed.map(
    ({ href, label, current }) => ({
      href,
      title: label,
      current,
    })
  );

  // 🔒 Derive the exact function type required by the DS component
  type ItemProps = React.ComponentProps<typeof SiteNavigation.Item>;
  type LinkAdapterType = NonNullable<ItemProps["linkComponent"]>;

  const NextLinkAdapter: LinkAdapterType = ({ href, children, ...rest }) => (
    <Link href={href ?? "#"} {...rest}>
      {children ?? null}
    </Link>
  );

  return (
    <SiteHeader
      navigationItems={navigationItemsForType}
      siteTitle="Energy Certificates"
    >
      <SiteHeader.Brand homeUrl="/" siteTitle="Energy Certificates">
        <img
          alt="The Scottish Government"
          src="/scottish-government.svg"
          width={300}
          height={58}
          loading="lazy"
        />
      </SiteHeader.Brand>

      <SiteHeader.Navigation>
        <SiteNavigation>
          {computed.map((item) => (
            <SiteNavigation.Item
              key={item.href}
              href={item.href}
              current={item.current}
              linkComponent={NextLinkAdapter}
            >
              {item.label}
            </SiteNavigation.Item>
          ))}
        </SiteNavigation>
      </SiteHeader.Navigation>
    </SiteHeader>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SiteHeader from "@scottish-government/designsystem-react/src/components/SiteHeader/SiteHeader";
import "@scottish-government/design-system/dist/css/design-system.css";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Energy Certificates",
  description: "Find Scottish Energy Certificates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <SiteHeader
          logo={{
            alt: "The Scottish Government",
            src: "./scottish-government.svg",
          }}
          navigationItems={[
            {
              href: "/",
              title: "Energy performance certificate",
            },
            {
              href: "/advisory-report",
              title: "Display energy certificate / Advisory report",
            },
            {
              href: "/action-plan",
              title: "Action plan",
            },
            {
              href: "/data-extracts",
              title: "Data extracts",
            },
            {
              href: "/find-advisor",
              title: "Find an assessor or advisor ",
            },
          ]}
          // phaseBanner={{
          //   phaseName: 'Beta'
          // }}
          // siteSearch
          siteTitle="Energy Certificates"
        />

        {children}
      </body>
    </html>
  );
}

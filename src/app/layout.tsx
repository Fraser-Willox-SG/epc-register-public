import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import SiteHeader from "@scottish-government/designsystem-react/dist/components/SiteHeader/SiteHeader";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
// import "@scottish-government/design-system/dist/css/design-system.css";

import AppBreadcrumbs from "./components/AppBreadcrumbs";
import AppPhaseBanner from "./components/AppPhaseBanner";

import "./globals.css";
import "./globals-print.css";
import "./globals-download.css";
import "./epc-old.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Energy Certificates",
    template: "%s - Energy Certificates",
  },
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
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <div className="ds_page">
          <AppHeader />

          <main id="main-content" className="ds_page__middle">
            <AppPhaseBanner />
            <AppBreadcrumbs />
            {children}
          </main>

          <div className="ds_page__bottom">
            <AppFooter />
          </div>
        </div>
      </body>
    </html>
  );
}

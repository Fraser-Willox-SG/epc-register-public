import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import SiteHeader from "@scottish-government/designsystem-react/dist/components/SiteHeader/SiteHeader";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
// import "@scottish-government/design-system/dist/css/design-system.css";

import "./globals.css";
import "./globals-print.css";
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
        <div className="ds_page">
          <AppHeader />
          <div className="ds_page__middle">{children}</div>
          <div className="ds_page__bottom">
            <AppFooter />
          </div>
        </div>
      </body>
    </html>
  );
}

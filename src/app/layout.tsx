import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import SiteHeader from "@scottish-government/designsystem-react/dist/components/SiteHeader/SiteHeader";
import AppHeader from "./components/AppHeader";
// import "@scottish-government/design-system/dist/css/design-system.css";

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
        <AppHeader />

        {children}
      </body>
    </html>
  );
}

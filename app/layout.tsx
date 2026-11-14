import type { Metadata, Viewport } from "next";
import { Anton, Geist, Geist_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { SITE_URL } from "@/data/site-url";
import "./globals.css";

const display = Anton({ variable: "--nf-display", subsets: ["latin"], weight: "400" });
const sans = Geist({ variable: "--nf-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--nf-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "OAGITECH — Inspection, NDT, Calibration & Technical Training",
    template: "%s · OAGITECH",
  },
  description:
    "OAGITECH (Oil & Gas Inspection Technology) delivers inspection, non-destructive testing, calibration, commercial diving and technical training & certification from Yanbu, Saudi Arabia.",
  icons: { apple: "/brand/favicon.png" },
  openGraph: {
    type: "website",
    siteName: "OAGITECH",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0d0e0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
